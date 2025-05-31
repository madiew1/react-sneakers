import React, { useEffect } from "react";
import { useState } from "react";
import Overlay from "./components/Overlay";
import Header from "./components/Header";
import Card from "./components/Card";



const App = () => {
  const [sneakers, setSneakers] = useState([]);

  useEffect(() => {
    fetch('../public/db.json')
      .then((data) => data.json())
      .then((json) => {
        console.log(json)
        setSneakers(json.items)
      })
      .catch((err) => {
        console.warn(err)
        alert('Something went wrong')
      })
  },[])

  return (
    <>
      <div className="wrapper clear">
        <Overlay/>
        <Header/>
        <div className="content p-40">
          <div className="d-flex align-center justify-between mb-40">
            <h1>Все кроссовки</h1>
            <div className="search-block d-flex">
              <img src="/img/search.svg" alt="search" />
              <input placeholder="Поиск..." />
            </div>
          </div>
          <div className="d-flex flex-wrap">

            {
              sneakers.map((sneaker) => <Card key={sneaker.id} {...sneaker}/>)
            }
            
          </div>
        </div>
      </div>
    </>
  )
}

export default App
