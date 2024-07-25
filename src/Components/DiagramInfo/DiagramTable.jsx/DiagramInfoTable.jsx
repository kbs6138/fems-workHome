import React from 'react';
import { Table } from 'antd';
import '../DiagramInfo.css'; // CSS 파일을 import
import { BiSolidUpvote ,  BiSolidDownvote } from "react-icons/bi";

const formatNumber = (number) => {
  return number.toLocaleString(); // Add commas to the number
};

const columns = [
  {
    title: '현재', // 헤더 제목을 설정
    dataIndex: 'currentValue',
    className: 'DiagramInfoTable-column DiagramInfoTable_CurrentValue',
    render: (text) => <div className="DiagramInfoTable_CurrentValue">{formatNumber(text)}</div>,
  },
  {
    title: '최대', // 헤더 제목을 설정
    dataIndex: 'dailyMax',
    className: 'DiagramInfoTable-column DiagramInfoTable_DailyMax',
    render: (text) => <div className="DiagramInfoTable_DailyMax">{formatNumber(text)}</div>,
  },
  {
    title: '최소', // 헤더 제목을 설정
    dataIndex: 'dailyMin',
    className: 'DiagramInfoTable-column DiagramInfoTable_DailyMin',
    render: (text) => <div className="DiagramInfoTable_DailyMin">{formatNumber(text)}</div>,
  },
  {
    title: '평균', // 헤더 제목을 설정
    dataIndex: 'previousValue',
    className: 'DiagramInfoTable-column DiagramInfoTable_PreviousValue',
    render: (text) => <div className="DiagramInfoTable_PreviousValue">{formatNumber(text)}</div>,
  },
  {
    title: '평균대비', // 헤더 제목을 설정
    dataIndex: 'rateOfChange',
    className: 'DiagramInfoTable-column DiagramInfoTable_RateOfChange',
    render: (text) => {
      const rate = parseFloat(text);
      let color;
      let Icon = null;

      if (rate > 0) {
        color = '#FF5A5A';
        Icon = BiSolidUpvote;
      } else if (rate < 0) {
        color = '#7696FF';
        Icon = BiSolidDownvote;
      } else {
        color = 'inherit'; // 변화가 없을 때 색상 설정
        Icon = null; // 아이콘 숨김
      }

      return (
        <div className="DiagramInfoTable_RateOfChange" style={{ color, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center' }}>
          {text !== '0.0' ? `${text}%` : '0.0'}
          {Icon && <Icon size={15} style={{ color }} />}
        </div>
      );
    },
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
