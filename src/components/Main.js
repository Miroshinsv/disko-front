import React from "react";
import Card from "./Card";

function Main({ addCardPopupClik, cards }) {
  console.log(cards);
    function cardFilters(day, cardsDay) {
      if (day === cardsDay) {
        return
      }
    }
    return (
        <main className="content">
            <button className="" onClick={addCardPopupClik}>Добавить дискотеку</button>
            <section className="#">
                <h2>Понедельник</h2>
              {
                cards.map(item => <Card
                  key={item._id}
                  name={item.description}
                  img={item.logo}
                  isActive={item.is_active}
                />)
              }
            </section>
            <section className="#">
                <h2>Вторник</h2>
            </section>
            <section className="#">
                <h2>Среда</h2>

            </section>
            <section className="#">
                <h2>Четверг</h2>

            </section>
            <section className="#">
                <h2>Пятница</h2>

            </section>
            <section className="#">
                <h2>Суббота</h2>

            </section>
            <section className="#">
                <h2>Воскресенье</h2>

            </section>
        </main>
    );
}

export default Main;
