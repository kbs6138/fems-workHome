import React, { useContext, useState } from 'react';
import { Table } from 'antd';
import './PhaseQuarterlyInfo.css';
import { ThemeContext } from '../../Components/ThemeContext';

const columns = [
  {
    title: '부하정보',
    dataIndex: 'loadInfo',
    key: '1',
    className: 'PhaseQuarterlyInfo_loadInfo',
  },
  {
    title: '상태',
    dataIndex: 'status',
    key: '2',
    className: 'PhaseQuarterlyInfo_status',
  },
  {
    title: '용량(A)',
    dataIndex: 'capacity',
    key: '3',
    className: 'PhaseQuarterlyInfo_capacity',
  },
  {
    title: '상',
    dataIndex: 'phase',
    key: '4',
    className: 'PhaseQuarterlyInfo_phase',
  },
  {
    title: '전류(A)',
    dataIndex: 'current',
    key: '5',
    className: 'PhaseQuarterlyInfo_current',
  },
  {
    title: '전력(W)',
    dataIndex: 'power',
    key: '6',
    className: 'PhaseQuarterlyInfo_power',
  },
  {
    title: '합성누설(mA)',
    dataIndex: 'totalLeakage',
    key: '7',
    className: 'PhaseQuarterlyInfo_totalLeakage',
  },
  {
    title: '저항성누설(mA)',
    dataIndex: 'resistiveLeakage',
    key: '8',
    className: 'PhaseQuarterlyInfo_resistiveLeakage',
  },
  {
    title: '용량성누설(mA)',
    dataIndex: 'capacitiveLeakage',
    key: '9',
    className: 'PhaseQuarterlyInfo_capacitiveLeakage',
  },
  {
    title: '절연저항(㏁)',
    dataIndex: 'insulationResistance',
    key: '10',
    className: 'PhaseQuarterlyInfo_insulationResistance',
  },
  {
    title: '아크',
    dataIndex: 'arc',
    key: '11',
    className: 'PhaseQuarterlyInfo_arc',
  },
];

const data = [
  {
    key: '1',
    loadInfo: '템플스테이 부하1',
    status: 'ON',
    capacity: 20,
    phase: 'R',
    current: 0.00,
    power: 0.0,
    totalLeakage: 0.00,
    resistiveLeakage: 0.00,
    capacitiveLeakage: 0.00,
    insulationResistance: 0.00,
    arc: '정상',
  },
  {
    key: '2',
    loadInfo: '템플스테이 부하2',
    status: 'ON',
    capacity: 20,
    phase: 'R',
    current: 0.00,
    power: 0.0,
    totalLeakage: 0.00,
    resistiveLeakage: 0.00,
    capacitiveLeakage: 0.00,
    insulationResistance: 0.00,
    arc: '정상',
  },
  {
    key: '3',
    loadInfo: '템플스테이 부하3',
    status: 'ON',
    capacity: 20,
    phase: 'R',
    current: 0.00,
    power: 0.0,
    totalLeakage: 0.00,
    resistiveLeakage: 0.00,
    capacitiveLeakage: 0.00,
    insulationResistance: 0.00,
    arc: '정상',
  },
  {
    key: '4',
    loadInfo: '템플스테이 부하4',
    status: 'ON',
    capacity: 20,
    phase: 'R',
    current: 0.00,
    power: 0.0,
    totalLeakage: 0.00,
    resistiveLeakage: 0.00,
    capacitiveLeakage: 0.00,
    insulationResistance: 0.00,
    arc: '정상',
  },
  {
    key: '5',
    loadInfo: '템플스테이 부하5',
    status: 'ON',
    capacity: 20,
    phase: 'R',
    current: 0.00,
    power: 0.0,
    totalLeakage: 0.00,
    resistiveLeakage: 0.00,
    capacitiveLeakage: 0.00,
    insulationResistance: 0.00,
    arc: '정상',
  },
  {
    key: '6',
    loadInfo: '템플스테이 부하6',
    status: 'ON',
    capacity: 20,
    phase: 'R',
    current: 0.00,
    power: 0.0,
    totalLeakage: 0.00,
    resistiveLeakage: 0.00,
    capacitiveLeakage: 0.00,
    insulationResistance: 0.00,
    arc: '정상',
  },
  {
    key: '7',
    loadInfo: '템플스테이 부하7',
    status: 'ON',
    capacity: 20,
    phase: 'R',
    current: 0.00,
    power: 0.0,
    totalLeakage: 0.00,
    resistiveLeakage: 0.00,
    capacitiveLeakage: 0.00,
    insulationResistance: 0.00,
    arc: '정상',
  },
  {
    key: '8',
    loadInfo: '템플스테이 부하8',
    status: 'ON',
    capacity: 20,
    phase: 'R',
    current: 0.00,
    power: 0.0,
    totalLeakage: 0.00,
    resistiveLeakage: 0.00,
    capacitiveLeakage: 0.00,
    insulationResistance: 0.00,
    arc: '정상',
  },
];

const defaultCheckedList = columns.map((item) => item.key);

const PhaseQuarterlyInfo = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [checkedList] = useState(defaultCheckedList);

  const newColumns = columns.filter((item) => checkedList.includes(item.key));

  return (
    <div className={`PhaseQuarterlyInfo ${isDarkMode ? 'PhaseQuarterlyInfo--dark-mode' : ''}`}>
      <Table
        columns={newColumns}
        dataSource={data}
        pagination={false}
        className="PhaseQuarterlyInfo_table"
        style={{
          padding: '4px 4px',
          fontSize: '12px',
          height: '10px',
        }}
      />
    </div>
  );
};

export default PhaseQuarterlyInfo;