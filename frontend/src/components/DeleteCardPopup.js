import PopupWithForm from './PopupWithForm'

function DeleteCardPopup(props){
    function handleSubmit(evt) {
        evt.preventDefault();
        props.onDelete();
    }

    return (
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} name='delete' title='Вы уверены?' nameButton='Да' />
    )
}

export default DeleteCardPopup