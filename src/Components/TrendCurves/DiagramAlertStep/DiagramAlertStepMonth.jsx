import React, { useEffect, useState } from 'react';
import { Timeline } from 'antd';
import './DiagramAlertStep.css';

const DiagramAlertStepMonth = ({ TrendData, selectedData, selectedTimeUnit }) => {
    const [data, setData] = useState([]);

    //selectedTimeUnit은 object여서 object내에 timeunit을 추출해서 새로운 timeunit 변수에 정수로 저장해줌
    let timeUnit = selectedTimeUnit.timeUnit;

    useEffect(() => {
        timeUnit=parseInt(timeUnit,10); //timeUnit이 string으로 넘어와서 int형으로 변환 시켜줌

        if (Array.isArray(TrendData)) {
          const filteredData = TrendData.filter((item, index) => {
            if (timeUnit === 60) {
                // 60분(1시간) 간격으로 필터링 (중복 제거)
                return index === 0 || TrendData[index - 1].hr !== item.hr;
            } else if (timeUnit === 1) {
                // 1분 간격으로 필터링
                return item.min % 1 === 0;
            } else if (timeUnit === 5) {
                // 5분 간격으로 필터링
                return item.min % 5 === 0;
            } else if (timeUnit === 15) {
                // 15분 간격으로 필터링
                return item.min % 15 === 0;
            } else {
                return true; // 기본적으로 모든 데이터를 포함
            }
          });
      
          const formattedData = filteredData.map(item => ({
            time: `${selectedData.yyyy}.${selectedData.mm}.${selectedData.dd} ${item.hr}:${item.min}`,
            volt_r: item.volt_r,
            volt_s: item.volt_s,
            volt_t: item.volt_t
          }));
      
          setData(formattedData);
        } else {
          console.error("TrendData is not an array");
        }
    }, [TrendData, timeUnit]);
      

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

export default DiagramAlertStepMonth;
