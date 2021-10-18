import React from "react";
import {days} from "../../utils/constants";

function ScheduleDay({events}) {
 // events - это key, value.


  const renderItem = (events) => {
    Object.entries(events).map(([key, value]) => {
      return(
        <section className="week-day">
        <h2>{days[key]}</h2>
      </section>
      )
    })
  }
  // console.log(renderItem());


  return (
    {renderItem}
  );
}

export default ScheduleDay;
