import React from "react";
import Header from "./Header.js";
import Card from "./Card";

function Main({ addCardPopupClik, editSchedulePopupClick, onEditShedulerCardClick, schedule, onLogout, onCardActiveClick }) {

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

  const one = schedule.values();
  let to = null;

  while (!(to = one.next()).done) {
    if (to.value['days'] in weeks) {
      weeks[to.value['days']].push(to);
    } else {
      weeks[undefined].push(to);
    }
  }

  function weeksSort() {
    let i;
    for (i in weeks) {
      return i;
      // i.map((key) => {
      //  return (<h2 className="week-day__title">{key}</h2>)
      // })
    }
  }

  return (
    <>
      <Header linkTitle="" path='/sign-in' onLogout={onLogout}/>
      <main className="content">
        <button className="" onClick={addCardPopupClik}>Добавить дискотеку</button>

        {console.log(weeksSort(), '!!!!')}

      {/*<section className="week-day">*/}
        {/*  <h2 className="week-day__title">Понедельник</h2>*/}
        {/*  <div className="container">*/}
        {/*    {*/}
        {/*      weeks['monday'].map(item =>*/}
        {/*        <Card key={item.value.ID}*/}
        {/*              name={item.value.name}*/}
        {/*              img={item.value.logo}*/}
        {/*              isActive={item.value.is_active}*/}
        {/*              onScheduleClick={editSchedulePopupClick}*/}
        {/*              onEditShedulerCardClick={onEditShedulerCardClick}*/}
        {/*              dataSchedele={item.value}*/}
        {/*              onCardActiveClick={onCardActiveClick}*/}
        {/*        />)*/}
        {/*    }*/}
        {/*  </div>*/}
        {/*</section>*/}

        {/*<section className="week-day">*/}
        {/*  <h2 className="week-day__title">Вторник</h2>*/}
        {/*  <div className="container">*/}
        {/*    {*/}
        {/*      weeks['tuesday'].map(item =>*/}
        {/*        <Card key={item.value.ID}*/}
        {/*              name={item.value.name}*/}
        {/*              img={item.value.logo}*/}
        {/*              isActive={item.value.is_active}*/}
        {/*              onScheduleClick={editSchedulePopupClick}*/}
        {/*              onEditShedulerCardClick={onEditShedulerCardClick}*/}
        {/*              dataSchedele={item.value}*/}
        {/*              onCardActiveClick={onCardActiveClick}*/}
        {/*        />)*/}
        {/*    }*/}
        {/*  </div>*/}
        {/*</section>*/}

        {/*<section className="week-day">*/}
        {/*  <h2 className="week-day__title">Среда</h2>*/}
        {/*  <div className="container">*/}
        {/*    {*/}
        {/*      weeks['wednesday'].map(item =>*/}
        {/*        <Card key={item.value.ID}*/}
        {/*              name={item.value.name}*/}
        {/*              img={item.value.logo}*/}
        {/*              isActive={item.value.is_active}*/}
        {/*              onScheduleClick={editSchedulePopupClick}*/}
        {/*              onEditShedulerCardClick={onEditShedulerCardClick}*/}
        {/*              dataSchedele={item.value}*/}
        {/*              onCardActiveClick={onCardActiveClick}*/}
        {/*        />)*/}
        {/*    }*/}
        {/*  </div>*/}
        {/*</section>*/}

        {/*<section className="week-day">*/}
        {/*  <h2 className="week-day__title">Четверг</h2>*/}
        {/*  <div className="container">*/}
        {/*    {*/}
        {/*      weeks['thursday'].map(item =>*/}
        {/*        <Card key={item.value.ID}*/}
        {/*              name={item.value.name}*/}
        {/*              img={item.value.logo}*/}
        {/*              isActive={item.value.is_active}*/}
        {/*              onScheduleClick={editSchedulePopupClick}*/}
        {/*              onEditShedulerCardClick={onEditShedulerCardClick}*/}
        {/*              dataSchedele={item.value}*/}
        {/*              onCardActiveClick={onCardActiveClick}*/}
        {/*        />)*/}
        {/*    }*/}
        {/*  </div>*/}
        {/*</section>*/}

        {/*<section className="week-day">*/}
        {/*  <h2 className="week-day__title">Пятница</h2>*/}
        {/*  <div className="container">*/}
        {/*    {*/}
        {/*      weeks['friday'].map(item =>*/}
        {/*        <Card key={item.value.ID}*/}
        {/*              name={item.value.name}*/}
        {/*              img={item.value.logo}*/}
        {/*              isActive={item.value.is_active}*/}
        {/*              onScheduleClick={editSchedulePopupClick}*/}
        {/*              onEditShedulerCardClick={onEditShedulerCardClick}*/}
        {/*              dataSchedele={item.value}*/}
        {/*              onCardActiveClick={onCardActiveClick}*/}
        {/*        />)*/}
        {/*    }*/}
        {/*  </div>*/}
        {/*</section>*/}

        {/*<section className="week-day">*/}
        {/*  <h2 className="week-day__title">Суббота</h2>*/}
        {/*  <div className="container">*/}
        {/*    {*/}
        {/*      weeks['saturday'].map(item =>*/}
        {/*        <Card key={item.value.ID}*/}
        {/*              name={item.value.name}*/}
        {/*              img={item.value.logo}*/}
        {/*              isActive={item.value.is_active}*/}
        {/*              onScheduleClick={editSchedulePopupClick}*/}
        {/*              onEditShedulerCardClick={onEditShedulerCardClick}*/}
        {/*              dataSchedele={item.value}*/}
        {/*              onCardActiveClick={onCardActiveClick}*/}
        {/*        />)*/}
        {/*    }*/}
        {/*  </div>*/}
        {/*</section>*/}

        {/*<section className="week-day">*/}
        {/*  <h2 className="week-day__title">Воскресенье</h2>*/}
        {/*  <div className="container">*/}
        {/*    {*/}
        {/*      weeks['sunday'].map(item => <Card*/}
        {/*        key={item.value.ID}*/}
        {/*        name={item.value.name}*/}
        {/*        img={item.value.logo}*/}
        {/*        isActive={item.value.is_active}*/}
        {/*        onScheduleClick={editSchedulePopupClick}*/}
        {/*        onEditShedulerCardClick={onEditShedulerCardClick}*/}
        {/*        dataSchedele={item.value}*/}
        {/*        onCardActiveClick={onCardActiveClick}*/}
        {/*      />)*/}
        {/*    }*/}
        {/*  </div>*/}
        {/*</section>*/}
      </main>
    </>

  );
}

export default Main;
