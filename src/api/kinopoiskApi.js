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
 * Поиск фильмов по названию
 * @param {string} query - поисковый запрос
 * @param {number} [page=1] - страница
 */
export function searchMovies(query, page = 1, limit = 9) {
  return kinopoiskGet("movie/search", { query, page, limit });
}
/**
 * Универсальный поиск фильмов по фильтрам
 * @param {object} filters - { genre, country, rating, year, page, limit }
 * @returns {Promise<object>}
 */
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
      "id",
      "name",
      "alternativeName",
      "poster",
      "genres",
      "countries",
      "rating",
      "year",
    ],
    notNullFields: "poster.url",
    type: ["movie", "cartoon"], // <--- добавлено!
  };
  if (genre && genre !== "") params["genres.name"] = genre;
  if (country && country !== "") params["countries.name"] = country;
  if (rating && rating !== "") {
    params["rating.kp"] = rating;
  } else {
    params["rating.kp"] = "1-10";
  }
  if (year !== "" && year !== "2024" && year !== 2024) params["year"] = year;
  if (sortField) params["sortField"] = sortField;
  if (signal) params["signal"] = signal;

  return kinopoiskGet("movie", params);
}

export function getSixMovies() {
  return fetch(
    "https://api.kinopoisk.dev/v1.4/movie?page=1&limit=6&notNullFields=poster.url&notNullFields=rating.kp&notNullFields=name&rating.kp=%210",
    {
      headers: { "X-API-KEY": API_KEY },
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error(`Ошибка запроса: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      // Перемешать массив фильмов для "рандома"
      if (Array.isArray(data.docs)) {
        for (let i = data.docs.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [data.docs[i], data.docs[j]] = [data.docs[j], data.docs[i]];
        }
        return data.docs;
      }
      return [];
    });
}

export function getNineMovies() {
  return fetch(
    "https://api.kinopoisk.dev/v1.4/movie?page=1&limit=9&type=movie&type=cartoon&notNullFields=poster.url&notNullFields=rating.kp&notNullFields=name&rating.kp=%210",
    {
      headers: { "X-API-KEY": API_KEY },
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error(`Ошибка запроса: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      if (Array.isArray(data.docs)) {
        for (let i = data.docs.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [data.docs[i], data.docs[j]] = [data.docs[j], data.docs[i]];
        }
        return data.docs;
      }
      return [];
    });
}
export function getNineSeries() {
  return fetch(
    "https://api.kinopoisk.dev/v1.4/movie?page=1&limit=9&type=animated-series&type=anime&type=tv-series&notNullFields=poster.url&notNullFields=rating.kp&notNullFields=name&rating.kp=%210",
    {
      headers: { "X-API-KEY": API_KEY },
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error(`Ошибка запроса: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      if (Array.isArray(data.docs)) {
        for (let i = data.docs.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [data.docs[i], data.docs[j]] = [data.docs[j], data.docs[i]];
        }
        return data.docs;
      }
      return [];
    });
}
export function universalSeriesSearch({
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
      "id",
      "name",
      "alternativeName",
      "poster",
      "genres",
      "countries",
      "rating",
      "year",
    ],
    notNullFields: "poster.url",
    type: ["animated-series", "tv-series", "anime"], // только сериалы!
  };
  if (genre && genre !== "") params["genres.name"] = genre;
  if (country && country !== "") params["countries.name"] = country;
  if (rating && rating !== "") {
    params["rating.kp"] = rating;
  } else {
    params["rating.kp"] = "1-10";
  }
  if (year !== "" && year !== "2024" && year !== 2024) params["year"] = year;
  if (sortField) params["sortField"] = sortField;
  if (signal) params["signal"] = signal;

  return kinopoiskGet("movie", params);
}
export function getGenres() {
  const cacheKey = "genresCache";
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      return Promise.resolve(JSON.parse(cached));
    } catch {
      // Если вдруг localStorage битый — игнорируем и делаем запрос
    }
  }
  return fetch(
    `${API_V1_URL}/movie/possible-values-by-field?field=genres.name`,
    {
      headers: { "X-API-KEY": API_KEY },
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error(`Ошибка запроса: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      localStorage.setItem(cacheKey, JSON.stringify(data));
      return data;
    });
}

export function getCountries() {
  const cacheKey = "countriesCache";
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      return Promise.resolve(JSON.parse(cached));
    } catch {
      // Если вдруг localStorage битый — игнорируем и делаем запрос
    }
  }
  return fetch(
    `${API_V1_URL}/movie/possible-values-by-field?field=countries.name`,
    {
      headers: { "X-API-KEY": API_KEY },
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error(`Ошибка запроса: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      localStorage.setItem(cacheKey, JSON.stringify(data));
      return data;
    });
}
/**
 * Получить детальную информацию о фильме или сериале по id
 * @param {number|string} id - ID фильма или сериала
 * @returns {Promise<object>}
 */
export function getMovieById(id) {
  return fetch(`https://api.kinopoisk.dev/v1.4/movie/${id}`, {
    headers: { "X-API-KEY": API_KEY },
  }).then((res) => {
    if (!res.ok) throw new Error(`Ошибка запроса: ${res.status}`);
    return res.json();
  });
}
/**
 * Получить изображения для фильма/сериала по id
 * @param {number|string} id - ID фильма или сериала
 * @param {number} [limit=10] - Количество изображений
 * @returns {Promise<string[]>} - Массив ссылок на изображения
 */
export function getImagesByMovieId(id, limit = 10) {
  return fetch(
    `https://api.kinopoisk.dev/v1.4/image?page=1&limit=${limit}&movieId=${id}`,
    {
      headers: { "X-API-KEY": API_KEY },
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error(`Ошибка запроса: ${res.status}`);
      return res.json();
    })
    .then((data) =>
      Array.isArray(data.docs)
        ? data.docs.map((img) => img.url).filter(Boolean)
        : []
    );
}
/**
 * Получить отзывы (рецензии) для фильма/сериала по id
 * @param {number|string} id - ID фильма или сериала
 * @param {number} [limit=2] - Количество отзывов
 * @returns {Promise<object[]>} - Массив отзывов
 */
export function getReviewsByMovieId(id, limit = 2) {
  return fetch(
    `https://api.kinopoisk.dev/v1.4/review?page=1&limit=${limit}&movieId=${id}`,
    {
      headers: { "X-API-KEY": API_KEY },
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error(`Ошибка запроса: ${res.status}`);
      return res.json();
    })
    .then((data) => (Array.isArray(data.docs) ? data.docs : []));
}