import React, { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";


const ToggleSwitch = ()=>{
  console.log(" ToggleSwitch component is rendering");
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(CurrentTemperatureUnitContext);
 
 
  
  return (

    <div className="toggle__switch" onClick={handleToggleSwitchChange}>  <input type="checkbox"
        className="toggle__checkbox"
        checked={currentTemperatureUnit === "C"}
        onChange={handleToggleSwitchChange}
      />
      <span className="f__switch">F</span>
      <span className="c__switch">C</span>

    </div>

  );
};

export default ToggleSwitch;