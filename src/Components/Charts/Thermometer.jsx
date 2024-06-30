import React from "react";
import Thermometer from "react-thermometer-component";

export default function ThermometerComponent() {
  return (
    <div className="Thermometer" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70px', marginTop:'100px' }}>
      <Thermometer
        theme="light"
        value={75}
        max={100}
        size="small"
        height={130}
        steps={2}
        reverseGradient={true}
      />
    </div>
  );
}
