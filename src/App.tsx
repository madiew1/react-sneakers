import React, { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Overlay from "./components/Overlay";
import Header from "./components/Header";
import Home from "./components/pages/Home";
import Favorites from "./components/pages/Favorites";
import Orders from "./components/pages/Orders";
import axios from "axios";

// ✅ Тип данных
type Sneaker = {
  id: number;
  parentId?: number;
  title: string;
  price: number;
  imageUrl: string;
};

type AppContextType = {
  sneakers: Sneaker[];
  cartSneakers: Sneaker[];
  favoriteSneakers: Sneaker[];
  itemHasAdded: (id: number) => boolean;
  itemHasFavorited: (id: number) => boolean;
  setCartState: React.Dispatch<React.SetStateAction<boolean>>;
  setCartSneakers: React.Dispatch<React.SetStateAction<Sneaker[]>>;
  totalPrice: number;
  onAddToCart: (obj: Sneaker) => void;
  onAddToFavorite: (obj: Sneaker) => void;
};

export const AppContext = createContext<AppContextType | null>(null);

const App = () => {
  const [sneakers, setSneakers] = useState<Sneaker[]>([]);
  const [cartSneakers, setCartSneakers] = useState<Sneaker[]>([]);
  const [favoriteSneakers, setToFavoriteSneakers] = useState<Sneaker[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartState, setCartState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoriteResponse, sneakersResponse] = await Promise.all([
          axios.get('https://68053c6fca467c15be68a31a.mockapi.io/cartSneakers'),
          axios.get('https://68053c6fca467c15be68a31a.mockapi.io/favoriteSneakers'),
          fetch(`http://localhost:3000/sneakers`).then((res) => res.json())
        ]);
        setIsLoading(false);
        setCartSneakers(cartResponse.data);
        setToFavoriteSneakers(favoriteResponse.data);
        setSneakers(sneakersResponse);
      } catch (error) {
        console.error(error);
        alert('При получении данных возникла ошибка');
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj: Sneaker) => {
    try {
      const findSneaker = cartSneakers.find((cartObj) => Number(cartObj.parentId) === Number(obj.id));
      if (findSneaker) {
        setCartSneakers((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`https://68053c6fca467c15be68a31a.mockapi.io/cartSneakers/${findSneaker.id}`);
      } else {
        setCartSneakers((prev) => [...prev, obj]);
        const { data } = await axios.post('https://68053c6fca467c15be68a31a.mockapi.io/cartSneakers', obj);
        setCartSneakers((prev) =>
          prev.map((item) => (item.parentId === data.parentId ? { ...item, id: data.id } : item))
        );
      }
    } catch (error) {
      console.warn(error);
      alert('Cannot add to cart');
    }
  };

  const onAddToFavorite = async (obj: Sneaker) => {
    try {
      if (favoriteSneakers.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        await axios.delete(`https://68053c6fca467c15be68a31a.mockapi.io/favoriteSneakers/${obj.id}`);
        setToFavoriteSneakers((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post('https://68053c6fca467c15be68a31a.mockapi.io/favoriteSneakers', obj);
        setToFavoriteSneakers((prev) => [...prev, data]);
      }
    } catch (error) {
      console.warn(error);
      alert('Cannot add to favorite');
    }
  };

  const itemHasAdded = (id: number) => {
    return cartSneakers.some((cartSneaker) => Number(cartSneaker.parentId) === Number(id));
  };

  const itemHasFavorited = (id: number) => {
    return favoriteSneakers.some((favoriteSneaker) => Number(favoriteSneaker.id) === Number(id));
  };

  const onRemoveFromCart = (id: number) => {
    try {
      setCartSneakers((prev) => prev.filter((item) => item.id !== id));
      axios.delete(`https://68053c6fca467c15be68a31a.mockapi.io/cartSneakers/${id}`);
    } catch (error) {
      console.error(error);
      alert('При удалении товара произошла ошибка');
    }
  };

  const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const totalPrice = cartSneakers.reduce((sum, obj) => obj.price + sum, 0);

  return (
    <AppContext.Provider value={{ sneakers, cartSneakers, favoriteSneakers, itemHasAdded, itemHasFavorited, setCartState, setCartSneakers, totalPrice, onAddToCart, onAddToFavorite }}>
      <div className="wrapper clear">
        <Overlay onRemove={onRemoveFromCart} cartSneakers={cartSneakers} onClose={() => setCartState(false)} opened={cartState} />
        <Header onOpen={() => setCartState(true)} favoriteOne={favoriteSneakers} />
        <Routes>
          <Route path="/" element={<Home isLoading={isLoading} searchValue={searchValue} onChangeSearchInput={onChangeSearchInput} sneakers={sneakers} setSearchValue={setSearchValue} onAddToFavorite={onAddToFavorite} onAddToCart={onAddToCart} />} />
          <Route path="/favorites" element={<Favorites onAddToCart={onAddToCart} />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
};

export default App;

