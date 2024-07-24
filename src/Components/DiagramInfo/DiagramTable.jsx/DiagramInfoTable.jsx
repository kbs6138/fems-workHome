import React from 'react';
import { Table } from 'antd';
import '../DiagramInfo.css'; // CSS 파일을 import

const columns = [
  {
    title: '현재', // 헤더 제목을 설정
    dataIndex: 'currentValue',
    className: 'DiagramInfoTable-column DiagramInfoTable_CurrentValue',
    render: (text) => <div className="DiagramInfoTable_CurrentValue">{text}</div>,
  },
  {
    title: '최대', // 헤더 제목을 설정
    dataIndex: 'dailyMax',
    className: 'DiagramInfoTable-column DiagramInfoTable_DailyMax',
    render: (text) => <div className="DiagramInfoTable_DailyMax">{text}</div>,
  },
  {
    title: '최소', // 헤더 제목을 설정
    dataIndex: 'dailyMin',
    className: 'DiagramInfoTable-column DiagramInfoTable_DailyMin',
    render: (text) => <div className="DiagramInfoTable_DailyMin">{text}</div>,
  },
  {
    title: '평균', // 헤더 제목을 설정
    dataIndex: 'previousValue',
    className: 'DiagramInfoTable-column DiagramInfoTable_PreviousValue',
    render: (text) => <div className="DiagramInfoTable_PreviousValue">{text}</div>,
  },
  {
    title: '대비', // 헤더 제목을 설정
    dataIndex: 'rateOfChange',
    className: 'DiagramInfoTable-column DiagramInfoTable_RateOfChange',
    render: (text) => <div className="DiagramInfoTable_RateOfChange">{text}</div>,
  },
];

const DiagramInfoTable = ({ data }) => (
  <div className="DiagramInfoTable">
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      className="DiagramInfoTable-table"
      showHeader={true} // 테이블 헤더를 표시하는 옵션
    />
  </div>
);

export default DiagramInfoTable;
