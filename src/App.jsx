import React, { useEffect } from "react";
import { useState } from "react";
import Overlay from "./components/Overlay";
import Header from "./components/Header";
import Card from "./components/Card";
import axios from "axios";



const App = () => {
  const [sneakers, setSneakers] = useState([]);
  const [cartSneakers, setCartSneakers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartState, setCartState] = useState(false)

  useEffect(() => {
    axios.get('https://68053c6fca467c15be68a31a.mockapi.io/sneakers')
        .then((res) => {
          setSneakers(res.data)
        })
      .catch((err) => {
        console.warn(err)
        alert('Something went wrong')
      })
    axios.get('https://68053c6fca467c15be68a31a.mockapi.io/cartSneakers')
      .then((res) => {
        setCartSneakers(res.data)
      })
      .catch((err) => {
        console.warn(err)
        alert('Something went wrong')
      })
      

  },[])

  const onAddToCart = (obj) => {
    setCartSneakers((prev) => [...prev, obj])
    axios.post('https://68053c6fca467c15be68a31a.mockapi.io/cartSneakers', obj)
  }

  const onRemoveFromCart = (id) => {
    setCartSneakers((prev) => prev.filter(item => item.id !== id))
    axios.delete(`https://68053c6fca467c15be68a31a.mockapi.io/cartSneakers/${id}`)
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <>
      <div className="wrapper clear">
        {
          cartState && <Overlay onRemove={onRemoveFromCart} cartSneakers={cartSneakers} onClose={() => setCartState(false)}/>
        }
        <Header onOpen={() => setCartState(true)}/>
        <div className="content p-40">
          <div className="d-flex align-center justify-between mb-40">
            {
              <h1>
                {
                  searchValue ? `Поиск по запросу:  "${searchValue}"` : 'Все кроссовки'
                }
              </h1>
            }
            <div className="search-block d-flex">
              <img src="/img/search.svg" alt="search" />
              <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
              {
                searchValue && <img width={24} height={26} className="clearSearch cu-p" src="/img/btn-remove.svg" alt="clearSearch" /> 
              }
            </div>
          </div>
          <div className="d-flex flex-wrap">

            {
              sneakers.filter(obj => obj.title.toLowerCase().includes(searchValue)).map((sneaker) => <Card addToCart={onAddToCart} key={sneaker.id} {...sneaker}/>)
            }
            
          </div>
        </div>
      </div>
    </>
  )
}

export default App
