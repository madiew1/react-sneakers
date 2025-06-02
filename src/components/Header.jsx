import React from 'react'

function Header({onOpen}) {
  return (
    <header className="d-flex justify-between align-center p-40">
          <div className="d-flex align-center">
            <img width={40} height={40} src="/img/logo.png" alt="logo" className="logo" />
            <div>
              <h3 className="text-uppercase">React Sneakers</h3>
              <p>Магазин лучших кроссовок</p>
            </div>
          </div>
          <ul className="d-flex">
              <li onClick={onOpen} className="mr-30 cu-p">
                <img src="/img/cart.svg" alt="cart" className="cart" />
                <span>1205 руб.</span>
              </li>
              <li>
                <img src="/img/user.svg" alt="user" className="user" />
              </li>
            </ul>
        </header>
  )
}

export default Header
