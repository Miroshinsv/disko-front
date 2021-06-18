import React from "react";
import AuthForm from "./AuthForm";

function Register({onRegister}) {
    const [registerData, setRegisterData] = React.useState({
        first_name: '', //"Имя"
        last_name: '', // "Фамилия"
        Email: '', //"mail@maxtalanov.ru"
        Password: '', //"qwerty"
        Phone: '', // "Телефон"
        Role: 12, // "Тип аккаунта"
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        onRegister(registerData);
        console.log(registerData)
    }

    const handleChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setRegisterData({
            ...registerData ,
            [name]: value,
        });
    };

    return (
        <AuthForm
            title="Регистрация"
            submitTitle="Зарегистрироваться"
            submit={handleSubmit}
            onChange={handleChange}
            registerData={registerData}
        >
            <fieldset className="form__set">
                <input className="form__input" id="first_name" type="text" name="first_name" value={registerData.first_name} onChange={handleChange}
                       placeholder="Ваше имя" autoComplete="off" required/>
                <span className="form__error-span" id="" />

                <input className="form__input" id="last_name" type="text" name="last_name" value={registerData.last_name} onChange={handleChange}
                       placeholder="Ваша фамилия" autoComplete="off" required/>
                <span className="form__error-span" id="" />

                <input className="form__input" id="email" type="email" name="Email" value={registerData.Email} onChange={handleChange}
                       placeholder="Ваш e-mail" autoComplete="off" required/>
                <span className="form__error-span" id="" />

                <input className="form__input" id="password" type="password" name="Password" value={registerData.Password} onChange={handleChange}
                       placeholder="Ваш пароль" autoComplete="off" required/>
                <span className="form__error-span" id="" />

                <input className="form__input" id="phone" type="tel" name="Phone" value={registerData.Phone} onChange={handleChange}
                       placeholder="Ваш номер телефона" autoComplete="off" required/>
                <span className="form__error-span" id="" />

            </fieldset>
        </AuthForm>
    );
}


export default Register;