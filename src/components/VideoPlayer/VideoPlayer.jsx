import React, { useRef, useState, useEffect } from "react";
import styles from "./VideoPlayer.module.css";
import { useTheme } from "../../context/Theme/themeContext";

export const VideoPlayer = ({ trailer }) => {
  const videoRef = useRef(null);

  const isYouTube = trailer && trailer.includes("youtube.com");
  const { theme } = useTheme();

  return (
    <div className={styles.videoContainer}>
      <div className={`${styles.trailerHeader} ${styles[theme]}`}>
        <h1>Трейлер</h1>
      </div>
      {isYouTube ? (
        <iframe
          src={trailer}
          title="Трейлер"
          width="560"
          height="315"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className={styles.video}
        />
      ) : (
        <video
          ref={videoRef}
          src={trailer}
          controls={false}
          className={styles.video}
        />
      )}
    </div>
  );
};
