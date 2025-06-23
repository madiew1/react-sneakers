import React, {useEffect, useState } from 'react';
import Card from "../Card";
import { AppContext } from '../../App';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:3000/orders');
        const data = await response.json();

        // Преобразуем массив заказов в один массив всех items
        const mergedItems = data.reduce((acc, order) => {
          return [...acc, ...order.items];
        }, []);

        setOrders(mergedItems);
        setIsLoading(false)
      } catch (error) {
        console.error('Ошибка при загрузке заказов:', error);
      }
    })();
  }, [])

  console.log("rerender");
  return (
    <>
    <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
              <h1>Мои заказы</h1>
            </div>
            <div className="d-flex flex-wrap">

              {
                (isLoading ? [...Array(8)] : orders).map((order, index) => <Card key={index}
                loading={isLoading} 
                {...order}/>)
              }
              
            </div>
    </div>
    </>
  )
}

export default Orders
