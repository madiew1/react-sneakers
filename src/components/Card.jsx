import React from 'react'

const Card = ({title, price, imageUrl}) => {
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
        <button className="button">
            <img src="/img/plus.svg" alt="plus" />
        </button>
        </div>
    </div>
  )
}

export default Card
