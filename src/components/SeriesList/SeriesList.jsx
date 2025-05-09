import React from "react";
// import { films } from "../../constants/films";
import { Card } from "../Card/Card";
import styles from "../MovieList/MovieList.module.css";
import { topAnime } from "../../constants/topAnime.js";
import { Link } from "react-router-dom";

export const SeriesList = () => {
  return (
    <div className={styles.mainRight}>
      <div className={styles.mainRightTop}>
        <div className={styles.mainRightTopHeader}>
          <h1>Сериалы</h1>
        </div>
        <div className={styles.mainRightTopPages}>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
        </div>
      </div>
      <div className={styles.mainCards}>
        {topAnime.map((anime) => (
          <Link to={`/movie/${anime.id}`} key={anime.id}>
            <Card
              key={anime.id}
              title={anime.title}
              image={anime.image}
              rating={anime.rating}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
