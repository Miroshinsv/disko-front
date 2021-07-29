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
}
