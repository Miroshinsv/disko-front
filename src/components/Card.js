import React from "react";

function Card({title}) {

    return (
        <div className="#">
            <h2 className="#">Название дискотеки: {title} </h2> {/* прокинуть props.title */}
            <p>Активна/Не активна</p>
            <button className="hover-opacity">+/-</button>
            <button className="hover-opacity">Edit</button>
            <button className="hover-opacity">Trush</button>
        </div>
    );
}

export default Card;