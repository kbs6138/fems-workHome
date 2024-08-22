import React, { useEffect, useState } from 'react';
import { Button, Popover, Card, Col, Row, Select } from 'antd';
import { AiOutlineWarning } from "react-icons/ai";
import './TrendCurves.css';
import { useTrendDataDay } from '../db/Trend_db';
import DiagramAlertStepDay from './DiagramAlertStep/DiagramAlertStepDay';
import OverCurrentTrendChartDay from './OverCurrentTrendChart/OverCurrentTrendChartDay';
import TestChartDay from './OverCurrentTrendChart/testChartDay';
import TestDiagramDay from './DiagramAlertStep/testDiagramDay'

const { Option } = Select;

const OverCurrentTrendCurveDay = () => {
  const [open, setOpen] = useState(false);

  // 현재 날짜 가져오기
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = String(today.getMonth() + 1).padStart(2, '0');

  // 상태 값
  const [scp_id, setScpId] = useState('2300136001');
  const [yyyy, setYear] = useState(currentYear);
  const [mm, setMonth] = useState(currentMonth);
  const [permitRender, setPermitRender] = useState(true);
  const [indicator, setIndicator] = useState("voltage"); // 지표
  const [indicatorLabel, setIndicatorLabel] = useState("전압"); // 지표 한글로 치환
  const [queryKey, setQueryKey] = useState("trendVoltData");
  const [dataType, setDataType] = useState("trend-volt");
  const [dataTypeForChart, setDataTypeForChart] = useState("volt");

  // db에 요청할 정보
  const [selectedData, setSelectedData] = useState({
    scp_id,
    yyyy,
    mm,
  });

  // db에서 data를 받아오는 변수
  const { data: trendDataFromDb } = useTrendDataDay(selectedData, queryKey, dataType);
  // 받아온 data를 따로 저장하여 차트로 보낼 변수 (데이터가 실시간으로 입력되는 것을 방지하기 위함)
  const [TrendData, setTrendData] = useState([]);
  // 조회버튼 클릭 시 permitRender를 true로 바꿔주며 TrendData에 새로운 값이 입력되어 차트로 전달됨

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
    };

    setSelectedData(newSelectedData);
    setPermitRender(true);
    setIndicatorLabel(upDateByIndicator(indicator, 1));
    setQueryKey(upDateByIndicator(indicator, 2));
    setDataType(upDateByIndicator(indicator, 3));
    setDataTypeForChart(upDateByIndicator(indicator, 4));
  };

  const upDateByIndicator = (value, key) => {
    if (key === 1) {
      switch (value) {
        case "voltage":
          return "전압";

        case "overCurrent":
          return "전류";
        case "Wat":
          return "전력";

        case "PowerFactor":
          return "역률";

        case "Inner_Deg":
          return "내부온도";

        case "Outer_Deg":
          return "외부온도";
        default:
          return "";
      }
    } else if (key === 2) {
      switch (value) {

        case "voltage":
          return "trendVoltData";

        case "overCurrent":
          return "trendAmData";

        case "Wat":
          return "trendWatData";

        case "PowerFactor":
          return "trendpfData";

        case "Outer_Deg":
          return "trendoutdegData";

        case "Inner_Deg":
          return "trendindegData";

        default:
          return "";
      }
    } else if (key === 3) {
      switch (value) {

        case "voltage":
          return "trend-volt";

        case "overCurrent":
          return "trend-am";

        case "Wat":
          return "trend-wat";

        case "PowerFactor":
          return "trend-pf";

        case "Outer_Deg":
          return "trend-out-deg";

        case "Inner_Deg":
          return "trend-in-deg";


        default:
          return "";
      }
    } else if (key === 4) {
      switch (value) {
        case "voltage":
          return "volt";
        case "overCurrent":
          return "am";
        case "Wat":
          return "wat";
        case "PowerFactor":
          return "pf";
        case "Outer_Deg":
          return "out_deg";
        case "Inner_Deg":
          return "in_deg";
        default:
          return "";
      }
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
                <span className='OverCurrentTrendCurve_Title'>{indicatorLabel} 추이그래프 - 일별</span>
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

              <Card bordered={false} className='OverCurrentTrendCurveDay_Chart_Card'>

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
                    value={`${mm}월`} // 여기에 "월"을 추가
                    onChange={(value) => setMonth(value)}
                  >
                    <Option value="01">01월</Option>
                    <Option value="02">02월</Option>
                    <Option value="03">03월</Option>
                    <Option value="04">04월</Option>
                    <Option value="05">05월</Option>
                    <Option value="06">06월</Option>
                    <Option value="07">07월</Option>
                    <Option value="08">08월</Option>
                    <Option value="09">09월</Option>
                    <Option value="10">10월</Option>
                    <Option value="11">11월</Option>
                    <Option value="12">12월</Option>
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
                {/* <OverCurrentTrendChartDay TrendData={TrendData} dataTypeForChart={dataTypeForChart}/> */}
                <TestChartDay/>
              </Card>
            </Col>
          </Row>
          <Row gutter={[10]} style={{ marginTop: '10px' }}> {/* 수평 16px, 수직 24px 간격 설정 */}

            <Col span={8}>
              <Card bordered={false} className='OverCurrentTrendCurveDayLog_Card'>
                <TestDiagramDay/>
                {/* <DiagramAlertStepDay TrendData={TrendData} selectedData={selectedData} dataTypeForChart={dataTypeForChart} /> */}
              </Card>
            </Col>

            <Col span={16}>
              <Card bordered={false} className='OverCurrentTrendCurveDay_LinearRegression_Card'>
                선형회귀분석
              </Card>
            </Col>
          </Row>
        </Col>

      </Card>
    </div>
  );
}

export default OverCurrentTrendCurveDay;
