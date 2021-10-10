import React from "react";

function CheckboxSlider({ label, checked, name, onChange }) {

  return(
    <div className="checkbox">
      <input type="checkbox" className="checkbox__element" id="box" name={name} checked={checked} onChange={onChange}/>
      <label htmlFor="box">{label}</label>
    </div>
  );
}

export default CheckboxSlider;
