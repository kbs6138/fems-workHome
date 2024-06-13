import React from 'react';
import { Tabs } from 'antd';

const onChange = (key) => {
    console.log(key);
};

const items = [
    {
        key: '1',
        label: '부하별 금일 사용량',
        children: 'Content of Tab Pane 1',
    },
    {
        key: '2',
        label: '분전반 정보',
        children: 'Content of Tab Pane 2',
    },
    {
        key: '3',
        label: '단상분기정보',
        children: 'Content of Tab Pane 3',
    },
    {
        key: '4',
        label: '전류 / 과전류',
        children: 'Content of Tab Pane 4',
    },
    {
        key: '5',
        label: '개발 중 입니다.',
        children: 'Content of Tab Pane 5',
    },
];

const RightBottomMainTabs = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;

export default RightBottomMainTabs;
