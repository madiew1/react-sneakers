import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'

type HeaderProps = {
  onOpen: () => void
  favoriteOne?: any[]
}

const Header: React.FC<HeaderProps> = ({ onOpen }) => {
  const context = useContext(AppContext)
  const totalPrice = context?.totalPrice ?? 0

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
          <span>{totalPrice} руб.</span>
        </li>
        <li className="mr-30 cu-p">
          <Link to="/favorites">
            <img src="/img/heart.svg" alt="heart" className="cart" />
            <span>Закладки</span>
          </Link>
        </li>
        <li className="cu-p">
          <Link to="/orders">
            <img src="/img/user.svg" alt="user" className="user" />
            <span>Профиль</span>
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
