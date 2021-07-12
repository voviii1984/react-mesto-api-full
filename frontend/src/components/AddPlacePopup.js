import PopupWithForm from './PopupWithForm';
import { useEffect, useState } from 'react'

function AddPlacePopup(props) {
    const [nameCard, setCardName] = useState('');
    const [linkCard, setLinkCard] = useState('');

    useEffect(() => {
        setCardName('');
        setLinkCard('')
    }, [props.isOpen]);

    function changeNameCard(evt) {
        setCardName(evt.target.value)
    }

    function changeLinkCard(evt) {
        setLinkCard(evt.target.value)
    }

    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onAddPlace({
            name: nameCard,
            link: linkCard,
        });
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} name='add-card' title='Новое место' isOpen={props.isOpen} onClose={props.onClose} nameButton='Создать' >
            <fieldset className="form-mesto">
                <input value={nameCard || ''} onChange={changeNameCard} type="text" id="addName" required minLength="2" maxLength="30" className="form-text" placeholder="Название" />
                <span id="addNameError" className="error"></span>
                <input value={linkCard || ''} onChange={changeLinkCard} type="url" id="addImage" required className="form-text" placeholder="Ссылка на картинку" />
                <span id="addImageError" className="error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default AddPlacePopup;