import {useState} from 'react';

function Login({ onLogin }) {

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
      });
    
      const handleChange = (evt) => {
        const { name, value } = evt.target;
        setLoginData({
          ...loginData,
          [name]: value,
        });
      };

      const handleSubmit = (evt) => {
        evt.preventDefault();
        onLogin(loginData);
      };

    return (
        <div className="register">
            <p className="register__welcome">Вход</p>
            <form onSubmit={handleSubmit} className="register__form">
                
                <input id="email" className="register__form-text" placeholder='Email' required name="email" type="text" autoComplete="email" value={loginData.email || ""}
               onChange={handleChange}/>

                <input id="password" className="register__form-text" placeholder='Пароль' required name="password" type="password" autoComplete="password"
               value={loginData.password || ""} onChange={handleChange}/>

                <button className="register__button">Войти</button>
            </form>

            
        </div>
    )
}

export default Login;