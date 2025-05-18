import React, { useState } from "react";
import styles from "./Filter.module.css";
import { useTheme } from "../../context/Theme/themeContext";

export const Filter = () => {
  const { theme } = useTheme();

  // Состояния для каждого select
  const [openSelect, setOpenSelect] = useState({
    genre: false,
    rating: false,
    country: false,
    year: false,
  });

  // Функции для открытия/закрытия
  const handleFocus = (name) => setOpenSelect((prev) => ({ ...prev, [name]: true }));
  const handleBlur = (name) => setOpenSelect((prev) => ({ ...prev, [name]: false }));

  return (
    <div className={`${styles.mainLeft} ${styles[theme]}`}>
      <div className={`${styles.filterHeader} ${styles[theme]}`}>
        <h1>Фильтр</h1>
      </div>
      <div className={styles.filter}>
        <form className={`${styles.category} ${styles[theme]}`} id="genreFilter">
          <label htmlFor="genre">Жанр</label>
          <div className={styles.selectWrapper}>
            <select
              id="genre"
              onFocus={() => handleFocus("genre")}
              onBlur={() => handleBlur("genre")}
              onChange={e => e.target.blur()}
            >
              <option value="action">Боевик</option>
              <option value="comedy">Комедия</option>
              <option value="drama">Драма</option>
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
              onChange={e => e.target.blur()}
            >
              <option value="action">Боевик</option>
              <option value="comedy">Комедия</option>
              <option value="drama">Драма</option>
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
              onChange={e => e.target.blur()}
            >
              <option value="action">Боевик</option>
              <option value="comedy">Комедия</option>
              <option value="drama">Драма</option>
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
              onChange={e => e.target.blur()}
            >
              <option value="action">Боевик</option>
              <option value="comedy">Комедия</option>
              <option value="drama">Драма</option>
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