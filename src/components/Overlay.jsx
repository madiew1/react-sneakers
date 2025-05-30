import React from 'react'

const Overlay = () => {
  return (
    <div style={{display: 'none'}} className="overlay">
          <div className="drawer">
            <h2 className="d-flex justify-between mb-30">Корзина <img className="removeBtn cu-p" src="/img/btn-remove.svg" alt="remove" /></h2>
            <div className="items">
              <div className="cartItem d-flex justify-between align-center mb-20">
                <div style={{backgroundImage: 'url(/img/sneakers/2.jpg)'}} className="cartItemImg"></div>
                <div className="mr-20">
                    <p className="mb-5">Мужские Кроссовки Nike Biazer Mid Suede</p>
                    <b>12 999 руб.</b>
                </div>
                  <img className="removeBtn" src="/img/btn-remove.svg" alt="remove" />
              </div>
              <div className="cartItem d-flex justify-between align-center mb-20">
                <div style={{backgroundImage: 'url(/img/sneakers/2.jpg)'}} className="cartItemImg"></div>
                <div className="mr-20">
                    <p className="mb-5">Мужские Кроссовки Nike Biazer Mid Suede</p>
                    <b>12 999 руб.</b>
                </div>
                  <img className="removeBtn" src="/img/btn-remove.svg" alt="remove" />
              </div>
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li className="d-flex">
                  <span>Итого:</span>
                  <div></div>
                  <b>26 000 руб.</b>
                </li>
                <li className="d-flex">
                  <span>Налог 5%:</span>
                  <div></div>
                  <b> 1300р</b>
                </li>
              </ul>
              <button className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="arrow" /></button>
            </div>
          </div>
        </div>
  )
}

export default Overlay
