import React from "react";

function Card({ name, img, isActive, onEditShedulerCardClick, dataSchedele, onScheduleClick}) {

    function clickEdit() {
      onScheduleClick();
      onEditShedulerCardClick(dataSchedele);
    }

    return (
        <div className="card">
          <img className="card__img" src={img}/>
            <h2 className="card__title">Название дискотеки: {name} </h2>
            <p>{isActive? "Активна" : "Не активна"}</p>
            <button className="card__btn-active"/>
            <button className="card__btn-edit" onClick={clickEdit}/>
            <button className="card__btn-delete"/>
        </div>
    );
}

export default Card;
