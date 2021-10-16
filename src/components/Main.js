import React from "react";
import Accordion from "./Accordion";
import Header from "./Header.js";
import Card from "./Card";
import SchedulerCard from "./schedule/SchedulerCard";
import ScheduleDay from "./schedule/ScheduleDay";

function Main({
                // addDaysCardPopupClick,
                addCardPopupClik,
                editSchedulePopupClick,
                onEditShedulerCardClick,
                onLogout,
                onCardActiveClick,
                onCardDelete,
                schedule
              }) {

  const weeks = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
    undefined: [],
  }

  function clickTitle() {

  }

  const one = schedule.values();
  let to = null;

  while (!(to = one.next()).done) {
    if (to.value['days'] in weeks) {
      weeks[to.value['days']].push(to);
    } else {
      weeks[undefined].push(to);
    }
    return (
      <>
        <Header linkTitle="" path='/sign-in' onLogout={onLogout}/>
        <main className="content block-size">
          <button className="" onClick={addCardPopupClik}>Добавить дискотеку</button>
          <Accordion/>
          <ScheduleDay events={weeks}/>
        </main>
      </>
    );
  }
}

export default Main;
