import React from 'react';
import { Timeline } from 'antd';
import './DiagramAlertStep.css';

const DiagramAlertStep = () => (
    <Timeline className="custom-timeline">
        <Timeline.Item>
            <div className="timeline-item-content">
                <span className="timeline-time">2015-09-01</span>
                <span className="timeline-text">Create a services site</span>
            </div>
        </Timeline.Item>
        <Timeline.Item>
            <div className="timeline-item-content">
                <span className="timeline-time">2015-09-01</span>
                <span className="timeline-text">~장비 ~이상발생</span>
            </div>
        </Timeline.Item>
        <Timeline.Item>
            <div className="timeline-item-content">
                <span className="timeline-time">2015-09-01</span>
                <span className="timeline-text">Technical testing</span>
            </div>
        </Timeline.Item>
        <Timeline.Item>
            <div className="timeline-item-content">
                <span className="timeline-time">2015-09-01</span>
                <span className="timeline-text">Network problems being solved</span>
            </div>
        </Timeline.Item>
    </Timeline>
);

export default DiagramAlertStep;
