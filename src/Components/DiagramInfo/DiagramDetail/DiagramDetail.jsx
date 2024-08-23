import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // useNavigate 추가
import { IoThermometerOutline, IoBarChartOutline } from "react-icons/io5";
import { SlEnergy } from "react-icons/sl";
import { VscPulse } from "react-icons/vsc";
import { Card, Col, Row, Layout, Select, Tabs } from 'antd';
import DiagramDetailChart from './DiagramDetailChart/DiagramDetail_Chart';
import DiagramDetailVWChart from './DiagramDetailChart/DiagramDetail_VWChart';
import DiagramDetailRSTChart from './DiagramDetailRSTChart/DiagramDetailRSTChart';
import DiagramDetailLog from './DiagramDetailLog/DiagramDetailLog';
import DiagramDetailVWTable from './DiagramDetailTable/DiagramDetailVWTable';
import DiagramInfoOtherTable from './DiagramDetailTable/DiagramInfoOtherTable';
import '../DiagramInfo.css';
import { useDiagramInfoData, useMinMaxData, useDiagramCurrentData } from '../DiagramInfo_DB/DiagramInfo_DB';
import { useDeviceData } from '../../db/Device-m';

const { Content } = Layout;
const { Option } = Select;



const DiagramDetail = () => {

    const location = useLocation();
    const navigate = useNavigate(); 
    const queryParams = new URLSearchParams(location.search);
    const initialTabKey = queryParams.get('tab') || "1";

    const [refreshInterval, setRefreshInterval] = useState(10000);
    const [currentTime, setCurrentTime] = useState('');
    const [activeTabKey, setActiveTabKey] = useState(initialTabKey); 
    const [selectedDevice, setSelectedDevice] = useState(''); 

    const { data: DeviceData } = useDeviceData(refreshInterval);
    useEffect(() => {
        if (DeviceData && DeviceData.length > 0) {
            setSelectedDevice(DeviceData[0].scp_vid);
        }
    }, [DeviceData]);

    // useDiagramInfoData와 함께 selectedDevice를 사용하여 데이터를 가져옵니다.
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
        if (previousValue === 0) return 0;
        const rateOfChange = ((currentValue / previousValue) * 100) - 100;
        return rateOfChange.toFixed(1);
    };

    const formatNumber = (number) => {
        if (number === undefined || number === null) {
            return '-';
        }
        return number.toLocaleString();
    };

    const tableDataArray = [
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
    ];

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


    /************************************** 로그이력관리 useEffect ****************************************/

    const [VoltRSTlog, setVoltRSTLog] = useState([]);
    const [AmRSTlog, setAmRSTlog] = useState([]);
    const [PowerLog, setPowerLog] = useState([]);
    const [PFLog, setPFLog] = useState([]);
    const [OutTempLog, setOutTempLog] = useState([]);
    const [InTempLog, setInTempLog] = useState([]);

    useEffect(() => {
        if (DiagramInfoData.length > 0) {
            const now = new Date();
            const newLogEntry = {
                date: now.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }),
                time: now.toLocaleTimeString('ko-KR', { hour12: false }),
                L1: `L1 : ${DiagramInfoData[0]?.v_data_r || '-'}`,
                L2: `L2 : ${DiagramInfoData[0]?.v_data_s || '-'}`,
                L3: `L3 : ${DiagramInfoData[0]?.v_data_t || '-'}`,
            };
            setVoltRSTLog((prevEntries) => [newLogEntry, ...prevEntries].slice(0, 30));
        }
    }, [DiagramInfoData]);

    useEffect(() => {
        if (DiagramInfoData.length > 0) {
            const now = new Date();
            const newLogEntry = {
                date: now.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }),
                time: now.toLocaleTimeString('ko-KR', { hour12: false }),
                L1: `L1 : ${DiagramInfoData[0]?.am_data_r || '-'}`,
                L2: `L2 : ${DiagramInfoData[0]?.am_data_s || '-'}`,
                L3: `L3 : ${DiagramInfoData[0]?.am_data_t || '-'}`,
            };
            setAmRSTlog((prevEntries) => [newLogEntry, ...prevEntries].slice(0, 30));
        }
    }, [DiagramInfoData]);

    // 전력, 역률, 내부온도, 외부온도 로그 업데이트
    useEffect(() => {
        if (DiagramInfoData.length > 0) {
            const now = new Date();
            const newLogEntry = {
                date: now.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }),
                time: now.toLocaleTimeString('ko-KR', { hour12: false }),
                value: `전력 : ${DiagramInfoData[0]?.w_data || '-'}`,
            };
            setPowerLog([newLogEntry]);
        }
    }, [DiagramInfoData]);

    useEffect(() => {
        if (DiagramInfoData.length > 0) {
            const now = new Date();
            const newLogEntry = {
                date: now.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }),
                time: now.toLocaleTimeString('ko-KR', { hour12: false }),
                value: `역률 : ${DiagramInfoData[0]?.pf_data || '-'}`,
            };
            setPFLog([newLogEntry]);
        }
    }, [DiagramInfoData]);

    useEffect(() => {
        if (DiagramInfoData.length > 0) {
            const now = new Date();
            const newLogEntry = {
                date: now.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }),
                time: now.toLocaleTimeString('ko-KR', { hour12: false }),
                value: `외부온도 : ${DiagramInfoData[0]?.out_data || '-'}`,
            };
            setOutTempLog([newLogEntry]);
        }
    }, [DiagramInfoData]);

    useEffect(() => {
        if (DiagramInfoData.length > 0) {
            const now = new Date();
            const newLogEntry = {
                date: now.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }),
                time: now.toLocaleTimeString('ko-KR', { hour12: false }),
                value: `내부온도 : ${DiagramInfoData[0]?.in_data || '-'}`,
            };
            setInTempLog([newLogEntry]);
        }
    }, [DiagramInfoData]);


    const handleTabChange = (key) => {
        setActiveTabKey(key);
        navigate(`?tab=${key}`);
    };

    /************************************** 로그이력관리 useEffect ****************************************/


    const tabsItems = [
        {
            label: <span><SlEnergy className='Diagram_icon_V' />전압</span>,
            key: "1",
            children: (
                DiagramMinmaxData[0]?.min !== undefined && DiagramMinmaxData[0]?.max !== undefined && (
                    <Col span={24}>
                        <Row>
                            <Col span={24}>
                                <Card bordered={false} className='DiagramDetail_V_Chart_Card'>
                                    <DiagramDetailVWChart
                                        key={1}
                                        dataR={DiagramInfoData[0]?.v_data_r}
                                        dataS={DiagramInfoData[0]?.v_data_s}
                                        dataT={DiagramInfoData[0]?.v_data_t}
                                        rstColor={rstchartColors}
                                        Min={DiagramMinmaxData[0]?.min || 0}
                                        Max={DiagramMinmaxData[0]?.max || 0}
                                    />
                                </Card>
                            </Col>
                        </Row>
                        <Row gutter={[10]} style={{ marginTop: '10px' }}>
                            <Col span={8}>
                                <DiagramDetailVWTable data={tableDataArray[0]} />
                            </Col>
                            <Col span={8}>
                                <Card bordered={false} className='DiagramDetail_V_DiagramDetailLog_Card'>
                                    <DiagramDetailLog logEntries={VoltRSTlog} />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card bordered={false} className='DiagramDetail_V_RSTChart_Card'>
                                    <DiagramDetailRSTChart
                                        key="1"
                                        dataR={DiagramInfoData[0]?.v_data_r}
                                        dataS={DiagramInfoData[0]?.v_data_s}
                                        dataT={DiagramInfoData[0]?.v_data_t}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                )
            )
        },
        {
            label: <span><VscPulse className='Diagram_icon_A' />전류</span>,
            key: "2",
            children: (
                DiagramMinmaxData[1]?.min !== undefined && DiagramMinmaxData[1]?.max !== undefined && (
                    <Col span={24}>
                        <Row>
                            <Col span={24}>
                                <Card bordered={false} className='DiagramDetail_A_Chart_Card'>
                                    <DiagramDetailVWChart key={2}
                                        dataR={DiagramInfoData[0]?.am_data_r}
                                        dataS={DiagramInfoData[0]?.am_data_s}
                                        dataT={DiagramInfoData[0]?.am_data_t}
                                        rstColor={rstchartColors}
                                        Min={DiagramMinmaxData[1]?.min || 0}
                                        Max={DiagramMinmaxData[1]?.max || 0} />

                                </Card>
                            </Col>
                        </Row>
                        <Row gutter={[10]} style={{ marginTop: '10px' }}> {/* 수평 16px, 수직 24px 간격 설정 */}
                            <Col span={8}>
                                <DiagramDetailVWTable data={tableDataArray[1]} />
                            </Col>
                            <Col span={8}>
                                <Card bordered={false} className='DiagramDetail_A_DiagramDetailLog_Card'>
                                    <DiagramDetailLog logEntries={AmRSTlog} />
                                </Card>
                            </Col>

                            <Col span={8}>
                                <Card bordered={false} className='DiagramDetail_A_RSTChart_Card'>
                                    <DiagramDetailRSTChart
                                        key="2"
                                        dataR={DiagramInfoData[0]?.am_data_r}
                                        dataS={DiagramInfoData[0]?.am_data_s}
                                        dataT={DiagramInfoData[0]?.am_data_t}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                )
            )
        },
        {
            label: <span><SlEnergy className='Diagram_icon_W' />전력</span>,
            key: "3",
            children: (
                DiagramMinmaxData[2]?.min !== undefined && DiagramMinmaxData[2]?.max !== undefined && (
                    <Col span={24}>
                        <Row>
                            <Col span={24}>
                                <Card bordered={false} className='DiagramDetail_W_Chart_Card' size='large'>
                                    <DiagramDetailChart key={3} data={DiagramInfoData[0]?.w_data} chartColor={chartColors[2]} Min={DiagramMinmaxData[2]?.min || 0} Max={DiagramMinmaxData[2]?.max || 0} />
                                </Card>
                            </Col>
                        </Row>
                        <Row gutter={[10]} style={{ marginTop: '10px' }}> {/* 수평 16px, 수직 24px 간격 설정 */}
                            <Col span={8}>
                                <DiagramInfoOtherTable data={tableDataArray[2]} />
                            </Col>
                            <Col span={16} style={{ height: '460px' }}>

                                <Card bordered={false} className='DiagramDetail_W_DiagramDetailLog_Card'>
                                    <DiagramDetailLog logEntries={PowerLog} />
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                )
            )
        },
        {
            label: <span><IoBarChartOutline className='Diagram_icon_WVA' />역률</span>,
            key: "4",
            children: (
                DiagramMinmaxData[3]?.min !== undefined && DiagramMinmaxData[3]?.max !== undefined && (

                    <Col span={24}>
                        <Row>
                            <Col span={24}>
                                <Card bordered={false} className='DiagramDetail_WVA_Chart_Card'>
                                    <DiagramDetailChart key={4} data={DiagramInfoData[0]?.pf_data} chartColor={chartColors[3]} Min={DiagramMinmaxData[3]?.min || 0} Max={DiagramMinmaxData[3]?.max || 0} />
                                </Card>
                            </Col>
                        </Row>
                        <Row gutter={[10]} style={{ marginTop: '10px' }}> {/* 수평 16px, 수직 24px 간격 설정 */}
                            <Col span={8}>
                                <DiagramInfoOtherTable data={tableDataArray[3]} />
                            </Col>
                            <Col span={16} style={{ height: '460px' }}>
                                <Card bordered={false} className='DiagramDetail_PF_DiagramDetailLog_Card'>
                                    <DiagramDetailLog logEntries={PFLog} />
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                )
            )
        },
        {
            label: <span><IoThermometerOutline className='Diagram_icon_OutDeg' />외부온도</span>,
            key: "5",
            children: (
                DiagramMinmaxData[4]?.min !== undefined && DiagramMinmaxData[4]?.max !== undefined && (
                    <Col span={24}>
                        <Row>
                            <Col span={24}>
                                <Card bordered={false} className='DiagramDetail_OutDeg_Chart_Card'>
                                    <DiagramDetailChart key={5} data={DiagramInfoData[0]?.out_data} chartColor={chartColors[4]} Min={DiagramMinmaxData[4]?.min || 0} Max={DiagramMinmaxData[4]?.max || 0} />
                                </Card>
                            </Col>
                        </Row>
                        <Row gutter={[10]} style={{ marginTop: '10px' }}> {/* 수평 16px, 수직 24px 간격 설정 */}
                            <Col span={8}>
                                <DiagramInfoOtherTable data={tableDataArray[4]} />
                            </Col>
                            <Col span={16} style={{ height: '460px' }}>
                                <Card bordered={false} className='DiagramDetail_OutDeg_DiagramDetailLog_Card'>
                                    <DiagramDetailLog logEntries={OutTempLog} />
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                )
            )
        },
        {
            label: <span><IoThermometerOutline className='Diagram_icon_InnerDeg' />내부온도</span>,
            key: "6",
            children: (
                DiagramMinmaxData[5]?.min !== undefined && DiagramMinmaxData[5]?.max !== undefined && (

                    <Col span={24}>
                        <Row>
                            <Col span={24}>
                                <Card bordered={false} className='DiagramDetail_InnerDeg_Chart_Card'>
                                    <DiagramDetailChart key={6} data={DiagramInfoData[0]?.in_data} chartColor={chartColors[5]} Min={DiagramMinmaxData[5]?.min || 0} Max={DiagramMinmaxData[5]?.max || 0} />
                                </Card>
                            </Col>
                        </Row>
                        <Row gutter={[10]} style={{ marginTop: '10px' }}> {/* 수평 16px, 수직 24px 간격 설정 */}
                            <Col span={8}>
                                <DiagramInfoOtherTable data={tableDataArray[5]} />
                            </Col>
                            <Col span={16} style={{ height: '460px' }}>
                                <Card bordered={false} className='DiagramDetail_InnerDeg_DiagramDetailLog_Card'>
                                    <DiagramDetailLog logEntries={InTempLog} />
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                )
            )
        }
    ];

    return (
        <Content className="app-Content">
            <Row>
                <Col className="gutter-row" span={24}>
                    <Card bordered={false} style={{ padding: 0, background: 'transparent', color: 'white', marginTop: '-15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '20px' }}>상세조회</span>
                            <span style={{ fontSize: '16px' }}>{currentTime}</span> {/* 현재 시간 표시 */}

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Select
                                    defaultValue={menuItems.find(item => item.key === refreshInterval)?.label || '10초'}
                                    style={{ width: 120, color: 'white', marginRight: '10px' }}
                                    onChange={value => handleMenuClick(menuItems.find(item => item.label === value).key)}
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

                        <Col span={24}>
                            <Row>
                                <Col span={24} style={{ marginTop: '10px' }}>
                                    <Tabs
                                        type="card"
                                        items={tabsItems}
                                        activeKey={activeTabKey}
                                        onChange={handleTabChange} // onChange 핸들러 추가
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Card>
                </Col>
            </Row>
        </Content>
    );
};

export default DiagramDetail;
