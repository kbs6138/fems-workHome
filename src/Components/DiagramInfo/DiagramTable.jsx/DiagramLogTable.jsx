import React from 'react';
import { Table } from 'antd';
import '../DiagramInfo.css'; // CSS 파일을 import

const columns = [
  {
    title: <div className="DiagramLogTable-title">시간</div>,
    dataIndex: 'time',
    className: 'DiagramLogTable-column DiagramLogTable_Time',
    render: (text) => <div className="DiagramLogTable_Time">{text}</div>,
  },
  {
    title: <div className="DiagramLogTable-title">전압</div>,
    dataIndex: 'voltage',
    className: 'DiagramLogTable-column DiagramLogTable_Voltage',
    render: (text) => <div className="DiagramLogTable_Voltage">{text}</div>,
  },
  {
    title: <div className="DiagramLogTable-title">전류</div>,
    dataIndex: 'current',
    className: 'DiagramLogTable-column DiagramLogTable_Current',
    render: (text) => <div className="DiagramLogTable_Current">{text}</div>,
  },
  {
    title: <div className="DiagramLogTable-title">전력</div>,
    dataIndex: 'power',
    className: 'DiagramLogTable-column DiagramLogTable_Power',
    render: (text) => <div className="DiagramLogTable_Power">{text}</div>,
  },
  {
    title: <div className="DiagramLogTable-title">역률</div>,
    dataIndex: 'powerFactor',
    className: 'DiagramLogTable-column DiagramLogTable_PowerFactor',
    render: (text) => <div className="DiagramLogTable_PowerFactor">{text}</div>,
  },
  {
    title: <div className="DiagramLogTable-title">외부온도</div>,
    dataIndex: 'externalTemperature',
    className: 'DiagramLogTable-column DiagramLogTable_ExternalTemperature',
    render: (text) => <div className="DiagramLogTable_ExternalTemperature">{text}</div>,
  },
  {
    title: <div className="DiagramLogTable-title">내부온도</div>,
    dataIndex: 'internalTemperature',
    className: 'DiagramLogTable-column DiagramLogTable_InternalTemperature',
    render: (text) => <div className="DiagramLogTable_InternalTemperature">{text}</div>,
  },
];

const data = [
  {
    key: '1',
    time: '2023-05-01 12:00',
    voltage: 98,
    current: 10,
    power: 50,
    powerFactor: 0.9,
    externalTemperature: 25,
    internalTemperature: 22,
  },
  {
    key: '2',
    time: '2023-05-02 12:00',
    voltage: 95,
    current: 12,
    power: 55,
    powerFactor: 0.85,
    externalTemperature: 26,
    internalTemperature: 23,
  },
  {
    key: '3',
    time: '2023-05-03 12:00',
    voltage: 90,
    current: 15,
    power: 60,
    powerFactor: 0.8,
    externalTemperature: 27,
    internalTemperature: 24,
  },
  {
    key: '4',
    time: '2023-05-04 12:00',
    voltage: 85,
    current: 8,
    power: 45,
    powerFactor: 0.75,
    externalTemperature: 28,
    internalTemperature: 25,
  },
  {
    key: '5',
    time: '2023-05-05 12:00',
    voltage: 80,
    current: 9,
    power: 42,
    powerFactor: 0.7,
    externalTemperature: 29,
    internalTemperature: 26,
  },
  {
    key: '6',
    time: '2023-05-06 12:00',
    voltage: 75,
    current: 7,
    power: 40,
    powerFactor: 0.65,
    externalTemperature: 30,
    internalTemperature: 27,
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const DiagramLogTable = () => (
  <div className="DiagramLogTable">
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      pagination={false}
      className="DiagramLogTable-table"
    />
  </div>
);

export default DiagramLogTable;
