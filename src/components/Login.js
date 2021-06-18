import React from "react";
import AuthForm from "./AuthForm";

function Login({ onLogin }) {
    const [loginData, setLoginData] = React.useState({
        email: '', //"mail@maxtalanov.ru"
        password: '', //"qwerty"
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        onLogin(loginData);
        console.log(loginData)
    }

    const handleChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setLoginData({
            ...loginData ,
            [name]: value,
        });
    };
    return (
        <AuthForm
            title="Войти"
            submitTitle="Войти"
            submit={handleSubmit}
            onChange={handleChange}>
            <fieldset className="form__set">
                <input className="form__input" type="email" name="email" value={loginData.email} onChange={handleChange}
                       placeholder="E-mail" autoComplete="off" required/>
                {/*<span className="form-auth__error-span" id="" />*/}

                <input className="form__input" type="password" name="password" value={loginData.password} onChange={handleChange}
                       placeholder="Пароль" autoComplete="off" required/>
                {/*<span className="form-auth__error-span" id="" />*/}

            </fieldset>
        </AuthForm>
    );
}


export default Login;