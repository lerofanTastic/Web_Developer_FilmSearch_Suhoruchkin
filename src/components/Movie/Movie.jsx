import React from "react";
import { Search } from "../Search/Search";
import { MovieList } from "../MovieList/MovieList";
import styles from "./Movie.module.css";
import { Filter } from "../Filter/Filter";

export const Movie = () => {
  return (
    <div>
      <Search />
      <div className={styles.main}>
        <Filter />
        <MovieList />
      </div>
    </div>
  );
};
