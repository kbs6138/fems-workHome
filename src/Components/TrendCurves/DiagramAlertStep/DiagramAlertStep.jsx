import React, { useEffect, useState } from 'react';
import { Timeline } from 'antd';
import './DiagramAlertStep.css';

const DiagramAlertStep = ({ TrendData, selectedData, selectedTimeUnit, dataTypeForChart }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        let timeUnit = parseInt(selectedTimeUnit.timeUnit, 10); // Ensure timeUnit is an integer

        if (Array.isArray(TrendData)) {
            const filteredData = TrendData.filter((item, index) => {
                if (timeUnit === 60) {
                    return index === 0 || TrendData[index - 1].hr !== item.hr;
                } else if (timeUnit === 1) {
                    return item.min % 1 === 0;
                } else if (timeUnit === 5) {
                    return item.min % 5 === 0;
                } else if (timeUnit === 15) {
                    return item.min % 15 === 0;
                } else {
                    return true;
                }
            });

            console.log('Filtered Data:', filteredData);

            const formattedData = filteredData.map(item => {
                let rValue, sValue, tValue, value;
                if (['volt', 'am'].includes(dataTypeForChart)) {
                    rValue = item[`${dataTypeForChart}_r`];
                    sValue = item[`${dataTypeForChart}_s`];
                    tValue = item[`${dataTypeForChart}_t`];
                } else {
                    value = item[`${dataTypeForChart}`];
                }

                return {
                    time: `${selectedData.yyyy}.${selectedData.mm}.${selectedData.dd} ${item.hr}:${item.min}`,
                    rValue,
                    sValue,
                    tValue,
                    value
                };
            });

            console.log('Formatted Data:', formattedData);
            setData(formattedData);
        } else {
            console.error('TrendData is not an array');
        }
    }, [TrendData, selectedTimeUnit, dataTypeForChart, selectedData]);

    return (
        <div className="timeline-container">
            <Timeline
                className="custom-timeline"
                items={data.slice(0, 200).map((item, index) => ({
                    key: index,
                    children: (
                        <div className="timeline-item-content">
                            <span className="timeline-time">{item.time}</span>
                            {['volt', 'am'].includes(dataTypeForChart) ? (
                                <>
                                    <span className="timeline-text" style={{ color: '#00c700', fontWeight: 'bold' }}>L1: {item.rValue}</span>
                                    <span className="timeline-text" style={{ color: '#fc738a', fontWeight: 'bold' }}>L2: {item.sValue}</span>
                                    <span className="timeline-text" style={{ color: '#7696ff', fontWeight: 'bold' }}>L3: {item.tValue}</span>
                                </>
                            ) : (
                                <span className="timeline-text" style={{ 
                                    color: dataTypeForChart === 'wat' ? '#9370DB' : 
                                        dataTypeForChart === 'pf' ? '#00BFFF' : 
                                        dataTypeForChart === 'out_deg' ? '#7CFC00' : 
                                        dataTypeForChart === 'in_deg' ? '#FF69B4' : 
                                        '#00c700', // 기본 색상
                                    fontWeight: 'bold' 
                                }}>
                                    {dataTypeForChart === 'wat' ? `전력: ${item.value}` :
                                    dataTypeForChart === 'pf' ? `역률: ${item.value}` :
                                    dataTypeForChart === 'out_deg' ? `외부온도: ${item.value}` :
                                    dataTypeForChart === 'in_deg' ? `내부온도: ${item.value}` :
                                    '' }
                                </span>
                            )}
                        </div>
                    ),
                }))}
            />
        </div>
    );
};

export default DiagramAlertStep;
