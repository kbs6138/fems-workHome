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
              <Col span={12} >
                <Card size='small' bordered={false} className='DiagramInfo_Card'>

                  <Row
                    gutter={{
                      xs: 10,
                      sm: 10,
                      md: 20,
                      lg: 10,
                    }}
                  >
                    <Col span={24}>
                      <span style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px'
                      }}>
                        온도
                      </span>
                      <div style={{ marginBottom: '10px', boxShadow: '0px 0px 10px 2px rgb(22, 42, 69)', marginTop: '5px' }}>
                        <DiagramInfoChart key={1} />
                      </div>
                      <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                        내부온도
                      </span>
                      <div style={{ marginBottom: '10px', boxShadow: '0px 0px 10px 2px rgb(22, 42, 69)', marginTop: '5px' }}>
                        <DiagramInfoChart key={2} />
                      </div>
                      <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                        외부온도
                      </span>
                      <div style={{ marginBottom: '10px', boxShadow: '0px 0px 10px 2px rgb(22, 42, 69)', marginTop: '5px' }}>
                        <DiagramInfoChart key={3} />
                      </div>
                      <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                        전압
                      </span>
                      <div style={{ marginBottom: '10px', boxShadow: '0px 0px 10px 2px rgb(22, 42, 69)', marginTop: '5px' }}>
                        <DiagramInfoChart key={4} />
                      </div>
                      <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                        전류
                      </span>
                      <div style={{ marginBottom: '10px', boxShadow: '0px 0px 10px 2px rgb(22, 42, 69)', marginTop: '5px' }}>
                        <DiagramInfoChart key={5} />
                      </div>
                      <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                        역률
                      </span>
                      <div><DiagramInfoChart key={6} /></div>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={12} >
                <Card size='small' bordered={false} className='DiagramInfo_Card' >
                  <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                    로그 이력
                  </span>
                  <Row style={{ marginTop: '5px' }}
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
      </Row >


    </Content>


  );
};

export default DiagramInfo;