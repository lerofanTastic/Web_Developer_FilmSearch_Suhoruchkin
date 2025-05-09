import React from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <div className={styles.headerTop}>
        <div className={styles.headerLeft}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link-active" : "nav-link"
            }
          >
            <img src="/src/assets/img/logo.png" alt="Логотип" />
          </NavLink>
        </div>
        <div className={styles.headerCenter}>
          <nav>
            <input
              type="checkbox"
              id="burgerCheckbox"
              className={styles.burgerCheckbox}
            />
            <label for="burgerCheckbox" className={styles.burger}></label>
            <ul className={styles.menuList}>
              <li className={styles.list}>
                <NavLink
                  to="/movie"
                  className={({ isActive }) =>
                    isActive ? "nav-link-active" : "nav-link"
                  }
                >
                  <div className={styles.menuItem}>Фильмы</div>
                </NavLink>
              </li>
              <li className={styles.list}>
                <NavLink
                  to="/series"
                  className={({ isActive }) =>
                    isActive ? "nav-link-active" : "nav-link"
                  }
                >
                  <div className={styles.menuItem}>Сериалы</div>
                </NavLink>
              </li>
              <li className={styles.listTheme}>
                <p>Светлая тема</p>
                <input type="checkbox" className={styles.themeCheckbox} />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
