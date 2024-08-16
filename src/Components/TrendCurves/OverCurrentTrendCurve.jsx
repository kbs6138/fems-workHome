import React, { useEffect, useState } from 'react';
import { Button, Popover, Card, Col, Row, Select } from 'antd';
import OverCurrentTrendChart from './OverCurrentTrendChart/OverCurrentTrendChart';
import { AiOutlineWarning } from "react-icons/ai";
import './TrendCurves.css';
import { useTrendVoltData, useTrendAmData } from '../db/Trend_db';
import DiagramAlertStep from './DiagramAlertStep/DiagramAlertStep';

const { Option } = Select;

const OverCurrentTrendCurve = () => {
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

  const { data: trendDataFromDb } = useTrendVoltData(selectedData);
  const { data: trendAmDataFromDb } = useTrendAmData(selectedData);

  //db에서 data를 받아오는 변수
  console.log(trendDataFromDb);
  console.log(trendAmDataFromDb);
  //받아온 data를 따로 저장하여 차트로 보낼 변수 (데이터가 실시간으로 입력되는 것을 방지하기 위함)
  const [TrendData, setTrendData] = useState([]);
  //조회버튼 클릭시 permitRender를 true로 바꿔주며 TrendData에 새로운 값이 입력되어 차트로 전달됨


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

  //지표값을 한글로 치환하는 함수
  const updateIndicatorLable = (value) => {
    switch (value) {
      case "voltage":
        return "전압"
      case "overCurrent":
        return "과전류"
      default:
        return "";
    }
  };

  useEffect(() => {
    //permitRender가 true일시 TrendData에 새로운 값을 입력하고 permitRender는 다시 false로 바꿈
    if (permitRender) {
      setTrendData(trendDataFromDb);
      setTimeout(() => {
        setPermitRender(false);
      }, 1000); //1초
    }
  }, [permitRender,trendDataFromDb]);

  return (
    <div>
      <Row span={23}>
        <Col span={23} style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10px', alignItems: 'center', padding: '0 2% 0 2%' }}>
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

          <Card className='trendGraphCard OverCurrentTrendCurve_Card' bordered={false}>
            <div className='setGraphInfoWrapper'>
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
                <Option value="2300136001">601부하</Option>
                <Option value="2300130203">203부하</Option>
              </Select>

              <Select className='selectCss' id="indicator"
                value={indicator} onChange={(value) => setIndicator(value)}>
                <Option value="voltage">전압</Option>
                <Option value="overCurrent">과전류</Option>
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
            <OverCurrentTrendChart TrendData={TrendData} selectedTimeUnit={selectedTimeUnit} />
          </Card>
        </Col>
      </Row>
      <Row span={12}>
        <Col span={8}>
          <div style={{ position: 'relative', height: '480px', margin: '20px 35px 0 35px', padding: 0, color: 'white', borderRadius: '8px' }} className='OverCurrentTrendCurve_Card'>
            <div className='logInfo'>
              <Col span={24}>
                <DiagramAlertStep TrendData={TrendData} selectedData={selectedData} selectedTimeUnit={selectedTimeUnit} />
              </Col>
            </div>
          </div>
        </Col>
        <Col span={16}>
          <div style={{ position: 'relative', height: '480px', margin: '20px 35px 0 35px', padding: 0, color: 'white', borderRadius: '8px' }} className='OverCurrentTrendCurve_Card'>
            <div className='linearRegression'>
              <span className='OverCurrentTrendCurve_Title'>선형회귀분석</span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default OverCurrentTrendCurve;
