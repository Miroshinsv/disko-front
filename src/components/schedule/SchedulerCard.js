import React from "react";
import Card from "../Card";

function ScheduleCard({ item }) {

  return(
    <Card key={item.value.ID}
          name={item.value.name}
          img={item.value.logo}
          isActive={item.value.is_active}
          // onScheduleClick={editSchedulePopupClick}
          // onEditShedulerCardClick={onEditShedulerCardClick}
          dataSchedele={item.value}
          // onCardActiveClick={onCardActiveClick}
          // onCardDelete={onCardDelete}
    />
  );
}

export default ScheduleCard;
