import React, {Component} from "react";

class ScheduleDay extends Component {
  events;

  constructor({context, events}) {
    super(context);
    this.events = events;
  }

  render() {
    return (
      this.events.forEach(
        val => <div>{val}</div>
      )
    )
  }
}


export default ScheduleDay;
