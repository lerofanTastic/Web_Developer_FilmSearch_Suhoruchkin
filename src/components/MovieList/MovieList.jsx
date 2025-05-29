import React, { useState, useEffect } from "react";
import { Card } from "../Card/Card";
import styles from "./MovieList.module.css";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/Theme/themeContext";
import { searchMoviesByFilters } from "../../api/kinopoiskApi";

export const MovieList = ({ genre, country, rating, year }) => {
  const { theme } = useTheme();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 720);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
  }, [isMobile, genre, country, rating, year]);

  useEffect(() => {
    setLoading(true);
    searchMoviesByFilters({
      genre,
      country,
      rating,
      year,
      page: 1,
      limit: 9,
    })
      .then(data => setMovies(data.docs || []))
      .finally(() => setLoading(false));
  }, [genre, country, rating, year]);

  const handlePrev = () => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  const handleNext = () =>
    setCurrentIndex((prev) =>
      prev < movies.length - 1 ? prev + 1 : movies.length - 1
    );

  // Для мобильной версии показываем только одну карточку
  const visibleMovies = isMobile
    ? [movies[currentIndex]].filter(Boolean)
    : movies;

  return (
    <div className={`${styles.mainRight} ${styles[theme]}`}>
      <div className={styles.mainRightTop}>
        <div className={`${styles.mainRightTopHeader} ${styles[theme]}`}>
          <h1>Фильмы</h1>
        </div>
      </div>
      <div className={styles.mainCards}>
        {loading && <div>Загрузка...</div>}
        {isMobile && currentIndex > 0 && (
          <img
            className={`${styles.arrow} ${styles.left} ${styles[theme]}`}
            alt="Left Arrow"
            onClick={handlePrev}
          />
        )}
        {visibleMovies.map(
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
        {isMobile && currentIndex < movies.length - 1 && (
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