import { Card } from "../Card/Card";
import styles from "./MovieList.module.css";
import { Link } from "react-router-dom";
import { topAnime } from "../../constants/topAnime.js";
import { useTheme } from "../../context/Theme/themeContext";

export const MovieList = () => {
  const { theme } = useTheme();
  return (
    <div className={`${styles.mainRight} ${styles[theme]}`}>
      <div className={styles.mainRightTop}>
        <div className={`${styles.mainRightTopHeader} ${styles[theme]}`}>
          <h1>Фильмы</h1>
        </div>
        <div className={`${styles.mainRightTopPages} ${styles[theme]}`}>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
        </div>
      </div>
      <div className={styles.mainCards}>
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
  );
};
