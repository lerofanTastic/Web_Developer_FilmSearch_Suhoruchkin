import React from "react";
import styles from "./About.module.css";
import { topAnime } from "../../constants/topAnime.js";
import { Card } from "../Card/Card.jsx";
import { useParams } from "react-router-dom";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer.jsx";

export const About = ({
  title = "No Title :(",
  trailer = "No Trailer :(",
  genre = "No Genre :(",
  country = "No Country :(",
  actors = "No Actors :(",
  writers = "No Writers :(",
  date = "No Date :(",
  age = "No Age :(",
}) => {
  const { id } = useParams(); // Получаем id из параметров маршрута
  const aboutAnime = topAnime.find((anime) => anime.id === parseInt(id)); // Ищем элемент по id

  if (!aboutAnime) {
    return <div>Элемент с указанным ID не найден</div>;
  }
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.bigCard}>
          <div className={styles.mainHeaderMob}>
            <h1>{title}</h1>
          </div>
          <div className={styles.poster}>
            <Card
              title=""
              image={aboutAnime.image}
              rating={aboutAnime.rating}
            />
          </div>

          <div className={styles.description}>
            <h1>{title}</h1>
            <h2>О фильме</h2>
            <div className={styles.information}>
              <div className={styles.informationType}>
                <div className={styles.typeFirst}>Жанр</div>
                <div className={styles.typeSecond}>{genre}</div>
              </div>
              <div className={styles.informationType}>
                <div className={styles.typeFirst}>Страна производства</div>
                <div className={styles.typeSecond}>{country}</div>
              </div>
              <div className={styles.informationType}>
                <div className={styles.typeFirst}>Актёры</div>
                <div className={styles.typeSecond}>{actors}</div>
              </div>
              <div className={styles.informationType}>
                <div className={styles.typeFirst}>Режиссёры</div>
                <div className={styles.typeSecond}>{writers}</div>
              </div>
              <div className={styles.informationType}>
                <div className={styles.typeFirst}>Дата релиза</div>
                <div className={styles.typeSecond}>{date}</div>
              </div>
              <div className={styles.informationType}>
                <div className={styles.typeFirst}>Возрастное ограничение</div>
                <div className={styles.typeSecond}>{age}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.trailer}>
          <h1>Трейлер</h1>
          <VideoPlayer/>
        </div>
        <div className={styles.gallery}>
          <div className={styles.galleryTop}>
            <div className={styles.galleryHeader}>
              <h1>Галерея</h1>
            </div>
            <div className={styles.galleryArrows}>
              <img src="/assets/left-arrow.svg" alt="Left Arrow" />
              <img src="/assets/right-arrow.svg" alt="Right Arrow" />
            </div>
          </div>
          <div className={styles.galleryCarousel}>
            <div className={styles.galleryPic}>
              <img
                className={styles.galleryImg}
                src="/assets/gallery1.png"
                alt="Gallery 1"
              />
              <img
                className={styles.galleryImg}
                src="/assets/gallery2.png"
                alt="Gallery 2"
              />
            </div>
            <img
              className={styles.arrow}
              src="/assets/right-arrow.svg"
              alt="Right Arrow"
            />
          </div>
        </div>
        <div className={styles.reviews}>
          <h1>Рецензии зрителей</h1>
          <div className={styles.reviewsContainer}>
            <div className={styles.reviewBox}>
              <h2>Ирина Глебова</h2>
              <div className={styles.whiteStarContainer}>
                {Array.from({ length: 10 }).map((_, index) => (
                  <img
                    key={index}
                    className={styles.starWrapper}
                    src={
                      index < aboutAnime.stars
                        ? "/src/assets/svg/star-white.svg" // Заполненная звезда
                        : "/src/assets/svg/star-white-trans.svg" // Прозрачная звезда
                    }
                    alt="Star"
                  />
                ))}
              </div>
              <div className={styles.blackStarContainer}>
                {Array.from({ length: 10 }).map((_, index) => (
                  <img
                    key={index}
                    className={styles.starWrapper}
                    src={
                      index < aboutAnime.stars
                        ? "/src/assets/svg/star-black.svg" // Заполненная звезда
                        : "/src/assets/svg/star-black-trans.svg" // Прозрачная звезда
                    }
                    alt="Star"
                  />
                ))}
              </div>
              <p>
                Проклятое королевство — это фильм, который захватил мое сердце и
                не отпустит. Этот фильм, с его захватывающим сюжетом и отличными
                актерами, оставил у меня невероятное впечатление. Каждый кадр
                этого фильма наполнен эмоциями и драматизмом, что делает его
                идеальным для тех, кто любит кино искусство...
              </p>
            </div>
            <div className={styles.reviewBox}>
              <h2>Мария Семёнова</h2>
              <div className={styles.whiteStarContainer}>
                {Array.from({ length: 10 }).map((_, index) => (
                  <img
                    key={index}
                    className={styles.starWrapper}
                    src={
                      index < aboutAnime.stars
                        ? "/src/assets/svg/star-white.svg" // Заполненная звезда
                        : "/src/assets/svg/star-white-trans.svg" // Прозрачная звезда
                    }
                    alt="Star"
                  />
                ))}
              </div>
              <div className={styles.blackStarContainer}>
                {Array.from({ length: 10 }).map((_, index) => (
                  <img
                    key={index}
                    className={styles.starWrapper}
                    src={
                      index < aboutAnime.stars
                        ? "/src/assets/svg/star-black.svg" // Заполненная звезда
                        : "/src/assets/svg/star-black-trans.svg" // Прозрачная звезда
                    }
                    alt="Star"
                  />
                ))}
              </div>
              <p>
                Честно говоря, фильм оставил смешанные впечатления. Нудное
                начало. Актёры, правда, играют великолепно, но даже они не
                спасли ситуацию.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
