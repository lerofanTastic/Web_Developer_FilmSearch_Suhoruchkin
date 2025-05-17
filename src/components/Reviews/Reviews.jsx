import React from "react";
import styles from "./Reviews.module.css";
import { useTheme } from "../../context/Theme/themeContext";
import { topAnime } from "../../constants/topAnime.js";
import { useParams } from "react-router-dom";

export const Reviews = () => {
  const { theme } = useTheme();
  const { id } = useParams();
  const aboutAnime = topAnime.find((anime) => anime.id === parseInt(id));

  if (!aboutAnime) {
    return <div>Элемент с указанным ID не найден</div>;
  }

  // Проверяем, есть ли отзывы
  const reviewNames = aboutAnime.reviewName || [];
  const reviewStars = aboutAnime.stars || [];
  const reviewTexts = aboutAnime.reviewText || [];

  return (
    <div className={`${styles.reviews} ${styles[theme]}`}>
      <h1>Рецензии зрителей</h1>
      <div className={styles.reviewsContainer}>
        {reviewNames.map((name, idx) => (
          <div className={`${styles.reviewBox} ${styles[theme]}`} key={idx}>
            <h2>{name}</h2>
            {theme === "dark" ? (
              <div className={styles.whiteStarContainer}>
                {Array.from({ length: 10 }).map((_, index) => (
                  <img
                    key={index}
                    className={styles.starWrapper}
                    src={
                      index < (Array.isArray(reviewStars) ? reviewStars[idx] : reviewStars)
                        ? "/src/assets/svg/star-white.svg"
                        : "/src/assets/svg/star-white-trans.svg"
                    }
                    alt="Star"
                  />
                ))}
              </div>
            ) : (
              <div className={styles.blackStarContainer}>
                {Array.from({ length: 10 }).map((_, index) => (
                  <img
                    key={index}
                    className={styles.starWrapper}
                    src={
                      index < (Array.isArray(reviewStars) ? reviewStars[idx] : reviewStars)
                        ? "/src/assets/svg/star-black.svg"
                        : "/src/assets/svg/star-black-trans.svg"
                    }
                    alt="Star"
                  />
                ))}
              </div>
            )}
            <p>{reviewTexts[idx]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};