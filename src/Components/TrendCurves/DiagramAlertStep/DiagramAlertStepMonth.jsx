import React, { useEffect, useState } from 'react';
import { Timeline } from 'antd';
import './DiagramAlertStep.css';

const DiagramAlertStepMonth = ({ TrendData, selectedData, dataTypeForChart }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (Array.isArray(TrendData)) {
            const formattedData = TrendData.map(item => {
                let rValue, sValue, tValue, value;

                if (['volt', 'am'].includes(dataTypeForChart)) {
                    rValue = item[`${dataTypeForChart}_r`];
                    sValue = item[`${dataTypeForChart}_s`];
                    tValue = item[`${dataTypeForChart}_t`];
                } else {
                    value = item[`${dataTypeForChart}`];
                }

                return {
                    time: `${selectedData.yyyy}.${selectedData.mm}`,
                    rValue,
                    sValue,
                    tValue,
                    value
                };
            });

            setData(formattedData);
        } else {
            console.error('TrendData is not an array');
        }
    }, [TrendData, dataTypeForChart, selectedData]);

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
                                <span className="timeline-text" style={{ color: '#00c700', fontWeight: 'bold' }}>
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

export default DiagramAlertStepMonth;
