const checkResponse = res => res.ok  ? res.json() : Promise.reject(`Ошибка: ${res.status} - ${res.statusText}.`);
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

export const BASE_URL = 'https://mighty-beach-02870.herokuapp.com';


// 1. Регистрация пользователя.
export const register = ({first_name, last_name, Email, Password, Phone, Role}) => {
    console.log(`ApiAuth (func 1) | ${ first_name, last_name, Email, Password, Phone, Role }`);

    return fetch(`${BASE_URL}/auth/register/`, {
        mode: "no-cors",
        method: "POST",
        headers,
        body: JSON.stringify({first_name, last_name, Email, Password, Phone, Role})
    }).then(checkResponse)
}

// 2. Авторизация пользователя.
export const login = ({email, password}) => {
    console.log(`ApiAuth (func 2)| key: ${password}, user: ${email}`);
    return fetch(`${BASE_URL}/auth/login/`, {
        method: "POST",
        headers,
        body: JSON.stringify({ email, password })
    }).then(checkResponse)
}

// 3. Проверка токена.
export const getContent = (jwt) => {
    // console.log(`ApiAuth (func 3)| token: ${jwt}`);
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            ...headers,
            'Authorization': `Bearer ${jwt}`
        }
    }).then(checkResponse)
}
