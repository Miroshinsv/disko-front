import React from "react";
import Card from "./Card";

function Main({ addCardPopupClik, editSchedulePopupClick, schedule }) {

  console.log(schedule);

  const weeks= {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  }

  const one = schedule.values();
  let to = null;

  while (!(to = one.next()).done) {
    weeks[to.value['days']].push(to);
  }


  return (
    <main className="content">
      <button className="" onClick={addCardPopupClik}>Добавить дискотеку</button>

      <section className="week-day">
        <h2 className="week-day__title">Понедельник</h2>
        {
          weeks['monday'].map(item =>
            <Card
              key={item.value.id}
              name={item.value.description}
              img={item.value.logo}
              isActive={item.value.is_active}
              onScheduleClick ={editSchedulePopupClick}
            />)
        }
      </section>
      <section className="week-day">
        <h2 className="week-day__title">Вторник</h2>
        {
          weeks['tuesday'].map((item) =>
            <Card
              key={item.value.ID}
              name={item.value.description}
              img={item.value.logo}
              isActive={item.value.is_active}
            />)
        }
      </section>
      <section className="week-day">
        <h2 className="week-day__title">Среда</h2>
        {
          weeks['thursday'].map((item) =>
            <Card
              key={item.value.ID}
              name={item.value.description}
              img={item.value.logo}
              isActive={item.value.is_active}
            />)
        }
      </section>
      <section className="week-day">
        <h2 className="week-day__title">Четверг</h2>
        {
          weeks['thursday'].map((item) =>
            <Card
              key={item.value.ID}
              name={item.value.description}
              img={item.value.logo}
              isActive={item.value.is_active}
            />)
        }
      </section>
      <section className="week-day">
        <h2 className="week-day__title">Пятница</h2>
        {
          weeks['friday'].map((item) =>
            <Card
              key={item.value.ID}
              name={item.value.description}
              img={item.value.logo}
              isActive={item.value.is_active}
            />)
        }
      </section>
      <section className="week-day">
        <h2 className="week-day__title">Суббота</h2>
        {
          weeks['saturday'].map((item) =>
            <Card
              key={item.value.ID}
              name={item.value.description}
              img={item.value.logo}
              isActive={item.value.is_active}
            />)
        }
      </section>
      <section className="week-day">
        <h2 className="week-day__title">Воскресенье</h2>
        {
          weeks['sunday'].map((item) =>
            <Card
              key={item.value.ID}
              name={item.value.description}
              img={item.value.logo}
              isActive={item.value.is_active}
            />)
        }
      </section>
    </main>
  );
}

export default Main;
