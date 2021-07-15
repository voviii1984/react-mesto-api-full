import { useContext } from 'react'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main(props) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__change" onClick={props.onEditAvatar}>
                    <img src={currentUser.avatar} alt={currentUser.name} className="profile__avatar" />
                </div>
                <div className="profile__info">
                    <div className="profile__infos">
                        <h1 className="profile__info-title">{currentUser.name}</h1>
                        <button type="submit" className="profile__popup-button" onClick={props.onEditProfile}></button>
                    </div>
                    <h2 className="profile__info-text">{currentUser.about}</h2>
                </div>

                <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>

            <section className="elements">
                {props.cards.map(card => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                        cardDeletePopup={props.cardDeletePopup}
                    />
                )
                )}
            </section>
        </main>
    )
}

export default Main;