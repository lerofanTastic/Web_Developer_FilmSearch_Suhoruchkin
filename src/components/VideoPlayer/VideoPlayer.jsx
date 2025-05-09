import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { topAnime } from "../../constants/topAnime";
import styles from "./VideoPlayer.module.css";

export const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // Текущее время воспроизведения
  const [duration, setDuration] = useState(0); // Общая длительность видео
  const [volume, setVolume] = useState(1); // Громкость (по умолчанию 100%)
  const { id } = useParams(); // Получаем id из параметров маршрута
  const aboutAnime = topAnime.find((anime) => anime.id === parseInt(id)); // Ищем элемент по id

  const togglePlay = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (videoEl.paused) {
      videoEl.play();
      setPlaying(true);
    } else {
      videoEl.pause();
      setPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const videoEl = videoRef.current;
    if (videoEl) {
      setCurrentTime(videoEl.currentTime); // Обновляем текущее время
    }
  };

  const handleLoadedMetadata = () => {
    const videoEl = videoRef.current;
    if (videoEl) {
      setDuration(videoEl.duration); // Устанавливаем общую длительность видео
    }
  };

  const handleSliderChange = (e) => {
    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.currentTime = e.target.value; // Устанавливаем новое время воспроизведения
      setCurrentTime(e.target.value);
    }
  };

  const handleVolumeChange = (e) => {
    const videoEl = videoRef.current;
    const newVolume = e.target.value;
    if (videoEl) {
      videoEl.volume = newVolume; // Устанавливаем громкость
      setVolume(newVolume);
    }
  };

  return (
    <div className={styles.videoContainer}>
      {/* Указываем controls={false}, чтобы убрать стандартные элементы управления */}
      <video
        ref={videoRef}
        src={aboutAnime.trailer}
        controls={false}
        className={styles.video}
        onTimeUpdate={handleTimeUpdate} // Отслеживаем обновление времени
        onLoadedMetadata={handleLoadedMetadata} // Получаем длительность видео
      />

      {/* Контейнер для кастомных контролов */}
      <div className={styles.customControls}>
        <button onClick={togglePlay} className={styles.controlButton}>
          <img
            src={
              playing ? "/src/assets/svg/pause.svg" : "/src/assets/svg/play.svg"
            } // Используем src для отображения SVG
            alt={playing ? "Pause" : "Play"}
            className={styles.icon} // Можно добавить стили для иконок
          />
        </button>

        {/* Ползунок длительности видео */}
        
      </div>
      <div className={styles.controlBottom}>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSliderChange}
          className={styles.slider} // Добавляем стили для ползунка
        />

        {/* Ползунок громкости */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className={styles.volumeSlider} // Добавляем стили для ползунка громкости
        />
      </div>
    </div>
  );
};
