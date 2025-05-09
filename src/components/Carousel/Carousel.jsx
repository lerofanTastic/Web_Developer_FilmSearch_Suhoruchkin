import React, { useState } from "react";
import { Card } from "../Card/Card";
import styles from "./Carousel.module.css";
import { topAnime } from "../../constants/topAnime.js";
import { Link } from "react-router-dom";

export const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? topAnime.length - 3 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === topAnime.length - 3 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={styles.main}>
      <div className={styles.btn}>
        <button
          className={`${styles.arrow} ${styles.left}`}
          onClick={handlePrev}
        >
          &#8249;
        </button>
      </div>

      <div className={styles.carouselContainer}>
        <div
          className={styles.carousel}
          style={{
            transform: `translateX(-${currentIndex * (100 / 3)}%)`, // Смещение карусели
          }}
        >
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
      <div className={styles.btn}>
        <button
          className={`${styles.arrow} ${styles.right}`}
          onClick={handleNext}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};
