import React, { useEffect, useState } from 'react';
import { Timeline } from 'antd';
import './DiagramAlertStep.css';

const TestDiagramMonth = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // 1월부터 12월까지의 더미 데이터를 생성
        const generateDummyData = () => {
            const months = Array.from({ length: 12 }, (_, i) => i + 1); // 1월부터 12월까지
            return months.map((month) => {
                const value = (Math.random() * 100 + 200).toFixed(1); // 200~300 사이의 값 생성
                if(month<10)month='0'+month;
                return {
                    month: `2024.${month}`,
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
                            <span className="timeline-time">{item.month}</span>
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

export default TestDiagramMonth;
