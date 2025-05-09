import React from "react";
import styles from "../Movie/Movie.module.css";
import { Search } from "../Search/Search";
import { Filter } from "../Filter/Filter";
import { SeriesList } from "../SeriesList/SeriesList";

export const Series = () => {
  return (
    <div>
      <Search />
      <div className={styles.main}>
        <Filter />
        <SeriesList />
      </div>
    </div>
  );
};
