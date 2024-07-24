// DiagramInfo.js
import React, { useState, useEffect } from 'react';
import DiagramInfoTest_Chart from './DiagramInfo_Chart/DiagramInfoTest_Chart';
import { DownOutlined } from '@ant-design/icons';

import DiagramInfoTable from './DiagramTable.jsx/DiagramInfoTable';
import { Card, Col, Row, Layout, Dropdown, Space } from 'antd';
import DiagramInfoChart from './DiagramInfo_Chart/DiagramInfo_Chart';
import './DiagramInfo.css';
import { useVoltData, useAmData, useWData, usePFData, useInData, useOutData, useMinData, useMaxData } from './DiagramInfo_DB/DiagramInfo_DB';

const { Content } = Layout;

const DiagramInfo = () => {

  const [refreshInterval, setRefreshInterval] = useState(10000); // 초기값 설정
  const [currentTime, setCurrentTime] = useState('');

  const { data: VoltData } = useVoltData(refreshInterval);
  const { data: AmData } = useAmData(refreshInterval);
  const { data: WData } = useWData(refreshInterval);
  const { data: PfData } = usePFData(refreshInterval);
  const { data: InData } = useInData(refreshInterval);
  const { data: OutData } = useOutData(refreshInterval);
  const { data: MinData } = useMinData(refreshInterval);
  const { data: MaxData } = useMaxData(refreshInterval);

  const handleMenuClick = (key) => {
    setRefreshInterval(key); // 클릭한 메뉴의 키로 refreshInterval 업데이트
  };

  const menuItems = [
    { key: 0, label: '정지' },
    { key: 1000, label: '1초' },
    { key: 5000, label: '5초' },
    { key: 10000, label: '10초' },
  ];

  const [chartColors, setChartColors] = useState([]);
  const MinValue = ['210', '460', '84000', '83'];
  const MaxValue = ['225', '500', '100000', '88'];

  const tableDataArray = [
    [
      {/*내부온도*/
        key: '5',
        currentValue: 98,
        previousValue: 60,
        dailyMax: 100,
        dailyMin: 50,
        rateOfChange: 63.33,
      },
    ],
    [
      {/*외부온도*/
        key: '6',
        currentValue: 75,
        previousValue: 65,
        dailyMax: 85,
        dailyMin: 60,
        rateOfChange: 15.38,
      },
    ],
  ];

  useEffect(() => {

    // 현재 시간 업데이트
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString()); // 날짜와 시간을 문자열로 변환
    };

    updateTime(); // 처음 렌더링 시 시간 설정
    const interval = setInterval(updateTime, 1000); // 1초마다 시간 업데이트
    const colors = ['#FF6B6B', '#FFD700', '#9370DB', '#00BFFF', '#7CFC00', '#FF69B4'];
    setChartColors(colors);
  }, []);

  return (
    <Content className="app-Content">
      <Row>
        <Col className="gutter-row" span={16}>
          <Card bordered={false} style={{ padding: 0, background: 'transparent', color: 'white', marginTop: '-15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '20px' }}>장비 상세보기</span>

              <span style={{ fontSize: '16px' }}>{currentTime}</span> {/* 현재 시간 표시 */}
              <Dropdown
                menu={{
                  items: menuItems.map(({ key, label }) => ({
                    key,
                    label,
                    onClick: () => handleMenuClick(key), // 클릭 시 refreshInterval 업데이트
                  })),
                }}
                trigger={['click']}
              >
                <a onClick={e => e.preventDefault()}>
                  <Space>{menuItems.find(item => item.key === refreshInterval)?.label || '10초'}<DownOutlined /></Space>
                </a>
              </Dropdown>
            </div>

            <Row gutter={[10, 2]}>
              <Col span={12}>
                {MinData[0]?.min !== undefined && MaxData[0]?.max !== undefined && (
                  <Card title={<div className='Diagram_V_Card_Title'>전압</div>} bordered={false} className='Diagram_V_Card'>
                    <DiagramInfoChart key={1} data={VoltData[0]?.v_data} chartColor={chartColors[0]} Min={MinData[0].min} Max={MaxData[0].max} />
                  </Card>
                )}
              </Col>
              <Col span={12}>
                {MinData[1]?.min !== undefined && MaxData[1]?.max !== undefined && (
                  <Card title={<div className='Diagram_A_Card_Title'>전류</div>} bordered={false} className='Diagram_A_Card'>
                    <DiagramInfoChart key={2} data={AmData[0]?.am_data} chartColor={chartColors[1]} Min={MinData[1].min} Max={MaxData[1].max} />
                  </Card>
                )}
              </Col>
              <Col span={12}>
                {MinData[2]?.min !== undefined && MaxData[2]?.max !== undefined && (
                  <Card title={<div className='Diagram_W_Card_Title'>전력</div>} bordered={false} className='Diagram_W_Card'>
                    <DiagramInfoChart key={3} data={WData[0]?.w_data} chartColor={chartColors[2]} Min={MinData[2].min} Max={MaxData[2].max} />
                  </Card>
                )}
              </Col>
              <Col span={12}>
                {MinData[3]?.min !== undefined && MaxData[3]?.max !== undefined && (
                  <Card title={<div className='Diagram_WVA_Card_Title'>역률</div>} bordered={false} className='Diagram_WVA_Card'>
                    <DiagramInfoChart key={4} data={PfData[0]?.pf_data} chartColor={chartColors[3]} Min={MinData[3].min} Max={MaxData[3].max} />
                  </Card>
                )}
              </Col>
              <Col span={12}>
                {MinData[4]?.min !== undefined && MaxData[4]?.max !== undefined && (
                  <Card title={<div className='Diagram_OutDeg_Card_Title'>외부온도</div>} bordered={false} className='Diagram_OutDeg_Card'>
                    <DiagramInfoChart key={5} data={OutData[0]?.out_data} chartColor={chartColors[4]} Min={MinData[4].min} Max={MaxData[4].max} />
                  </Card>
                )}
              </Col>
              <Col span={12}>
                {MinData[5]?.min !== undefined && MaxData[5]?.max !== undefined && (
                  <Card title={<div className='Diagram_InnerDeg_Card_Title'>내부온도</div>} bordered={false} className='Diagram_InnerDeg_Card'>
                    <DiagramInfoChart key={6} data={InData[0]?.in_data} chartColor={chartColors[5]} Min={MinData[5].min} Max={MaxData[5].max} />
                  </Card>
                )}
              </Col>
            </Row>

          </Card>
        </Col>
        <Col span={8} style={{ marginTop: '25px' }}>
          <span style={{ fontSize: '20px', color: 'white', marginTop: '-15px' }}>실시간 수치</span>


          <Card size='small' bordered={false} className='DiagramInfo_Card' style={{ height: '895px', marginTop: '14px' }}>

            <Row>

              <Col span={24}>
                <Card style={{ background: 'transparent', height: '150px', boxShadow: ' 0px 0px 10px 2px rgb(22, 42, 69)' }} bordered={false}>
                  <span className='Diagram_Name' style={{ fontSize: '15px', color: 'white', marginTop: '-10px' }}>내부온도</span>
                  <Row gutter={[10, 2]}> {/* 여백을 추가 */}
                    <Col span={12}>
                      <DiagramInfoTable data={tableDataArray[0]} />
                    </Col>
                    <Col span={12}>
                      <DiagramInfoTest_Chart key={6} data={VoltData[0]?.v_data} chartColor={chartColors[0]} Min={MinValue[0]} Max={MaxValue[0]} />
                    </Col>
                  </Row>
                </Card>
              </Col>

              <Col span={24} style={{ marginTop: '10px' }}>
                <Card style={{ background: 'transparent', height: '150px', boxShadow: '0px 0px 10px 2px rgb(22, 42, 69)' }} bordered={false}>
                  <span className='Diagram_Name' style={{ padding: '0 0 0 5px', fontSize: '15px', color: 'white' }}>외부온도</span>
                  <Row gutter={[10, 2]}> {/* 여백을 추가 */}
                    <Col span={12}>
                      <DiagramInfoTable data={tableDataArray[0]} />
                    </Col>
                    <Col span={12}>
                      <DiagramInfoTest_Chart key={7} data={WData[0]?.w_data} chartColor={chartColors[2]} Min={MinValue[2]} Max={MaxValue[2]} />
                    </Col>
                  </Row>
                </Card>
              </Col>

              {/* 추가 테이블들 */}

            </Row>

          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default DiagramInfo;
