// DiagramInfo.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DiagramInfoTest_Chart from './DiagramInfo_Chart/DiagramInfoTest_Chart';
import { DownOutlined } from '@ant-design/icons';
import { IoThermometerOutline, IoBarChartOutline } from "react-icons/io5";
import { SlEnergy } from "react-icons/sl";
import { AiOutlineSwapRight } from "react-icons/ai";
import { VscPulse } from "react-icons/vsc";
import DiagramInfoTable from './DiagramTable.jsx/DiagramInfoTable';
import { Card, Col, Row, Layout, Dropdown, Space, Button, Select } from 'antd';
import DiagramInfoChart from './DiagramInfo_Chart/DiagramInfo_Chart';
import DiagramAlertStep from './DiagramAlertStep/DiagramAlertStep';
import './DiagramInfo.css';
import { useDiagramInfoData, useDiagramCurrentData, useMinMaxData } from './DiagramInfo_DB/DiagramInfo_DB';

const { Content } = Layout;
const { Option } = Select;
const handleChange = () => {
};
const DiagramInfo = () => {
  const [refreshInterval, setRefreshInterval] = useState(10000); // 초기값 설정
  const [currentTime, setCurrentTime] = useState('');

  const { data: DiagramInfoData } = useDiagramInfoData(refreshInterval);
  const { data: DiagramCurrentData } = useDiagramCurrentData(refreshInterval);
  const { data: DiagramMinmaxData } = useMinMaxData(refreshInterval);


  const handleMenuClick = (key) => {
    setRefreshInterval(key); // 클릭한 메뉴의 키로 refreshInterval 업데이트
  };

  const menuItems = [
    { key: 0, label: '정지' },
    { key: 1000, label: '1초' },
    { key: 5000, label: '5초' },
    { key: 10000, label: '10초' },
  ];

  const [chartColors, setChartColors] = useState([]);

  const calculateRateOfChange = (currentValue, previousValue) => {
    if (previousValue === 0) return 0; // 이전 값이 0일 때, 비율 변화는 0으로 처리
    const rateOfChange = ((currentValue / previousValue) * 100) - 100;
    return rateOfChange.toFixed(1); // 소수점 첫째 자리까지 표시
  };

  const formatNumber = (number) => {
    if (number === undefined || number === null) {
      return '-'; // 기본값 설정
    }
    return number.toLocaleString(); // Add commas to the number
  };

  const tableDataArray = [
    [
      {
        key: '1',
        currentValue: DiagramInfoData[0]?.v_data,
        dailyMax: formatNumber(DiagramCurrentData[0]?.max || 0), //최대값
        dailyMin: formatNumber(DiagramCurrentData[0]?.min || 0), //최소값
        previousValue: formatNumber(DiagramCurrentData[0]?.avg || 0), //평균
        rateOfChange: calculateRateOfChange(DiagramInfoData[0]?.v_data, DiagramCurrentData[0]?.avg),
      },
    ],
    [
      {
        key: '2',
        currentValue: DiagramInfoData[0]?.am_data,
        dailyMax: formatNumber(DiagramCurrentData[1]?.max || 0), //최대값
        dailyMin: formatNumber(DiagramCurrentData[1]?.min || 0), //최소값
        previousValue: formatNumber(DiagramCurrentData[1]?.avg || 0), //평균
        rateOfChange: calculateRateOfChange(DiagramInfoData[0]?.am_data, DiagramCurrentData[1]?.avg),
      },
    ],
    [
      {
        key: '3',
        currentValue: DiagramInfoData[0]?.w_data,
        dailyMax: formatNumber(DiagramCurrentData[2]?.max || 0), //최대값
        dailyMin: formatNumber(DiagramCurrentData[2]?.min || 0), //최소값
        previousValue: formatNumber(DiagramCurrentData[2]?.avg || 0), //평균
        rateOfChange: calculateRateOfChange(DiagramInfoData[0]?.w_data, DiagramCurrentData[2]?.avg),
      },
    ],
    [
      {
        key: '4',
        currentValue: DiagramInfoData[0]?.pf_data,
        dailyMax: formatNumber(DiagramCurrentData[3]?.max || 0), //최대값
        dailyMin: formatNumber(DiagramCurrentData[3]?.min || 0), //최소값
        previousValue: formatNumber(DiagramCurrentData[3]?.avg || 0), //평균
        rateOfChange: calculateRateOfChange(DiagramInfoData[0]?.pf_data, DiagramCurrentData[3]?.avg),
      },
    ],
    [
      {
        key: '5',
        currentValue: DiagramInfoData[0]?.out_data,
        dailyMax: formatNumber(DiagramCurrentData[4]?.max || 0), //최대값
        dailyMin: formatNumber(DiagramCurrentData[4]?.min || 0), //최소값
        previousValue: formatNumber(DiagramCurrentData[4]?.avg || 0), //평균
        rateOfChange: calculateRateOfChange(DiagramInfoData[0]?.out_data, DiagramCurrentData[4]?.avg),
      },
    ],
    [
      {
        key: '6',
        currentValue: DiagramInfoData[0]?.in_data,
        dailyMax: formatNumber(DiagramCurrentData[5]?.max || 0), //최대값
        dailyMin: formatNumber(DiagramCurrentData[5]?.min || 0), //최소값
        previousValue: formatNumber(DiagramCurrentData[5]?.avg || 0), //평균
        rateOfChange: calculateRateOfChange(DiagramInfoData[0]?.in_data, DiagramCurrentData[5]?.avg),
      },
    ],
  ];

  useEffect(() => {
    // 현재 시간 업데이트
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString()); // 날짜와 시간을 문자열로 변환
    };

    updateTime(); // 처음 렌더링 시 시간 설정
    const interval = setInterval(updateTime, 1000); // 1초마다 시간 업데이트
    const colors = ['#FF6B6B', '#FFD700', '#9370DB', '#00BFFF', '#7CFC00', '#FF69B4'];
    setChartColors(colors);

    return () => clearInterval(interval);
  }, []);

  return (
    <Content className="app-Content">
      <Row>
        <Col className="gutter-row" span={15}>
          <Card bordered={false} style={{ padding: 0, background: 'transparent', color: 'white', marginTop: '-15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '20px' }}>장비 상세정보
                <p style={{ fontSize: '12px' }}>(10분 간격 데이터)</p>
              </span>

              <Select defaultValue="Option1" style={{ width: 120, background: 'none', color: '#FFFFFF' }} onChange={handleChange}>
                <Option value="Option1" >장비1</Option>
                <Option value="Option2" >장비2</Option>
                <Option value="Option3" >장비3</Option>
              </Select>

              <span style={{ fontSize: '16px' }}>{currentTime}</span> {/* 현재 시간 표시 */}
              <Dropdown
                menu={{
                  items: menuItems.map(({ key, label }) => ({
                    key,
                    label,
                    onClick: () => handleMenuClick(key), // 클릭 시 refreshInterval 업데이트
                  })),
                }}
                trigger={['click']}
              >
                <a onClick={e => e.preventDefault()}>
                  <Space style={{ color: 'white' }}>{menuItems.find(item => item.key === refreshInterval)?.label || '10초'}<DownOutlined /></Space>
                </a>
              </Dropdown>
            </div>

            <Row gutter={[10, 2]}>
              <Col span={12}>
                {DiagramMinmaxData[0]?.min !== undefined && DiagramMinmaxData[0]?.max !== undefined && (
                  <Card bordered={false} className='Diagram_V_Card' size='small'>
                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className='Diagram_V_Card_Title'><SlEnergy className='Diagram_icon_V' />전압</div>
                      <Link to="/DiagramInfo">
                        <Button type="link" className='Diagram_Info_Button' style={{ marginTop: '-10px' , background:'rgb(42 ,63 ,97)' }}>
                          상세조회
                          <AiOutlineSwapRight style={{ fontSize: '20px', color: 'lightgrey' }} />
                        </Button>
                      </Link>
                    </span>
                    <Card bordered={false} className='Diagram_V_Chart_Card'>
                      <DiagramInfoChart key={1} data={DiagramInfoData[0]?.v_data} chartColor={chartColors[0]} Min={DiagramMinmaxData[0]?.min || 0} Max={DiagramMinmaxData[0]?.max || 0} />
                    </Card>
                  </Card>
                )}
              </Col>
              <Col span={12}>
                {DiagramMinmaxData[1]?.min !== undefined && DiagramMinmaxData[1]?.max !== undefined && (
                  <Card bordered={false} className='Diagram_A_Card'>
                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className='Diagram_A_Card_Title'><VscPulse className='Diagram_icon_A' />전류</div>

                      <Link to="/DiagramInfo">
                        <Button type="link" className='Diagram_Info_Button' style={{ marginTop: '-10px', background:'rgb(42 ,63 ,97)' }}>
                          상세조회
                          <AiOutlineSwapRight style={{ fontSize: '20px', color: 'lightgrey' }} />
                        </Button>
                      </Link>
                    </span>
                    <Card bordered={false} className='Diagram_A_Chart_Card'>
                      <DiagramInfoChart key={2} data={DiagramInfoData[0]?.am_data} chartColor={chartColors[1]} Min={DiagramMinmaxData[1]?.min || 0} Max={DiagramMinmaxData[1]?.max || 0} />
                    </Card>
                  </Card>
                )}
              </Col>
              <Col span={12}>
                {DiagramMinmaxData[2]?.min !== undefined && DiagramMinmaxData[2]?.max !== undefined && (
                  <Card bordered={false} className='Diagram_W_Card'>
                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className='Diagram_W_Card_Title'><SlEnergy className='Diagram_icon_W' />전력</div>

                      <Link to="/DiagramInfo">
                        <Button type="link" className='Diagram_Info_Button' style={{ marginTop: '-10px' , background:'rgb(42 ,63 ,97)'}}>
                          상세조회
                          <AiOutlineSwapRight style={{ fontSize: '20px', color: 'lightgrey' }} />
                        </Button>
                      </Link>
                    </span>
                    <Card bordered={false} className='Diagram_W_Chart_Card ' size='large'>
                      <DiagramInfoChart key={3} data={DiagramInfoData[0]?.w_data} chartColor={chartColors[2]} Min={DiagramMinmaxData[2]?.min || 0} Max={DiagramMinmaxData[2]?.max || 0} />
                    </Card>
                  </Card>
                )}
              </Col>
              <Col span={12}>
                {DiagramMinmaxData[3]?.min !== undefined && DiagramMinmaxData[3]?.max !== undefined && (
                  <Card bordered={false} className='Diagram_WVA_Card'>
                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className='Diagram_WVA_Card_Title'><IoBarChartOutline className='Diagram_icon_WVA' />역률</div>

                      <Link to="/DiagramInfo">
                        <Button type="link" className='Diagram_Info_Button' style={{ marginTop: '-10px' , background:'rgb(42 ,63 ,97)'}}>
                          상세조회
                          <AiOutlineSwapRight style={{ fontSize: '20px', color: 'lightgrey' }} />
                        </Button>
                      </Link>
                    </span>
                    <Card bordered={false} className='Diagram_WVA_Chart_Card'>
                      <DiagramInfoChart key={4} data={DiagramInfoData[0]?.pf_data} chartColor={chartColors[3]} Min={DiagramMinmaxData[3]?.min || 0} Max={DiagramMinmaxData[3]?.max || 0} />
                    </Card>
                  </Card>
                )}
              </Col>
              <Col span={12}>
                {DiagramMinmaxData[4]?.min !== undefined && DiagramMinmaxData[4]?.max !== undefined && (
                  <Card bordered={false} className='Diagram_OutDeg_Card'>
                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className='Diagram_OutDeg_Card_Title'><IoThermometerOutline className='Diagram_icon_OutDeg' />외부온도</div>

                      <Link to="/DiagramInfo">
                        <Button type="link" className='Diagram_Info_Button' style={{ marginTop: '-10px' , background:'rgb(42 ,63 ,97)'}}>
                          상세조회
                          <AiOutlineSwapRight style={{ fontSize: '20px', color: 'lightgrey' }} />
                        </Button>
                      </Link>
                    </span>
                    <Card bordered={false} className='Diagram_OutDeg_Chart_Card'>
                      <DiagramInfoChart key={5} data={DiagramInfoData[0]?.out_data} chartColor={chartColors[4]} Min={DiagramMinmaxData[4]?.min || 0} Max={DiagramMinmaxData[4]?.max || 0} />
                    </Card>
                  </Card>
                )}
              </Col>
              <Col span={12}>
                {DiagramMinmaxData[5]?.min !== undefined && DiagramMinmaxData[5]?.max !== undefined && (
                  <Card bordered={false} className='Diagram_InnerDeg_Card'>
                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className='Diagram_InnerDeg_Card_Title'> <IoThermometerOutline className='Diagram_icon_InnerDeg' />내부온도 </div>

                      <Link to="/DiagramInfo">
                        <Button type="link" className='Diagram_Info_Button' style={{ marginTop: '-10px', background:'rgb(42 ,63 ,97)' }}>
                          상세조회
                          <AiOutlineSwapRight style={{ fontSize: '20px', color: 'lightgrey' }} />
                        </Button>
                      </Link>
                    </span>
                    <Card bordered={false} className='Diagram_InnerDeg_Chart_Card' >
                      <DiagramInfoChart key={6} data={DiagramInfoData[0]?.in_data} chartColor={chartColors[5]} Min={DiagramMinmaxData[5]?.min || 0} Max={DiagramMinmaxData[5]?.max || 0} />
                    </Card>
                  </Card>
                )}
              </Col>

              <Col span={24} style={{ marginTop: '6px' }}>
                <Card style={{ background: 'rgb(42 ,63 ,97)', height: '144px', boxShadow: '0px 0px 10px 2px rgb(22, 42, 69)' }} bordered={false}>
                  <Row gutter={[5, 2]}> {/* 여백을 추가 */}
                    <Col span={24}>
                      <DiagramAlertStep />
                    </Col>

                  </Row>
                </Card>
              </Col>

            </Row>
          </Card>
        </Col>

        <Col span={9} style={{ marginTop: '25px' }}>
          <span style={{ fontSize: '20px', color: 'white', marginTop: '-15px' }}>실시간 수치
            <p style={{ fontSize: '12px' }}>(최근 1분 데이터)</p>
          </span>
          <Row gutter={[48, 5]} style={{ marginTop: '14px' }}>

            <Col span={24}>
              <Card style={{ background: 'rgb(42 ,63 ,97)', height: '140px', boxShadow: ' 0px 0px 10px 2px rgb(22, 42, 69)' }} bordered={false}>
                <span className='Diagram_Name'><SlEnergy className='Diagram_icon_V' />전압</span>
                <Row gutter={[10, 2]}> {/* 여백을 추가 */}
                  <Col span={12}>
                    <DiagramInfoTable data={tableDataArray[0]} />
                  </Col>
                  <Col span={12}>
                    {DiagramMinmaxData[0]?.min !== undefined && DiagramMinmaxData[0]?.max !== undefined && (
                      <DiagramInfoTest_Chart data={DiagramInfoData[0]?.v_data} chartColor={chartColors[0]} Min={DiagramCurrentData[0].min} Max={DiagramCurrentData[0].max} />
                    )}
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col span={24} style={{ marginTop: '6px' }}>
              <Card style={{ background: 'rgb(42 ,63 ,97)', height: '140px', boxShadow: ' 0px 0px 10px 2px rgb(22, 42, 69)' }} bordered={false}>
                <span className='Diagram_Name'><VscPulse className='Diagram_icon_A' />전류</span>
                <Row gutter={[10, 2]}> {/* 여백을 추가 */}
                  <Col span={12}>
                    <DiagramInfoTable data={tableDataArray[1]} />
                  </Col>
                  <Col span={12}>
                    {DiagramMinmaxData[1]?.min !== undefined && DiagramMinmaxData[1]?.max !== undefined && (
                      <DiagramInfoTest_Chart data={DiagramInfoData[0]?.am_data} chartColor={chartColors[1]} Min={DiagramCurrentData[1].min} Max={DiagramCurrentData[1].max} />
                    )}
                  </Col>
                </Row>
              </Card>
            </Col>


            <Col span={24} style={{ marginTop: '6px' }}>
              <Card style={{ background: 'rgb(42 ,63 ,97)', height: '140px', boxShadow: ' 0px 0px 10px 2px rgb(22, 42, 69)' }} bordered={false}>
                <span className='Diagram_Name'><SlEnergy className='Diagram_icon_W' />전력</span>
                <Row gutter={[10, 2]}> {/* 여백을 추가 */}
                  <Col span={12}>
                    <DiagramInfoTable data={tableDataArray[2]} />
                  </Col>
                  <Col span={12}>
                    {DiagramMinmaxData[2]?.min !== undefined && DiagramMinmaxData[2]?.max !== undefined && (
                      <DiagramInfoTest_Chart key={6} data={DiagramInfoData[0]?.w_data} chartColor={chartColors[2]} Min={DiagramCurrentData[2].min} Max={DiagramCurrentData[2].max} />
                    )}
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col span={24} style={{ marginTop: '6px' }}>
              <Card style={{ background: 'rgb(42 ,63 ,97)', height: '140px', boxShadow: ' 0px 0px 10px 2px rgb(22, 42, 69)' }} bordered={false}>
                <span className='Diagram_Name'><IoBarChartOutline className='Diagram_icon_WVA' />역률</span>
                <Row gutter={[10, 2]}> {/* 여백을 추가 */}
                  <Col span={12}>
                    <DiagramInfoTable data={tableDataArray[3]} />
                  </Col>
                  <Col span={12}>
                    {DiagramMinmaxData[3]?.min !== undefined && DiagramMinmaxData[3]?.max !== undefined && (
                      <DiagramInfoTest_Chart key={6} data={DiagramInfoData[0]?.pf_data} chartColor={chartColors[3]} Min={DiagramCurrentData[3].min} Max={DiagramCurrentData[3].max} />
                    )}
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col span={24} style={{ marginTop: '6px' }}>
              <Card style={{ background: 'rgb(42 ,63 ,97)', height: '140px', boxShadow: ' 0px 0px 10px 2px rgb(22, 42, 69)' }} bordered={false}>
                <span className='Diagram_Name'><IoThermometerOutline className='Diagram_icon_OutDeg' />외부온도 </span>
                <Row gutter={[10, 2]}> {/* 여백을 추가 */}
                  <Col span={12}>
                    <DiagramInfoTable data={tableDataArray[4]} />
                  </Col>
                  <Col span={12}>
                    {DiagramMinmaxData[4]?.min !== undefined && DiagramMinmaxData[4]?.max !== undefined && (
                      <DiagramInfoTest_Chart key={6} data={DiagramInfoData[0]?.out_data} chartColor={chartColors[4]} Min={DiagramCurrentData[4].min} Max={DiagramCurrentData[4].max} />
                    )}
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col span={24} style={{ marginTop: '6px' }}>
              <Card style={{ background: 'rgb(42 ,63 ,97)', height: '140px', boxShadow: '0px 0px 10px 2px rgb(22, 42, 69)' }} bordered={false}>
                <span className='Diagram_Name'><IoThermometerOutline className='Diagram_icon_InnerDeg' />내부온도</span>
                <Row gutter={[10, 2]}> {/* 여백을 추가 */}
                  <Col span={12}>
                    <DiagramInfoTable data={tableDataArray[5]} />
                  </Col>
                  <Col span={12}>
                    {DiagramMinmaxData[5]?.min !== undefined && DiagramMinmaxData[5]?.max !== undefined && (
                      <DiagramInfoTest_Chart key={6} data={DiagramInfoData[0]?.in_data} chartColor={chartColors[5]} Min={DiagramCurrentData[5].min} Max={DiagramCurrentData[5].max} />
                    )}
                  </Col>
                </Row>
              </Card>
            </Col>


          </Row>
        </Col>
      </Row>
    </Content>
  );
};

export default DiagramInfo;
