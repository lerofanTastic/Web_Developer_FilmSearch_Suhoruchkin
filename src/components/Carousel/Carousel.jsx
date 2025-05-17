import React, { useState, useEffect } from "react";
import { Card } from "../Card/Card";
import styles from "./Carousel.module.css";
import { topAnime } from "../../constants/topAnime.js";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/Theme/themeContext";

export const Carousel = () => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 720);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Сброс currentIndex при смене режима (desktop/mobile)
  useEffect(() => {
    setCurrentIndex(0);
  }, [isMobile]);

  const cardsToShow = isMobile ? 1 : 3;
  const maxIndex = Math.max(0, topAnime.length - cardsToShow);

  useEffect(() => {
    if (currentIndex > maxIndex) setCurrentIndex(maxIndex);
    if (currentIndex < 0) setCurrentIndex(0);
  }, [maxIndex, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : 0
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < maxIndex ? prevIndex + 1 : maxIndex
    );
  };

  // Корректное формирование массива карточек для отображения
  let visibleCards = [];
  if (topAnime.length > 0) {
    if (isMobile) {
      visibleCards = [topAnime[Math.min(currentIndex, topAnime.length - 1)]];
    } else {
      visibleCards = topAnime.slice(currentIndex, currentIndex + cardsToShow);
      if (visibleCards.length < cardsToShow) {
        visibleCards = [
          ...visibleCards,
          ...topAnime.slice(0, cardsToShow - visibleCards.length),
        ];
      }
    }
  }

  return (
    <div className={styles.main}>
      {currentIndex > 0 && (
        <div className={styles.btn}>
          <img
            className={`${styles.arrow} ${styles.left} ${styles[theme]}`}
            alt="Left Arrow"
            onClick={handlePrev}
          />
        </div>
      )}

      <div className={styles.carouselContainer}>
        <div
          className={styles.carousel}
          style={{
            transform: `translateX(0)`,
            width: isMobile ? "100%" : "auto",
          }}
        >
          {visibleCards.map(
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
        </div>
      </div>
      {currentIndex < maxIndex && (
        <div className={styles.btn}>
          <img
            className={`${styles.arrow} ${styles.right} ${styles[theme]}`}
            alt="Right Arrow"
            onClick={handleNext}
          />
        </div>
      )}
    </div>
  );
};