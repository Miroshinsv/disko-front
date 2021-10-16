import React from "react";


function PopupAddDaysEvent({ isOpen, onClose, onAddDays }) {

  const classOpen = isOpen ? 'popup_opened' : '';

  return (
    <section className={`popup ${classOpen}`}>

    </section>
  );
}

export default PopupAddDaysEvent;
