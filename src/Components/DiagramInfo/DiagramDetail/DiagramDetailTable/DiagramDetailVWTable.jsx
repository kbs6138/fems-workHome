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

// Define colors for each phase
const phaseColors = {
  L1: '#00C700',  // Color for L1
  L2: '#FC738A',  // Color for L2
  L3: '#7696FF',  // Color for L3
};

const columns = (animateKey) => [
  {
    title: '상',
    dataIndex: 'Phase',
    className: 'DiagramDetailVWTable-column DiagramDetailVWTable_phase',
    render: (text) => (
      <div className="DiagramDetailVWTable_phase" style={{ color: phaseColors[text] }}>
        {text}
      </div>
    ),
  },
  {
    title: '현재값',
    dataIndex: 'PhaseValue',
    className: 'DiagramDetailVWTable-column DiagramDetailVWTable_CurrentValue',
    render: (text) => (
      <div className="DiagramDetailVWTable_CurrentValue">
        {formatNumber(text)}
      </div>
    ),
  },
  {
    title: '최대',
    dataIndex: 'dailyMax',
    className: 'DiagramDetailVWTable-column DiagramDetailVWTable_DailyMax',
    render: (text) => (
      <div className="DiagramDetailVWTable_DailyMax">
        {formatNumber(text)}
      </div>
    ),
  },
  {
    title: '최소',
    dataIndex: 'dailyMin',
    className: 'DiagramDetailVWTable-column DiagramDetailVWTable_DailyMin',
    render: (text) => (
      <div className="DiagramDetailVWTable_DailyMin">
        {formatNumber(text)}
      </div>
    ),
  },
  {
    title: '평균',
    dataIndex: 'previousValue',
    className: 'DiagramDetailVWTable-column DiagramDetailVWTable_PreviousValue',
    render: (text) => (
      <div className="DiagramDetailVWTable_PreviousValue">
        {formatNumber(text)}
      </div>
    ),
  },
  {
    title: '평균대비',
    dataIndex: 'rateOfChange',
    className: 'DiagramDetailVWTable-column DiagramDetailVWTable_RateOfChange',
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
        <div className={`DiagramDetailVWTable_RateOfChange ${animateKey}`} style={{ color, backgroundColor, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center', padding: '5px', borderRadius: '10px' }}>
          {text !== '0.0' ? `${text}%` : '0.0'}
          {Icon && <Icon size={12} style={{ color }} />}
        </div>
      );
    },
  },
];

const DiagramDetailVWTable = ({ data }) => {
  const [animateKey, setAnimateKey] = useState('');

  useEffect(() => {
    setAnimateKey('DiagramDetailVWTable_RateOfChange_animate');
    const timer = setTimeout(() => {
      setAnimateKey('');
    }, 500);
    return () => clearTimeout(timer);
  }, [data]);

  return (
    <div className="DiagramDetailVWTable">
      <Table
        columns={columns(animateKey)}
        dataSource={data}
        pagination={false}
        className="DiagramDetailVWTable-table"
        showHeader={true}
      />
    </div>
  );
};

export default DiagramDetailVWTable;
