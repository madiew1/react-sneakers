import React, { useState, useContext } from 'react'
import { AppContext } from '../App';
import ContentLoader from 'react-content-loader';

const Card = ({id, title, price, imageUrl, addToCart, addToFavorite, loading = false, isFavorited = false}) => {
    const {itemHasAdded , itemHasFavorited} = useContext(AppContext);
    const [isFavorite, setFavoriteSneakers] = useState(isFavorited);

    const onClickPlus = () => {
        addToCart({id, parentId: id, title, price, imageUrl});
    }
    const onClickFavorite = () => {
        addToFavorite({id, title, price, imageUrl})
        itemHasFavorited(id);
        setFavoriteSneakers(!isFavorite)
    }


    return (
        <div className="card mb-20">
            {loading ? (
            <ContentLoader
            speed={2}
            width={155}
            height={250}
            viewBox="0 0 155 265"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">
            <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
            <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
            <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
            <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
            <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
            </ContentLoader>
        ) : (
            <>
            <div className="favorite">
                {
                    addToFavorite && <img onClick={onClickFavorite} src={isFavorite ? '/img/liked.svg' : '/img/unliked.svg'} alt="heart" />
                }
            </div>
                <img width="100%" height={135} src={imageUrl} alt="sneakers" />
                <h5>{title}</h5>
                <div className="d-flex justify-between align-center">
                    <div className="d-flex flex-column">
                        <span>Цена</span>
                        <b>{price} руб.</b>
                    </div>
                    {
                        addToCart && <img onClick={onClickPlus} className='toAdd' src={itemHasAdded(id) ? '/img/btn-checked.svg' :  '/img/btn-plus.svg'} alt="plus" />
                    }
                </div>
            </>
        )}
        </div>
    )
}

export default Card
