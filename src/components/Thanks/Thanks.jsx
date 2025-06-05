import React from "react";
import styles from "./Thanks.module.css";
import { thanksData } from "/src/constants/thanksData.js";
import { useTheme } from "../../context/Theme/themeContext";

export const Thanks = () => {
  const { theme } = useTheme();
  return (
    <div className={`${styles.wrapper} ${styles[theme]}`}>
      <div className={`${styles.text} ${styles[theme]}`}>
        <h1>Отдельное спасибо ребятам за помощь с лимитом API</h1>
      </div>
      <div className={styles.blocks}>
        {thanksData.map((person, idx) => (
          <div className={styles.person} key={idx}>
            <div className={`${styles.avatar} ${styles[theme]}`}>
              <img src={person.img} alt={person.name} />
            </div>
            <div className={`${styles.name} ${styles[theme]}`}>
              <p>{person.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
