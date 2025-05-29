import React, { useState, useEffect } from "react";
import styles from "./Filter.module.css";
import { useTheme } from "../../context/Theme/themeContext";
import { useLocation } from "react-router-dom";
import { getGenres, getRatings, getCountries, getYears } from "../../api/kinopoiskApi";

export const Filter = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const header = location.pathname.startsWith("/series") ? "Сериалы" : "Фильмы";

  // Состояния для каждого select
  const [openSelect, setOpenSelect] = useState({
    genre: false,
    rating: false,
    country: false,
    year: false,
  });

  // Списки для селектов
  const [genres, setGenres] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [countries, setCountries] = useState([]);
  const [years, setYears] = useState([]);

  // Получение данных для фильтров
  useEffect(() => {
    getGenres().then(data => setGenres(data.values || []));
    getRatings().then(data => setRatings(data.values || []));
    getCountries().then(data => setCountries(data.values || []));
    getYears().then(data => setYears(data.values || []));
  }, []);

  // Функции для открытия/закрытия
  const handleFocus = (name) =>
    setOpenSelect((prev) => ({ ...prev, [name]: true }));
  const handleBlur = (name) =>
    setOpenSelect((prev) => ({ ...prev, [name]: false }));

  return (
    <div className={`${styles.mainLeft} ${styles[theme]}`}>
      <div className={`${styles.filterHeader} ${styles[theme]}`}>
        <h1>{header}</h1>
      </div>
      <div className={styles.filter}>
        <form className={`${styles.category} ${styles[theme]}`} id="genreFilter">
          <label htmlFor="genre">Жанр</label>
          <div className={styles.selectWrapper}>
            <select
              id="genre"
              onFocus={() => handleFocus("genre")}
              onBlur={() => handleBlur("genre")}
              onChange={(e) => e.target.blur()}
            >
              <option value="">Выберите жанр</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
            <span
              className={`${styles.arrow} ${openSelect.genre ? styles.arrowOpen : ""}`}
            ></span>
          </div>
        </form>
        <form className={`${styles.category} ${styles[theme]}`} id="ratingFilter">
          <label htmlFor="rating">Рейтинг</label>
          <div className={styles.selectWrapper}>
            <select
              id="rating"
              onFocus={() => handleFocus("rating")}
              onBlur={() => handleBlur("rating")}
              onChange={(e) => e.target.blur()}
            >
              <option value="">Выберите рейтинг</option>
              {ratings.map((rating) => (
                <option key={rating} value={rating}>{rating}</option>
              ))}
            </select>
            <span
              className={`${styles.arrow} ${openSelect.rating ? styles.arrowOpen : ""}`}
            ></span>
          </div>
        </form>
        <form className={`${styles.category} ${styles[theme]}`} id="countryFilter">
          <label htmlFor="country">Страна</label>
          <div className={styles.selectWrapper}>
            <select
              id="country"
              onFocus={() => handleFocus("country")}
              onBlur={() => handleBlur("country")}
              onChange={(e) => e.target.blur()}
            >
              <option value="">Выберите страну</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <span
              className={`${styles.arrow} ${openSelect.country ? styles.arrowOpen : ""}`}
            ></span>
          </div>
        </form>
        <form className={`${styles.category} ${styles[theme]}`} id="yearFilter">
          <label htmlFor="year">Год выпуска</label>
          <div className={styles.selectWrapper}>
            <select
              id="year"
              onFocus={() => handleFocus("year")}
              onBlur={() => handleBlur("year")}
              onChange={(e) => e.target.blur()}
            >
              <option value="">Выберите год</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <span
              className={`${styles.arrow} ${openSelect.year ? styles.arrowOpen : ""}`}
            ></span>
          </div>
        </form>
      </div>
    </div>
  );
};