import React, { useState, useEffect, useRef } from "react";
import { Card } from "../Card/Card";
import styles from "../MovieList/MovieList.module.css";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/Theme/themeContext";
import { getNineSeries, universalSeriesSearch } from "../../api/kinopoiskApi";

export const SeriesList = ({ genre, country, rating, year }) => {
  const { theme } = useTheme();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const hasFilters =
    genre !== "" || country !== "" || rating !== "" || year !== "";
  const cacheRef = useRef({});

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 720);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
  }, [isMobile, genre, country, rating, year]);
  useEffect(() => {
    setPage(1);
  }, [genre, country, rating, year]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    const cacheKey = JSON.stringify({ genre, country, rating, year, page });

    if (cacheRef.current[cacheKey]) {
      setMovies(cacheRef.current[cacheKey].movies);
      setPages(cacheRef.current[cacheKey].pages);
      setLoading(false);
      return;
    }

    const fetchMovies = hasFilters
      ? universalSeriesSearch({
          genre,
          country,
          rating,
          year,
          page,
          limit: 9,
        })
      : getNineSeries();

    Promise.resolve(fetchMovies)
      .then((data) => {
        let moviesArr = [];
        let totalPages = 1;
        if (hasFilters) {
          if (Array.isArray(data?.docs)) moviesArr = data.docs;
          else if (Array.isArray(data)) moviesArr = data;
          totalPages = data?.pages || 1;
          setPages(totalPages);
        } else {
          const unique = [];
          const ids = new Set();
          for (const film of data) {
            if (film && film.id && !ids.has(film.id)) {
              unique.push(film);
              ids.add(film.id);
            }
          }
          moviesArr = unique;
          setPages(1);
        }
        cacheRef.current[cacheKey] = { movies: moviesArr, pages: totalPages };
        setMovies(moviesArr);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [genre, country, rating, year, page]);

  const handlePrev = () => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  const handleNext = () =>
    setCurrentIndex((prev) =>
      prev < movies.length - 1 ? prev + 1 : movies.length - 1
    );

  const visibleMovies = isMobile
    ? [movies[currentIndex]].filter(Boolean)
    : movies;

  const getPagination = () => {
    const arr = [];
    // Начальная страница для диапазона
    let start = Math.max(1, page - 2);
    // Конечная страница для диапазона
    let end = Math.min(pages, page + 2);

    // Если не хватает страниц слева, добавляем справа
    if (page <= 2) {
      end = Math.min(pages, 5);
    }
    // Если не хватает страниц справа, добавляем слева
    if (page >= pages - 1) {
      start = Math.max(1, pages - 4);
    }

    for (let i = start; i <= end; i++) {
      arr.push(i);
    }
    return arr;
  };

  const pageNumbers = getPagination();
  return (
    <div className={`${styles.mainRight} ${styles[theme]}`}>
      <div className={styles.mainRightTop}>
        <div className={`${styles.mainRightTopHeader} ${styles[theme]}`}>
          <h1>Сериалы</h1>
        </div>
        <div className={styles.pagination}>
          {hasFilters && pages > 1 && (
            <div className={styles.pagesRow}>
              {pageNumbers.map((p, idx) =>
                p === "..." ? (
                  <span key={`ellipsis-${idx}`} className={styles.ellipsis}>
                    ...
                  </span>
                ) : (
                  <button
                    key={p}
                    className={p === page ? styles.activePage : ""}
                    onClick={() => setPage(p)}
                    disabled={p === page}
                  >
                    {p}
                  </button>
                )
              )}
            </div>
          )}
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
          (movie, idx) =>
            movie && (
              <Link to={`/movie/${movie.id || idx}`} key={movie.id || idx}>
                <Card
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
