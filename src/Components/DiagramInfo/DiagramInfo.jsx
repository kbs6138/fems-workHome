// DiagramInfo.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoThermometerOutline, IoBarChartOutline } from "react-icons/io5";
import { SlEnergy } from "react-icons/sl";
import { AiOutlineSwapRight } from "react-icons/ai";
import { VscPulse } from "react-icons/vsc";
import { Card, Col, Row, Layout, Button, Select } from 'antd';
import DiagramInfoTable from './DiagramTable/DiagramInfoTable';
import DiagramInfoChart from './DiagramInfo_Chart/DiagramInfo_Chart';
import DiagramInfoVWChart from './DiagramInfo_Chart/DiagramInfo_VWChart';
import DiagramInfoMinuteChart from './DiagramInfo_Chart/DiagramInfo_MinuteChart';
import DiagramInfoVWMinuteChart from './DiagramInfo_Chart/DiagramInfo_VWMinuteChart';
import DiagramInfoMinuteTable from './DiagramTable/DiagramInfoMinuteTable';
import DiagramAlertStep from './DiagramAlertStep/DiagramAlertStep';
import './DiagramInfo.css';
import { useDiagramInfoData, useDiagramCurrentData, useMinMaxData } from './DiagramInfo_DB/DiagramInfo_DB';
import { useDeviceData } from '../db/Device-m';

const { Content } = Layout;
const { Option } = Select;

