import React, {useEffect} from "react"
import {YMaps, Map, Placemark} from "react-yandex-maps"
import {days, directoryHTTP} from "../utils/constants";
import * as ApiYandexMap from "../utils/ApiYandexMap";

function PopupAddEvent({formTitle, isOpen, onClose, onAddCard, addressYndex, suggester}) {

  const listDays = days.map(day =>
    <option value={day.value}>{day.text}</option>
  );
  const classOpen = isOpen ? 'popup_opened' : '';
  const [dataForm, setDataForm] = React.useState({
    discoteca: '',
    address: '',
    time: '',
    price: '',
    avatar: '',
    city: {value: '1'},
    day: {value: 'monday'},
    is_active: false,
    type_id: 11
  });

  const [dataCordinat, setDataCordinat] = React.useState({
    lat: '',
    lng: '',
    // city: '1',
  })

  console.log(dataCordinat.lng, 'кординаты Y');
  console.log(dataCordinat.lat, 'кординаты X');
  // console.log(dataForm)
  // console.log(dataForm, 'state');

  useEffect(() =>{
    setDataForm({
      address: addressYndex,
    })
  }, [addressYndex])

  React.useEffect(() => {
    if (dataForm.address.length === 0 || 'undefined' === typeof dataForm.address) {
      return;
    }
    ApiYandexMap.getJsonYMap(dataForm.address)
      .then((dataMap) => {
        const points = dataMap.response.GeoObjectCollection.featureMember.map((m) => {
          return m.GeoObject.Point.pos;
        });
        const test = points.join().split(' ')
        console.log(test[1], test[0], 'test');
        setDataCordinat( { lat: test[1], lng: test[0] });
        // console.log(dataMap);
      })
      .catch((err) => {
        console.log('Код ошибки:', err);
        console.log(`Справочник ошибок ${directoryHTTP}`)
      });
  }, [dataForm.address])


  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  //Обработчик отправки ф-мы
  const handleSubmit = (e) => {
    e.preventDefault()

    onAddCard({
      discoteca: dataForm.discoteca,
      address: dataForm.address,
      time: dataForm.time,
      price: dataForm.price,
      avatar: dataForm.avatar,
      city: dataForm.city,
      day: dataForm.day,
      is_active: dataForm.is_active,
      type_id: dataForm.type_id,
      lat: parseFloat(dataCordinat.lat),
      lng: parseFloat(dataCordinat.lng),
    });

    // console.log(dataForm, dataCordinat, '1');
  }

  return (
    <section className={`popup ${classOpen}`}>
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form__title">{formTitle}</h2>

        <fieldset className="form__set scrollbar">
          <input className="form__input form__name-event" id="" type="text" name="discoteca"
                 placeholder="Название дискотеки" onChange={handleChange} value={dataForm.discoteca}/>
          {/*<span className="form__error-span" id="" />*/}

          <input className="form__input form__address" type="text" id="suggest" name="address"
                 placeholder="Адрес" onChange={handleChange} value={dataForm.address} />
          <div className="form__maps">
            <YMaps>
              <Map
                width='auto'
                height='220px'
                onLoad={(ymaps) => suggester(ymaps)}
                defaultState={{center: [55.751574, 37.573856], zoom: 9}}
                modules={["SuggestView"]}
              >
                <Placemark geometry={[dataCordinat.lng, dataCordinat.lng]} />
              </Map>
            </YMaps>
          </div>
          {/*<span className="form__error-span" id="" />*/}

          <select className="form__input form__day" name="day" onChange={handleChange} value={dataForm.day}>
            {listDays}
          </select>

          <input className="form__input form__time" id="time" type="time" name="time"
                 placeholder="Время" onChange={handleChange} value={dataForm.time}/>
          {/*<span className="form__error-span" id="" />*/}

          <input className="form__input form__price" id="" type="number" step="1" name="price"
                 placeholder="Стоимость" onChange={handleChange} value={dataForm.price}/>
          {/*<span className="form__error-span" id="" />*/}

          <input className="form__input form__in-link" id="avatar-link" type="url" name="avatar"
                 placeholder="Ссылка на аватар" onChange={handleChange} value={dataForm.avatar}/>
          {/*<span className="form__error-span" id="avatar-link-error" />*/}

          <label className="form__input form__action">Активна:</label>
          <input type="checkbox" name="is_active" onChange={handleChange} checked={dataForm.is_active}/>

        </fieldset>
        <input className="form__btn-submit hover-opacity" type="submit" name="submit" value="Добавить мероприятие"/>
        <button className="form__btn-exit" type="reset" onClick={onClose}/>
      </form>
    </section>
  );
}

export default PopupAddEvent;
