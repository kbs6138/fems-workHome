import React from 'react';
import { Timeline, Card, Row, Col } from 'antd';
import '../DiagramDetailAlertStep/DiagramDetailAlertStep.css';

const DiagramDetailLog = ({ logEntries = [] }) => { // 기본값으로 빈 배열 설정
    return (
        <div>
            <Row style={{ marginTop: '-10px' }}>
                <Col span={7}>
                    <div style={{ color: 'white' }}>로그 이력관리</div>
                </Col>
                <Col span={3}></Col>
                <Col span={5}></Col>
                <Col span={5}></Col>
            </Row>
            <Card className='DiagramDetailLog-container' bordered={false} >
                <Timeline className="custom-timeline">
                    {logEntries.map((entry, index) => (
                        <Timeline.Item key={index}>
                            <Row style={{ marginBottom: '8px' }}> {/* 간격 조절 */}
                                <Col span={6}>
                                    <div>
                                        <span className="DiagramDetailLog-timeline-date">{entry.date}</span>
                                        <span className="DiagramDetailLog-timeline-time">{entry.time}</span>
                                    </div>
                                </Col>
                                <Col span={5}>
                                    <span className="DiagramDetailLog-timeline-text" style={{ color: '#00C700' }}>{entry.L1}</span>
                                </Col>
                                <Col span={6}>
                                    <span className="DiagramDetailLog-timeline-text" style={{ color: '#FC738A' }}>{entry.L2}</span>
                                </Col>
                                <Col span={5}>
                                    <span className="DiagramDetailLog-timeline-text" style={{ color: '#7696FF' }}>{entry.L3}</span>
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
