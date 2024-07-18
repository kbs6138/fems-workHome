import React from 'react';
import { Table } from 'antd';
import './DiagramInfo.css'; // CSS 파일을 import

const columns = [
  {
    title: <div className="DiagramInfoTable-title">Date</div>,
    dataIndex: 'date',
    sorter: {
      compare: (a, b) => new Date(a.date) - new Date(b.date),
      multiple: 1,
    },
    className: 'DiagramInfoTable-column',
  },
  {
    title: <div className="DiagramInfoTable-title">Chinese Score</div>,
    dataIndex: 'chinese',
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
    className: 'DiagramInfoTable-column',
  },
  {
    title: <div className="DiagramInfoTable-title">Math Score</div>,
    dataIndex: 'math',
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
    className: 'DiagramInfoTable-column',
  },
  {
    title: <div className="DiagramInfoTable-title">English Score</div>,
    dataIndex: 'english',
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
    className: 'DiagramInfoTable-column',
  },
];

const data = [
  {
    key: '1',
    date: '2023-05-01',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '2',
    date: '2023-05-02',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '3',
    date: '2023-05-03',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '4',
    date: '2023-05-04',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '5',
    date: '2023-05-05',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '6',
    date: '2023-05-06',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '7',
    date: '2023-05-07',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '8',
    date: '2023-05-08',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '9',
    date: '2023-05-09',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '10',
    date: '2023-05-10',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '11',
    date: '2023-05-11',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '12',
    date: '2023-05-12',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '13',
    date: '2023-05-13',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '14',
    date: '2023-05-14',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '15',
    date: '2023-05-15',
    chinese: 98,
    math: 60,
    english: 70,
  }
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
      pagination={{ pageSize: 5 }} // 페이지당 5개의 데이터 표시
      className="DiagramInfoTable-table"
    />
  </div>
);



export default DiagramInfoTable;
