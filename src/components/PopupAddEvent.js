import React from "react";


function PopupAddEvent({ formTitle, isOpen, onClose, onAddCard }) {
    const classOpen = isOpen? 'popup_opened' : '';
    const [dataForm, setDataForm] =  React.useState({
        discoteca: '',
        address: '',
        time: '',
        price: '',
        avatar: '',
        day: {value: 'monday'},
        is_active: false,
        lat: null,
        lng: null,
        type_id: 11
    });

    const handleChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setDataForm({
            ...dataForm ,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        onAddCard(dataForm);

        console.log(dataForm);
    }

    return (
        <section className={`popup ${classOpen}`}>
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="form__title">{formTitle}</h2>

                <fieldset className="form__set">
                    <input className="form__input form__name-event" id="" type="text" name="discoteca"
                           placeholder="Название дискотеки" onChange={handleChange} value={dataForm.discoteca}/>
                    <span className="form__error-span" id="" />

                    <input className="form__input form__address" id="" type="text" name="address"
                           placeholder="Адрес" onChange={handleChange} value={dataForm.address}/>
                    <span className="form__error-span" id="" />

                    <select className="form__input form__day" name="day" onChange={handleChange} value={dataForm.day}>
                        <option value="monday">Понедельник</option>
                        <option value="tuesday">Вторник</option>
                        <option value="wednesday">Среда</option>
                        <option value="thursday">Четверг</option>
                        <option value="fridayi">Пятница</option>
                        <option value="saturday">Суббота</option>
                        <option value="sunday">Воскресенье</option>
                    </select>

                    <input className="form__input form__time" id="time" type="time" name="time"
                           placeholder="Время" onChange={handleChange} value={dataForm.time}/>
                    <span className="form__error-span" id="" />

                    <input className="form__input form__price" id="" type="number" step="1" name="price"
                           placeholder="Стоимотсть" onChange={handleChange} value={dataForm.price}/>
                    <span className="form__error-span" id="" />

                    <input className="form__input form__in-link" id="avatar-link" type="url" name="avatar"
                           placeholder="Ссылка на аватар" onChange={handleChange} value={dataForm.avatar}/>
                    <span className="form__error-span" id="avatar-link-error" />

                    <label className="form__input form__action">Активна:</label>
                    <input type="checkbox" name="is_active" onChange={handleChange} checked={dataForm.is_active}/>

                </fieldset>
                <input className="form__btn-exit hover-opacity" type="submit" name="submit" value="Отредактировать дискотеку" />
                <button className="form__btn-exit hover-opacity"  type="reset" onClick={onClose}>Закрыть</button>
            </form>
        </section>
    );
}

export default PopupAddEvent;
