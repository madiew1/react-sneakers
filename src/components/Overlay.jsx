import React, { useContext, useState } from 'react'
import Info from './Info'
import { AppContext } from '../App';
import axios from 'axios';

const deley = (ms) => new Promise((resolve) =>  setTimeout(resolve, ms))

const Overlay = ({onClose, cartSneakers, onRemove}) => {
  const {setCartSneakers} = useContext(AppContext);
  const [orderId, setOrderId] = useState(null);
  const [completeOrder, setCompleteOrder] = useState(false);

  const onOrderComplete = async () => {
    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cartSneakers }), // обернули в объект для соответствия API
      });
      const data = await response.json();
      setOrderId(data.id);
      setCompleteOrder(true);
      setCartSneakers([]);
      for (let i = 0; i < cartSneakers.length; i++) {
        const item = cartSneakers[i];
        await axios.delete('https://68053c6fca467c15be68a31a.mockapi.io/cartSneakers/' + item.id);
        deley(1000)
      }
    } catch (error) {
      console.warn(error);
      alert('Не удалось создать заказ!');
    }
  };

  return (
    <div className="overlay">
          <div className="drawer">
            <h2 className="d-flex justify-between mb-30">Корзина <img className="removeBtn cu-p" onClick={onClose} src="/img/btn-remove.svg" alt="remove" /></h2>

              {
                cartSneakers.length > 0 ? (
                  <div className='d-flex flex-column flex'>
                    <div className="items">
                      {cartSneakers.map((sneaker) => (<div key={sneaker.id} className="cartItem d-flex justify-between align-center mb-20">
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
                      <button disabled={completeOrder} onClick={onOrderComplete} className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="arrow" /></button>
                    </div>
                  </div>
                ) : (
                  <Info 
                    title={completeOrder ? 'Заказ оформлен!' : 'Корзина пустая'} 
                    description={completeOrder ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'} 
                    image={completeOrder ? '/img/complete-order.jpg' : '/img/empty-cart.jpg'}/>
                )
              }
          </div>
        </div>
  )
}

export default Overlay
