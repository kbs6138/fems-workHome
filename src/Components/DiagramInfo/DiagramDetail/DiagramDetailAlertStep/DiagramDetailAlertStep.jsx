import React from 'react';
import { Timeline } from 'antd';
import './DiagramDetailAlertStep.css';

const DiagramDetailAlertStep = () => (
    <Timeline className="custom-timeline">
        <Timeline.Item>
            <div className="DiagramDetailAlertStep-timeline-item-content">
                <span className="DiagramDetailAlertStep-timeline-time">2024-07-22</span>
                <span className="DiagramDetailAlertStep-timeline-text">과부하 발생</span>
            </div>
        </Timeline.Item>
        <Timeline.Item>
            <div className="timeline-item-content">
            <span className="DiagramDetailAlertStep-timeline-time">2024-07-23</span>
             <span className="DiagramDetailAlertStep-timeline-text">DB통신 오류</span>
            </div>
        </Timeline.Item>
        <Timeline.Item>
            <div className="timeline-item-content">
            <span className="DiagramDetailAlertStep-timeline-time">2024-07-24</span>
             <span className="DiagramDetailAlertStep-timeline-text">Technical testing</span>
            </div>
        </Timeline.Item>
        <Timeline.Item>
            <div className="timeline-item-content">
            <span className="DiagramDetailAlertStep-timeline-time">2024-07-25</span>
             <span className="DiagramDetailAlertStep-timeline-text">네트워크 에러 발생</span>
            </div>
        </Timeline.Item>
    </Timeline>
);

export default DiagramDetailAlertStep;
