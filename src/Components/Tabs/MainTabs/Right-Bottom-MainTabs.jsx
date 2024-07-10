import React, { useContext } from 'react';
import { Tabs } from 'antd';
import MechanicInfo from '../../MechanicInfo/MechanicInfo';
import PhaseQuarterlyInfo from '../../PhaseQuarterlyInfo/PhaseQuarterlyInfo';
import { ThemeContext } from '../../ThemeContext';
import './Tabs.css';

const onChange = (key) => {

};

const items = [

    {
        key: '1',
        label: '분전반 정보',
        children: <MechanicInfo />,
    },
    {
        key: '2',
        label: '단상분기정보',
        children: <PhaseQuarterlyInfo/>,
    },
    {
        key: '3',
        label: '부하별 금일 사용량',
        children: 'Content of Tab Pane 1',
    },

    {
        key: '4',
        label: '전류 / 과전류',
        children: 'Content of Tab Pane 4',
    },
    /*
    {
        key: '5',
        label: '개발 중 입니다.',
        children: 'Content of Tab Pane 5',
    },
    */
];

const RightBottomMainTabs = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const TabsTheme = isDarkMode ? 'ant-tabs-tab-light' : '';

    return (
        <Tabs className={TabsTheme} defaultActiveKey="1" items={items} onChange={onChange} />
    );
};

export default RightBottomMainTabs;
