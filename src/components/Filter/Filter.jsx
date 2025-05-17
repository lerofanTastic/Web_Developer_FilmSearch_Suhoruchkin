import React from 'react'
import styles from "./Filter.module.css"
import { useTheme } from "../../context/Theme/themeContext";

export const Filter = () => {
  const { theme } = useTheme();
  return (
    <div className={`${styles.mainLeft} ${styles[theme]}`}>
          <div className={styles.filterHeader}>
            <h1>Фильтр</h1>
          </div>
          <div className={styles.filter}>
            <form className={`${styles.category} ${styles[theme]}`} id="genreFilter">
              <label for="genre">Жанр</label>
              <select id="genre">
                <option value="action">Боевик</option>
                <option value="comedy">Комедия</option>
                <option value="drama">Драма</option>
              </select>
            </form>
            <form className={`${styles.category} ${styles[theme]}`} id="ratingFilter">
              <label for="rating">Рейтинг</label>
              <select id="rating">
                <option value="action">Боевик</option>
                <option value="comedy">Комедия</option>
                <option value="drama">Драма</option>
              </select>
            </form>
            <form className={`${styles.category} ${styles[theme]}`} id="countryFilter">
              <label for="country">Страна</label>
              <select id="country">
                <option value="action">Боевик</option>
                <option value="comedy">Комедия</option>
                <option value="drama">Драма</option>
              </select>
            </form>
            <form className={`${styles.category} ${styles[theme]}`} id="yearFilter">
              <label for="year">Год выпуска</label>
              <select id="year">
                <option value="action">Боевик</option>
                <option value="comedy">Комедия</option>
                <option value="drama">Драма</option>
              </select>
            </form>
          </div>
        </div>
  )
}
