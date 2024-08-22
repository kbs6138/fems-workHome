import React, { useEffect, useState } from 'react';
import { Timeline } from 'antd';
import './DiagramAlertStep.css';

const TestDiagramDay = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // 1일부터 31일까지의 더미 데이터를 생성
        const generateDummyData = () => {
            const days = Array.from({ length: 31 }, (_, i) => i + 1); // 1일부터 31일까지
            return days.map((day) => {
                const value = (Math.random() * 100 + 200).toFixed(1); // 200~300 사이의 값 생성
                if(day<10) day='0'+day;
                return {
                    day: `2024.08.${day}`,
                    rValue: value,
                    sValue: value,
                    tValue: value,
                };
            });
        };

        const dummyData = generateDummyData();
        setData(dummyData);
    }, []);

    return (
        <div className="timeline-container">
            <Timeline
                className="custom-timeline"
                items={data.map((item, index) => ({
                    key: index,
                    children: (
                        <div className="timeline-item-content">
                            <span className="timeline-time">{item.day}</span>
                            <span className="timeline-text" style={{ color: '#00c700', fontWeight: 'bold' }}>L1: {item.rValue}</span>
                            <span className="timeline-text" style={{ color: '#fc738a', fontWeight: 'bold' }}>L2: {item.sValue}</span>
                            <span className="timeline-text" style={{ color: '#7696ff', fontWeight: 'bold' }}>L3: {item.tValue}</span>
                        </div>
                    ),
                }))}
            />
        </div>
    );
};

export default TestDiagramDay;
