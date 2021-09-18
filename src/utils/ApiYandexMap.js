
const checkResponse = res => res.ok  ? res.json() : Promise.reject(`Ошибка: ${res.status} - ${res.statusText}.`);

export const config = {
  url: 'https://geocode-maps.yandex.ru/1.x',
  apikey: '?apikey=42dfc515-9887-4dcc-8ae2-e9da688cf1d2', //ключ доступа
  lang: 'lang=ru_RU', //Язык ответа
  format: 'format=json', //Формат ответа
  //geocode: '', //парсится из адресного инпута

}

export const getJsonYMap = (geocode) => {
  console.log('getJsonYMap', `${config.url}/${config.apikey}&${config.lang}`)
  return fetch(`${config.url}/${config.apikey}&${config.lang}&${config.format}&geocode=${geocode}`, {
    method: "GET",
  }).then(checkResponse)
}
