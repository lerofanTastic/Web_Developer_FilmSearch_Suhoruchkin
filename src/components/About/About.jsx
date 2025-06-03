import React from "react";
import styles from "./About.module.css";
import { Card } from "../Card/Card.jsx";
import { useParams } from "react-router-dom";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer.jsx";
import { GalleryCarousel } from "../GalleryCarousel/GalleryCarousel.jsx";
import { useTheme } from "../../context/Theme/themeContext";
import { Reviews } from "../Reviews/Reviews.jsx";

export const About = ({ movie }) => {
  const { theme } = useTheme();

  if (!movie) return <div>Нет данных</div>;

  const displayTitle = movie.name || movie.alternativeName || "Нет названия";
  const displayGenre =
    movie.genres?.map((g) => g.name).join(", ") || "Нет жанра";
  const displayCountry =
    movie.countries?.map((c) => c.name).join(", ") || "Нет страны";
  const displayActors =
    movie.persons
      ?.filter((p) => p.profession === "актеры")
      .map((p) => p.name)
      .join(", ") || "Нет актёров";
  const displayWriters =
    movie.persons
      ?.filter((p) => p.profession === "режиссеры")
      .map((p) => p.name)
      .join(", ") || "Нет режиссёров";
  const displayDate = movie.year || "Нет даты";
  const displayAge = movie.ageRating ? `${movie.ageRating}+` : "Нет данных";

  return (
    <div className={`${styles.main} ${styles[theme]}`}>
      <div className={styles.bigCard}>
        <div className={`${styles.mainHeaderMob} ${styles[theme]}`}>
          <h1>{displayTitle}</h1>
        </div>
        <div className={styles.poster}>
          <Card title="" image={movie.poster?.url} rating={movie.rating?.kp} />
        </div>
        <div className={`${styles.description} ${styles[theme]}`}>
          <h1>{displayTitle}</h1>
          <h2>О фильме</h2>
          <div className={styles.information}>
            <div className={styles.informationType}>
              <div className={styles.typeFirst}>Жанр</div>
              <div className={`${styles.typeSecond} ${styles[theme]}`}>
                {displayGenre}
              </div>
            </div>
            <div className={styles.informationType}>
              <div className={styles.typeFirst}>Страна производства</div>
              <div className={`${styles.typeSecond} ${styles[theme]}`}>
                {displayCountry}
              </div>
            </div>
            <div className={styles.informationType}>
              <div className={styles.typeFirst}>Актёры</div>
              <div className={`${styles.typeSecond} ${styles[theme]}`}>
                {displayActors}
              </div>
            </div>
            <div className={styles.informationType}>
              <div className={styles.typeFirst}>Режиссёры</div>
              <div className={`${styles.typeSecond} ${styles[theme]}`}>
                {displayWriters}
              </div>
            </div>
            <div className={styles.informationType}>
              <div className={styles.typeFirst}>Дата релиза</div>
              <div className={`${styles.typeSecond} ${styles[theme]}`}>
                {displayDate}
              </div>
            </div>
            <div className={styles.informationType}>
              <div className={styles.typeFirst}>Возрастное ограничение</div>
              <div className={`${styles.typeSecond} ${styles[theme]}`}>
                {displayAge}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
