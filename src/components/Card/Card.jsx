// import React, { useEffect, useState } from "react";
// import { fetchFilmById } from "../../constants/api";
import styles from "./Card.module.css";

export const Card = ({
  title = "No Title :(",
  image = "No Image :(",
  rating = "No Rating :(",
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.rating}>
        <p>{rating}</p>
      </div>
      <div className={styles.poster}>
        <img className={styles.posterImage} src={image} alt="Постер 1" />
      </div>
      <div className={styles.title}>
        <p>{title}</p>
      </div>
    </div>
  );
};
