import React from "react";
import styles from "./Card.module.css";

export const Card = ({
  title = "No Title :(",
  image = "No Image :(",
  rating = "No Rating :(",
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.rating}>
        <p>{rating.toFixed(1)}</p>
      </div>
      <div className={styles.poster}>
        <img
          className={styles.posterImage}
          src={image}
          alt={title !== "No Title :(" ? `Постер: ${title}` : "Постер"}
        />
      </div>
      <div className={styles.title}>
        <p>{title}</p>
      </div>
    </div>
  );
};
