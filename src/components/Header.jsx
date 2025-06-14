import React from 'react'
import { Link } from 'react-router-dom'
function Header({onOpen}) {
  return (
    <header className="d-flex justify-between align-center p-40">
          <Link to="/">
            <div className="d-flex align-center">
                <img width={40} height={40} src="/img/logo.png" alt="logo" className="logo" />
                <div>
                  <h3 className="text-uppercase">React Sneakers</h3>
                  <p>Магазин лучших кроссовок</p>
                </div>
            </div>
          </Link>
          <ul className="d-flex align-center">
              <li onClick={onOpen} className="mr-30 cu-p">
                <img src="/img/cart.svg" alt="cart" className="cart" />
                <span>1205 руб.</span>
              </li>
              <li to='/favorite' className="mr-30 cu-p">
                <Link to="/favorites">
                  <img src="/img/heart.svg" alt="cart" className="cart" />
                  <span>Закладки</span>
                </Link>
              </li>
              <li to="/cart" className="cu-p">
                <img src="/img/user.svg" alt="user" className="user" />
                <span>Профиль</span>
              </li>
            </ul>
        </header>
  )
}

export default Header
