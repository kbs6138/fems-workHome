import React, { useEffect, useState } from 'react';
import { Timeline } from 'antd';
import './DiagramAlertStep.css';

const DiagramAlertStep = ({ TrendData, selectedData }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (Array.isArray(TrendData)) {      
          const formattedData = TrendData.map(item => ({
            time: `${selectedData.yyyy}.${selectedData.mm}.${selectedData.dd} ${item.hr}:${item.min}`,
            volt_r: item.volt_r,
            volt_s: item.volt_s,
            volt_t: item.volt_t
          }));
      
          setData(formattedData);
        } else {
          console.error("TrendData is not an array");
        }
    }, [TrendData]);
      

    return (
        <Timeline
          className="custom-timeline"
          items={data.map((item, index) => ({
            key: index,
            children: (
              <div className="timeline-item-content">
                <span className="timeline-time">{item.time}</span>
                <span className="timeline-text">R: {item.volt_r}</span>
                <span className="timeline-text">S: {item.volt_s}</span>
                <span className="timeline-text">T: {item.volt_t}</span>
              </div>
            )
          }))}
        />
      );      
};

export default DiagramAlertStep;
