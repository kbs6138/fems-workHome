import React from 'react';
import { Timeline, Card, Row, Col } from 'antd';
import '../DiagramDetailAlertStep/DiagramDetailAlertStep.css';

const DiagramDetailLog = ({ logEntries = [] }) => { // 기본값으로 빈 배열 설정
    return (
        <div>
            <Row
                gutter={{
                    xs: 20,
                    sm: 20,
                    md: 24,
                    lg: 10,
                }}
            >
                <Col className="gutter-row" span={3}>
                    <div>일자 및 시간</div>
                </Col>
                <Col className="gutter-row" span={3}>
                    <div>L1</div>
                </Col>
                <Col className="gutter-row" span={3}>
                    <div>L2</div>
                </Col>
                <Col className="gutter-row" span={3}>
                    <div>L3</div>
                </Col>
            </Row>
            <Card className='DiagramDetailLog-container' bordered={false} style={{height:'500px'}}>
                <Timeline className="custom-timeline">
                    {logEntries.map((entry, index) => (
                        <Timeline.Item key={index}>
                            <Row
                                gutter={{
                                    xs: 20,
                                    sm: 20,
                                    md: 24,
                                    lg: 10,
                                }}
                            >
                                <Col className="gutter-row" span={3}>
                                    <span className="DiagramDetailLog-timeline-time">{entry.time}</span>
                                </Col>
                                <Col className="gutter-row" span={3}>
                                    <span className="DiagramDetailLog-timeline-text">{entry.L1}</span>
                                </Col>
                                <Col className="gutter-row" span={3}>
                                    <span className="DiagramDetailLog-timeline-text">{entry.L2}</span>
                                </Col>
                                <Col className="gutter-row" span={3}>
                                    <span className="DiagramDetailLog-timeline-text">{entry.L3}</span>
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
