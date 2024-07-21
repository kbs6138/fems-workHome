import React from 'react';
import { Table } from 'antd';
import './DiagramInfo.css'; // CSS 파일을 import

const columns = [
  {
    title: <div className="DiagramInfoTable-title">날짜</div>,
    dataIndex: 'date',
    sorter: {
      compare: (a, b) => new Date(a.date) - new Date(b.date),
      multiple: 1,
    },
    className: 'DiagramInfoTable-column DiagramInfoTable_Date',
    render: (text) => <div className="DiagramInfoTable_Date">{text}</div>,
  },
  {
    title: <div className="DiagramInfoTable-title">항목</div>,
    dataIndex: 'category',
    sorter: {
      compare: (a, b) => a.category.localeCompare(b.category), // 문자열 비교로 수정
      multiple: 1,
    },
    className: 'DiagramInfoTable-column DiagramInfoTable_category',
    render: (text) => <div className="DiagramInfoTable_category">{text}</div>,
  },
  {
    title: <div className="DiagramInfoTable-title">현재값</div>,
    dataIndex: 'currentValue', // 데이터 소스의 key를 'currentValue'로 수정
    sorter: {
      compare: (a, b) => a.currentValue - b.currentValue,
      multiple: 3,
    },
    className: 'DiagramInfoTable-column DiagramInfoTable_CurrentValue',
    render: (text) => <div className="DiagramInfoTable_CurrentValue">{text}</div>,
  },
  {
    title: <div className="DiagramInfoTable-title">이전값</div>,
    dataIndex: 'previousValue', // 데이터 소스의 key를 'previousValue'로 수정
    sorter: {
      compare: (a, b) => a.previousValue - b.previousValue,
      multiple: 2,
    },
    className: 'DiagramInfoTable-column DiagramInfoTable_PreviousValue',
    render: (text) => <div className="DiagramInfoTable_PreviousValue">{text}</div>,
  },
  {
    title: <div className="DiagramInfoTable-title">이전값 대비 현재값</div>,
    dataIndex: 'difference', // 데이터 소스의 key를 'difference'로 수정
    sorter: {
      compare: (a, b) => a.difference - b.difference,
      multiple: 1,
    },
    className: 'DiagramInfoTable-column DiagramInfoTable_Difference',
    render: (text) => <div className="DiagramInfoTable_Difference">{text}</div>,
  },
];

const data = [
  {
    key: '1',
    date: '2023-05-01',
    category: '전압',
    currentValue: 98, // key 수정
    previousValue: 60, // key 수정
    difference: 70, // key 수정
  },
  {
    key: '2',
    date: '2023-05-02',
    category: '전류',
    currentValue: 95,
    previousValue: 58,
    difference: 68,
  },
  {
    key: '3',
    date: '2023-05-03',
    category: '전력',
    currentValue: 90,
    previousValue: 55,
    difference: 65,
  },
  {
    key: '4',
    date: '2023-05-04',
    category: '역률',
    currentValue: 85,
    previousValue: 50,
    difference: 60,
  },
  {
    key: '5',
    date: '2023-05-05',
    category: '외부온도',
    currentValue: 80,
    previousValue: 45,
    difference: 55,
  },
  {
    key: '6',
    date: '2023-05-06',
    category: '내부온도',
    currentValue: 75,
    previousValue: 40,
    difference: 50,
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
      pagination={{
        pageSize: 6,
        position: ['bottomCenter'],
      }}
      className="DiagramInfoTable-table"
    />
  </div>
);

export default DiagramInfoTable;
