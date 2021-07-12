import { useContext } from 'react'

import {CurrentUserContext} from '../contexts/CurrentUserContext'

function Card({ card, onCardClick, onCardLike, onCardDelete, cardDeletePopup }) {
    const currentUser = useContext(CurrentUserContext);
    
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = 
        `element__close ${isOwn ? 'element__close_visible' : ''}`
    ;

    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    const cardLikeButtonClassName = 
        `element__vector ${isLiked ? 'element__vector_active' : ''}`
    ;

    function handleCardClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
        cardDeletePopup();
    }

    return (
        <div className="element ">
            <img src={card.link} alt={card.name} className="element__image" onClick={handleCardClick}/>
            <button type="reset" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <div className="element__group">
                <h2 className="element__text">{card.name}</h2>
                <div className="element__like">
                    <button type="button" name="Like" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="element__number">{card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;