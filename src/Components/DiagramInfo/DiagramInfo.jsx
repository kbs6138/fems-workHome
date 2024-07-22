import React, { useState, useEffect } from 'react'
import DiagramLogTable from './DiagramTable.jsx/DiagramLogTable';
import DiagramInfoTable from './DiagramTable.jsx/DiagramInfoTable';
import { Card, Col, Row, Layout } from 'antd';
import DiagramInfoChart from './DiagramInfo_Chart/DiagramInfo_Chart';
import './DiagramInfo.css'
import { useVoltData } from './DiagramInfo_DB/DiagramInfo_DB';

const { Content } = Layout;

const DiagramInfo = () => {
  const { data: VoltData } = useVoltData();
  const [chartColors, setChartColors] = useState([]);

  useEffect(() => {
    const colors = ['#FF6B6B', '#FFD700', '#9370DB', '#00BFFF', '#7CFC00', '#FF69B4'];
    setChartColors(colors);
  }, []);

  return (
    <Content className="app-Content">
      <Row>


        <Col className="gutter-row" span={16}>
          <Card bordered={false} style={{ padding: 0, background: 'transparent', color: 'white', marginTop: '-15px' }} >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '20px' }}>장비 상세보기</span>
            </div>


            <Row gutter={[10, 2]} >
              <Col span={12}>
                <Card title={<div className='Diagram_V_Card_Title'>전압</div>} bordered={false} className='Diagram_V_Card'>
                  <DiagramInfoChart key={1} VoltData={VoltData[0]} chartColor={chartColors[0]} />
                </Card>
              </Col>
              <Col span={12}>
                <Card title={<div className='Diagram_A_Card_Title'>전류</div>} bordered={false} className='Diagram_A_Card'>
                  <DiagramInfoChart key={2} VoltData={VoltData[1]} chartColor={chartColors[1]} />
                </Card>
              </Col>
              <Col span={12}>
                <Card title={<div className='Diagram_W_Card_Title'>전력</div>} bordered={false} className='Diagram_W_Card'>
                  <DiagramInfoChart key={3} VoltData={VoltData[2]} chartColor={chartColors[2]} />
                </Card>
              </Col>
              <Col span={12}>
                <Card title={<div className='Diagram_WVA_Card_Title'>역률</div>} bordered={false} className='Diagram_WVA_Card'>
                  <DiagramInfoChart key={4} VoltData={VoltData[3]} chartColor={chartColors[3]} />
                </Card>
              </Col>
              <Col span={12}>
                <Card title={<div className='Diagram_OutDeg_Card_Title'>외부온도</div>} bordered={false} className='Diagram_OutDeg_Card'>
                  <DiagramInfoChart key={5} VoltData={VoltData[4]} chartColor={chartColors[4]} />
                </Card>
              </Col>
              <Col span={12}>
                <Card title={<div className='Diagram_InnerDeg_Card_Title'>내부온도</div>} bordered={false} className='Diagram_InnerDeg_Card'>
                  <DiagramInfoChart key={6} VoltData={VoltData[5]} chartColor={chartColors[5]} />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8} style={{ marginTop: '25px' }}>
          <Card size='small' bordered={false} className='DiagramInfo_Card' style={{ height: '355px', marginTop: '20px' }}>
            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '15px', marginTop: '-10px' }}>
              실시간 수치
            </span>
            <Row style={{ marginTop: '10px' }}>
              <Col span={24}>
                <DiagramInfoTable />
              </Col>
            </Row>
          </Card>
          <Card size='small' bordered={false} className='DiagramInfo_Card' style={{ height: '530px'}}>
            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '15px', marginTop: '-10px' }}>
              로그 이력조회
            </span>
            <Row style={{ marginTop: '10px' }}>
              <Col span={24}>
                <DiagramLogTable />
              </Col>
            </Row>
          </Card>
        </Col>

      </Row>
    </Content>
  );
};

export default DiagramInfo;
