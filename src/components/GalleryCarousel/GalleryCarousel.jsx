import React, { useEffect, useState } from "react";
import styles from "./GalleryCarousel.module.css";

export const GalleryCarousel = ({ src }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Индекс текущего изображения

  useEffect(() => {
    console.log("Полученные изображения:", src); // Отладочный вывод
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
      {currentIndex > 0 && (
        <img
          className={styles.arrowLeft}
          src="/src/assets/svg/left-arrow.svg"
          alt="Left Arrow"
          onClick={handlePrev}
        />
      )}
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
            <p>Изображения не найдены</p>
          )}
        </div>
      </div>
      {currentIndex + 2 < src.length && (
        <img
          className={styles.arrowRight}
          src="/src/assets/svg/right-arrow.svg"
          alt="Right Arrow"
          onClick={handleNext}
        />
      )}
    </div>
  );
};
