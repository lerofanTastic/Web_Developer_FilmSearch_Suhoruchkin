import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getImagesByMovieId,
  getMovieById,
  getReviewsByMovieId,
} from "../../api/kinopoiskApi";
import { About } from "../About/About";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";
import { GalleryCarousel } from "../GalleryCarousel/GalleryCarousel";
import { Reviews } from "../Reviews/Reviews";
import styles from "./SingleTarget.module.css";
import { useTheme } from "../../context/Theme/themeContext";

export const SingleTarget = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    getReviewsByMovieId(id, 2).then(setReviews);
  }, [id]);

  useEffect(() => {
    setLoading(true);
    getMovieById(id)
      .then(setMovie)
      .finally(() => setLoading(false));
    getImagesByMovieId(id, 10).then(setGallery);
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (!movie) return <div>Фильм/сериал не найден</div>;

  return (
    <div className={`${styles.single} ${styles[theme]}`}>
      <div className={styles.about}>
        <About movie={movie} />
      </div>
      <div className={`${styles.trailer} ${styles[theme]}`}>
        <VideoPlayer trailer={movie.videos?.trailers?.[0]?.url} />
      </div>
      <div className={`${styles.gallery} ${styles[theme]}`}>
        <GalleryCarousel src={gallery} />
      </div>
      <div className={styles.reviews}>
        <Reviews reviews={reviews} />
      </div>
    </div>
  );
};
