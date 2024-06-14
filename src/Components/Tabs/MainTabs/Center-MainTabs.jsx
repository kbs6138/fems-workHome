import React, { useContext } from 'react';
import { Tabs } from 'antd';
import { ThemeContext } from '../../ThemeContext';  // ThemeContext 경로는 프로젝트 구조에 맞게 수정
import GaugeChart from '../../Charts/Gauge';
import UsedMonthly from '../../Charts/UsedMonthly';
import PowerFactor from '../../Charts/PowerFactor';
import './Tabs.css';

const onChange = (key) => {
    console.log(key);
};

const items = [
    {
        key: '1',
        label: '수전 용량',
        children: <GaugeChart/>
    },
    {
        key: '2',
        label: '월별 사용량',
        children: <UsedMonthly/>
    },
    {
        key: '3',
        label: '월별 평균역률',
        children: <PowerFactor/>,
    }
];

const CenterMainTabs = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const TabsTheme = isDarkMode ? 'ant-tabs-tab-dark' : '';

    return (
        <Tabs className={TabsTheme} defaultActiveKey="1" items={items} onChange={onChange} />
    );
};

export default CenterMainTabs;
