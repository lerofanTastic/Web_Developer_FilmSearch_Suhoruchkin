import React from "react";
import styles from "./Reviews.module.css";
import { useTheme } from "../../context/Theme/themeContext";

export const Reviews = ({ reviews = [] }) => {
  const { theme, isMobile } = useTheme();

  if (!reviews || reviews.length === 0) {
    return (
      <div className={`${styles.reviews} ${styles[theme]}`}>
        <h1>Рецензии зрителей</h1>
        <p>Нет рецензий</p>
      </div>
    );
  }

  const starSrc =
    isMobile || theme === "light"
      ? "/src/assets/svg/star-black.svg"
      : "/src/assets/svg/star-white.svg";
  const starTransSrc =
    isMobile || theme === "light"
      ? "/src/assets/svg/star-black-trans.svg"
      : "/src/assets/svg/star-white-trans.svg";

  return (
    <div className={`${styles.reviews} ${styles[theme]}`}>
      <h1>Рецензии зрителей</h1>
      <div className={styles.reviewsContainer}>
        {reviews.map((review, idx) => {
          let stars = 0;
          if (typeof review.rating === "number" && review.rating > 0) {
            stars = review.rating;
          } else if (review.type === "Позитивный") {
            stars = 8;
          } else if (review.type === "Негативный") {
            stars = 4;
          }

          return (
            <div className={`${styles.reviewBox} ${styles[theme]}`} key={idx}>
              <h2>{review.author || "Аноним"}</h2>
              <div className={styles.blackStarContainer}>
                {stars > 0 ? (
                  Array.from({ length: 10 }).map((_, index) => (
                    <img
                      key={index}
                      className={styles.starWrapper}
                      src={index < stars ? starSrc : starTransSrc}
                      alt="Star"
                    />
                  ))
                ) : (
                  <span className={styles.noRating}>Нет оценки</span>
                )}
              </div>
              <p>{review.review || review.title || ""}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
