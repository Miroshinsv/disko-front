import React from "react";

function Card({ name, img, isActive, onEditShedulerCardClick, dataSchedele, onScheduleClick}) {

    function clickEdit() {
      onScheduleClick();
      onEditShedulerCardClick(dataSchedele);
    }

    return (
        <div className="#">
          <img className="card__img" src={img}/>
            <h2 className="#">Название дискотеки: {name} </h2>
            <p>Активна/Не активна {isActive}</p>
            <button className="hover-opacity">+/-</button>
            <button className="hover-opacity" onClick={clickEdit}>Edit</button>
            <button className="hover-opacity">Trush</button>
        </div>
    );
}

export default Card;
