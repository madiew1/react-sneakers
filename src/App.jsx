
function App() {

  return (
    <>
      <div className="wrapper clear">
        <div className="overlay">
          <div className="drawer">
            <h2 className="d-flex justify-between mb-30">Корзина <img className="removeBtn cu-p" src="/img/btn-remove.svg" alt="remove" /></h2>
            <div className="items">
              <div className="cartItem d-flex justify-between align-center mb-20">
                <div style={{backgroundImage: 'url(/img/sneakers/2.jpg)'}} className="cartItemImg"></div>
                <div className="mr-20">
                    <p className="mb-5">Мужские Кроссовки Nike Biazer Mid Suede</p>
                    <b>12 999 руб.</b>
                </div>
                  <img className="removeBtn" src="/img/btn-remove.svg" alt="remove" />
              </div>
              <div className="cartItem d-flex justify-between align-center mb-20">
                <div style={{backgroundImage: 'url(/img/sneakers/2.jpg)'}} className="cartItemImg"></div>
                <div className="mr-20">
                    <p className="mb-5">Мужские Кроссовки Nike Biazer Mid Suede</p>
                    <b>12 999 руб.</b>
                </div>
                  <img className="removeBtn" src="/img/btn-remove.svg" alt="remove" />
              </div>
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li className="d-flex">
                  <span>Итого:</span>
                  <div></div>
                  <b>26 000 руб.</b>
                </li>
                <li className="d-flex">
                  <span>Налог 5%:</span>
                  <div></div>
                  <b> 1300р</b>
                </li>
              </ul>
              <button className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="arrow" /></button>
            </div>
          </div>
        </div>
        <header className="d-flex justify-between align-center p-40">
          <div className="d-flex align-center">
            <img width={40} height={40} src="/img/logo.png" alt="logo" className="logo" />
            <div>
              <h3 className="text-uppercase">React Sneakers</h3>
              <p>Магазин лучших кроссовок</p>
            </div>
          </div>
          <ul className="d-flex">
              <li className="mr-30">
                <img src="/img/cart.svg" alt="cart" className="cart" />
                <span>1205 руб.</span>
              </li>
              <li>
                <img src="/img/user.svg" alt="user" className="user" />
              </li>
            </ul>
        </header>
        <div className="content p-40">
          <div className="d-flex align-center justify-between mb-40">
            <h1>Все кроссовки</h1>
            <div className="search-block d-flex">
              <img src="/img/search.svg" alt="search" />
              <input placeholder="Поиск..." />
            </div>
          </div>
          <div className="d-flex">
            <div className="card">
              <div className="favorite">
                <img src="/img/unliked.svg" alt="heart" />
              </div>
              <img width={133} height={112} src="/img/sneakers/1.jpg" alt="1" />
              <h5>Мужские Кроссовки Nike Biazer Mid Suede</h5>
              <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                  <span>Цена</span>
                  <b>12 999 руб.</b>
                </div>
                <button className="button">
                    <img src="/img/plus.svg" alt="plus" />
                </button>
              </div>
            </div>
            <div className="card">
              <img width={133} height={112} src="/img/sneakers/2.jpg" alt="1" />
              <h5>Мужские Кроссовки Nike Air Max 270</h5>
              <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                  <span>Цена</span>
                  <b>12 999 руб.</b>
                </div>
                <button className="button">
                    <img src="/img/plus.svg" alt="plus" />
                  </button>
              </div>
            </div> 
            <div className="card">
              <img width={133} height={112} src="/img/sneakers/3.jpg" alt="1" />
              <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
              <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                  <span>Цена</span>
                  <b>12 999 руб.</b>
                </div>
                <button className="button">
                    <img src="/img/plus.svg" alt="plus" />
                  </button>
              </div>
            </div>
            <div className="card">
              <img width={133} height={112} src="/img/sneakers/4.jpg" alt="1" />
              <h5>Кроссовки Puma X Aka Boku Future Rider</h5>
              <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                  <span>Цена</span>
                  <b>12 999 руб.</b>
                </div>
                <button className="button">
                    <img src="/img/plus.svg" alt="plus" />
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
