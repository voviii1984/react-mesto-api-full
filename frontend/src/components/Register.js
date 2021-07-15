import { Link } from 'react-router-dom';
import {useState} from 'react';

function Register({ onRegister }) {
    const [registerData, setRegisterData] = useState({
      email: '',
      password: '',
    });
  
    const handleChange = (evt) => {
      const { name, value } = evt.target;
      setRegisterData({
        ...registerData,
        [name]: value,
      });
    };
  
    const handleSubmit = (evt) => {
        evt.preventDefault();
        onRegister(registerData);
      };
  


    return (
        <div className="register">
            <p className="register__welcome">Регистрация</p>
            <form onSubmit={handleSubmit} className="register__form">
                
                <input id="email" className="register__form-text" placeholder='Email'name="email" type="email" autoComplete="email" value={registerData.email || ""} required
               onChange={handleChange}/>

                <input id="password" className="register__form-text" placeholder='Пароль' name="password" type="password" autoComplete="new-password" value={registerData.password || ""}
               required
               onChange={handleChange}/>

                <button className="register__button">Зарегистрироваться</button>
            </form>

            <div className="register__signin">
                <p className="register__signin-text">Уже зарегистрированы?</p>
                <Link to="/signin" className="register__login-link">Войти</Link>
            </div>
        </div>
    )
}

export default Register;