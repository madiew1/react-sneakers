import React, { useContext } from 'react';
import Card from "../Card";
import { AppContext } from '../../App';

type FavoritesProps = {
  onAddToCart: (obj: any) => void;
};

const Favorites: React.FC<FavoritesProps> = ({ onAddToCart }) => {
  const context = useContext(AppContext);
  const favoriteSneakers = context?.favoriteSneakers || [];
  const onAddToFavorite = context?.onAddToFavorite || (() => {});

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Закладки</h1>
      </div>
      <div className="d-flex flex-wrap">
        {favoriteSneakers.map((favorite, index) => (
          <Card
            isFavorited={true}
            addToFavorite={onAddToFavorite}
            addToCart={onAddToCart}
            key={index}
            {...favorite}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
