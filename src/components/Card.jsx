import React, { useState } from 'react'

const Card = ({title, price, imageUrl, addToCart}) => {
    
    const [isAdded, setIsAdded] = useState(false);

    const onClickPlus = () => {
        addToCart({title, price, imageUrl, addToCart})
        setIsAdded(!isAdded)
    }

  return (
    <div className="card mb-20">
        <div className="favorite">
            <img src="/img/unliked.svg" alt="heart" />
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
