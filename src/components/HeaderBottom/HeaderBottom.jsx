import React from "react";
import styles from "./HeaderBottom.module.css";

export const HeaderBottom = () => {
  return (
    <div className={styles.headerBottom}>
      <div className={styles.headerArrow}>
        <img src="/src/assets/svg/left-arrow.svg" alt="Стрелка" />
      </div>
      <div className={styles.headerBottomLeft}>
        <h1>Что сегодня посмотреть?</h1>
      </div>
      <div className={styles.headerBottomRight}></div>
    </div>
  );
};
