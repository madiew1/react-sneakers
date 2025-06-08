import React, { useState } from 'react'

const Card = ({id, title, price, imageUrl, addToCart, addToFavorite, isFavorited = false}) => {
    
    const [isAdded, setIsAdded] = useState(false);
    const [isFavorite, setFavoriteSneakers] = useState(isFavorited);

    const onClickPlus = () => {
        addToCart({title, price, imageUrl})
        setIsAdded(!isAdded)
    }
    const onClickFavorite = () => {
        addToFavorite({id, title, price, imageUrl})
        setFavoriteSneakers(!isFavorite)
    }

  return (
    <div className="card mb-20">
        <div className="favorite">
            <img onClick={onClickFavorite} src={isFavorite ? '/img/liked.svg' :  '/img/unliked.svg'} alt="heart" />
        </div>
        <img width={133} height={112} src={imageUrl} alt="sneakers" />
        <h5>{title}</h5>
        <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
                <span>Цена</span>
                <b>{price} руб.</b>
            </div>
            <img onClick={onClickPlus} className='toAdd' src={isAdded ? '/img/btn-checked.svg' :  '/img/btn-plus.svg'} alt="plus" />
        </div>
    </div>
  )
}

export default Card
