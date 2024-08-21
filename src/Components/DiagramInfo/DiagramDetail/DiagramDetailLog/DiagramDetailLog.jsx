import React, { useState, useEffect } from 'react';
import { Timeline, Card, Row, Col } from 'antd';
import '../DiagramDetailLog/DiagramDetailLog.css';

const DiagramDetailLog = ({ logEntries = [] }) => {
    // 상태 초기화: entry.value의 값을 저장할 배열
    const [values, setValues] = useState([]);

    useEffect(() => {
        logEntries.forEach(entry => {
            if (entry.value) {
                setValues(prevValues => {
                    // 중복된 항목이 있는지 확인
                    const isDuplicate = prevValues.some(
                        val => val.date === entry.date && val.time === entry.time && val.value === entry.value
                    );

                    // 중복되지 않은 경우에만 추가
                    if (!isDuplicate) {
                        return [
                            ...prevValues,
                            { date: entry.date, time: entry.time, value: entry.value }
                        ];
                    }

                    return prevValues;
                });
            }
        });
    }, [logEntries]);

    const combinedEntries = [...logEntries, ...values];

    return (
        <div>
            <Row style={{ marginTop: '-10px' }}>
                <Col span={24}>
                    <div style={{ color: 'white' }}>로그 이력관리</div>
                </Col>
            </Row>
            <Card className='DiagramDetailLog-container' bordered={false}>
                <Timeline className="custom-timeline">
                    {combinedEntries.map((entry, index) => (
                        <Timeline.Item key={index}>
                            <Row style={{ marginBottom: '8px' }}> {/* Adjust spacing */}
                                <Col span={6}>
                                    <div>
                                        <span className="DiagramDetailLog-timeline-date">{entry.date}</span>
                                        <span className="DiagramDetailLog-timeline-time">{entry.time}</span>
                                    </div>
                                </Col>
                                <Col span={18}>
                                    <Row>
                                        {entry.L1 && <Col span={6}><span className="DiagramDetailLog-timeline-text" style={{ color: '#00C700' }}>{entry.L1}</span></Col>}
                                        {entry.L2 && <Col span={6}><span className="DiagramDetailLog-timeline-text" style={{ color: '#FC738A' }}>{entry.L2}</span></Col>}
                                        {entry.L3 && <Col span={6}><span className="DiagramDetailLog-timeline-text" style={{ color: '#7696FF' }}>{entry.L3}</span></Col>}
                                        {entry.value && <Col span={6}><span className="DiagramDetailLog-timeline-text">{entry.value}</span></Col>}
                                    </Row>
                                </Col>
                            </Row>
                        </Timeline.Item>
                    ))}
                </Timeline>
            </Card>
        </div>
    );
};

export default DiagramDetailLog;
