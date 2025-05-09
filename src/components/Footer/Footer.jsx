import React from 'react'
import styles from "./Footer.module.css"

export const Footer = () => {
  return (
    <footer>
      <div className={styles.footer}>
        <div className={styles.footerLeft}><p>©️ 2025 Сухоручкин Егор</p></div>
        <div className={styles.footerRight}>
          <img className={styles.svgWrapper} src="/src/assets/svg/telegram.svg" alt="Telegram" />
          <img className={styles.svgWrapper} src="/src/assets/svg/vk.svg" alt="VK" />
          <img className={styles.svgWrapper} src="/src/assets/svg/dzen.svg" alt="Dzen" />
          <img className={styles.svgWrapper} src="/src/assets/svg/youtube.svg" alt="YouTube" />
        </div>
      </div>
    </footer>
  )
}
