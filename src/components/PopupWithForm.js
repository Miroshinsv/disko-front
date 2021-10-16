import React from "react";

function PopupWithForm(props) {

  const classOpen = isOpen ? 'popup_opened' : '';

  return(
    <section className={`popup ${classOpen}`}>

    </section>
  );
}

export default PopupWithForm;
