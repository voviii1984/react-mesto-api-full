function PopupWithForm(props) {
    return (
        <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                
                <h2 className="popup__container-title">{props.title}</h2>
                <form onSubmit={props.onSubmit} className="popup__form">
                {props.children}
                <button type="submit" className="popup__button form__submit popup__button-check" >{props.nameButton}</button>
                </form>
                <button onClick={props.onClose} type="reset" className="popup__close"></button>
            </div>
        </section>
    )
}

export default PopupWithForm;