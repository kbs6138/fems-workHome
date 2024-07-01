// ThermometerComponent.js
import React, { useContext } from "react";
import Thermometer from "react-thermometer-component";
import { ThemeContext } from "../ThemeContext";

export default function ThermometerComponent() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className="Thermometer" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70px', marginTop:'100px' }}>
      <Thermometer
        theme={isDarkMode ? "dark" : "light"}
        value={75}
        max={100}
        size="small"
        height={95}
        steps={2}
        reverseGradient={true}
        format="°C"
      />
    </div>
  );
}