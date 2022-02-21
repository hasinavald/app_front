import React from "react";
import "./ToggleSwitch.css";
  
function ToggleSwitch (props) {

  function changeAffichage(e){
    props.onChangeAffichage(e.target.checked)
  }

  console.log(props);
  return (
    <div className="container">
      <span className="label_togggle">{props.label}{" "}</span>
      <div className="toggle-switch">
        <input onChange={changeAffichage.bind(this)} type="checkbox" className="checkbox" 
               name={props.label} id={props.label} />
        <label className="label" htmlFor={props.label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};
  
export default ToggleSwitch;