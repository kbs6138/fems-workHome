import React, { useEffect, useState } from 'react';
import { Button, Popover, Card, Col, Row, Select } from 'antd';
import OverCurrentTrendChart from './OverCurrentTrendChart/OverCurrentTrendChart';
import { AiOutlineWarning } from "react-icons/ai";
import './TrendCurves.css';
import { useTrendData } from '../db/Trend_db';
import DiagramAlertStep from './DiagramAlertStep/DiagramAlertStep';
import { useDeviceData } from '../db/Device-m';

const { Option } = Select;

const OverCurrentTrendCurve = () => {
  const [open, setOpen] = useState(false);

  // 현재 날짜 가져오기
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
  const currentDay = String(today.getDate()).padStart(2, '0');

  // 상태 값
  const [scp_id, setScpId] = useState('2200138303_303');
  const [yyyy, setYear] = useState(currentYear);
  const [mm, setMonth] = useState(currentMonth);
  const [dd, setDay] = useState(currentDay);
  const [timeUnit, setTimeUnit] = useState(60);
  const [permitRender, setPermitRender] = useState(true); //boolean타입으로 데이터 업데이트를 위한 변수
  const [indicator, setIndicator] = useState("voltage"); //select dropdown에서 선택된 데이터 타입
  const [indicatorLabel, setIndicatorLabel] = useState("전압"); //현재 데이터 타입을 한글로 나타내기 위한 변수
  const [queryKey, setQueryKey] = useState("trendVoltData"); //api에 보낼 쿼리키
  const [dataType, setDataType] = useState("trend-volt"); //api에 보낼 데이터 타입
  const [dataTypeForChart, setDataTypeForChart] = useState("volt"); //차트에 보낼 데이터 타입

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

  //api로부터 원하는 데이터를 받아서 변수로 저장
  const { data: trendDataFromDb } = useTrendData(selectedData, queryKey, dataType);
  const { data: deviceData } = useDeviceData(selectedData, queryKey, dataType);
  //차트에 보낼 데이터


  const [TrendData, setTrendData] = useState([]);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  //조회 클릭 이벤트
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
    setPermitRender(true); //permitRender를 true로 
    setIndicatorLabel(upDateByIndicator(indicator, 1));
    setQueryKey(upDateByIndicator(indicator, 2));
    setDataType(upDateByIndicator(indicator, 3));
    setDataTypeForChart(upDateByIndicator(indicator, 4));
  };

  const upDateByIndicator = (value, key) => {
    //현재 데이터 타입을 한글로 업데이트
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
    }
    //쿼리키 업데이트 
    else if (key === 2) {
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
    }
    //api에 보낼 데이터 타입 업데이트
    else if (key === 3) {
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
    }
    //차트에 보낼 데이터 타입 업데이트
    else if (key === 4) {
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
    //permitRender가 true일 경우에만 상태 업데이트 (실시간으로 업데이트 되는 것 방지)
    if (permitRender) {
      setTrendData(trendDataFromDb);
      setTimeout(() => {
        setPermitRender(false);
      }, 1000);
    }
  }, [permitRender, trendDataFromDb]);

  return (
    <div>
      <Card style={{ background: 'transparent', boxShadow: 'none', padding: '0 10px 10px 10px' }} bordered={false}>
        <Col span={24}>
          <Row>
            <Col span={24}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 5px 10px 5px', alignItems: 'center' }}>
                <span className='OverCurrentTrendCurve_Title'>{indicatorLabel} 추이그래프 - 시간별</span>
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

              <Card bordered={false} className='OverCurrentTrendCurve_Chart_Card'>
                <div className='setGraphInfoWrapper' style={{ marginTop: '10px ' }}>
                  <Select className='selectCss' id="selectYear"
                    value={`${yyyy}년`} // 여기에 "년"을 추가
                    onChange={(value) => setYear(value)}>
                    <Option value="2023">2023년</Option>
                    <Option value="2024">2024년</Option>
                  </Select>

                  <Select className='selectCss' id="selectMonth"
                    value={`${mm}월`} // 여기에 "월"을 추가
                    onChange={(value) => setMonth(value)}>
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

                  <Select className='selectCss' id="selectDay"
                    value={dd} onChange={(value) => setDay(value)}>
                    <Option value="01">1일</Option>
                    <Option value="02">2일</Option>
                    <Option value="03">3일</Option>
                    <Option value="04">4일</Option>
                    <Option value="05">5일</Option>
                    <Option value="06">6일</Option>
                    <Option value="07">7일</Option>
                    <Option value="08">8일</Option>
                    <Option value="09">9일</Option>
                    <Option value="10">10일</Option>
                    <Option value="11">11일</Option>
                    <Option value="12">12일</Option>
                    <Option value="13">13일</Option>
                    <Option value="14">14일</Option>
                    <Option value="15">15일</Option>
                    <Option value="16">16일</Option>
                    <Option value="17">17일</Option>
                    <Option value="18">18일</Option>
                    <Option value="19">19일</Option>
                    <Option value="20">20일</Option>
                    <Option value="21">21일</Option>
                    <Option value="22">22일</Option>
                    <Option value="23">23일</Option>
                    <Option value="24">24일</Option>
                    <Option value="25">25일</Option>
                    <Option value="26">26일</Option>
                    <Option value="27">27일</Option>
                    <Option value="28">28일</Option>
                    <Option value="29">29일</Option>
                    <Option value="30">30일</Option>
                    <Option value="31">31일</Option>
                  </Select>

                  <Select className='selectCss' id="selectLoad"
                    value={scp_id} onChange={(value) => setScpId(value)}>
                    {deviceData?.map((device) => (
                      <Option key={device.scp_vid} value={device.scp_vid}>
                        {device.device_name}
                      </Option>
                    ))}
                  </Select>


                  <Select className='selectCss' id="indicator"
                    value={indicator} onChange={(value) => setIndicator(value)}>
                    <Option value="voltage">전압</Option>
                    <Option value="overCurrent">전류</Option>
                    <Option value="Wat">전력</Option>
                    <Option value="PowerFactor">역률</Option>
                    <Option value="Outer_Deg">외부온도</Option>
                    <Option value="Inner_Deg">내부온도</Option>
                  </Select>

                  <Select className='selectCss' id="timeUnit"
                    value={timeUnit} onChange={(value) => setTimeUnit(value)}>
                    <Option value="1">1분 단위</Option>
                    <Option value="5">5분 단위</Option>
                    <Option value="15">15분 단위</Option>
                    <Option value="60">시간 단위</Option>
                  </Select>
                  <Button id="search" className='buttonInTrend' onClick={handleSearch}>조회</Button>
                </div>
                <OverCurrentTrendChart TrendData={TrendData} dataTypeForChart={dataTypeForChart} selectedTimeUnit={selectedTimeUnit}
                />
              </Card>
            </Col>
          </Row>
          <Row gutter={[10]} style={{ marginTop: '10px' }}>
            <Col span={8}>
              <Card bordered={false} className='OverCurrentTrendCurveLog_Card'>
                <DiagramAlertStep TrendData={TrendData} selectedData={selectedData} selectedTimeUnit={selectedTimeUnit} dataTypeForChart={dataTypeForChart} />
              </Card>
            </Col>
            <Col span={16}>
              <Card bordered={false} className='OverCurrentTrendCurve_LinearRegression_Card'>
                선형회귀분석
              </Card>
            </Col>
          </Row>
        </Col>
      </Card>
    </div>
  );
}

export default OverCurrentTrendCurve;
