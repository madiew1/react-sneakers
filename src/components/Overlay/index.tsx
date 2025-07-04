import React, { useContext, useState } from 'react';
import Info from '../Info';
import { AppContext } from '../../App';
import axios from 'axios';
import styles from "../Overlay/Overlay.module.scss";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

type OverlayProps = {
  onClose: () => void;
  cartSneakers: any[];
  onRemove: (id: number) => void;
  opened: boolean;
};

const Overlay: React.FC<OverlayProps> = ({ onClose, cartSneakers, onRemove, opened }) => {
  const context = useContext(AppContext);
  const setCartSneakers = context?.setCartSneakers || (() => {});
  const totalPrice = context?.totalPrice || 0;
  const [orderId, setOrderId] = useState<number | null>(null);
  const [completeOrder, setCompleteOrder] = useState(false);

  const onOrderComplete = async () => {
    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartSneakers })
      });
      const data = await response.json();
      setOrderId(data.id);
      setCompleteOrder(true);
      setCartSneakers([]);
      for (const item of cartSneakers) {
        await axios.delete(`https://68053c6fca467c15be68a31a.mockapi.io/cartSneakers/${item.id}`);
        await delay(1000);
      }
    } catch (error) {
      console.warn(error);
      alert('Не удалось создать заказ!');
    }
  };

  const totalTax = Math.round(totalPrice * 0.05);

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img onClick={onClose} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="remove" />
        </h2>
        {cartSneakers.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items">
              {cartSneakers.map(sneaker => (
                <div key={sneaker.id} className="cartItem d-flex justify-between align-center mb-20">
                  <div style={{ backgroundImage: `url(${sneaker.imageUrl})` }} className="cartItemImg"></div>
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
                  <b>{totalPrice} руб.</b>
                </li>
                <li className="d-flex">
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{totalTax} руб.</b>
                </li>
              </ul>
              <button disabled={completeOrder} onClick={onOrderComplete} className="greenButton">
                Оформить заказ <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={completeOrder ? 'Заказ оформлен!' : 'Корзина пустая'}
            description={
              completeOrder
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
            image={completeOrder ? '/img/complete-order.jpg' : '/img/empty-cart.jpg'}
          />
        )}
      </div>
    </div>
  );
};

export default Overlay;
