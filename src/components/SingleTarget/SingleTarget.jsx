import { useParams } from "react-router-dom";
import { topAnime } from "../../constants/topAnime";
import { About } from "../About/About";
import { Search } from "../Search/Search";
import styles from "./SingleTarget.module.css"

export const SingleTarget = () => {
  const { id } = useParams(); // Получаем id из параметров маршрута
  const aboutAnime = topAnime.find((anime) => anime.id === parseInt(id)); // Ищем элемент по id

  if (!aboutAnime) {
    return <div>Элемент с указанным ID не найден</div>;
  }
  return (
    <div className={styles.single}>
      <Search />
      <About
        title={aboutAnime.title}
        description={aboutAnime.description}
        image={aboutAnime.image}
        trailer={aboutAnime.trailer}
        rating={aboutAnime.rating}
        genre={aboutAnime.genre}
        country={aboutAnime.country}
        actors={aboutAnime.actors}
        writers={aboutAnime.writers}
        date={aboutAnime.date}
        age={aboutAnime.age}
      />
    </div>
  );
};
