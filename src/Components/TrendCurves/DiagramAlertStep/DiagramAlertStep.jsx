import React, { useEffect, useState } from 'react';
import { Timeline, Card, Row, Col } from 'antd';
import './DiagramAlertStep.css';

const DiagramAlertStep = ({ TrendData, selectedData, selectedTimeUnit, dataTypeForChart, indicatorLabel }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const timeUnit = parseInt(selectedTimeUnit.timeUnit, 10);

        if (!Array.isArray(TrendData)) {
            console.error('TrendData is not an array');
            return;
        }

        const filteredData = TrendData.filter((item, index) => {
            switch (timeUnit) {
                case 60: return index === 0 || TrendData[index - 1].hr !== item.hr;
                case 1: return item.min % 1 === 0;
                case 5: return item.min % 5 === 0;
                case 15: return item.min % 15 === 0;
                default: return true;
            }
        });

        const formattedData = filteredData.map(item => ({
            date: `${selectedData.yyyy}.${selectedData.mm}.${selectedData.dd}`,
            time: `${item.hr}:${item.min}`,
            rValue: item[`${dataTypeForChart}_r`],
            sValue: item[`${dataTypeForChart}_s`],
            tValue: item[`${dataTypeForChart}_t`],
            value: item[dataTypeForChart]
        }));

        setData(formattedData);
    }, [TrendData, selectedTimeUnit, dataTypeForChart, selectedData, indicatorLabel]);

    const getColor = () => {
        switch (dataTypeForChart) {
            case 'wat': return '#9370DB';
            case 'pf': return '#00BFFF';
            case 'out_deg': return '#7CFC00';
            case 'in_deg': return '#FF69B4';
            default: return '#000';
        }
    };

    const getLabel = () => {
        switch (dataTypeForChart) {
            case 'wat': return '전력';
            case 'pf': return '역률';
            case 'out_deg': return '외부온도';
            case 'in_deg': return '내부온도';
            default: return '';
        }
    };

    const renderValues = (item) => (
        ['volt', 'am'].includes(dataTypeForChart) ? (
            <>
                <Col span={5}><span style={{ color: '#00c700' }}>L1: {item.rValue}</span></Col>
                <Col span={5}><span style={{ color: '#fc738a' }}>L2: {item.sValue}</span></Col>
                <Col span={5}><span style={{ color: '#7696ff' }}>L3: {item.tValue}</span></Col>
            </>
        ) : (
            <Col span={15}>
                <span className='DiagramAlertStep_item' style={{ color: getColor() }}>
                    {getLabel()} : {item.value}
                </span>
            </Col>
        )
    );

    return (
        <div>
            <Row style={{ padding: '0 0 5px 0', marginTop: '-10px' }}>
                <Col span={7}>
                    <div style={{ color: 'white' }}>{indicatorLabel} 로그 이력관리</div>
                </Col>
            </Row>
            <Card className="timeline-container" bordered={false}>
                <Timeline className="custom-timeline">
                    {data.slice(0, 200).map((item, index) => (
                        <Timeline.Item key={index}>
                            <Row style={{ marginBottom: '8px' }}>
                                <Col span={6}>
                                    {/* 날짜와 시간을 각각 다른 줄에 표시 */}
                                    <div className='DiagramAlertStep-timeline-text'>
                                        <div>{item.date}</div>
                                        <div>{item.time}</div>
                                    </div>
                                </Col>
                                {renderValues(item)}
                            </Row>
                        </Timeline.Item>
                    ))}
                </Timeline>
            </Card>
        </div>

    );
};

export default DiagramAlertStep;
