import React from "react";
import SchedulerCard from "./SchedulerCard";

function ScheduleDay(weekDay, events) {
  // onClick={addDaysCardPopupClick}
console.log(weekDay)
  // const week = weekDay.map(d => <h2 className="week-day__title" >{d}</h2>)

  return(
    <section className="week-day">
      {/*{week}*/}
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
