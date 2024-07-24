import React from 'react';
import { Table } from 'antd';
import '../DiagramInfo.css'; // CSS 파일을 import

const columns = [
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

const DiagramInfoTable = ({ data }) => (
  <div className="DiagramInfoTable">
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      className="DiagramInfoTable-table"
      showHeader={false} // 테이블 헤더를 숨기는 옵션
    />
  </div>
);

export default DiagramInfoTable;
