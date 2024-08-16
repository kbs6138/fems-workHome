import React, { useEffect, useState } from 'react';
import { Button, Popover, Card, Col, Row, Select } from 'antd';
import OverCurrentTrendChart from './OverCurrentTrendChart/OverCurrentTrendChart';
import { AiOutlineWarning } from "react-icons/ai";
import './TrendCurves.css';
import { useTrendDataMonth } from '../db/Trend_db';
import DiagramAlertStepMonth from './DiagramAlertStep/DiagramAlertStepMonth';
import OverCurrentTrendBarChartMonth from './OverCurrentTrendChart/OverCurrentTrendBarChartMonth';

const { Option } = Select;

const OverCurrentTrendCurveMonth = () => {
  const [open, setOpen] = useState(false);

  // 현재 날짜 가져오기
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
  const currentDay = String(today.getDate()).padStart(2, '0');

  // 상태 값
  const [scp_id, setScpId] = useState('2300136001');
  const [yyyy, setYear] = useState(currentYear);
  const [mm, setMonth] = useState(currentMonth);
  const [dd, setDay] = useState(currentDay);
  const [timeUnit, setTimeUnit] = useState(60);
  const [permitRender, setPermitRender] = useState(true);
  const [indicator, setIndicator] = useState("voltage"); //지표
  const [indicatorLabel, setIndicatorLabel] = useState("전압"); //지표 한글로 치환

  // db에 요청할 정보
  const [selectedData, setSelectedData] = useState({
    scp_id,
    yyyy,
    mm,
    dd,
  });

  // 실질적으로 차트에 보낼 시간 변수
  const [selectedTimeUnit, setSelectedTimeUnit] = useState({
    timeUnit
  });

  // db에서 data를 받아오는 변수
  const { data: trendDataFromDb } = useTrendDataMonth(selectedData);
  // 받아온 data를 따로 저장하여 차트로 보낼 변수 (데이터가 실시간으로 입력되는 것을 방지하기 위함)
  const [TrendData, setTrendData] = useState([]);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  // 버튼 클릭 시 select된 값 업데이트
  const handleSearch = () => {
    const newSelectedData = {
      scp_id,
      yyyy,
      mm,
      dd,
    };
    const newTimeUnit = { timeUnit };

    setSelectedData(newSelectedData);
    setSelectedTimeUnit(newTimeUnit);
    setPermitRender(true);
    setIndicatorLabel(updateIndicatorLable(indicator)); //선택된 지표값을 한글로 새로 치환하여 업데이트
  };

  // 지표값을 한글로 치환하는 함수
  const updateIndicatorLable = (value) => {
    switch (value) {
      case "voltage":
        return "전압";
      case "overCurrent":
        return "과전류";
      default:
        return "";
    }
  };

  useEffect(() => {
    // permitRender가 true일 시 TrendData에 새로운 값을 입력하고 permitRender는 다시 false로 바꿈
    if (permitRender) {
      setTrendData(trendDataFromDb);
      setTimeout(() => {
        setPermitRender(false);
      }, 1000); // 1초
    }
  }, [permitRender, trendDataFromDb]);

  return (
    <div>
      <Card style={{ background: 'transparent', boxShadow: 'none', padding: '0 10px 10px 10px' }} bordered={false}>

        <Col span={24}>
          <Row>
            <Col span={24}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 5px 10px 5px', alignItems: 'center' }}>
                <span className='OverCurrentTrendCurve_Title'>{indicatorLabel} 추이그래프 - 월별</span>
                <Popover
                  content={
                    <div>
                      <span>
                        정격전류를 초과하여 연속적으로 흐르는 경우를 과전류라고 한다.
                      </span>
                      <span>
                        과전류의 원인은 부하 사용 전류가 전선의 허용전류를 초과하거나 전선의 절연 허용 온도를 초과하는 것이며,
                        과부하, 지락, 단락이 과전류의 원인이 될 수 있으며,
                      </span>
                      <span>
                        단상 부하가 한 상에 집중되는 경우 그 상에 과전류가 발생할 수 있으며,
                        지속적인 한 상의 과전류는 전선 과열과 화재 위험이 있다.
                      </span>
                      <span>
                        정격전류보다 20~30% 이상 연속적으로 흐르는 경우 전선 열화와 화재 위험이 있어 과전류를 관리해야만 한다.
                      </span>
                      <a onClick={hide}>닫기</a>
                    </div>
                  }
                  title="과전류 상승에 따른 위험"
                  trigger="click"
                  open={open}
                  onOpenChange={handleOpenChange}
                >
                  <Button className='OverCurrentTrendCurve_Button'>과전류 상승에 따른 위험
                    <AiOutlineWarning size={'22px'} />
                  </Button>
                </Popover>
              </div>
              <Card bordered={false} className='OverCurrentTrendCurveMonth_Chart_Card'>
                <div className='setGraphInfoWrapper' style={{ marginTop: '10px ' }}>
                  <Select
                    className='selectCss'
                    value={`${yyyy}년`} // 여기에 "년"을 추가
                    onChange={(value) => setYear(value)}
                  >
                    <Option value="2023">2023년</Option>
                    <Option value="2024">2024년</Option>
                  </Select>
                  <Select
                    className='selectCss'
                    value={scp_id}
                    onChange={(value) => setScpId(value)}
                  >
                    <Option value="2300136001">601부하</Option>
                    <Option value="2300130203">203부하</Option>
                  </Select>
                  <Select
                    className='selectCss'
                    value={indicator}
                    onChange={(value) => setIndicator(value)}
                  >
                    <Option value="voltage">전압</Option>
                    <Option value="overCurrent">과전류</Option>
                  </Select>
                  <Button id="search" className='buttonInTrend' onClick={handleSearch}>조회</Button>
                </div>

                <OverCurrentTrendBarChartMonth />

              </Card>
            </Col>
          </Row>
          <Row gutter={[10]} style={{ marginTop: '10px' }}> {/* 수평 16px, 수직 24px 간격 설정 */}

            <Col span={8}>
              <Card bordered={false} className='OverCurrentTrendCurveMonthLog_Card'>
                <DiagramAlertStepMonth TrendData={TrendData} selectedData={selectedData} selectedTimeUnit={selectedTimeUnit} />
              </Card>
            </Col>

            <Col span={16}>
              <Card bordered={false} className='OverCurrentTrendCurveMonth_LinearRegression_Card'>
                선형회귀분석
              </Card>
            </Col>
          </Row>
        </Col>

      </Card>





    </div >
  );
}

export default OverCurrentTrendCurveMonth;
