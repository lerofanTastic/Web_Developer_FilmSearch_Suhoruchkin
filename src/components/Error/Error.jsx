import React from "react";
import styles from "./Error.module.css";
import { useTheme } from "../../context/Theme/themeContext";

export const Error = () => {
  const { theme } = useTheme();
  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <div className={`${styles.logo} ${styles[theme]}`}>
        <h1>404</h1>
      </div>
      <div className={`${styles.text} ${styles[theme]}`}>
        <p>Этой страницы не существует, вернитесь на главную.</p>
      </div>
    </div>
  );
};
