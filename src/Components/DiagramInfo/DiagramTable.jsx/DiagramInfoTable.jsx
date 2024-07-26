import React from 'react';
import { Table } from 'antd';
import '../DiagramInfo.css'; // CSS 파일을 import
import { BiSolidUpvote ,  BiSolidDownvote } from "react-icons/bi";

const formatNumber = (number) => {
  if (number === undefined || number === null) {
    return '-'; // 기본값 설정
  }
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
      let backgroundColor;
      let Icon = null;

      if (rate > 0) {
        color = '#1CCD2D';
        backgroundColor = '#1E4532'; // 수치가 0보다 낮을 때배경
        Icon = BiSolidUpvote;
      } else if (rate < 0) {
        color = '#FF1846';
        backgroundColor = '#55203D'; // 수치가 0보다 높을 때 배경
        Icon = BiSolidDownvote;
      } else {
        color = 'inherit'; // 변화가 없을 때 색상 설정
        backgroundColor = 'inherit'; // 변화가 없을 때 배경색 설정
        Icon = null; // 아이콘 숨김
      }

      return (
        <div className="DiagramInfoTable_RateOfChange" style={{ color, backgroundColor, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center', padding: '5px', borderRadius: '10px' }}>
          {text !== '0.0' ? `${text}%` : '0.0'}
          {Icon && <Icon size={12} style={{ color }} />}
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
