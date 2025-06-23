import React, { createContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Overlay from "./components/Overlay";   
import Header from "./components/Header";
import Home from "./components/pages/Home";
import Favorites from "./components/pages/Favorites";
import Orders from "./components/pages/Orders";
import axios from "axios";

export const AppContext = createContext({});

const App = () => {
  const [sneakers, setSneakers] = useState([]);
  const [cartSneakers, setCartSneakers] = useState([]);
  const [favoriteSneakers, setToFavoriteSneakers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartState, setCartState] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
      async function fetchData() {
       try {

        const [cartResponse, favoriteResponse, sneakersResponse] = await Promise.all([
          axios.get('https://68053c6fca467c15be68a31a.mockapi.io/cartSneakers'),
          axios.get('https://68053c6fca467c15be68a31a.mockapi.io/favoriteSneakers'),
          fetch(`http://localhost:3000/sneakers`, {
            method: "GET"
          })
          .then((res) => res.json())
        ]);
         
        setIsLoading(false)

        setCartSneakers(cartResponse.data);
        setToFavoriteSneakers(favoriteResponse.data); 
        setSneakers(sneakersResponse);
        
       } catch (error) {
        console.error(error)
        alert('При получении данных возникла ошибка')
       }
      }
      fetchData();
  },[])

  const onAddToCart = async (obj) => {
    console.log(obj)
    try {
      const findSneaker = cartSneakers.find((cartObj) => Number(cartObj.parentId) === Number(obj.id));
      if (findSneaker) {
        setCartSneakers((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`https://68053c6fca467c15be68a31a.mockapi.io/cartSneakers/${findSneaker.id}`)
      } else {
        setCartSneakers((prev) => [...prev, obj]);
        const {data} = await axios.post('https://68053c6fca467c15be68a31a.mockapi.io/cartSneakers', obj);
        setCartSneakers((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            };
          }
          return item;
        }))
      }
    } catch (error) {
      console.warn(error);
      alert('Cannot add to cart');
    }
  }

  const onAddToFavorite = async (obj) => {
    console.log(obj.id)
    try {
      if (favoriteSneakers.find((favObj) => Number(favObj.pa) === Number(obj.id))) {
        axios.delete(`https://68053c6fca467c15be68a31a.mockapi.io/favoriteSneakers/${obj.id}`);
        setToFavoriteSneakers((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const {data} = await axios.post('https://68053c6fca467c15be68a31a.mockapi.io/favoriteSneakers', obj);
        setToFavoriteSneakers((prev) => [...prev, data])
      }
    } catch (error) {
      console.warn(error);
      alert('Cannot add to favorite');
    }
  }

  const itemHasAdded = (id) => {
    return cartSneakers.some((cartSneaker) => Number(cartSneaker.parentId) == Number(id));
  }

  const itemHasFavorited = (id) => {
    return favoriteSneakers.some((favoriteSneaker) => Number(favoriteSneaker.id) == Number(id));
  }

  console.log(cartSneakers);

  const onRemoveFromCart = (id) => {
    try {
      setCartSneakers((prev) => prev.filter(item => item.id !== id))
      axios.delete(`https://68053c6fca467c15be68a31a.mockapi.io/cartSneakers/${id}`)
    } catch (error) {
      console.error(error)
      alert('При удалении товара произошла ошибка')
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const totalPrice = cartSneakers.reduce((sum, obj) => obj.price + sum, 0)

  return (
    <>
      <AppContext.Provider value={{sneakers, cartSneakers, favoriteSneakers, itemHasAdded, onAddToFavorite, setCartState, setCartSneakers, itemHasFavorited, totalPrice, onAddToCart}}>
        <div className="wrapper clear">
        <Overlay onRemove={onRemoveFromCart} cartSneakers={cartSneakers} onClose={() => setCartState(false)} opened={cartState}/>
          <Header onOpen={() => setCartState(true)} favoriteOne={favoriteSneakers}/>
          <Routes>
            <Route path="/" exact 
            element={<Home 
                          isLoading={isLoading} 
                          cartSneakers={cartSneakers} 
                          favoriteSneakers={favoriteSneakers} 
                          searchValue={searchValue} 
                          onChangeSearchInput={onChangeSearchInput} 
                          sneakers={sneakers}
                          setSearchValue={setSearchValue} 
                          onAddToFavorite={onAddToFavorite} 
                          onAddToCart={onAddToCart}/>}/>
            <Route path="/favorites" exact element={<Favorites onAddToCart={onAddToCart}/>}/>
            <Route path="/orders" exact element={<Orders />}/>
          </Routes>
        </div>
      </AppContext.Provider>
    </>
  )
}

export default App
