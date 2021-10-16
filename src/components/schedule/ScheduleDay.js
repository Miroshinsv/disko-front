import React from "react";

function ScheduleDay({events}) {
  // console.log(events);

  function renderItem() {
    Object.keys(events => {
      return(key);
    });
  }
  console.log(renderItem());


  return (
    <section className="week-day">
      <h2 className="week-day__title">Понедельник</h2>
      <div className="container">
        {
          weeks['monday'].map(item =>
            <SchedulerCard item={item}/>
          )
        }
      </div>
    </section>
  );
}

export default ScheduleDay;
