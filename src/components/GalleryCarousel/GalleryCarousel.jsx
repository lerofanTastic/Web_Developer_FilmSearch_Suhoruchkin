import React, { useEffect, useState } from "react";
import styles from "./GalleryCarousel.module.css";
import { useTheme } from "../../context/Theme/themeContext";

export const GalleryCarousel = ({ src }) => {
  const { theme} = useTheme();
  const [isMobile] = useState(window.innerWidth <= 768);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log("Полученные изображения:", src);
  }, [src]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= src.length ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? src.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.galleryContainer}>
      <div className={`${styles.galleryHeader} ${styles[theme]}`}>
        <h1>Галерея</h1>
        {isMobile && (
          <div className={styles.mobileArrows}>
            {currentIndex > 0 && (
              <img
                className={`${styles.arrowLeft} ${styles[theme]}`}
                alt="Left Arrow"
                onClick={handlePrev}
              />
            )}
            {currentIndex + 2 < src.length && (
              <img
                className={`${styles.arrowRight} ${styles[theme]}`}
                alt="Right Arrow"
                onClick={handleNext}
              />
            )}
          </div>
        )}
      </div>
      <div className={styles.galleryCarousel}>
        <div className={styles.galleryPic}>
          {src && src.length > 0 ? (
            src
              .slice(currentIndex, currentIndex + 2)
              .map((image, index) => (
                <img
                  key={index}
                  className={styles.galleryImg}
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                />
              ))
          ) : (
            <div className={`${styles.noImages} ${styles[theme]}`}>
              <p>Изображения не найдены</p>
            </div>
          )}
        </div>
      </div>
      {!isMobile && currentIndex > 0 && (
        <img
          className={`${styles.arrowLeft} ${styles[theme]}`}
          alt="Left Arrow"
          onClick={handlePrev}
        />
      )}
      {!isMobile && currentIndex + 2 < src.length && (
        <img
          className={`${styles.arrowRight} ${styles[theme]}`}
          alt="Right Arrow"
          onClick={handleNext}
        />
      )}
    </div>
  );
};
