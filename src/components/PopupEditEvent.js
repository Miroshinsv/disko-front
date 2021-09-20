import React from "react";
import {days, directoryHTTP} from "../utils/constants";
import * as ApiYandexMap from "../utils/ApiYandexMap";

function PopupEditEvent({ formTitle, isOpen, onClose, schedule, onUpdateSchedule }) {
  const listDays = days.map(day =>
    <option value={day.value}>{day.text}</option>
  );
  const classOpen = isOpen ? 'popup_opened' : '';
  const [id, setId] = React.useState({ id: '' });
  const [dataForm, setDataForm] = React.useState({
    discoteca: '',
    address: '',
    time: '',
    price: '',
    avatar: '',
    day: { value: '' },
    is_active: true,
    type_id: 11,
  });

  const [dataCordinat, setDataCordinat] = React.useState({
    lat: '',
    lng: '',
    city: '1',
  })

  React.useEffect(() => {
    setDataForm({
      discoteca: schedule.name,
      address: schedule.description,
      time: schedule.start_time,
      price: schedule.price,
      avatar: schedule.logo,
      day: { value: schedule.days },
      is_active: schedule.is_active,
    })
  }, [schedule]);

  React.useEffect(() => {
    setId({
      id: schedule.ID,
    })
  }, [schedule])

  // React.useEffect(() => {
  //   if (dataForm.address.length === 0 || 'undefined' === typeof dataForm.address) {
  //     return;
  //   }
  //   ApiYandexMap.getJsonYMap(dataForm.address)
  //     .then((dataMap) => {
  //       const points = dataMap.response.GeoObjectCollection.featureMember.map((m) => {
  //         return m.GeoObject.Point.pos;
  //       });
  //       const test = points.join().split(' ')
  //       setDataCordinat( { lat: test[1], lng: test[0] });
  //       console.log(dataMap);
  //     })
  //     .catch((err) => {
  //       console.log('Код ошибки:', err);
  //       console.log(`Справочник ошибок ${directoryHTTP}`)
  //     });
  // }, [dataForm.address])

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    onUpdateSchedule(dataForm, id);
    console.log(dataForm, id);
  }

  return (
    <section className={`popup ${classOpen}`}>
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form__title">{formTitle}</h2>

        <fieldset className="form__set scrollbar">
          <label className="form__label">Название:</label>
          <input className="form__input form__name-event" id="" type="text" name="discoteca"
            placeholder="Название дискотеки" onChange={handleChange} value={dataForm.discoteca} />
          {/*<span className="form__error-span" id="" />*/}

          <label className="form__label">Адрес:</label>
          <input className="form__input form__address" id="" type="text" name="address"
            placeholder="Адрес" onChange={handleChange} value={dataForm.address} />
          {/*<span className="form__error-span" id="" />*/}

          {/*dataForm.day = {'value': ''};*/}
          {/*dataForm.day.value = '';*/}

          <label className="form__label">День:</label>
          <select className="form__input form__day" name="day" onChange={handleChange} value={dataForm.day.value}>
            {listDays}
          </select>

          <label className="form__label">Время:</label>
          <input className="form__input form__time" id="time" type="text" name="time"
            placeholder="Время" onChange={handleChange} value={dataForm.time} />
          {/*<span className="form__error-span" id="" />*/}

          <label className="form__label">Стоимость:</label>
          <input className="form__input form__price" id="" type="text" step="1" name="price"
                 placeholder="Стоимотсть" onChange={handleChange} value={dataForm.price}/>
          {/*<span className="form__error-span" id="" />*/}

          <label className="form__label">Обложка:</label>
          <input className="form__input form__in-link" id="avatar-link" type="url" name="avatar"
            placeholder="Ссылка на аватар" onChange={handleChange} value={dataForm.avatar} />
          {/*<span className="form__error-span" id="avatar-link-error" />*/}

          <label className="form__label">Активна:</label>
          <input type="checkbox" name="is_active" onChange={handleChange} checked={dataForm.is_active} />

        </fieldset>
        <input className="form__btn-submit" type="submit" name="submit" value="Редактировать" />
        <button className="form__btn-exit" type="reset" onClick={onClose} />
      </form>
    </section>
  );
}

export default PopupEditEvent;
