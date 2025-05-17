import React, { useState } from "react";
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
  // trailer = "No Trailer :(",
  genre = "No Genre :(",
  country = "No Country :(",
  actors = "No Actors :(",
  writers = "No Writers :(",
  date = "No Date :(",
  age = "No Age :(",
}) => {
  const { theme } = useTheme();
  const { id } = useParams(); // Получаем id из параметров маршрута
  const aboutAnime = topAnime.find((anime) => anime.id === parseInt(id)); // Ищем элемент по id

  if (!aboutAnime) {
    return <div>Элемент с указанным ID не найден</div>;
  }

  return (
    <main className={`${styles.main} ${styles[theme]}`}>
      <div className={styles.wrapper}>
        <div className={styles.bigCard}>
          <div className={styles.mainHeaderMob}>
            <h1>{title}</h1>
          </div>
          <div className={styles.poster}>
            <Card
              title=""
              image={aboutAnime.image}
              rating={aboutAnime.rating}
            />
          </div>

          <div className={`${styles.description} ${styles[theme]}`}>
            <h1>{title}</h1>
            <h2>О фильме</h2>
            <div className={styles.information}>
              <div className={styles.informationType}>
                <div className={styles.typeFirst}>Жанр</div>
                <div className={`${styles.typeSecond} ${styles[theme]}`}>
                  {genre}
                </div>
              </div>
              <div className={styles.informationType}>
                <div className={styles.typeFirst}>Страна производства</div>
                <div className={`${styles.typeSecond} ${styles[theme]}`}>
                  {country}
                </div>
              </div>
              <div className={styles.informationType}>
                <div className={styles.typeFirst}>Актёры</div>
                <div className={`${styles.typeSecond} ${styles[theme]}`}>
                  {actors}
                </div>
              </div>
              <div className={styles.informationType}>
                <div className={styles.typeFirst}>Режиссёры</div>
                <div className={`${styles.typeSecond} ${styles[theme]}`}>
                  {writers}
                </div>
              </div>
              <div className={styles.informationType}>
                <div className={styles.typeFirst}>Дата релиза</div>
                <div className={`${styles.typeSecond} ${styles[theme]}`}>
                  {date}
                </div>
              </div>
              <div className={styles.informationType}>
                <div className={styles.typeFirst}>Возрастное ограничение</div>
                <div className={`${styles.typeSecond} ${styles[theme]}`}>
                  {age}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.trailer} ${styles[theme]}`}>
          <h1>Трейлер</h1>
          <VideoPlayer />
        </div>
        <div className={`${styles.gallery} ${styles[theme]}`}>
          <div className={styles.galleryTop}>
            <div className={styles.galleryHeader}>
              <h1>Галерея</h1>
            </div>
            <div className={styles.galleryArrows}>
              <img src="/src/assets/svg/left-arrow.svg" alt="Left Arrow" />
              <img src="/src/assets/svg/right-arrow.svg" alt="Right Arrow" />
            </div>
          </div>
          <GalleryCarousel src={aboutAnime.src} />
        </div>
        <Reviews />
      </div>
    </main>
  );
};
