import React, { createContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Overlay from "./components/Overlay";
import Header from "./components/Header";
import Home from "./components/pages/Home";
import Favorites from "./components/pages/Favorites";
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
        const cartResponse = await axios.get('https://68053c6fca467c15be68a31a.mockapi.io/cartSneakers');
        const favoriteResponse = await axios.get('https://68053c6fca467c15be68a31a.mockapi.io/favoriteSneakers');
        const sneakersResponse = await fetch(`http://localhost:3000/sneakers`, {
          method: "GET"
        })
        .then((res) => res.json());

        setIsLoading(false)

        setCartSneakers(cartResponse.data);
        setToFavoriteSneakers(favoriteResponse.data);
        setSneakers(sneakersResponse);
      }
      fetchData();
  },[])

  const onAddToCart = async (obj) => {
    console.log(obj)
    try {
      if (cartSneakers.find((cartObj) => Number(cartObj.id) === Number(obj.id))) {
        await axios.delete(`https://68053c6fca467c15be68a31a.mockapi.io/cartSneakers/${obj.id}`)
        setCartSneakers((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
      } else {
       const {data} = await axios.post('https://68053c6fca467c15be68a31a.mockapi.io/cartSneakers', obj);
        setCartSneakers((prev) => [...prev, data]);
      }
    } catch (error) {
      console.warn(error);
      alert('Cannot add to cart');
    }
  }

  const onAddToFavorite = async (obj) => {
    console.log(obj.id)
    try {
      if (favoriteSneakers.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://68053c6fca467c15be68a31a.mockapi.io/favoriteSneakers/${obj.id}`);
        setToFavoriteSneakers((prev) => prev.filter((item) => item.id !== obj.id));
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
    return cartSneakers.some((cartSneaker) => Number(cartSneaker.id) == Number(id));
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
      <AppContext.Provider value={{sneakers, cartSneakers, favoriteSneakers, itemHasAdded, onAddToFavorite, setCartState, setCartSneakers}}>
        <div className="wrapper clear">
          {
            cartState && <Overlay onRemove={onRemoveFromCart} cartSneakers={cartSneakers} onClose={() => setCartState(false)}/>
          }
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
          </Routes>
        </div>
      </AppContext.Provider>
    </>
  )
}

export default App
