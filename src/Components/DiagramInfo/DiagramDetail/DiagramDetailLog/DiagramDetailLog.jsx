import React, { useState, useEffect } from 'react';
import { Timeline, Card, Row, Col } from 'antd';
import '../DiagramDetailLog/DiagramDetailLog.css';

const DiagramDetailLog = ({ logEntries = [] }) => {
    // 상태 초기화: entry.value의 값을 저장할 배열
    const [values, setValues] = useState([]);

    useEffect(() => {
        logEntries.forEach(entry => {
            if (entry.value) {
                setValues(prevValues => [
                    ...prevValues,
                    { date: entry.date, time: entry.time, value: entry.value }
                ]);
            }
        });
    }, [logEntries]);
    return (
        <div>
            <Row style={{ marginTop: '-10px' }}>
                <Col span={24}>
                    <div style={{ color: 'white' }}>로그 이력관리</div>
                </Col>
            </Row>
            <Card className='DiagramDetailLog-container' bordered={false}>
                <Timeline className="custom-timeline">
                    {logEntries.map((entry, index) => (
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
                                        {entry.L1 && <Col span={8}><span className="DiagramDetailLog-timeline-text" style={{ color: '#00C700' }}>{entry.L1}</span></Col>}
                                        {entry.L2 && <Col span={8}><span className="DiagramDetailLog-timeline-text" style={{ color: '#FC738A' }}>{entry.L2}</span></Col>}
                                        {entry.L3 && <Col span={8}><span className="DiagramDetailLog-timeline-text" style={{ color: '#7696FF' }}>{entry.L3}</span></Col>}
                                    </Row>
                                </Col>
                            </Row>
                        </Timeline.Item>
                    ))}

                    {values.map((valueEntry, index) => (
                        <Timeline.Item key={index}>
                            <Row style={{ marginBottom: '8px' }}> {/* Adjust spacing */}
                                <Col span={6}>
                                    <div>
                                        <span className="DiagramDetailLog-timeline-date">{valueEntry.date}</span>
                                        <span className="DiagramDetailLog-timeline-time">{valueEntry.time}</span>
                                    </div>
                                </Col>
                                <Col span={18}>
                                    <Row>
                                        <Col span={24}>
                                            <span className="DiagramDetailLog-timeline-text">{valueEntry.value}</span>
                                        </Col>
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
