import React from "react";
import "./ToggleSwitch.css";
import { useState } from "react";

const ToggleSwitch = () => {
  const [isToggleOn, setIsToggleOn] = useState(true);

  const handleClick = () => {
    console.log("Toggle clicked! Current state:", isToggleOn);
    setIsToggleOn(prevState => !prevState);
  };
  return (

    <div className="toggle__switch" onClick={handleClick}>
      <input type="checkbox"
        className="toggle__checkbox"
        checked={isToggleOn}
        onChange={handleClick}
      />
      <span className="f__switch">F</span>
      <span className="c__switch">C</span>

    </div>

  );
};

export default ToggleSwitch;