import React from 'react'

const Card = () => {
  return (
    <div className="card">
        <div className="favorite">
            <img src="/img/unliked.svg" alt="heart" />
        </div>
        <img width={133} height={112} src="/img/sneakers/1.jpg" alt="1" />
        <h5>Мужские Кроссовки Nike Biazer Mid Suede</h5>
        <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
                <span>Цена</span>
                <b>12 999 руб.</b>
            </div>
        <button className="button">
            <img src="/img/plus.svg" alt="plus" />
        </button>
        </div>
    </div>
  )
}

export default Card
