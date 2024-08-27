import React from 'react';
import { Timeline } from 'antd';
import './DiagramAlertStep.css';

const DiagramAlertStep = () => (
    <Timeline className="custom-timeline">
        <Timeline.Item>
            <div className="timeline-item-content">
                <span className="timeline-time">2024-08-22</span>
                <span className="timeline-text">-</span>
            </div>
        </Timeline.Item>
        <Timeline.Item>
            <div className="timeline-item-content">
                <span className="timeline-time">2024-08-23</span>
                <span className="timeline-text">-</span>
            </div>
        </Timeline.Item>
        <Timeline.Item>
            <div className="timeline-item-content">
                <span className="timeline-time">2024-08-24</span>
                <span className="timeline-text">-</span>
            </div>
        </Timeline.Item>

    </Timeline>
);

export default DiagramAlertStep;
