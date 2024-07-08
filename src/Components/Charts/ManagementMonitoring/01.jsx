import React, { useContext, useState } from 'react';
import { Layout, Col, Row, Card, Select } from 'antd';
import { ThemeContext } from '../../ThemeContext';
import CurrentR from './Current/CurrentR';
import OverCurrentR from './OverCurrent/OverCurrentR';
import CurrentUnbalanceRatio from './Other/CurrentUnbalanceRatio';
import LeakageCurrent from './Other/LeakageCurrent';
import Temperature from './Other/Temperature';
import AccumulatedOperatingTime from './Other/AccumulatedOperatingTime';

const { Content } = Layout;
const { Option } = Select;

const MonitorFirst = () => {

    const Datas = useState [
        { L1: "1", value: "1", section: "1" },
        { L2: "2", value: "2", section: "2" },
        { L3: "3", value: "3", section: "3" }
    ]


    const [MovePointer] = useState([210, 220, 185]);

    const [CurrentVolt] = useState([210, 220, 185]);
    const [OverCurrentVolt] = useState([35, 20, 40]);

    const [Name] = useState(['L1', 'L2', 'L3']);
    const [NameColor] = useState(['#00C700', '#FC738A', '#7696ff']);


    /* ..................................... */


    /* ....................................*/

    const { isDarkMode } = useContext(ThemeContext);

    const TxtTheme = isDarkMode ? 'text-dark' : 'text-light';
    const BgTheme = isDarkMode ? 'bg-dark' : 'bg-light';

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <Content className="app-Content">
            <Row
                gutter={{
                    xs: 10,
                    sm: 10,
                    md: 20,
                    lg: 10,
                }}
            >
                <Col className="gutter-row" span={24}>
                    <Card className={` ${TxtTheme} ${BgTheme}`} bordered={false}> 
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '20px' }}> 설비관리모니터링</span>

                            <Select defaultValue="Option1" style={{ width: 120, background: '#263752', color:'#000000' }} onChange={handleChange}>
                                <Option value="Option1" >장비1</Option>
                                <Option value="Option2" >장비2</Option>
                                <Option value="Option3" >장비3</Option>
                            </Select>
                        </div>

                        <div className={`Current_Card ${TxtTheme} ${BgTheme}`} style={{ marginTop: '15px' }} >

                            <Card className={`Card1 ${TxtTheme} ${BgTheme}`} size='medium' bordered={false}>
                                <span> 전압</span>
                                <Row
                                    gutter={{
                                        xs: 10,
                                        sm: 10,
                                        md: 20,
                                        lg: 10,
                                    }}
                                >
                                    <Col span={8}><CurrentR CurrentVolt={CurrentVolt[0]} Name={Name[0]} NameColor={NameColor[0]} MovePointer={MovePointer[0]} key={1} /> </Col>
                                    <Col span={8}><CurrentR CurrentVolt={CurrentVolt[1]} Name={Name[1]} NameColor={NameColor[1]} MovePointer={MovePointer[1]} key={2} /> </Col>
                                    <Col span={8}><CurrentR CurrentVolt={CurrentVolt[2]} Name={Name[2]} NameColor={NameColor[2]} MovePointer={MovePointer[2]} key={3} /> </Col>
                                </Row>
                            </Card>

                            <Card className={`OverCurrent_Card ${TxtTheme} ${BgTheme}`} size='medium' bordered={false}>
                                <span>과전류</span>
                                <Row
                                    gutter={{
                                        xs: 10,
                                        sm: 10,
                                        md: 20,
                                        lg: 10,
                                    }}
                                >
                                    <Col span={8}> <OverCurrentR Name={Name[0]} OverCurrentVolt={OverCurrentVolt[0]} /> </Col>
                                    <Col span={8}> <OverCurrentR Name={Name[1]} OverCurrentVolt={OverCurrentVolt[1]} /> </Col>
                                    <Col span={8}> <OverCurrentR Name={Name[2]} OverCurrentVolt={OverCurrentVolt[2]} /> </Col>
                                </Row>
                            </Card>
                        </div>
                        <br />
                        <br />
                        <div className='Other_Card'>
                            <Card className={`Other_Card ${TxtTheme} ${BgTheme}`} size='medium'  bordered={false} >

                                <Row
                                    gutter={{
                                        xs: 10,
                                        sm: 10,
                                        md: 20,
                                        lg: 10,
                                    }}
                                >
                                    <Col span={6} > <span > 전류 불평형률</span>
                                        <CurrentUnbalanceRatio />
                                    </Col>

                                    <Col span={6}><span> 누설전류</span>
                                        <LeakageCurrent />
                                    </Col>

                                    <Col span={6}><span> 온도</span>
                                        <Temperature />
                                    </Col>

                                    <Col span={6}><span>누적가동시간</span>
                                        <AccumulatedOperatingTime />
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Content>
    );
};

export default MonitorFirst;
