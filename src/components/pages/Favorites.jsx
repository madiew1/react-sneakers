import React from 'react';
import Card from "../Card";

const Favorites = ({favorites, onAddToCart, onAddToFavorite}) => {
  console.log("rerender");
  return (
    <>
    <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
              <h1>Закладки</h1>
            </div>
            <div className="d-flex flex-wrap">

              {
                favorites.map((favorite, index) => <Card addToFavorite={onAddToFavorite} isFavorited={true} addToCart={onAddToCart} key={index} {...favorite}/>)
              }
              
            </div>
    </div>
    </>
  )
}

export default Favorites
