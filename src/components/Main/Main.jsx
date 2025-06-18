import React from 'react'
import { HeaderBottom } from '../HeaderBottom/HeaderBottom'
import { Carousel } from '../Carousel/Carousel'
import { Search } from '../Search/Search'
import { Under } from '../Under/Under'
import { useTheme } from "../../context/Theme/themeContext";
import styles from "./Main.module.css"
import { Outlet } from 'react-router-dom'

export const Main = () => {
  const { theme } = useTheme();
  return (
    <div className={`${styles.back} ${styles[theme]}`}>
      <HeaderBottom />
      <Carousel />
      <Search />
      <Under />
    </div>
  )
}
