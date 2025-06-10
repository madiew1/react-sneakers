import React from 'react'
import Card from "../Card";

const Home =  ({sneakers, searchValue, setSearchValue, onChangeSearchInput, onAddToCart, onAddToFavorite,  favoriteSneakers, isLoading}) => {

  const renderItems = () => {
    const filteredSneakers = sneakers.filter(obj => obj.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(8)] : filteredSneakers).map((sneaker, index) => 
      <Card 
      isFavorited={favoriteSneakers.some(favoriteSneaker => Number(favoriteSneaker.id) == Number(sneaker.id))} 
      key={index}
      loading={isLoading} 
      addToFavorite={onAddToFavorite} 
      addToCart={onAddToCart} 
      {...sneaker}/>)
  }

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
                  searchValue && <img onClick={() => setSearchValue('')} width={24} height={26} className="clearSearch cu-p" src="/img/btn-remove.svg" alt="clearSearch" /> 
                }
              </div>
            </div>
            <div className="d-flex flex-wrap">
              {
                renderItems()
              }
            </div>
    </div>
  )
}

export default Home;
