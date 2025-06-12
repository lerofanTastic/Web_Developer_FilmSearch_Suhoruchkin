const API_BASE_URL_V14 = "https://api.kinopoisk.dev/v1.4";
const API_BASE_URL_V1  = "https://api.kinopoisk.dev/v1";
const API_KEY          = import.meta.env.VITE_API_KEY;
const CACHE_TTL_MS     = 24 * 60 * 60 * 1000; // 24 часа

/**
 * Универсальная обёртка для запросов к разным версиям API
 * @param {string} resource — путь ресурса, например "movie" или "movie/search"
 * @param {object} params — query-параметры (значения могут быть строками, числами или массивами)
 * @param {object} [options]
 * @param {"v1"|"v1.4"} [options.version="v1.4"] — версия API
 * @param {AbortSignal} [options.signal] — сигнал отмены запроса
 * @returns {Promise<object>}
 */
export async function kinopoiskGet(
  resource,
  params = {},
  { version = "v1.4", signal } = {}
) {
  const base = version === "v1" ? API_BASE_URL_V1 : API_BASE_URL_V14;
  const url  = new URL(`${base}/${resource}`);

  // Собираем query-параметры, учитываем массивы
  Object.entries(params).forEach(([key, value]) => {
    if (value == null || value === "") return;
    if (Array.isArray(value)) {
      value.forEach((v) => url.searchParams.append(key, v));
    } else {
      url.searchParams.append(key, value);
    }
  });

  const res = await fetch(url.toString(), {
    headers: { "X-API-KEY": API_KEY },
    signal,
  });
  if (!res.ok) throw new Error(`Kinopoisk API error: ${res.status}`);
  return res.json();
}

/** Утилита: тасование Фишера–Йетса */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Поиск по названию */
export function searchMovies(query, page = 1, limit = 9, signal) {
  return kinopoiskGet(
    "movie/search",
    { query, page, limit },
    { signal }
  );
}

/** Универсальный поиск фильмов и мультфильмов */
export function universalMovieSearch({
  genre,
  country,
  rating,
  year,
  page = 1,
  limit = 9,
  sortField,
  signal,
}) {
  const params = {
    page,
    limit,
    selectFields: [
      "id", "name", "alternativeName",
      "poster", "genres", "countries", "rating", "year"
    ],
    notNullFields: ["poster.url", "rating.kp", "name"],
    type: ["movie", "cartoon"],
    "rating.kp": rating || "1-10",
  };

  if (genre)  params["genres.name"]    = genre;
  if (country) params["countries.name"] = country;
  if (year)    params["year"]           = year;
  if (sortField) params.sortField       = sortField;

  return kinopoiskGet("movie", params, { signal });
}

/** Случайная подборка из N фильмов */
export function getSixMovies({ count = 6, signal } = {}) {
  return kinopoiskGet(
    "movie",
    {
      page:       1,
      limit:      count,
      notNullFields: ["poster.url","rating.kp","name"],
      "rating.kp": "1-10",
    },
    { signal }
  ).then(data => Array.isArray(data.docs) ? shuffle(data.docs) : []);
}

/** Случайная подборка из 9 фильмов и мультфильмов */
export function getNineMovies(signal) {
  return getSixMovies({ count: 9, signal });
}

/** Случайная подборка сериалов (аниме, ТВ, мультсериалы) */
export function getNineSeries(signal) {
  return kinopoiskGet(
    "movie",
    {
      page:  1,
      limit: 9,
      type:  ["animated-series","tv-series","anime"],
      notNullFields: ["poster.url","rating.kp","name"],
      "rating.kp": "1-10",
    },
    { signal }
  ).then(data => Array.isArray(data.docs) ? shuffle(data.docs) : []);
}

/**
 * Поиск сериалов по множеству фильтров
 * @param {string[]} genresArr
 * @param {string[]} countriesArr
 * @param {string[]} ratingArr — целые значения рейтинга
 * @param {number[]} yearArr
 * @param {number} page
 * @param {number} limit
 * @param {string} sortField
 * @param {AbortSignal} signal
 */
export function universalSeriesSearch({
  genresArr     = [],
  countriesArr  = [],
  ratingArr     = [],
  yearArr       = [],
  page = 1,
  limit = 9,
  sortField,
  signal,
}) {
  const params = {
    page,
    limit,
    selectFields: [
      "id","name","alternativeName",
      "poster","genres","countries","rating","year"
    ],
    notNullFields: ["poster.url","rating.kp","name"],
    type: ["animated-series","tv-series","anime"],
  };

  if (genresArr.length)    params["genres.name"]    = genresArr;
  if (countriesArr.length) params["countries.name"]  = countriesArr;
  if (ratingArr.length)    params["rating.kp"]       = ratingArr;
  if (yearArr.length)      params["year"]            = yearArr;
  if (sortField)           params.sortField         = sortField;

  return kinopoiskGet("movie", params, { signal });
}

/** Кеширование возможных жанров и стран с TTL */
function cachedFetch(key, factory) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const { ts, data } = JSON.parse(raw);
      if (Date.now() - ts < CACHE_TTL_MS) {
        return Promise.resolve(data);
      }
    }
  } catch { /* игнорируем */ }

  return factory().then((data) => {
    localStorage.setItem(key, JSON.stringify({ ts: Date.now(), data }));
    return data;
  });
}

/** Получить список всех жанров */
export function getGenres() {
  return cachedFetch("kp_genres", () =>
    kinopoiskGet(
      "movie/possible-values-by-field",
      { field: "genres.name" },
      { version: "v1" }
    )
  );
}

/** Получить список всех стран */
export function getCountries() {
  return cachedFetch("kp_countries", () =>
    kinopoiskGet(
      "movie/possible-values-by-field",
      { field: "countries.name" },
      { version: "v1" }
    )
  );
}

/** Детальная информация о фильме/сериале */
export function getMovieById(id, signal) {
  return kinopoiskGet(`movie/${id}`, {}, { signal });
}

/** Получить до `limit` обложек/кадров по ID */
export function getImagesByMovieId(id, limit = 10, signal) {
  return kinopoiskGet(
    "image",
    { page: 1, limit, movieId: id },
    { version: "v1.4", signal }
  ).then(data =>
    Array.isArray(data.docs)
      ? data.docs.map((img) => img.url).filter(Boolean)
      : []
  );
}

/** Получить до `limit` рецензий по ID */
export function getReviewsByMovieId(id, limit = 2, signal) {
  return kinopoiskGet(
    "review",
    { page: 1, limit, movieId: id },
    { version: "v1.4", signal }
  ).then(data =>
    Array.isArray(data.docs) ? data.docs : []
  );
}