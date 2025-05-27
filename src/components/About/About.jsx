import React from "react";
import styles from "./About.module.css";
import { topAnime } from "../../constants/topAnime.js";
import { Card } from "../Card/Card.jsx";
import { useParams } from "react-router-dom";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer.jsx";
import { GalleryCarousel } from "../GalleryCarousel/GalleryCarousel.jsx";
import { useTheme } from "../../context/Theme/themeContext";
import { Reviews } from "../Reviews/Reviews.jsx";

export const About = ({
  title = "No Title :(",
  genre = "No Genre :(",
  country = "No Country :(",
  actors = "No Actors :(",
  writers = "No Writers :(",
  date = "No Date :(",
  age = "No Age :(",
}) => {
  const { theme } = useTheme();
  const { id } = useParams();
  const aboutAnime = topAnime.find((anime) => anime.id === parseInt(id));

  if (!aboutAnime) {
    return <div>Элемент с указанным ID не найден</div>;
  }

  // Используем данные из aboutAnime, если они есть
  const displayTitle = aboutAnime.title || title;
  const displayGenre = aboutAnime.genre || genre;
  const displayCountry = aboutAnime.country || country;
  const displayActors = aboutAnime.actors || actors;
  const displayWriters = aboutAnime.writers || writers;
  const displayDate = aboutAnime.date || date;
  const displayAge = aboutAnime.age || age;

  return (
    <div className={`${styles.main} ${styles[theme]}`}>
      <div className={styles.bigCard}>
        <div className={`${styles.mainHeaderMob} ${styles[theme]}`}>
          <h1>{displayTitle}</h1>
        </div>
        <div className={styles.poster}>
          <Card title="" image={aboutAnime.image} rating={aboutAnime.rating} />
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
      <div className={`${styles.trailer} ${styles[theme]}`}>
        <div className={styles.trailerHeader}>
          <h1>Трейлер</h1>
        </div>
        <VideoPlayer />
      </div>
      <div className={`${styles.gallery} ${styles[theme]}`}>
        <div className={styles.galleryTop}>
          <div className={styles.galleryHeader}>
            <h1>Галерея</h1>
          </div>
          <div className={styles.galleryArrows}>
            <img
              className={`${styles.galleryArrowLeft} ${styles[theme]}`}
              alt="Left Arrow"
              src={
                theme === "dark"
                  ? "/src/assets/svg/left-arrow.svg"
                  : "/src/assets/svg/left-arrow-black.svg"
              }
            />
            <img
              className={`${styles.galleryArrowRight} ${styles[theme]}`}
              alt="Right Arrow"
              src={
                theme === "dark"
                  ? "/src/assets/svg/right-arrow.svg"
                  : "/src/assets/svg/right-arrow-black.svg"
              }
            />
          </div>
        </div>
        <GalleryCarousel src={aboutAnime.src} />
      </div>
      <Reviews />
    </div>
  );
};
