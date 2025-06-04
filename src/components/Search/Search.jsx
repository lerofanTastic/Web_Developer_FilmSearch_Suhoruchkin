import React, { useState, useRef, useEffect } from "react";
import styles from "./Search.module.css";
import { searchMovies } from "../../api/kinopoiskApi";
import { Card } from "../Card/Card";
import { Link } from "react-router-dom";
import { Loading } from "../Loading/Loading";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef(null);

  const handleInput = (e) => setQuery(e.target.value);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);
    try {
      const data = await searchMovies(query);
      setResults(data.docs || []);
      setShowResults(true);
    } catch (err) {
      setError("Ошибка поиска");
    } finally {
      setLoading(false);
    }
  };

  // Скрытие результатов по клику вне блока
  useEffect(() => {
    if (!showResults) return;
    const handleClickOutside = (event) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showResults]);

  return (
    <div className={styles.search}>
      <form className={styles.searchBar} onSubmit={handleSearch}>
        <div>
          <img
            className={styles.searchBarIcon}
            src="/src/assets/svg/lupa.svg"
            alt="Поиск"
          />
        </div>
        <div>
          <input
            type="search"
            className={styles.input}
            placeholder="Что сегодня посмотреть?"
            name="searchBar"
            value={query}
            onChange={handleInput}
            onFocus={() => results.length > 0 && setShowResults(true)}
          />
        </div>
        <button className={styles.button} type="submit" disabled={loading}>
          Найти
        </button>
      </form>
      
      {error && <div style={{ color: "red" }}>{error}</div>}
      {showResults && results.length > 0 && (
        <div className={styles.results} ref={resultsRef}>
          {loading && <Loading />}
          {results.map((movie) => (
            <div className={styles.resultItem} key={movie.id || movie._id}>
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <Card
                  title={movie.name}
                  image={movie.poster?.url}
                  rating={movie.rating?.kp}
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};