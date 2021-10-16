import React from "react";
import SchedulerCard from "./SchedulerCard";

function ScheduleDay(weekDay, events) {
  // onClick={addDaysCardPopupClick}
  return(
    <section className="week-day">
      <h2 className="week-day__title" >{weekDay}</h2>
      <div className="container">
        {
          events.map(item =>
            <SchedulerCard item={item}/>
          )
        }
      </div>
    </section>
  );
}

export default ScheduleDay;
