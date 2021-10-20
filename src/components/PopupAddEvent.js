import React from "react"
import CheckboxSlider from "./CheckboxSlider";
import {YMaps, Map, Placemark} from "react-yandex-maps"
import {days, directoryHTTP} from "../utils/constants";
import * as ApiYandexMap from "../utils/ApiYandexMap";
import address from "address";

function PopupAddEvent({formTitle, isOpen, onClose, onAddCard, addressYndex, suggester, eventTypes}) {
  console.log(addressYndex, 'Адресс Яндекс');
  const [stateMap, setStateMap] = React.useState();
  const [placemarks, setPlacemarks] = React.useState([]);
  const [dataLocation, setDataLocation] = React.useState({
    address: '',
  })
  console.log(dataLocation, 'Адрес')
  const [dataForm, setDataForm] = React.useState({
    discoteca: '',
    address: '',
    time: '',
    price: '',
    avatar: '',
    city: {value: '1'},
    day: {value: 'monday'},
    is_active: true,
    type_id: {value: 10}
  });
  const [dataCordinat, setDataCordinat] = React.useState({
    geometry: [],
    lat: '',
    lng: '',
    // city: '1',
  });

  const classOpen = isOpen ? 'popup_opened' : '';
  const defaultMap = {
    center: [37.644899, 55.716798],
    zoom: 1
  };
  const listDays = days.map(day =>
    <option className="select__options" value={day.value}>{day.text}</option>
  );
  const listTypes = eventTypes.map(type =>
    <option value={type.ID}>{type.EventsTypeName}</option>
  );
  const listPlacemark = placemarks.map((m) => {
    return m;
  });

  React.useEffect(() =>{
    setDataLocation({
      address: addressYndex,
    });
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

        const coordinate = points.join().split(' ');
        setDataCordinat( { lat: coordinate[1], lng: coordinate[0]});
        setPlacemarks([<Placemark
          key={0}
          geometry={[coordinate[1], coordinate[0]]}
        />]);
        setStateMap({center: [coordinate[1], coordinate[0]], zoom: 15})
      })
      .catch((err) => {
        console.log('Код ошибки:', err);
        console.log(`Справочник ошибок ${directoryHTTP}`)
      });
  }, [dataForm.address])

  const handleOnClick = () => {
    onClose();
    setDataForm({
        discoteca: '',
        address: '',
        time: '',
        price: '',
        avatar: '',
        city: {value: '1'},
        day: {value: 'monday'},
        is_active: true,
        type_id: {value: 10}
      });
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setDataForm({
      ...dataForm,
      [name]: value,
    });

    setDataLocation({
      ...dataLocation,
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

  }

  return (
    <section className={`popup ${classOpen}`}>
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form__title">{formTitle}</h2>

        <fieldset className="form__set scrollbar">
          <select className="select form__event-type" name="type_id" onChange={handleChange} value={dataForm.type_id}>
            {listTypes}
          </select>

          <input className="form__input form__name-event" id="" type="text" name="discoteca"
                 placeholder="Название дискотеки" onChange={handleChange} value={dataForm.discoteca}/>
          {/*<span className="form__error-span" id="" />*/}

          <input className="form__input form__address" type="text" id="suggest" name="address"
                 placeholder="Адрес" onChange={handleChange} value={dataLocation.address} />
          <div className="form__maps">
            <YMaps>
              <Map
                width='auto'
                height='220px'
                onLoad={(ymaps) => suggester(ymaps)}
                defaultState={defaultMap}
                state={stateMap}
                modules={["SuggestView"]}
              >
                {listPlacemark}
              </Map>
            </YMaps>
          </div>
          {/*<span className="form__error-span" id="" />*/}

          <select className="select form__day" name="day" onChange={handleChange} value={dataForm.day}>
            {listDays}
          </select>

          <input className="form__input form__time" id="time" type="time" name="time"
                 placeholder="Время" onChange={handleChange} value={dataForm.time}/>
          {/*<span className="form__error-span" id="" />*/}

          <input className="form__input form__price" id="" type="text" step="1" name="price"
                 placeholder="Стоимость" onChange={handleChange} value={dataForm.price}/>
          {/*<span className="form__error-span" id="" />*/}

          <input className="form__input form__in-link" id="avatar-link" type="url" name="avatar"
                 placeholder="Ссылка на аватар" onChange={handleChange} value={dataForm.avatar}/>
          {/*<span className="form__error-span" id="avatar-link-error" />*/}

          {/*<label className="form__label form__action">Активна:</label>*/}
          {/*<input type="checkbox" name="is_active" onChange={handleChange} checked={dataForm.is_active}/>*/}

          <CheckboxSlider label="Активна" name="is_active" onChange={handleChange} checked={dataForm.is_active}/>
        </fieldset>
        <input className="form__btn-submit hover-opacity" type="submit" name="submit" value="Добавить мероприятие"/>
        <button className="form__btn-exit" type="reset" onClick={handleOnClick}/>
      </form>
    </section>
  );
}

export default PopupAddEvent;
