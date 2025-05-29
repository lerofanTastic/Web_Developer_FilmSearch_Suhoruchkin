const API_BASE_URL = "https://api.kinopoisk.dev/v1.4";
const API_V1_URL = "https://api.kinopoisk.dev/v1";
const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Универсальная функция для GET-запросов к API Кинопоиска
 * @param {string} resource - путь ресурса, например 'movie'
 * @param {object} params - объект с query-параметрами
 * @returns {Promise<object>} - результат запроса
 */
export async function kinopoiskGet(resource, params = {}) {
  const url = new URL(`${API_BASE_URL}/${resource}`);

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => url.searchParams.append(key, val));
    } else {
      url.searchParams.append(key, value);
    }
  });

  const response = await fetch(url.toString(), {
    headers: {
      "X-API-KEY": API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Ошибка запроса: ${response.status}`);
  }

  return response.json();
}

/**
 * Получить список фильмов по фильтрам
 * @param {object} filters - параметры фильтрации (например, { year: 2023, 'genres.name': 'криминал' })
 */
export function getMovies(filters = {}) {
  return kinopoiskGet("movie", filters);
}

/**
 * Получить фильм по ID
 * @param {string|number} id - ID фильма
 */
export function getMovieById(id) {
  return kinopoiskGet(`movie/${id}`);
}

/**
 * Получить массив фильмов по массиву id
 * @param {Array<string|number>} ids - массив id фильмов
 */
export async function getMoviesByIds(ids) {
  return Promise.all(ids.map(getMovieById));
}

/**
 * Поиск фильмов по названию
 * @param {string} query - поисковый запрос
 * @param {number} [page=1] - страница
 */
export function searchMovies(query, page = 1, limit = 9) {
  return kinopoiskGet("movie/search", { query, page, limit });
}

/**
 * Получить случайные фильмы с поддержкой фильтров
 * @param {object} params - дополнительные параметры (например, { id: '!250', year: '2020-2024' })
 * @returns {Promise<object>}
 */
export function getRandomMovies(params = {}) {
  return kinopoiskGet("movie/random", {
    year: "2020-2024",
    "rating.kp": "8-10",
    ...params,
  });
}
/**
 * Поиск фильмов по фильтрам: жанр, страна, рейтинг, год выпуска
 * @param {object} filters - { genre, country, rating, year, page, limit }
 * @returns {Promise<object>}
 */
export function searchMoviesByFilters({ genre, country, rating, year, page = 1, limit = 9 }) {
  const params = {};
  if (genre) params["genres.name"] = genre;
  if (country) params["countries.name"] = country;
  if (rating) params["rating.kp"] = rating;
  if (year) params["year"] = year;
  params.page = page;
  params.limit = limit;
  return getMovies(params);
}

/**
 * Получить список жанров
 */
function kinopoiskGetV1(resource, params = {}) {
  const url = new URL(`${API_V1_URL}/${resource}`);
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => url.searchParams.append(key, val));
    } else {
      url.searchParams.append(key, value);
    }
  });
  return fetch(url.toString(), {
    headers: {
      "X-API-KEY": API_KEY,
    },
  }).then(res => {
    if (!res.ok) throw new Error(`Ошибка запроса: ${res.status}`);
    return res.json();
  });
}

export function getGenres() {
  return kinopoiskGetV1("movie/possible-values-by-field", {
    field: "genres.name",
  });
}
export function getCountries() {
  return kinopoiskGetV1("movie/possible-values-by-field", {
    field: "countries.name",
  });
}
export function getRatings() {
  return kinopoiskGetV1("movie/possible-values-by-field", {
    field: "rating.kp",
  });
}
export function getYears() {
  return kinopoiskGetV1("movie/possible-values-by-field", {
    field: "year",
  });
}
