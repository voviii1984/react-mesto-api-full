import unionDone from '../images/uniondone.png';
import unionWrong from '../images/unionwrong.png'

function InfoTooltip(props) {
    return (

        <section className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <img className="popup__container-tooltip" src={props.infoTooltipDone ? unionDone : unionWrong} />
                <h2 className="popup__container-title popup__container-title_tooltip">{props.infoTooltipDone ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>

                <button onClick={props.onClose} type="reset" className="popup__close"></button>
            </div>
        </section>
    )
}

export default InfoTooltip;