import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: <div className="DiagramInfoTable-title">Name</div>,
    dataIndex: 'name',
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
    name: <div className="DiagramInfoTable-cell">John Brown</div>,
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '2',
    name: <div className="DiagramInfoTable-cell">Jim Green</div>,
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    key: '3',
    name: <div className="DiagramInfoTable-cell">Joe Black</div>,
    chinese: 98,
    math: 90,
    english: 70,
  },
  {
    key: '4',
    name: <div className="DiagramInfoTable-cell">Jim Red</div>,
    chinese: 88,
    math: 99,
    english: 89,
  },
  {
    key: '5',
    name: <div className="DiagramInfoTable-cell">kevin</div>,
    chinese: 88,
    math: 99,
    english: 89,
  },
  {
    key: '6',
    name: <div className="DiagramInfoTable-cell">garen</div>,
    chinese: 88,
    math: 99,
    english: 89,
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
      className="DiagramInfoTable-table"
    />
  </div>
);

export default DiagramInfoTable;
