import React from 'react';
import { Table } from 'antd';

// 커스텀 컴포넌트를 정의하여 클래스 이름을 추가합니다.
const components = {
  header: {
    wrapper: (props) => <thead className="DiagramInfoTable-thead" {...props} />,
    row: (props) => <tr className="DiagramInfoTable-thead-row" {...props} />,
    cell: (props) => <th className="DiagramInfoTable-thead-cell" {...props} />,
  },
  body: {
    wrapper: (props) => <tbody className="DiagramInfoTable-tbody" {...props} />,
    row: (props) => <tr className="DiagramInfoTable-tbody-row" {...props} />,
    cell: (props) => <td className="DiagramInfoTable-tbody-cell" {...props} />,
  },
};

// 컬럼 정의
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <span className="DiagramInfoTable-span">{text}</span>,
  },
  {
    title: 'Chinese Score',
    dataIndex: 'chinese',
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
    render: (text) => <span className="DiagramInfoTable-span">{text}</span>,
  },
  {
    title: 'Math Score',
    dataIndex: 'math',
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
    render: (text) => <span className="DiagramInfoTable-span">{text}</span>,
  },
  {
    title: 'English Score',
    dataIndex: 'english',
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
    render: (text) => <span className="DiagramInfoTable-span">{text}</span>,
  },
];

// 데이터 정의
const data = [
  {
    key: '1',
    name: 'John Brown',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '2',
    name: 'Jim Green',
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    key: '3',
    name: 'Joe Black',
    chinese: 98,
    math: 90,
    english: 70,
  },
  {
    key: '4',
    name: 'Jim Red',
    chinese: 88,
    math: 99,
    english: 89,
  },
];

// 테이블 변경 핸들러
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

// 테이블 컴포넌트
const DiagramInfoTable = () => (
  <Table
    columns={columns}
    dataSource={data}
    onChange={onChange}
    components={components}
  />
);

export default DiagramInfoTable;
