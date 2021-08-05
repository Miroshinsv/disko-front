import React from "react";

function Card({ name, isActive, img, onEditShedulerCardClick, dataSchedele, onScheduleClick, onCardActiveClick, onCardDelete}) {
  const classActive =  isActive? 'card__btn-active' : 'card__btn-deactivate';

  function clickEdit() {
    onScheduleClick();
    onEditShedulerCardClick(dataSchedele);
  }

  function clickActive() {
    onCardActiveClick(dataSchedele);
    console.log('Событие клик "btn Active Status"')
  }

  function clickDelete() {
    onCardDelete(dataSchedele)
    console.log('Событие клик "btn card delete"')
  }

  return (
    <div className="card">
      <img className="card__img" alt={'Автар проекта' + name} src={img}/>
      <p className={`card__action card__action_${isActive?'active':'deactivate'}`}>{isActive? "Активна" : "Не активна"}</p>
      <h2 className="card__title">Название дискотеки: {name} </h2>
      <button className={`${classActive}`} onClick={clickActive}/>
      <button className="card__btn-edit" onClick={clickEdit}/>
      <button className="card__btn-delete" onClick={clickDelete}/>
    </div>
  );
}

export default Card;
