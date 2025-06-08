import React from 'react'
import Card from "../Card";

const Home =  ({searchValue, onChangeSearchInput, onAddToCart, onAddToFavorite, sneakers}) => {
  return (
    <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
              {
                <h1>
                  {
                    searchValue ? `Поиск по запросу:  "${searchValue}"` : 'Все кроссовки'
                  }
                </h1>
              }
              <div className="search-block d-flex">
                <img src="/img/search.svg" alt="search" />
                <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
                {
                  searchValue && <img width={24} height={26} className="clearSearch cu-p" src="/img/btn-remove.svg" alt="clearSearch" /> 
                }
              </div>
            </div>
            <div className="d-flex flex-wrap">

              {
                sneakers.filter(obj => obj.title.toLowerCase().includes(searchValue)).map((sneaker, index) => <Card key={index} addToFavorite={onAddToFavorite} addToCart={onAddToCart} {...sneaker}/>)
              }
              
            </div>
    </div>
  )
}

export default Home;
