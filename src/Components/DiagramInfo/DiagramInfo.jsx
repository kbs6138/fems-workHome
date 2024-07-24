// DiagramInfo.js
import React, { useState, useEffect } from 'react';
import DiagramInfoTest_Chart from './DiagramInfo_Chart/DiagramInfoTest_Chart';
import DiagramInfoTable from './DiagramTable.jsx/DiagramInfoTable';
import { Card, Col, Row, Layout } from 'antd';
import DiagramInfoChart from './DiagramInfo_Chart/DiagramInfo_Chart';
import './DiagramInfo.css';
import { useVoltData, useAmData, useWData, usePFData, useInData, useOutData } from './DiagramInfo_DB/DiagramInfo_DB';

const { Content } = Layout;

const DiagramInfo = () => {
  const { data: VoltData } = useVoltData();
  const { data: AmData } = useAmData();
  const { data: WData } = useWData();
  const { data: PfData } = usePFData();
  const { data: InData } = useInData();
  const { data: OutData } = useOutData();

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
            </div>

            <Row gutter={[10, 2]}>
              {VoltData?.length > 0 && (
                <>
                  <Col span={12}>
                    <Card title={<div className='Diagram_V_Card_Title'>전압</div>} bordered={false} className='Diagram_V_Card'>
                      <DiagramInfoChart key={1} data={VoltData[0]?.v_data} chartColor={chartColors[0]} Min={MinValue[0]} Max={MaxValue[0]} />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title={<div className='Diagram_A_Card_Title'>전류</div>} bordered={false} className='Diagram_A_Card'>
                      <DiagramInfoChart key={2} data={AmData[0]?.am_data} chartColor={chartColors[1]} Min={MinValue[1]} Max={MaxValue[1]} />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title={<div className='Diagram_W_Card_Title'>전력</div>} bordered={false} className='Diagram_W_Card'>
                      <DiagramInfoChart key={3} data={WData[0]?.w_data} chartColor={chartColors[2]} Min={MinValue[2]} Max={MaxValue[2]} />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title={<div className='Diagram_WVA_Card_Title'>역률</div>} bordered={false} className='Diagram_WVA_Card'>
                      <DiagramInfoChart key={4} data={PfData[0]?.pf_data} chartColor={chartColors[3]} Min={MinValue[3]} Max={MaxValue[3]} />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title={<div className='Diagram_OutDeg_Card_Title'>외부온도</div>} bordered={false} className='Diagram_OutDeg_Card'>
                      <DiagramInfoChart key={5} data={OutData[0]?.out_data} chartColor={chartColors[4]} Min={MinValue[0]} Max={MaxValue[0]} />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title={<div className='Diagram_InnerDeg_Card_Title'>내부온도</div>} bordered={false} className='Diagram_InnerDeg_Card'>
                      <DiagramInfoChart key={6} data={InData[0]?.in_data} chartColor={chartColors[5]} Min={MinValue[0]} Max={MaxValue[0]} />
                    </Card>
                  </Col>
                </>
              )}
            </Row>
          </Card>
        </Col>
        <Col span={8} style={{ marginTop: '25px' }}>
          <Card size='small' bordered={false} className='DiagramInfo_Card' style={{ height: '895px', marginTop: '20px' }}>
            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '15px', marginTop: '-10px' }}>
              실시간 수치
            </span>
            <Row style={{ marginTop: '10px' }}>
              <Col span={24}>
                <Card style={{ background: 'rgb(31, 45, 68)' }} bordered={false}>
                  <span className='Diagram_Name' style={{ padding: '0 0 0 5px ', fontSize: '15px', color: 'white' }}>내부온도</span>

                  <Row>
                    <Col span={12}>
                      <DiagramInfoTable data={tableDataArray[0]} />
                    </Col>
                    <Col span={12}>
                      <DiagramInfoTest_Chart key={6} data={InData[0]?.in_data} chartColor={chartColors[5]} Min={MinValue[0]} Max={MaxValue[0]} />
                    </Col>
                  </Row>
                </Card>
              </Col>

              <Col span={24} style={{ marginTop: '10px' }}>
                <Card style={{ background: 'rgb(31, 45, 68)' }} bordered={false}>
                  <span className='Diagram_Name' style={{ padding: '0 0 0 5px ', fontSize: '15px', color: 'white' }}>외부온도</span>
                  <Row>
                    <Col span={12}>
                      <DiagramInfoTable data={tableDataArray[1]} />
                    </Col>
                    <Col span={12}>
                      <DiagramInfoTest_Chart key={7} data={OutData[0]?.out_data} chartColor={chartColors[4]} Min={MinValue[0]} Max={MaxValue[0]} />
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