const DiagramInfo = () => {
  const [refreshInterval, setRefreshInterval] = useState(10000);
  const [currentTime, setCurrentTime] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('');

  const { data: DeviceData } = useDeviceData(refreshInterval);
  useEffect(() => {
    if (DeviceData && DeviceData.length > 0) {
      setSelectedDevice(DeviceData[0]?.scp_vid);
    }
  }, [DeviceData]);

  const { data: DiagramInfoData } = useDiagramInfoData(refreshInterval, selectedDevice);
  const { data: DiagramCurrentData } = useDiagramCurrentData(refreshInterval, selectedDevice);
  const { data: DiagramMinmaxData } = useMinMaxData(refreshInterval, selectedDevice);

  const handleMenuClick = (key) => {
    setRefreshInterval(key);
  };
  const handleChange = (value) => {
    setSelectedDevice(value);
  };

  const menuItems = [
    { key: 0, label: '정지' },
    { key: 1000, label: '1초' },
    { key: 5000, label: '5초' },
    { key: 10000, label: '10초' },
  ];

  const [chartColors, setChartColors] = useState([]);
  const [rstchartColors, setRSTColors] = useState([]);

  const calculateRateOfChange = (currentValue, previousValue) => {
    if (previousValue === 0 || previousValue === undefined) return 0;
    const rateOfChange = ((currentValue / previousValue) * 100) - 100;
    return rateOfChange.toFixed(1);
  };

  const formatNumber = (number) => {
    if (number === undefined || number === null) {
      return '-';
    }
    return number.toLocaleString();
  };

  const tableDataArray = DiagramInfoData && DiagramCurrentData ? [
    [
      {
        key: '1',
        Phase: 'L1',
        PhaseValue: DiagramInfoData[0]?.v_data_r,
        dailyMax: formatNumber(DiagramCurrentData[0]?.max || 0), //최대값
        dailyMin: formatNumber(DiagramCurrentData[0]?.min || 0), //최소값
        previousValue: formatNumber(DiagramCurrentData[0]?.avg || 0), //평균
        rateOfChange: calculateRateOfChange(DiagramInfoData[0]?.v_data_r, DiagramCurrentData[0]?.avg),
      },
      {
        Phase: 'L2',
        PhaseValue: DiagramInfoData[0]?.v_data_s,
        dailyMax: formatNumber(DiagramCurrentData[1]?.max || 0), //최대값
        dailyMin: formatNumber(DiagramCurrentData[1]?.min || 0), //최소값
        previousValue: formatNumber(DiagramCurrentData[1]?.avg || 0), //평균
        rateOfChange: calculateRateOfChange(DiagramInfoData[0]?.v_data_s, DiagramCurrentData[1]?.avg),
      },
      {
        Phase: 'L3',
        PhaseValue: DiagramInfoData[0]?.v_data_t,
        dailyMax: formatNumber(DiagramCurrentData[2]?.max || 0), //최대값
        dailyMin: formatNumber(DiagramCurrentData[2]?.min || 0), //최소값
        previousValue: formatNumber(DiagramCurrentData[2]?.avg || 0), //평균
        rateOfChange: calculateRateOfChange(DiagramInfoData[0]?.v_data_t, DiagramCurrentData[2]?.avg),
      },
    ],

    [
      {
        key: '2',
        Phase: 'L1',
        PhaseValue: DiagramInfoData[0]?.am_data_r,
        dailyMax: formatNumber(DiagramCurrentData[3]?.max || 0), //최대값
        dailyMin: formatNumber(DiagramCurrentData[3]?.min || 0), //최소값
        previousValue: formatNumber(DiagramCurrentData[3]?.avg || 0), //평균
        rateOfChange: calculateRateOfChange(DiagramInfoData[0]?.am_data_r, DiagramCurrentData[3]?.avg),
      },
      {
        Phase: 'L2',
        PhaseValue: DiagramInfoData[0]?.am_data_s,
        dailyMax: formatNumber(DiagramCurrentData[4]?.max || 0), //최대값
        dailyMin: formatNumber(DiagramCurrentData[4]?.min || 0), //최소값
        previousValue: formatNumber(DiagramCurrentData[4]?.avg || 0), //평균
        rateOfChange: calculateRateOfChange(DiagramInfoData[0]?.am_data_s, DiagramCurrentData[4]?.avg),
      },
      {
        Phase: 'L3',
        PhaseValue: DiagramInfoData[0]?.am_data_t,
        dailyMax: formatNumber(DiagramCurrentData[5]?.max || 0), //최대값
        dailyMin: formatNumber(DiagramCurrentData[5]?.min || 0), //최소값
        previousValue: formatNumber(DiagramCurrentData[5]?.avg || 0), //평균
        rateOfChange: calculateRateOfChange(DiagramInfoData[0]?.am_data_t, DiagramCurrentData[5]?.avg),
      },
    ],
    [
      {
        key: '3',
        currentValue: DiagramInfoData[0]?.w_data,
        dailyMax: formatNumber(DiagramCurrentData[6]?.max || 0), //최대값
        dailyMin: formatNumber(DiagramCurrentData[6]?.min || 0), //최소값
        previousValue: formatNumber(DiagramCurrentData[6]?.avg || 0), //평균
        rateOfChange: calculateRateOfChange(DiagramInfoData[0]?.w_data, DiagramCurrentData[6]?.avg),
      },
    ],
    [
      {
        key: '4',
        currentValue: DiagramInfoData[0]?.pf_data,
        dailyMax: formatNumber(DiagramCurrentData[7]?.max || 0), //최대값
        dailyMin: formatNumber(DiagramCurrentData[7]?.min || 0), //최소값
        previousValue: formatNumber(DiagramCurrentData[7]?.avg || 0), //평균
        rateOfChange: calculateRateOfChange(DiagramInfoData[0]?.pf_data, DiagramCurrentData[7]?.avg),
      },
    ],
    [
      {
        key: '5',
        currentValue: DiagramInfoData[0]?.out_data,
        dailyMax: formatNumber(DiagramCurrentData[8]?.max || 0), //최대값
        dailyMin: formatNumber(DiagramCurrentData[8]?.min || 0), //최소값
        previousValue: formatNumber(DiagramCurrentData[8]?.avg || 0), //평균
        rateOfChange: calculateRateOfChange(DiagramInfoData[0]?.out_data, DiagramCurrentData[8]?.avg),
      },
    ],
    [
      {
        key: '6',
        currentValue: DiagramInfoData[0]?.in_data,
        dailyMax: formatNumber(DiagramCurrentData[9]?.max || 0), //최대값
        dailyMin: formatNumber(DiagramCurrentData[9]?.min || 0), //최소값
        previousValue: formatNumber(DiagramCurrentData[9]?.avg || 0), //평균
        rateOfChange: calculateRateOfChange(DiagramInfoData[0]?.in_data, DiagramCurrentData[9]?.avg),
      },
    ],
  ] : [];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    const colors = ['#FF6B6B', '#FFD700', '#9370DB', '#00BFFF', '#7CFC00', '#FF69B4'];
    setChartColors(colors);

    const rstcolors = ['#00C700', '#FC738A', '#7696FF'];
    setRSTColors(rstcolors);

    return () => clearInterval(interval);
  }, []);

  if (!DiagramInfoData || !DiagramCurrentData || !DiagramMinmaxData) {
    return <div>Loading...</div>; // 로딩 중일 때 보여줄 내용
  }

  return (
    <Content className="app-Content">
      <Row>
        <Col className="gutter-row" xs={24} sm={24} md={24} lg={15} >
          <Card bordered={false} style={{ padding: 0, background: 'transparent', color: 'white', marginTop: '-15px' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '20px' }}>장비 상세정보
                <p style={{ fontSize: '12px' }}>(10분 간격 데이터)</p>
              </span>
              <span style={{ fontSize: '16px' }}>{currentTime}</span> {/* 현재 시간 표시 */}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Select
                  defaultValue={menuItems.find(item => item.key === refreshInterval)?.label || '10초'}
                  style={{ width: 120, color: 'white', marginRight: '10px' }}
                  onChange={value => {
                    const selectedItem = menuItems.find(item => item.label === value);
                    if (selectedItem) {
                      handleMenuClick(selectedItem.key);
                    }
                  }}
                  dropdownStyle={{ color: 'white' }} // Dropdown 메뉴의 스타일을 설정
                >
                  {menuItems.map(({ key, label }) => (
                    <Option key={key} value={label}>
                      {label}
                    </Option>
                  ))}
                </Select>

                <Select
                  value={selectedDevice}
                  style={{ width: 120, background: 'none', color: '#FFFFFF' }}
                  onChange={handleChange}
                >
                  {DeviceData && DeviceData.map((device, index) => (
                    <Option key={index} value={device.scp_vid}>
                      {device.device_name}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>

            <Row gutter={[10, 2]}>
              <Col xs={24} sm={24} md={24} lg={12} >
                {DiagramMinmaxData[0]?.min !== undefined && DiagramMinmaxData[0]?.max !== undefined && (
                  <Card bordered={false} className='Diagram_V_Card' size='small'>
                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className='Diagram_V_Card_Title'><SlEnergy className='Diagram_icon_V' />전압</div>

                      <Link to="/DiagramDetail?tab=1">
                        <Button type="link" className='Diagram_Info_Button' style={{ marginTop: '-10px', background: 'rgb(42 ,63 ,97)' }}>
                          전압 상세조회
                          <AiOutlineSwapRight style={{ fontSize: '20px', color: 'lightgrey' }} />
                        </Button>
                      </Link>
                    </span>
                    <Card bordered={false} className='Diagram_V_Chart_Card'>
                      <DiagramInfoVWChart key={1}
                        dataR={DiagramInfoData[0]?.v_data_r}
                        dataS={DiagramInfoData[0]?.v_data_s}
                        dataT={DiagramInfoData[0]?.v_data_t}
                        rstColor={rstchartColors}
                        Min={DiagramMinmaxData[0]?.min || 0}
                        Max={DiagramMinmaxData[0]?.max || 0} />
                    </Card>
                  </Card>
                )}
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} >
                {DiagramMinmaxData[1]?.min !== undefined && DiagramMinmaxData[1]?.max !== undefined && (
                  <Card bordered={false} className='Diagram_A_Card'>
                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className='Diagram_A_Card_Title'><VscPulse className='Diagram_icon_A' />전류</div>

                      <Link to="/DiagramDetail?tab=2">
                        <Button type="link" className='Diagram_Info_Button' style={{ marginTop: '-10px', background: 'rgb(42 ,63 ,97)' }}>
                          전류 상세조회
                          <AiOutlineSwapRight style={{ fontSize: '20px', color: 'lightgrey' }} />
                        </Button>
                      </Link>
                    </span>
                    <Card bordered={false} className='Diagram_A_Chart_Card'>
                      <DiagramInfoVWChart key={2}
                        dataR={DiagramInfoData[0]?.am_data_r}
                        dataS={DiagramInfoData[0]?.am_data_s}
                        dataT={DiagramInfoData[0]?.am_data_t}
                        rstColor={rstchartColors}
                        Min={DiagramMinmaxData[1]?.min || 0}
                        Max={DiagramMinmaxData[1]?.max || 0} />
                    </Card>
                  </Card>
                )}
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} >
                {DiagramMinmaxData[2]?.min !== undefined && DiagramMinmaxData[2]?.max !== undefined && (
                  <Card bordered={false} className='Diagram_W_Card'>
                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className='Diagram_W_Card_Title'><SlEnergy className='Diagram_icon_W' />전력</div>

                      <Link to="/DiagramDetail?tab=3">
                        <Button type="link" className='Diagram_Info_Button' style={{ marginTop: '-10px', background: 'rgb(42 ,63 ,97)' }}>
                          전력 상세조회
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
              <Col xs={24} sm={24} md={24} lg={12} >
                {DiagramMinmaxData[3]?.min !== undefined && DiagramMinmaxData[3]?.max !== undefined && (
                  <Card bordered={false} className='Diagram_WVA_Card'>
                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className='Diagram_WVA_Card_Title'><IoBarChartOutline className='Diagram_icon_WVA' />역률</div>

                      <Link to="/DiagramDetail?tab=4">
                        <Button type="link" className='Diagram_Info_Button' style={{ marginTop: '-10px', background: 'rgb(42 ,63 ,97)' }}>
                          역률 상세조회
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
              <Col xs={24} sm={24} md={24} lg={12} >
                {DiagramMinmaxData[4]?.min !== undefined && DiagramMinmaxData[4]?.max !== undefined && (
                  <Card bordered={false} className='Diagram_OutDeg_Card'>
                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className='Diagram_OutDeg_Card_Title'><IoThermometerOutline className='Diagram_icon_OutDeg' />외부온도</div>

                      <Link to="/DiagramDetail?tab=5">
                        <Button type="link" className='Diagram_Info_Button' style={{ marginTop: '-10px', background: 'rgb(42 ,63 ,97)' }}>
                          외부온도 상세조회
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
              <Col xs={24} sm={24} md={24} lg={12} >
                {DiagramMinmaxData[5]?.min !== undefined && DiagramMinmaxData[5]?.max !== undefined && (
                  <Card bordered={false} className='Diagram_InnerDeg_Card'>
                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className='Diagram_InnerDeg_Card_Title'> <IoThermometerOutline className='Diagram_icon_InnerDeg' />내부온도 </div>

                      <Link to="/DiagramDetail?tab=6">
                        <Button type="link" className='Diagram_Info_Button' style={{ marginTop: '-10px', background: 'rgb(42 ,63 ,97)' }}>
                          내부온도 상세조회
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
                <Card style={{ background: 'rgb(42 ,63 ,97)', height: '95px', boxShadow: '0px 0px 10px 2px rgb(22, 42, 69)' }} bordered={false}>
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

        <Col xs={24} sm={24} md={24} lg={9} style={{ marginTop: '25px' }}>
          <span style={{ fontSize: '20px', color: 'white', marginTop: '-15px' }}>실시간 수치
            <p style={{ fontSize: '12px' }}>(최근 1분 데이터)</p>
          </span>
          <Row gutter={[48, 5]} style={{ marginTop: '14px' }}>

            <Col span={24}>
              <Card className='DiagramInfo_Minute_V_Card' style={{ background: 'rgb(42 ,63 ,97)', height: '150px', boxShadow: ' 0px 0px 10px 2px rgb(22, 42, 69)' }} bordered={false}>
                <span className='Diagram_Name'><SlEnergy className='Diagram_icon_V' />전압</span>
                <Row gutter={[10, 2]}> {/* 여백을 추가 */}
                  <Col xs={24} sm={24} md={24} lg={12} style={{ marginTop: '4px' }}>
                    <DiagramInfoMinuteTable data={tableDataArray[0]} />
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} >
                    {DiagramMinmaxData[0]?.min !== undefined && DiagramMinmaxData[0]?.max !== undefined && (
                      <DiagramInfoVWMinuteChart
                        dataR={DiagramInfoData[0]?.v_data_r}
                        dataS={DiagramInfoData[0]?.v_data_s}
                        dataT={DiagramInfoData[0]?.v_data_t}
                        rstColor={rstchartColors}
                        Min={DiagramCurrentData[0].min || 0}
                        Max={DiagramCurrentData[2].max || 0}
                        /*
                        /*Min={DiagramCurrentData[0].min}
                        Max={DiagramCurrentData[2].max}*/ />
                    )}
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col span={24} style={{ marginTop: '6px' }}>
              <Card  className='DiagramInfo_Minute_A_Card' style={{ background: 'rgb(42 ,63 ,97)', height: '150px', boxShadow: ' 0px 0px 10px 2px rgb(22, 42, 69)' }} bordered={false}>
                <span className='Diagram_Name'><VscPulse className='Diagram_icon_A' />전류</span>
                <Row gutter={[10, 2]}> {/* 여백을 추가 */}
                  <Col xs={24} sm={24} md={24} lg={12} style={{ marginTop: '4px' }}>
                    <DiagramInfoMinuteTable data={tableDataArray[1]} />
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} >
                    {DiagramMinmaxData[1]?.min !== undefined && DiagramMinmaxData[1]?.max !== undefined && (
                      <DiagramInfoVWMinuteChart
                        dataR={DiagramInfoData[0]?.am_data_r}
                        dataS={DiagramInfoData[0]?.am_data_s}
                        dataT={DiagramInfoData[0]?.am_data_t}
                        rstColor={rstchartColors}
                        Min={DiagramCurrentData[5].min || 0}
                        Max={DiagramCurrentData[5].max || 0}
                      /**
                      Min={DiagramCurrentData[5].min}
                      Max={DiagramCurrentData[5].max}  */
                      />
                    )}
                  </Col>
                </Row>
              </Card>
            </Col>


            <Col span={24} style={{ marginTop: '6px' }}>
              <Card  className='DiagramInfo_Minute_Card' style={{ background: 'rgb(42 ,63 ,97)', height: '123px', boxShadow: ' 0px 0px 10px 2px rgb(22, 42, 69)' }} bordered={false}>
                <span className='Diagram_Name'><SlEnergy className='Diagram_icon_W' />전력</span>
                <Row gutter={[10, 2]}> {/* 여백을 추가 */}
                  <Col xs={24} sm={24} md={24} lg={12} >
                    <DiagramInfoTable data={tableDataArray[2]} />
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} >
                    {DiagramMinmaxData[2]?.min !== undefined && DiagramMinmaxData[2]?.max !== undefined && (
                      <DiagramInfoMinuteChart key={6}
                        data={DiagramInfoData[0]?.w_data}
                        chartColor={chartColors[2]}
                        Min={DiagramCurrentData[6].min || 0}
                        Max={DiagramCurrentData[6].max || 0} />
                    )}
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col span={24} style={{ marginTop: '6px' }}>
              <Card  className='DiagramInfo_Minute_Card' style={{ background: 'rgb(42 ,63 ,97)', height: '123px', boxShadow: ' 0px 0px 10px 2px rgb(22, 42, 69)' }} bordered={false}>
                <span className='Diagram_Name'><IoBarChartOutline className='Diagram_icon_WVA' />역률</span>
                <Row gutter={[10, 2]}> {/* 여백을 추가 */}
                  <Col xs={24} sm={24} md={24} lg={12} >
                    <DiagramInfoTable data={tableDataArray[3]} />
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} >
                    {DiagramMinmaxData[3]?.min !== undefined && DiagramMinmaxData[3]?.max !== undefined && (
                      <DiagramInfoMinuteChart key={6} data={DiagramInfoData[0]?.pf_data} chartColor={chartColors[3]} Min={DiagramCurrentData[7].min || 0} Max={DiagramCurrentData[7].max || 0} />
                    )}
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col span={24} style={{ marginTop: '6px' }}>
              <Card  className='DiagramInfo_Minute_Card' style={{ background: 'rgb(42 ,63 ,97)', height: '123px', boxShadow: ' 0px 0px 10px 2px rgb(22, 42, 69)' }} bordered={false}>
                <span className='Diagram_Name'><IoThermometerOutline className='Diagram_icon_OutDeg' />외부온도 </span>
                <Row gutter={[10, 2]}> {/* 여백을 추가 */}
                  <Col xs={24} sm={24} md={24} lg={12} >
                    <DiagramInfoTable data={tableDataArray[4]} />
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} >
                    {DiagramMinmaxData[4]?.min !== undefined && DiagramMinmaxData[4]?.max !== undefined && (
                      <DiagramInfoMinuteChart key={6} data={DiagramInfoData[0]?.out_data} chartColor={chartColors[4]} Min={DiagramCurrentData[8].min || 0} Max={DiagramCurrentData[8].max || 0} />
                    )}
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col span={24} style={{ marginTop: '6px' }}>
              <Card  className='DiagramInfo_Minute_Card' style={{ background: 'rgb(42 ,63 ,97)', height: '123px', boxShadow: '0px 0px 10px 2px rgb(22, 42, 69)' }} bordered={false}>
                <span className='Diagram_Name'><IoThermometerOutline className='Diagram_icon_InnerDeg' />내부온도</span>
                <Row gutter={[10, 2]}> {/* 여백을 추가 */}
                  <Col xs={24} sm={24} md={24} lg={12} >
                    <DiagramInfoTable data={tableDataArray[5]} />
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} >
                    {DiagramMinmaxData[5]?.min !== undefined && DiagramMinmaxData[5]?.max !== undefined && (
                      <DiagramInfoMinuteChart key={6} data={DiagramInfoData[0]?.in_data} chartColor={chartColors[5]} Min={DiagramCurrentData[9].min || 0} Max={DiagramCurrentData[9].max || 0} />
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
