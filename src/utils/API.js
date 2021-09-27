const checkResponse = res => res.ok  ? res.json() : Promise.reject(`Ошибка: ${res.status} - ${res.statusText}.`);

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export const BASE_URL = 'https://mighty-beach-02870.herokuapp.com';

//Получить список городов
export const pullCities = () => {
  // console.log('API: CITIES')

  return fetch(`${BASE_URL}/city/all/`, {
    method: "GET",
    headers: {
      headers,
    }
  }).then(checkResponse)
};

// Получить список типов эвентов
export const pullTypesEvent = (xToken) => {
  return fetch(`${BASE_URL}/events/types/all/`, {
    method: "GET",
    headers: {
      ...headers,
      "X-Token": xToken,
    }
  }).then(checkResponse)
};

// Состояние активности карточки расписания
export const onActive = ({ID, is_active}, xToken) => {

  const linkActive = is_active? 'deactivate' : 'active';
  return fetch(`${BASE_URL}/events/${linkActive}/${ID}/`, {
    method: "POST",
    headers: {
      ...headers,
      "X-Token": xToken,
    }
  }).then(checkResponse)
};


// Состояние активности карточки расписания
export const scheduleDelete = ({ID}, xToken) => {

  return fetch(`${BASE_URL}/events/disband/${ID}/`, {
    method: "POST",
    headers: {
      ...headers,
      "X-Token": xToken,
    }
  }).then(checkResponse)
};

