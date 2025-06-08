import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Overlay from "./components/Overlay";
import Header from "./components/Header";
import Home from "./components/pages/Home";
import Favorites from "./components/pages/Favorites";
import axios from "axios";



const App = () => {
  const [sneakers, setSneakers] = useState([]);
  const [cartSneakers, setCartSneakers] = useState([]);
  const [favoriteSneakers, setToFavoriteSneakers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartState, setCartState] = useState(false)

  useEffect(() => {
      fetch(`http://localhost:3000/sneakers`, {
        method: "GET"
      })
      .then((res) => res.json())
      .then((json) => {
        setSneakers(json)
      })
      .catch(err => console.log(err));
    axios.get('https://68053c6fca467c15be68a31a.mockapi.io/cartSneakers')
      .then((res) => {
        setCartSneakers(res.data)
      })
      .catch((err) => {
        console.warn(err)
        alert('Something went wrong')
      })
    axios.get('https://68053c6fca467c15be68a31a.mockapi.io/favoriteSneakers')
      .then((res) => {
        setToFavoriteSneakers(res.data)
      })
  },[])

  const onAddToCart = (obj) => {
    setCartSneakers((prev) => [...prev, obj]);
    axios.post('https://68053c6fca467c15be68a31a.mockapi.io/cartSneakers', obj);
  }

  const onAddToFavorite = async (obj) => {
    console.log(obj.id)
    if (favoriteSneakers.find((favObj) => favObj.id === obj.id)) {
      axios.delete(`https://68053c6fca467c15be68a31a.mockapi.io/favoriteSneakers/${obj.id}`);
      setToFavoriteSneakers((prev) => prev.filter((item) => item.id !== obj.id));
    } else {
      const {data} = await axios.post('https://68053c6fca467c15be68a31a.mockapi.io/favoriteSneakers', obj);
      setToFavoriteSneakers((prev) => [...prev, data])
    }
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
        <Header onOpen={() => setCartState(true)} favoriteOne={favoriteSneakers}/>
        <Routes>
          <Route path="/" exact element={<Home searchValue={searchValue} onChangeSearchInput={onChangeSearchInput} sneakers={sneakers} onAddToFavorite={onAddToFavorite} onAddToCart={onAddToCart}/>}/>
          <Route path="/favorites" exact element={<Favorites favorites={favoriteSneakers} onAddToFavorite={onAddToFavorite} onAddToCart={onAddToCart}/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
