import React from "react";

function Card({ name, img, isActive, onScheduleClick}) {
    console.log(onScheduleClick, 'click')
    return (
        <div className="#">
          <img className="card__img" src={img}/>
            <h2 className="#">Название дискотеки: {name} </h2>
            <p>Активна/Не активна {isActive}</p>
            <button className="hover-opacity">+/-</button>
            <button className="hover-opacity" onClick={onScheduleClick}>Edit</button>
            <button className="hover-opacity">Trush</button>
        </div>
    );
}

export default Card;
