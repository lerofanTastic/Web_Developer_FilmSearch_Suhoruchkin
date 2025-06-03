import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer>
      <div className={styles.footer}>
        <div className={styles.footerLeft}>
          <p>©️ 2025 Сухоручкин Егор</p>
        </div>
        <div className={styles.footerRight}>
          <div className={styles.footerRightTop}>
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className={styles.svgWrapper}
                src="/src/assets/svg/telegram.svg"
                alt="Telegram"
              />
            </a>
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className={styles.svgWrapper}
                src="/src/assets/svg/vk.svg"
                alt="VK"
              />
            </a>
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className={styles.svgWrapper}
                src="/src/assets/svg/dzen.svg"
                alt="Dzen"
              />
            </a>
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className={styles.svgWrapper}
                src="/src/assets/svg/youtube.svg"
                alt="YouTube"
              />
            </a>
          </div>
          <div className={styles.footerRightBottom}>
            <p>thanks</p>
            <Link to="/thanks">
              <img
                className={styles.svgWrapper}
                src="/src/assets/svg/heart.svg"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
