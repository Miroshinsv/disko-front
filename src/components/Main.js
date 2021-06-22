import React from "react";
import Card from "./Card";

function Main({addCardPopupClik}) {

    return (
        <main className="content">
            <button className="" onClick={addCardPopupClik}>Добавить дискотеку</button>
            <section className="#">
                <h2>Понедельник</h2>
                <Card title={"Card 1"} />
                <Card title={"Card 2"} />
                <Card title={"Card 3"} />
            </section>
            <section className="#">
                <h2>Вторник</h2>
                <Card title={"Card 4"} />
                <Card title={"Card 5"} />
                <Card title={"Card 6"} />
            </section>
            <section className="#">
                <h2>Среда</h2>
                <Card title={"Card 7"} />
                <Card title={"Card 8"} />
            </section>
            <section className="#">
                <h2>Четверг</h2>
                <Card title={"Card 9"} />
                <Card title={"Card 10"} />
                <Card title={"Card 11"} />
            </section>
            <section className="#">
                <h2>Пятница</h2>
                <Card title={"Card 12"} />
                <Card title={"Card 13"} />
            </section>
            <section className="#">
                <h2>Суббота</h2>
                <Card title={"Card 14"} />
            </section>
            <section className="#">
                <h2>Воскресенье</h2>
                <Card title={"Card 15"} />
                <Card title={"Card 16"} />
            </section>
        </main>
    );
}

export default Main;