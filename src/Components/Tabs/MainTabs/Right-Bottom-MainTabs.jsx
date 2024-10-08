import React, { useContext } from 'react';
import { Tabs } from 'antd';
import MechanicInfo from '../../MechanicInfo/MechanicInfo';
import PhaseQuarterlyInfo from '../../PhaseQuarterlyInfo/PhaseQuarterlyInfo';
import { ThemeContext } from '../../ThemeContext';
import './Tabs.css';

const onChange = (key) => {
    // 탭이 변경될 때 실행될 로직을 여기에 작성할 수 있습니다.
};

const RightBottomMainTabs = ({ MainDiagramData }) => {
    const { isDarkMode } = useContext(ThemeContext);
    const TabsTheme = isDarkMode ? 'ant-tabs-tab-light' : '';

    const items = [
        {
            key: '1',
            label: '분전반 정보',
            children: <MechanicInfo MainDiagramData={MainDiagramData} />,
        },
        {
            key: '2',
            label: '단상분기정보',
            children: <PhaseQuarterlyInfo/>,
        }

    ];

    return (
        <Tabs className={TabsTheme} defaultActiveKey="1" items={items} onChange={onChange} />
    );
};

export default RightBottomMainTabs;
