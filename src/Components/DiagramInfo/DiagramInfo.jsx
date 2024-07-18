import React from 'react'
import DiagramInfoTable from './DiagramInfoTable'
import { Card, Col, Row, Layout } from 'antd';
import DiagramInfoChart from './DiagramInfo_Chart/DiagramInfo_Chart';
import './DiagramInfo.css'

const { Content } = Layout;

const DiagramInfo = () => {
  return (
    <Content className="app-Content">
      <Row
        gutter={{
          xs: 10,
          sm: 10,
          md: 20,
          lg: 10,
        }}
      >
        <Col className="gutter-row" span={24}>
          <Card bordered={false} style={{ padding: 0, background: 'transparent', color: 'white', marginTop: '-15px' }} >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '20px' }}>장비 상세보기</span>
            </div>
            <Row
              gutter={{
                xs: 10,
                sm: 10,
                md: 20,
                lg: 10,
              }}
            >
              <Col span={24}>
                <Card size='small' bordered={false} className='DiagramInfo_Card' style={{ height: '510px' }}>
                  <Row
                    gutter={{
                      xs: 10,
                      sm: 10,
                      md: 20,
                      lg: 10,
                    }}
                  >
                    <Col span={12} style={{ marginTop: '-10px' }}>
                      <span className='DiagramInfo_span' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14.5px', margin: '0 0 4px 0' }}>
                        전압
                      </span>
                      <DiagramInfoChart key={1} />
                      <span className='DiagramInfo_span' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14.5px', margin: '10px 0 4px 0' }}>
                        전력
                      </span>
                      <DiagramInfoChart key={2} />
                      <span className='DiagramInfo_span' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14.5px', margin: '10px 0 4px 0' }}>
                        내부온도
                      </span>
                      <DiagramInfoChart key={3} />
                    </Col>
                    <Col span={12} style={{ marginTop: '-10px' }}>
                      <span className='DiagramInfo_span' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14.5px', margin: '0 0 4px 0' }}>
                        전류
                      </span>
                      <DiagramInfoChart key={4} />

                      <span className='DiagramInfo_span' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14.5px', margin: '10px 0 4px 0' }}>
                        역률
                      </span>
                      <DiagramInfoChart key={5} />

                      <span className='DiagramInfo_span' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14.5px', margin: '10px 0 4px 0' }}>
                        외부온도
                      </span>
                      <DiagramInfoChart key={6} />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Row
              gutter={{
                xs: 10,
                sm: 10,
                md: 20,
                lg: 10,
              }}
            >
              <Col span={24}>
                <Card size='small' bordered={false} className='DiagramInfo_Card' style={{ height: '380px' }}>
                  <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14.5px', marginTop: '-10px' }}>
                    로그 이력
                  </span>
                  <Row style={{ marginTop: '10px' }}
                    gutter={{
                      xs: 10,
                      sm: 10,
                      md: 20,
                      lg: 10,
                    }}
                  >
                    <Col span={24}>
                      <DiagramInfoTable />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

    </Content>
  );
};

export default DiagramInfo;
