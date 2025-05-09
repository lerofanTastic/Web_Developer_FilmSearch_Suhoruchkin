import { useParams } from "react-router-dom";
import { topAnime } from "../../constants/topAnime";
import { About } from "../About/About";
import { Search } from "../Search/Search";

export const SingleTarget = () => {
  const { id } = useParams(); // Получаем id из параметров маршрута
  const targetAnime = topAnime.find((anime) => anime.id === parseInt(id)); // Ищем элемент по id

  if (!targetAnime) {
    return <div>Элемент с указанным ID не найден</div>;
  }
  return (
    <div>
      <Search />

      <About
        title={targetAnime.title}
        description={targetAnime.description}
        image={targetAnime.image}
        trailer={targetAnime.trailer}
        rating={targetAnime.rating}
        genre={targetAnime.genre}
        country={targetAnime.country}
        actors={targetAnime.actors}
        writers={targetAnime.writers}
        date={targetAnime.date}
        age={targetAnime.age}
      />
    </div>
  );
};
