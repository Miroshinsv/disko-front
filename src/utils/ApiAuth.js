const checkResponse = res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} - ${res.statusText}.`);
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export const BASE_URL = 'https://mighty-beach-02870.herokuapp.com';

export const getAllData = () => {
  return Promise.all([])
}


// 1. Регистрация пользователя.
export const register = ({first_name, last_name, Email, Password, Phone, Role}) => {
  // console.log(`ApiAuth (func 1) | ${ Role, first_name, last_name, Email, Password, Phone }`);

  return fetch(`${BASE_URL}/auth/register/`, {
    method: "POST",
    headers,
    body: JSON.stringify({first_name, last_name, Email, Password, Phone, Role})
  }).then(checkResponse)
}

// 2. Авторизация пользователя.
export const login = ({email, password}) => {
  // console.log(`ApiAuth (func 2)| key: ${password}, user: ${email}`);
  return fetch(`${BASE_URL}/auth/login/`, {
    method: "POST",
    headers,
    body: JSON.stringify({email, password})
  }).then(checkResponse)
}

// 3. Получить дискотеки.
export const getContent = (xToken) => {
  // console.log(`ApiAuth (func 3)| token: ${xToken}`);
  return fetch(`${BASE_URL}/events/get/all/`, {
    method: "GET",
    headers: {
      ...headers,
      "X-Token": xToken,
    }
  }).then(checkResponse)
}

// 4. Добавить дискотеку
export const addNewEvent = ({discoteca, day, address, time, avatar, price, is_active, lng, lat}, xToken) => {
  // console.log(discoteca, day, address, time, avatar, price, is_active, 'test11');
  console.log(day, 'день')
  console.log(xToken);
  return fetch(`${BASE_URL}/events/add/`, {
    method: "POST",
    headers: {
      ...headers,
      "X-Token": xToken,
    },
    body: JSON.stringify({
      days: day,
      description: address,
      is_active: is_active,
      logo: avatar,
      price: price,
      start_time: time,
      name: discoteca,
      lat: lat,
      lng: lng,
      type_id: 11
    })
  }).then(checkResponse)
}

// 5. Редактировать расписание
export const updateEvent = ({discoteca, day, address, time, avatar, price, is_active,}, {id}, xToken) => {
  console.log(`${BASE_URL}/events/update/${id}/`);
  console.log(id)
  return fetch(`${BASE_URL}/events/update/${id}/`, {
    method: "POST",
    headers: {
      ...headers,
      "X-Token": xToken,
    },
    body: JSON.stringify({
      days: day.value,
      description: address,
      is_active: is_active,
      logo: avatar,
      price: price,
      start_time: time,
      name: discoteca,
      lat: null,
      lng: null,
      type_id: 11
    })
  }).then(checkResponse)
}
//7. Состояние активности карточки расписания
export const onActive = ({ID, is_active}, xToken) => {
  // console.log('АПИ', is_active, ID)
  console.log('АПИ Токен', xToken)
  const linkActive = is_active ? 'deactivate' : 'activate';

  console.log(`${BASE_URL}/events/${linkActive}/${ID}/`, 'test link');

  return fetch(`${BASE_URL}/events/${linkActive}/${ID}/`, {
    method: "POST",
    headers: {
      ...headers,
      "X-Token": xToken,
    }
  }).then(checkResponse)
}
