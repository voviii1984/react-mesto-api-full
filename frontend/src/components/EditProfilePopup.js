import PopupWithForm from './PopupWithForm';
import {useEffect, useState, useContext} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function changeName(evt) {
        setName(evt.target.value)
    }

    function changeDescription(evt) {
        setDescription(evt.target.value)
    }

    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
          name,
          about: description,
        });
      } 

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser, props.isOpen]);

    return(
    <PopupWithForm onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} name='edit' title='Редактировать профиль' nameButton='Сохранить' >
        <fieldset className="form">
            <input value={name || ''} onChange={changeName} type="text" id="inputName" minLength="2" maxLength="40" name="username" required placeholder="Фамилия Имя Отчество" className="form-text" />
            <span id="inputNameError" className="error"></span>
            <input value={description || ''} onChange={changeDescription} type="text" id="inputJob" minLength="2" maxLength="200" required placeholder="Место работы" className="form-text" />
            <span id="inputJobError" className="error"></span>
        </fieldset>
    </PopupWithForm>
    )
}

export default EditProfilePopup;