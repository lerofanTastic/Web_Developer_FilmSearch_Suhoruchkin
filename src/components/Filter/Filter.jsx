import React, { useState, useEffect } from "react";
import styles from "./Filter.module.css";
import { useTheme } from "../../context/Theme/themeContext";
import { useLocation } from "react-router-dom";
import { getGenres, getCountries } from "../../api/kinopoiskApi";

export const Filter = ({
  genre,
  setGenre,
  country,
  setCountry,
  rating,
  setRating,
  year,
  setYear,
}) => {
  const { theme } = useTheme();
  const location = useLocation();
  const header = location.pathname.startsWith("/series") ? "Сериалы" : "Фильмы";

  const [openSelect, setOpenSelect] = useState({
    genre: false,
    rating: false,
    country: false,
    year: false,
  });

  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getGenres()
      .then((data) => {
        setGenres(Array.isArray(data) ? data.map((item) => item.name) : []);
      })
      .catch(() => setGenres([]));
    getCountries()
      .then((data) => {
        setCountries(Array.isArray(data) ? data.map((item) => item.name) : []);
      })
      .catch(() => setCountries([]));
  }, []);

  const handleFocus = (name) =>
    setOpenSelect((prev) => ({ ...prev, [name]: true }));
  const handleBlur = (name) =>
    setOpenSelect((prev) => ({ ...prev, [name]: false }));

  // Генерация массива рейтингов с шагом 0.1
  const ratingRanges = [];
  ratingRanges.push({ label: "от 0 до 1", value: "0-1" });
  for (let i = 1; i < 10; i++) {
    ratingRanges.push({ label: `от ${i} до ${i + 1}`, value: `${i}-${i + 1}` });
  }

  // Генерация массива годов
  const years = [];
  for (let y = 2024; y >= 1874; y--) {
    years.push(y);
  }

  return (
    <div className={`${styles.mainLeft} ${styles[theme]}`}>
      <div className={`${styles.filterHeader} ${styles[theme]}`}>
        <h1>{header}</h1>
      </div>
      <div className={styles.filter}>
        {/* Жанр */}
        <form
          className={`${styles.category} ${styles[theme]}`}
          id="genreFilter"
        >
          <label htmlFor="genre">Жанр</label>
          <div className={styles.selectWrapper}>
            <select
              id="genre"
              value={genre}
              onFocus={() => handleFocus("genre")}
              onBlur={() => handleBlur("genre")}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="">Выберите жанр</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <span
              className={`${styles.arrow} ${
                openSelect.genre ? styles.arrowOpen : ""
              }`}
            ></span>
          </div>
        </form>
        {/* Рейтинг */}
        <form
          className={`${styles.category} ${styles[theme]}`}
          id="ratingFilter"
        >
          <label htmlFor="rating">Рейтинг</label>
          <div className={styles.selectWrapper}>
            <select
              id="rating"
              value={rating}
              onFocus={() => handleFocus("rating")}
              onBlur={() => handleBlur("rating")}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="">Выберите рейтинг</option>
              {ratingRanges.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
            <span
              className={`${styles.arrow} ${
                openSelect.rating ? styles.arrowOpen : ""
              }`}
            ></span>
          </div>
        </form>
        {/* Страна */}
        <form
          className={`${styles.category} ${styles[theme]}`}
          id="countryFilter"
        >
          <label htmlFor="country">Страна</label>
          <div className={styles.selectWrapper}>
            <select
              id="country"
              value={country}
              onFocus={() => handleFocus("country")}
              onBlur={() => handleBlur("country")}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Выберите страну</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <span
              className={`${styles.arrow} ${
                openSelect.country ? styles.arrowOpen : ""
              }`}
            ></span>
          </div>
        </form>
        {/* Год */}
        <form className={`${styles.category} ${styles[theme]}`} id="yearFilter">
          <label htmlFor="year">Год выпуска</label>
          <div className={styles.selectWrapper}>
            <select
              id="year"
              value={year}
              onFocus={() => handleFocus("year")}
              onBlur={() => handleBlur("year")}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">Выберите год</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <span
              className={`${styles.arrow} ${
                openSelect.year ? styles.arrowOpen : ""
              }`}
            ></span>
          </div>
        </form>
      </div>
    </div>
  );
};
