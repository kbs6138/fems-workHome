import React from 'react'
import OverCurrentTrendChart from './OverCurrentTrendChart'
import { Card, Col, Row } from 'antd';


export default function OverCurrentTrendCurve() {
  return (
    <div>

      <Row>
        <Col span={24}>
          <Card className='OverCurrentTrendCurve_Warning_Card' bordered={false}>

            <span>과전류 상승에 따른 위험</span>
            <span>
              정격전류를 초과하여 연속적으로 흐르는 경우를 과전류라고 한다.
            </span>

            <span>
              과전류의 원인은 부하 사용전류가 전선의 허용전류를 초과하거나 전선의 절연허용 온도를 초과하는 것이며,
              과부하, 지락, 단락이 과전류의 원인이 될 수 있다.
            </span>

            <span>
              단상부하가 한 상에 집중되는 경우 그 상에 과전류가 발생할 수 있으며,
              지속적인 한 상의 과전류는 전선 과열과 화재 위험이 있다.
            </span>

            <span>
              정격전류보다 20~30% 이상 연속적으로 흐르는 경우 전선 열화와 화재 위험이 있어 과전류를 관리해야만 한다.
            </span>

          </Card>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Card className='OverCurrentTrendCurve_Card' bordered={false}>
            <span className='OverCurrentTrendCurve_Title'>과전류 추이그래프</span>
            <OverCurrentTrendChart />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
