import React, { useState, useEffect } from "react";
import { Card } from "../Card/Card";
import styles from "../MovieList/MovieList.module.css";
import { Link } from "react-router-dom";
import { topAnime } from "../../constants/topAnime.js";
import { useTheme } from "../../context/Theme/themeContext";

export const SeriesList = () => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 720);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
  }, [isMobile]);

  const handlePrev = () => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  const handleNext = () =>
    setCurrentIndex((prev) =>
      prev < topAnime.length - 1 ? prev + 1 : topAnime.length - 1
    );

  // Для мобильной версии показываем только одну карточку
  const visibleMovies = isMobile
    ? [topAnime[currentIndex]].filter(Boolean)
    : topAnime;

  return (
    <div className={`${styles.mainRight} ${styles[theme]}`}>
      <div className={styles.mainRightTop}>
        <div className={`${styles.mainRightTopHeader} ${styles[theme]}`}>
          <h1>Сериалы</h1>
        </div>
        <div className={`${styles.mainRightTopPages} ${styles[theme]}`}>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
        </div>
      </div>
      <div className={styles.mainCards}>
        {isMobile && currentIndex > 0 && (
          <img
            className={`${styles.arrow} ${styles.left} ${styles[theme]}`}
            alt="Left Arrow"
            onClick={handlePrev}
          />
        )}
        {visibleMovies.map(
          (anime) =>
            anime && (
              <Link to={`/movie/${anime.id}`} key={anime.id}>
                <Card
                  key={anime.id}
                  title={anime.title}
                  image={anime.image}
                  rating={anime.rating}
                />
              </Link>
            )
        )}
        {isMobile && currentIndex < topAnime.length - 1 && (
          <img
            className={`${styles.arrow} ${styles.right} ${styles[theme]}`}
            alt="Right Arrow"
            onClick={handleNext}
          />
        )}
      </div>
    </div>
  );
};
