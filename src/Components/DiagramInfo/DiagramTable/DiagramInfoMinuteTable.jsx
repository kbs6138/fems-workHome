import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import '../DiagramInfo.css';
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
    className: 'DiagramInfoMinuteTable-column DiagramInfoMinuteTable_phase',
    render: (text) => (
      <div className="DiagramInfoMinuteTable_phase" style={{ color: phaseColors[text] }}>
        {text}
      </div>
    ),
  },
  {
    title: '현재값',
    dataIndex: 'PhaseValue',
    className: 'DiagramInfoMinuteTable-column DiagramInfoMinuteTable_CurrentValue',
    render: (text) => (
      <div className="DiagramInfoMinuteTable_CurrentValue">
        {formatNumber(text)}
      </div>
    ),
  },
  {
    title: '최대',
    dataIndex: 'dailyMax',
    className: 'DiagramInfoMinuteTable-column DiagramInfoMinuteTable_DailyMax',
    render: (text) => (
      <div className="DiagramInfoMinuteTable_DailyMax">
        {formatNumber(text)}
      </div>
    ),
  },
  {
    title: '최소',
    dataIndex: 'dailyMin',
    className: 'DiagramInfoMinuteTable-column DiagramInfoMinuteTable_DailyMin',
    render: (text) => (
      <div className="DiagramInfoMinuteTable_DailyMin">
        {formatNumber(text)}
      </div>
    ),
  },
  {
    title: '평균',
    dataIndex: 'previousValue',
    className: 'DiagramInfoMinuteTable-column DiagramInfoMinuteTable_PreviousValue',
    render: (text) => (
      <div className="DiagramInfoMinuteTable_PreviousValue">
        {formatNumber(text)}
      </div>
    ),
  },
  {
    title: '평균대비',
    dataIndex: 'rateOfChange',
    className: 'DiagramInfoMinuteTable-column DiagramInfoMinuteTable_RateOfChange',
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
        <div className={`DiagramInfoMinuteTable_RateOfChange ${animateKey}`} style={{ color, backgroundColor, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center', padding: '5px', borderRadius: '10px' }}>
          {text !== '0.0' ? `${text}%` : '0.0'}
          {Icon && <Icon size={12} style={{ color }} />}
        </div>
      );
    },
  },
];

const DiagramInfoMinuteTable = ({ data }) => {
  const [animateKey, setAnimateKey] = useState('');

  useEffect(() => {
    setAnimateKey('DiagramInfoMinuteTable_RateOfChange_animate');
    const timer = setTimeout(() => {
      setAnimateKey('');
    }, 500);
    return () => clearTimeout(timer);
  }, [data]);

  return (
    <div className="DiagramInfoMinuteTable">
      <Table
        columns={columns(animateKey)}
        dataSource={data}
        pagination={false}
        className="DiagramInfoMinuteTable-table"
        showHeader={true}
      />
    </div>
  );
};

export default DiagramInfoMinuteTable;
