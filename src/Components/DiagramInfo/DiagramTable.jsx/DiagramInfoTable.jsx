import React from 'react';
import { Table } from 'antd';
import '../DiagramInfo.css'; // CSS 파일을 import

const columns = [
  {
    title: <div className="DiagramInfoTable-title">항목</div>,
    dataIndex: 'category',
    sorter: {
      compare: (a, b) => a.category.localeCompare(b.category),
      multiple: 1,
    },
    className: 'DiagramInfoTable-column DiagramInfoTable_category',
    render: (text) => <div className="DiagramInfoTable_category">{text}</div>,
  },
  {
    title: <div className="DiagramInfoTable-title">현재값</div>,
    dataIndex: 'currentValue',
    sorter: {
      compare: (a, b) => a.currentValue - b.currentValue,
      multiple: 2,
    },
    className: 'DiagramInfoTable-column DiagramInfoTable_CurrentValue',
    render: (text) => <div className="DiagramInfoTable_CurrentValue">{text}</div>,
  },
  {
    title: <div className="DiagramInfoTable-title">이전값</div>,
    dataIndex: 'previousValue',
    sorter: {
      compare: (a, b) => a.previousValue - b.previousValue,
      multiple: 3,
    },
    className: 'DiagramInfoTable-column DiagramInfoTable_PreviousValue',
    render: (text) => <div className="DiagramInfoTable_PreviousValue">{text}</div>,
  },
  {
    title: <div className="DiagramInfoTable-title">당일최대</div>,
    dataIndex: 'dailyMax',
    sorter: {
      compare: (a, b) => a.dailyMax - b.dailyMax,
      multiple: 4,
    },
    className: 'DiagramInfoTable-column DiagramInfoTable_DailyMax',
    render: (text) => <div className="DiagramInfoTable_DailyMax">{text}</div>,
  },
  {
    title: <div className="DiagramInfoTable-title">당일최소</div>,
    dataIndex: 'dailyMin',
    sorter: {
      compare: (a, b) => a.dailyMin - b.dailyMin,
      multiple: 5,
    },
    className: 'DiagramInfoTable-column DiagramInfoTable_DailyMin',
    render: (text) => <div className="DiagramInfoTable_DailyMin">{text}</div>,
  },
  {
    title: <div className="DiagramInfoTable-title">가감률</div>,
    dataIndex: 'rateOfChange',
    sorter: {
      compare: (a, b) => a.rateOfChange - b.rateOfChange,
      multiple: 6,
    },
    className: 'DiagramInfoTable-column DiagramInfoTable_RateOfChange',
    render: (text) => <div className="DiagramInfoTable_RateOfChange">{text}</div>,
  },
];

const data = [
  {
    key: '1',
    category: '전압',
    currentValue: 98,
    previousValue: 60,
    dailyMax: 100,
    dailyMin: 50,
    rateOfChange: 63.33, // 예시 값
  },
  {
    key: '2',
    category: '전류',
    currentValue: 95,
    previousValue: 58,
    dailyMax: 98,
    dailyMin: 55,
    rateOfChange: 63.79, // 예시 값
  },
  {
    key: '3',
    category: '전력',
    currentValue: 90,
    previousValue: 55,
    dailyMax: 95,
    dailyMin: 50,
    rateOfChange: 63.64, // 예시 값
  },
  {
    key: '4',
    category: '역률',
    currentValue: 85,
    previousValue: 50,
    dailyMax: 90,
    dailyMin: 45,
    rateOfChange: 70.00, // 예시 값
  },
  {
    key: '5',
    category: '외부온도',
    currentValue: 80,
    previousValue: 45,
    dailyMax: 85,
    dailyMin: 40,
    rateOfChange: 77.78, // 예시 값
  },
  {
    key: '6',
    category: '내부온도',
    currentValue: 75,
    previousValue: 40,
    dailyMax: 80,
    dailyMin: 35,
    rateOfChange: 87.50, // 예시 값
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const DiagramInfoTable = () => (
  <div className="DiagramInfoTable">
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      pagination={false}
      className="DiagramInfoTable-table"
    />
  </div>
);

export default DiagramInfoTable;
