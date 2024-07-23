import React from 'react';
import { Table } from 'antd';
import '../DiagramInfo.css'; // CSS 파일을 import

const columns = [
  {
    dataIndex: 'category',
    className: 'DiagramInfoTable-column DiagramInfoTable_category',
    render: (text) => <div className="DiagramInfoTable_category">{text}</div>,
  },
  {
    dataIndex: 'currentValue',
    className: 'DiagramInfoTable-column DiagramInfoTable_CurrentValue',
    render: (text) => <div className="DiagramInfoTable_CurrentValue">{text}</div>,
  },
  {
    dataIndex: 'previousValue',
    className: 'DiagramInfoTable-column DiagramInfoTable_PreviousValue',
    render: (text) => <div className="DiagramInfoTable_PreviousValue">{text}</div>,
  },
  {
    dataIndex: 'dailyMax',
    className: 'DiagramInfoTable-column DiagramInfoTable_DailyMax',
    render: (text) => <div className="DiagramInfoTable_DailyMax">{text}</div>,
  },
  {
    dataIndex: 'dailyMin',
    className: 'DiagramInfoTable-column DiagramInfoTable_DailyMin',
    render: (text) => <div className="DiagramInfoTable_DailyMin">{text}</div>,
  },
  {
    dataIndex: 'rateOfChange',
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
      showHeader={false} // 테이블 헤더를 숨기는 옵션
    />
  </div>
);

export default DiagramInfoTable;
