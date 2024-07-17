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
          <Col span={12}>
            {Array.from({ length: 6 }, (_, i) => (
              <DiagramInfo_Chart key={i} />
            ))}
          </Col>
          <Col span={12}>
            <DiagramInfoTable />
          </Col>
        </Row>
      </Card>
    </div>
  )
}
