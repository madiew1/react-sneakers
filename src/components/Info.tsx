import React, { useContext } from 'react'
import { AppContext } from '../App'

type InfoProps = {
  title: string
  image: string
  description: string
}

const Info: React.FC<InfoProps> = ({ title, image, description }) => {
  const context = useContext(AppContext)
  const setCartState = context?.setCartState || (() => {})

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" width="120px" src={image} alt="Empty" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button onClick={() => setCartState(false)} className="greenButton">
        <img src="/img/arrow.svg" alt="Arrow" />
        Вернуться назад
      </button>
    </div>
  )
}

export default Info
