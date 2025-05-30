import React, { useState, useEffect } from "react";
import { Card } from "../Card/Card";
import styles from "./Carousel.module.css";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/Theme/themeContext";
import { getSixMovies } from "../../api/kinopoiskApi";

export const Carousel = () => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 720);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
  }, [isMobile]);

  // Загрузка 6 случайных фильмов
  useEffect(() => {
  setLoading(true);
  getSixMovies()
    .then(films => {
      setMovies(films);
    })
    .finally(() => setLoading(false));
}, []);

  const cardsToShow = isMobile ? 1 : 3;
  const maxIndex = Math.max(0, movies.length - cardsToShow);

  useEffect(() => {
    if (currentIndex > maxIndex) setCurrentIndex(maxIndex);
    if (currentIndex < 0) setCurrentIndex(0);
  }, [maxIndex, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < maxIndex ? prevIndex + 1 : maxIndex
    );
  };

  // Формируем массив карточек для отображения
  let visibleCards = [];
  if (movies.length > 0) {
    if (isMobile) {
      visibleCards = [movies[Math.min(currentIndex, movies.length - 1)]];
    } else {
      visibleCards = movies.slice(currentIndex, currentIndex + cardsToShow);
      if (visibleCards.length < cardsToShow) {
        visibleCards = [
          ...visibleCards,
          ...movies.slice(0, cardsToShow - visibleCards.length),
        ];
      }
    }
  }

  if (loading) return <div>Загрузка...</div>;

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
            (movie) =>
              movie && (
                <Link to={`/movie/${movie.id}`} key={movie.id}>
                  <Card
                    key={movie.id}
                    title={movie.name}
                    image={movie.poster?.url}
                    rating={movie.rating?.kp}
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