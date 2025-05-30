import React, { useState } from "react";
import styles from "../Movie/Movie.module.css";
import { Search } from "../Search/Search";
import { Filter } from "../Filter/Filter";
import { SeriesList } from "../SeriesList/SeriesList";

export const Series = () => {
  const [genre, setGenre] = useState("");
  const [country, setCountry] = useState("");
  const [rating, setRating] = useState("");
  const [year, setYear] = useState("");
  return (
    <div>
      <Search />
      <div className={styles.main}>
        <Filter
          genre={genre}
          setGenre={setGenre}
          country={country}
          setCountry={setCountry}
          rating={rating}
          setRating={setRating}
          year={year}
          setYear={setYear}
        />
        <SeriesList
          genre={genre}
          country={country}
          rating={rating}
          year={year}
        />
      </div>
    </div>
  );
};
