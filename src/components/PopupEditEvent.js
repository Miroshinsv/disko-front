import React from "react";

function PopupEditEvent({ formTitle, isOpen, onClose, schedule, onUpdateSchedule }) {
  console.log('schedule', schedule);
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
    lat: null,
    lng: null,
    type_id: 11,
  });
  console.log(dataForm)

  React.useEffect(() => {
    console.log(schedule.days);
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

        <fieldset className="form__set test">
          <label className="form__input form__action">Название:</label>
          <input className="form__input form__name-event" id="" type="text" name="discoteca"
            placeholder="Название дискотеки" onChange={handleChange} value={dataForm.discoteca} />
          {/*<span className="form__error-span" id="" />*/}

          <label className="form__input form__action">Адрес:</label>
          <input className="form__input form__address" id="" type="text" name="address"
            placeholder="Адрес" onChange={handleChange} value={dataForm.address} />
          {/*<span className="form__error-span" id="" />*/}

          {/*dataForm.day = {'value': ''};*/}
          {/*dataForm.day.value = '';*/}
          <label className="form__input form__action">День:</label>
          <select className="form__input form__day" name="day" onChange={handleChange} value={dataForm.day.value}>
            <option value="monday">Понедельник</option>
            <option value="tuesday">Вторник</option>
            <option value="wednesday">Среда</option>
            <option value="thursday">Четверг</option>
            <option value="friday">Пятница</option>
            <option value="saturday">Суббота</option>
            <option value="sunday">Воскресенье</option>
          </select>

          <label className="form__input form__action">Время:</label>
          <input className="form__input form__time" id="time" type="time" name="time"
            placeholder="Время" onChange={handleChange} value={dataForm.time} />
          {/*<span className="form__error-span" id="" />*/}

          <label className="form__input form__action">Стоимость:</label>
          <input className="form__input form__price" id="" type="number" step="1" name="price"
            placeholder="Стоимотсть" onChange={handleChange} value={dataForm.price} />
          {/*<span className="form__error-span" id="" />*/}

          <label className="form__input form__action">Обложка:</label>
          <input className="form__input form__in-link" id="avatar-link" type="url" name="avatar"
            placeholder="Ссылка на аватар" onChange={handleChange} value={dataForm.avatar} />
          {/*<span className="form__error-span" id="avatar-link-error" />*/}

          <label className="form__input form__action">Активна:</label>
          <input type="checkbox" name="is_active" onChange={handleChange} checked={dataForm.is_active} />

        </fieldset>
        <input className="form__btn-submit" type="submit" name="submit" value="Редактировать" />
        <button className="form__btn-exit" type="reset" onClick={onClose} />
      </form>
    </section>
  );
}

export default PopupEditEvent;
