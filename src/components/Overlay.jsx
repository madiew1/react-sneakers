import React from 'react'

const Overlay = ({onClose, cartSneakers, onRemove}) => {
  return (
    <div className="overlay">
          <div className="drawer">
            <h2 className="d-flex justify-between mb-30">Корзина <img className="removeBtn cu-p" onClick={onClose} src="/img/btn-remove.svg" alt="remove" /></h2>

              {
                cartSneakers.length > 0 ? (
                  <div>
                    <div className="items">
                      {cartSneakers.map((sneaker) => (<div className="cartItem d-flex justify-between align-center mb-20">
                        <div style={{backgroundImage: `url(${sneaker.imageUrl})`}} className="cartItemImg"></div>
                          <div className="mr-20">
                              <p className="mb-5">{sneaker.title}</p>
                              <b>{sneaker.price} руб.</b>
                          </div>
                          <img onClick={() => onRemove(sneaker.id)} className="removeBtn" src="/img/btn-remove.svg" alt="remove" />
                        </div>
                      ))}
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
                ) : (
                  <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                      <img className="mb-20" width="120px" height="120px" src="/img/empty-cart.jpg" alt="Empty" />
                      <h2>Корзина пустая</h2>
                      <p className="opacity-6">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                      <button onClick={onClose} className="greenButton">
                        <img src="/img/arrow.svg" alt="Arrow" />
                        Вернуться назад
                      </button>
                  </div>
                )
              }
          </div>
        </div>
  )
}

export default Overlay
