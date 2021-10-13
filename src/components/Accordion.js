import React from "react";
import Card from "./Card";

function Accordion (props) {
  const [isActive, setIsActive] = React.useState(false);

  return(
    <div className="accordion">
      <div className="accordion__title-item">
        <h2 className="accordion__title">'Заголовок'</h2>
        <button className="accordion__button" onClick={() => setIsActive(!isActive)}>
          {isActive? '▲' :	'▼'}
        </button>
      </div>
      <div className="accordion__content">
        {isActive && <Card />}
      </div>
    </div>
  )
}

export default Accordion;
