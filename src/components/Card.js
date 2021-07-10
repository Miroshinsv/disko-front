import React from "react";

function Card({ name, isActive, img, onEditShedulerCardClick, dataSchedele, onScheduleClick, onCardActiveClick}) {

    function clickEdit() {
      onScheduleClick();
      onEditShedulerCardClick(dataSchedele);
    }
    function clickActive() {
      onCardActiveClick(dataSchedele);
    }

    const classActive =  isActive? 'card__btn-active' : 'card__btn-deactivate';

    return (
        <div className="card">
          <img className="card__img" src={img}/>
            <h2 className="card__title">Название дискотеки: {name} </h2>
            <p>{isActive? "Активна" : "Не активна"}</p>
            <button className={`${classActive}`} onClick={clickActive}/>
            <button className="card__btn-edit" onClick={clickEdit}/>
            <button className="card__btn-delete"/>
        </div>
    );
}

export default Card;
