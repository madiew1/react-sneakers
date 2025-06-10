import React, { useContext } from 'react';
import Card from "../Card";
import { AppContext } from '../../App';

const Favorites = ({onAddToCart}) => {
  const {favoriteSneakers, onAddToFavorite} = useContext(AppContext);

  console.log("rerender");
  return (
    <>
    <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
              <h1>Закладки</h1>
            </div>
            <div className="d-flex flex-wrap">

              {
                favoriteSneakers.map((favorite, index) => <Card addToFavorite={onAddToFavorite} isFavorited={favoriteSneakers.some(item => Number(item.id) == Number(favorite.id))} addToCart={onAddToCart} key={index} {...favorite}/>)
              }
              
            </div>
    </div>
    </>
  )
}

export default Favorites
