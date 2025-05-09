import React from "react";
import styles from "./Search.module.css"

export const Search = () => {
  return (
    <div className={styles.search}>
      <div className={styles.searchBar}>
        <div>
          <img className={styles.searchBarIcon} src="/src/assets/svg/lupa.svg" alt="Поиск" />
        </div>
        <div>
          <input
            type="search"
            className={styles.input}
            placeholder="Что сегодня посмотреть?"
            name="searchBar"
          />
        </div>
        <button className={styles.button}>Найти</button>
      </div>
    </div>
  );
};
