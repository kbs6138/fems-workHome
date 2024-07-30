import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import '/fems-workHome/src/Components/DiagramInfo/DiagramInfo.css';
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";

const formatNumber = (number) => {
  if (number === undefined || number === null) {
    return '-';
  }
  return number.toLocaleString();
};

const columns = (animateKey) => [
  {
    title: '현재',
    dataIndex: 'PhaseValue',
    className: 'DiagramDetailTable-column DiagramDetailTable_CurrentValue',
    render: (text) => <div className="DiagramDetailTable_CurrentValue">{formatNumber(text)}</div>,
  },
  {
    title: '최대',
    dataIndex: 'dailyMax',
    className: 'DiagramDetailTable-column DiagramDetailTable_DailyMax',
    render: (text) => <div className="DiagramDetailTable_DailyMax">{formatNumber(text)}</div>,
  },
  {
    title: '최소',
    dataIndex: 'dailyMin',
    className: 'DiagramDetailTable-column DiagramDetailTable_DailyMin',
    render: (text) => <div className="DiagramDetailTable_DailyMin">{formatNumber(text)}</div>,
  },
  {
    title: '평균',
    dataIndex: 'previousValue',
    className: 'DiagramDetailTable-column DiagramDetailTable_PreviousValue',
    render: (text) => <div className="DiagramDetailTable_PreviousValue">{formatNumber(text)}</div>,
  },
  {
    title: '평균대비',
    dataIndex: 'rateOfChange',
    className: 'DiagramDetailTable-column DiagramDetailTable_RateOfChange',
    render: (text) => {
      const rate = parseFloat(text);
      let color;
      let backgroundColor;
      let Icon = null;

      if (rate > 0) {
        color = '#FF1846';
        backgroundColor = '#55203D';
        Icon = BiSolidUpvote;
      } else if (rate < 0) {
        color = '#1CCD2D';
        backgroundColor = '#1E4532';
        Icon = BiSolidDownvote;
      } else {
        color = 'inherit';
        backgroundColor = 'inherit';
        Icon = null;
      }

      return (
        <div className={`DiagramDetailTable_RateOfChange ${animateKey}`} style={{ color, backgroundColor, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center', padding: '5px', borderRadius: '10px' }}>
          {text !== '0.0' ? `${text}%` : '0.0'}
          {Icon && <Icon size={12} style={{ color }} />}
        </div>
      );
    },
  },
];

const DiagramDetailTable = ({ data }) => {
  const [animateKey, setAnimateKey] = useState('');

  useEffect(() => {
    setAnimateKey('DiagramDetailTable_RateOfChange_animate');
    const timer = setTimeout(() => {
      setAnimateKey('');
    }, 500);
    return () => clearTimeout(timer);
  }, [data]);

  return (
    <div className="DiagramDetailTable">
      <Table
        columns={columns(animateKey)}
        dataSource={data}
        pagination={false}
        className="DiagramDetailTable-table"
        showHeader={true}
      />
    </div>
  );
};

export default DiagramDetailTable;
