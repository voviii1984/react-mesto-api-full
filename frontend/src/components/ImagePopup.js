function ImagePopup ({card, onClose}) {
    return (
        <section className={`popup popup_type_image ${card ? 'popup_opened' : ''}`}>      
        <div className="image-container">        
          <button onClick={onClose} type="button" id="closeImageButton" className="popup__close"></button>
          <img src={card?.link} alt={card?.name} className="image-container__card" />
          <h2 className="image-container__text">{card?.name}</h2>
        </div>      
    </section>
    )
}

export default ImagePopup;