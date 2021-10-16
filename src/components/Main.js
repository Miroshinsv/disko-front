import React from "react";
import Accordion from "./Accordion";
import Header from "./Header.js";
import Card from "./Card";
import SchedulerCard from "./schedule/SchedulerCard";
import ScheduleDay from "./schedule/ScheduleDay";

function Main({ addDaysCardPopupClick, addCardPopupClik, editSchedulePopupClick, onEditShedulerCardClick, onLogout, onCardActiveClick, onCardDelete, schedule }) {

  const weeks= {
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
  }

  function renderSections() {
    for(let day of weeks) {
      ScheduleDay(day, weeks[day])
    }

    console.log('Функция запущена');
  }

  return (
    <>
      <Header linkTitle="" path='/sign-in' onLogout={onLogout}/>
      <main className="content block-size">
        <button className="" onClick={addCardPopupClik}>Добавить дискотеку</button>

        <Accordion />
        {renderSections}

        <ScheduleDay weekDay={weeks}/>

        <section className="week-day">
          <h2 className="week-day__title" onClick={addDaysCardPopupClick}>Вторник</h2>
          <div className="container">
            {
              weeks['tuesday'].map(item =>
                <Card key={item.value.ID}
                      name={item.value.name}
                      img={item.value.logo}
                      isActive={item.value.is_active}
                      onScheduleClick={editSchedulePopupClick}
                      onEditShedulerCardClick={onEditShedulerCardClick}
                      dataSchedele={item.value}
                      onCardActiveClick={onCardActiveClick}
                      onCardDelete={onCardDelete}
                />)
            }
          </div>
        </section>

        <section className="week-day">
          <h2 className="week-day__title" onClick={addDaysCardPopupClick}>Среда</h2>
          <div className="container">
            {
              weeks['wednesday'].map(item =>
                <Card key={item.value.ID}
                      name={item.value.name}
                      img={item.value.logo}
                      isActive={item.value.is_active}
                      onScheduleClick={editSchedulePopupClick}
                      onEditShedulerCardClick={onEditShedulerCardClick}
                      dataSchedele={item.value}
                      onCardActiveClick={onCardActiveClick}
                      onCardDelete={onCardDelete}
                />)
            }
          </div>
        </section>

        <section className="week-day">
          <h2 className="week-day__title" onClick={addDaysCardPopupClick}>Четверг</h2>
          <div className="container">
            {
              weeks['thursday'].map(item =>
                <Card key={item.value.ID}
                      name={item.value.name}
                      img={item.value.logo}
                      isActive={item.value.is_active}
                      onScheduleClick={editSchedulePopupClick}
                      onEditShedulerCardClick={onEditShedulerCardClick}
                      dataSchedele={item.value}
                      onCardActiveClick={onCardActiveClick}
                      onCardDelete={onCardDelete}
                />)
            }
          </div>
        </section>

        <section className="week-day">
          <h2 className="week-day__title" onClick={addDaysCardPopupClick}>Пятница</h2>
          <div className="container">
            {
              weeks['friday'].map(item =>
                <Card key={item.value.ID}
                      name={item.value.name}
                      img={item.value.logo}
                      isActive={item.value.is_active}
                      onScheduleClick={editSchedulePopupClick}
                      onEditShedulerCardClick={onEditShedulerCardClick}
                      dataSchedele={item.value}
                      onCardActiveClick={onCardActiveClick}
                      onCardDelete={onCardDelete}
                />)
            }
          </div>
        </section>

        <section className="week-day">
          <h2 className="week-day__title" onClick={addDaysCardPopupClick}>Суббота</h2>
          <div className="container">
            {
              weeks['saturday'].map(item =>
                <Card key={item.value.ID}
                      name={item.value.name}
                      img={item.value.logo}
                      isActive={item.value.is_active}
                      onScheduleClick={editSchedulePopupClick}
                      onEditShedulerCardClick={onEditShedulerCardClick}
                      dataSchedele={item.value}
                      onCardActiveClick={onCardActiveClick}
                      onCardDelete={onCardDelete}
                />)
            }
          </div>
        </section>

        <section className="week-day">
          <h2 className="week-day__title" onClick={addDaysCardPopupClick}>Воскресенье</h2>
          <div className="container">
            {
              weeks['sunday'].map(item => <Card
                key={item.value.ID}
                name={item.value.name}
                img={item.value.logo}
                isActive={item.value.is_active}
                onScheduleClick={editSchedulePopupClick}
                onEditShedulerCardClick={onEditShedulerCardClick}
                dataSchedele={item.value}
                onCardActiveClick={onCardActiveClick}
                onCardDelete={onCardDelete}
              />)
            }
          </div>
        </section>
      </main>
    </>
  );
}
export default Main;
