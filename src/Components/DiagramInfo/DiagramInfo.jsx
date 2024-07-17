import React from 'react'
import DiagramInfoTable from './DiagramInfoTable'
import { Card, Col, Row } from 'antd';
import DiagramInfo_Chart from './DiagramInfo_Chart/DiagramInfo_Chart';
import './DiagramInfoTable.css'

export default function DiagramInfo() {
  return (
    <div className="DiagramInfo_Container">
      <Card className='DiagramInfo_Card' bordered={false}>
        <Row>
          <Col span={11}>
            <div style={{ marginBottom: '8px', boxShadow: '0px 0px 10px 2px rgb(22, 42, 69)' }}><DiagramInfo_Chart key={1} /></div>
            <div style={{ marginBottom: '8px', boxShadow: '0px 0px 10px 2px rgb(22, 42, 69)' }}><DiagramInfo_Chart key={2} /></div>
            <div style={{ marginBottom: '8px', boxShadow: '0px 0px 10px 2px rgb(22, 42, 69)' }}><DiagramInfo_Chart key={3} /></div>
            <div style={{ marginBottom: '8px', boxShadow: '0px 0px 10px 2px rgb(22, 42, 69)' }}><DiagramInfo_Chart key={4} /></div>
            <div style={{ marginBottom: '8px', boxShadow: '0px 0px 10px 2px rgb(22, 42, 69)' }}><DiagramInfo_Chart key={5} /></div>
            <div><DiagramInfo_Chart key={6} /></div>
          </Col>
          <Col span={13}>
            <DiagramInfoTable />
          </Col>
        </Row>
      </Card>
    </div>
  )
}
