import React, { useState, useEffect } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { IoThermometerOutline, IoBarChartOutline } from "react-icons/io5";
import { SlEnergy } from "react-icons/sl";
import { VscPulse } from "react-icons/vsc";
import { Card, Col, Row, Layout, Dropdown, Space, Select, Tabs } from 'antd';
import DiagramDetail_Chart from './DiagramDetailChart/DiagramDetail_Chart'; // 전력~내부온도
import DiagramDetail_VWChart from './DiagramDetailChart/DiagramDetail_VWChart'; // 전압,전력
import DiagramDetailAlertStep from './DiagramDetailAlertStep/DiagramDetailAlertStep';
import DiagramDetailVWTable from './DiagramDetailTable/DiagramDetailVWTable';
import DiagramInfoOtherTable from './DiagramDetailTable/DiagramInfoOtherTable';
import '../DiagramInfo.css';
import { useDiagramInfoData, useMinMaxData, useDiagramCurrentData } from '../DiagramInfo_DB/DiagramInfo_DB';

const { Content } = Layout;
const { Option } = Select;

const handleChange = () => {
};

const DiagramDetail = () => {
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
    const [rstchartColors, setRSTColors] = useState([]);

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
        // 현재 시간 업데이트
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleString()); // 날짜와 시간을 문자열로 변환
        };



        updateTime(); // 처음 렌더링 시 시간 설정
        const interval = setInterval(updateTime, 1000); // 1초마다 시간 업데이트
        const colors = ['#FF6B6B', '#FFD700', '#9370DB', '#00BFFF', '#7CFC00', '#FF69B4'];
        setChartColors(colors);

        const rstcolors = ['#00C700', '#FC738A', '#7696FF'];
        setRSTColors(rstcolors);

        return () => clearInterval(interval);
    }, []);

    const tabsItems = [
        {
            label: <span><SlEnergy className='Diagram_icon_V' />전압</span>,
            key: "1",
            children: (
                DiagramMinmaxData[0]?.min !== undefined && DiagramMinmaxData[0]?.max !== undefined && (
                    <Col span={24}>
                        <Row> {/* 수평 16px, 수직 24px 간격 설정 */}
                            <Col span={24}>
                                <Card bordered={false} className='DiagramDetail_V_Chart_Card'>
                                    <DiagramDetail_VWChart
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
                        <Row gutter={[10]} style={{ marginTop: '10px' }}> {/* 수평 16px, 수직 24px 간격 설정 */}
                            <Col span={8}>
                                <DiagramDetailVWTable data={tableDataArray[0]} />
                            </Col>
                            <Col span={16}>
                                <Card bordered={false} className='DiagramDetail_V_Card'>
                                    asdasd
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
                                    <DiagramDetail_VWChart key={2}
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
                            <Col span={16}>
                                <Card bordered={false} className='DiagramDetail_A_Card'>
                                    asdasd
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
                                    <DiagramDetail_Chart key={3} data={DiagramInfoData[0]?.w_data} chartColor={chartColors[2]} Min={DiagramMinmaxData[2]?.min || 0} Max={DiagramMinmaxData[2]?.max || 0} />
                                </Card>
                            </Col>
                        </Row>
                        <Row gutter={[10]} style={{ marginTop: '10px' }}> {/* 수평 16px, 수직 24px 간격 설정 */}
                            <Col span={8}>
                                <DiagramInfoOtherTable data={tableDataArray[2]} />
                            </Col>
                            <Col span={16}>
                                <Card bordered={false} className='DiagramDetail_W_Card'>
                                    asdasd
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
                                    <DiagramDetail_Chart key={4} data={DiagramInfoData[0]?.pf_data} chartColor={chartColors[3]} Min={DiagramMinmaxData[3]?.min || 0} Max={DiagramMinmaxData[3]?.max || 0} />
                                </Card>
                            </Col>
                        </Row>
                        <Row gutter={[10]} style={{ marginTop: '10px' }}> {/* 수평 16px, 수직 24px 간격 설정 */}
                            <Col span={8}>
                                <DiagramInfoOtherTable data={tableDataArray[3]} />
                            </Col>
                            <Col span={16}>
                                <Card bordered={false} className='DiagramDetail_WVA_Card'>
                                    asdasd
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
                                    <DiagramDetail_Chart key={5} data={DiagramInfoData[0]?.out_data} chartColor={chartColors[4]} Min={DiagramMinmaxData[4]?.min || 0} Max={DiagramMinmaxData[4]?.max || 0} />
                                </Card>
                            </Col>
                        </Row>
                        <Row gutter={[10]} style={{ marginTop: '10px' }}> {/* 수평 16px, 수직 24px 간격 설정 */}
                            <Col span={8}>
                                <DiagramInfoOtherTable data={tableDataArray[4]} />
                            </Col>
                            <Col span={16}>
                                <Card bordered={false} className='DiagramDetail_OutDeg_Card'>
                                    asdasd
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
                                    <DiagramDetail_Chart key={6} data={DiagramInfoData[0]?.in_data} chartColor={chartColors[5]} Min={DiagramMinmaxData[5]?.min || 0} Max={DiagramMinmaxData[5]?.max || 0} />
                                </Card>
                            </Col>
                        </Row>
                        <Row gutter={[10]} style={{ marginTop: '10px' }}> {/* 수평 16px, 수직 24px 간격 설정 */}
                            <Col span={8}>
                                <DiagramInfoOtherTable data={tableDataArray[5]} />
                            </Col>
                            <Col span={16}>
                                <Card bordered={false} className='DiagramDetail_InnerDeg_Card'>
                                    asdasd
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
                            <Select defaultValue="Option1" style={{ width: 120, background: 'none', color: '#FFFFFF' }} onChange={handleChange}>
                                <Option value="Option1" >장비1</Option>
                                <Option value="Option2" >장비2</Option>
                                <Option value="Option3" >장비3</Option>
                            </Select>
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
                        <Col span={24}>
                            <Row>
                                <Col span={24} style={{ marginTop: '10px' }}>
                                    <Tabs type="card" items={tabsItems} />
                                </Col>
                            </Row>
                            <Row gutter={[10]} style={{ marginTop: '10px' }}> {/* 수평 16px, 수직 24px 간격 설정 */}
                                <Col span={12}>
                                    <Card className='DiagramDetailAlertStep_Card' bordered={false}>
                                        <DiagramDetailAlertStep />
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Card>
                </Col>
            </Row >
        </Content >
    );
};

export default DiagramDetail;
