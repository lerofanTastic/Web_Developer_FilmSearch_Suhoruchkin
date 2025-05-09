import React from 'react'
import { HeaderBottom } from '../HeaderBottom/HeaderBottom'
import { Carousel } from '../Carousel/Carousel'
import { Search } from '../Search/Search'
import { Under } from '../Under/Under'

export const Main = () => {
  return (
    <div>
      <HeaderBottom />
      <Carousel />
      <Search />
      <Under />
    </div>
  )
}
