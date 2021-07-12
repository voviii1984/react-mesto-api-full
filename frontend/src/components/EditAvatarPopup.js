import { useEffect, useRef } from 'react'
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const avatarRef = useRef();

    useEffect(() => {
        avatarRef.current.value = ''
    }, [props.isOpen])

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} name='avatar' title='Обновить аватар' isOpen={props.isOpen} onClose={props.onClose} nameButton='Сохранить'>
            <fieldset className="form-avatar">
                <input ref={avatarRef} type="url" id="addAvatar" required className="form-text" placeholder="Аватар" />
                <span id="addAvatarError" className="error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;