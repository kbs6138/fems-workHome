import React, { useEffect, useState } from 'react';
import { Timeline } from 'antd';
import './DiagramAlertStep.css';

const DiagramAlertStep = ({ TrendData, selectedData, selectedTimeUnit, dataTypeForChart }) => {
    const [data, setData] = useState([]);

    // selectedTimeUnit은 object여서 object내에 timeunit을 추출해서 새로운 timeunit 변수에 정수로 저장해줌
    let timeUnit = selectedTimeUnit.timeUnit;

    useEffect(() => {
        timeUnit = parseInt(timeUnit, 10); // timeUnit이 string으로 넘어와서 int형으로 변환 시켜줌

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
                rValue: item[`${dataTypeForChart}_r`], // dataTypeForChart에 따라 동적으로 데이터 매핑
                sValue: item[`${dataTypeForChart}_s`],
                tValue: item[`${dataTypeForChart}_t`]
            }));


            setData(formattedData);
        } else {
            console.error('TrendData is not an array');
        }
    }, [TrendData, timeUnit]);

    return (
        <div className="timeline-container">
            <Timeline
                className="custom-timeline"
                items={data.slice(0, 8).map((item, index) => (  // Show only the first 8 items
                    {
                        key: index,
                        children: (
                            <div className="timeline-item-content">
                                <span className="timeline-time">{item.time}</span>
                                <span className="timeline-text" style={{ color: '#00c700', fontWeight: 'bold' }}>L1: {item.rValue}</span>
                                <span className="timeline-text" style={{ color: '#fc738a', fontWeight: 'bold' }}>L2: {item.sValue}</span>
                                <span className="timeline-text" style={{ color: '#7696ff', fontWeight: 'bold' }}>L3: {item.tValue}</span>
                            </div>
                        ),
                    }
                ))}
            />
        </div>
    );
};

export default DiagramAlertStep;
