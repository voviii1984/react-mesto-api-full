import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import { useEffect, useState } from 'react';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import DeleteCardPopup from './DeleteCardPopup'
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import Register from './Register';
import Login from './Login'
import ProtectedRoute from './ProtectedRoute';
import * as authMesto from '../utils/authMesto';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cardDelete, setCardDelete] = useState({});
  const [cards, setCards] = useState([]);

  const [userInfo, setUserInfo] = useState({});

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [infoTooltipDone, setInfoTooltipDone] = useState(false);

  useEffect(() => {
    api.userInfo()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(card) {

    api.deleteCard(cardDelete._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id === cardDelete._id ? false : true));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleDeleteCardClick() {
    setIsDeleteCardPopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltip(false);
  };

  function handleUpdateUser(data) {
    api.getProfile(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  function handleUpdateAvatar(data) {
    api.putAvatar(data)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  function handleAddPlaceSubmit(newCard) {
    api.getNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  const tokenCheck = () => {
    const jwt = localStorage.getItem('token');
    if (!jwt) {
      return;
    }

    authMesto
      .getContent(jwt)
      .then(({ data: { email } }) => {
        setUserInfo({ email });
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn]);

  const onLogin = ({ email, password }) => {
    return authMesto
      .authorize({ email, password })
      .then(({ token }) => {
        setUserInfo({ email });
        setInfoTooltipDone(true);
        setIsLoggedIn(true);        
        localStorage.setItem('token', token);
        history.push("/");
      })
      .catch((err) => {
        setIsInfoTooltip(true);
        console.log(`Ошибка: ${err}`);
      })
  };

  const onRegister = (data) => {
    return authMesto
      .register(data)
      .then(() => {
        setInfoTooltipDone(true);
        setIsInfoTooltip(true);
        setIsLoggedIn(true);      
        history.push('/');
      })
      .catch((err) => {
        setIsInfoTooltip(true);
        console.log(`Ошибка: ${err}`);
      })
  };


  const onLogOut = () => {
    setInfoTooltipDone(false);
    setIsLoggedIn(false);    
    localStorage.removeItem('token');
    history.push('/signin');
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>

        <Header
          isLoggedIn={isLoggedIn}
          onLogOut={onLogOut}
          email={userInfo.email}
        />

        <Switch>
          <ProtectedRoute
            exact path="/"
            isLoggedIn={isLoggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={setCardDelete}
            cardDeletePopup={handleDeleteCardClick}
          />

          <Route path='/signup'>
            <Register onRegister={onRegister} />
          </Route>

          <Route path="/signin">
            <Login onLogin={onLogin} />
          </Route>

          <Route>
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>

          <Footer />
        </Switch>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDelete={handleCardDelete}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltip}
          infoTooltipDone={infoTooltipDone}
        />


      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;