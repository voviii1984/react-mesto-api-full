import logo from '../images/logo.svg';
import { Link, Route, Switch } from 'react-router-dom';

function Header(props) {
    return (
        <header className="header">
            <img src={logo} alt="Место" className="header__logo" />
            {props.isLoggedIn ? (
            <p className="header__text-email">{props.email}
            <Link to="/signin" className="header__text" onClick={props.onLogOut}>Выйти</Link>
            </p>
            ) : (
            <Switch>
                <Route path="/signup">
                    <Link to="/signin" className="header__text">Войти</Link>
                </Route>

                <Route path="/signin">
                    <Link to="/signup" className="header__text">Регистрация</Link>
                </Route>
            </Switch>
            )}
        </header>
    )
}

export default Header;