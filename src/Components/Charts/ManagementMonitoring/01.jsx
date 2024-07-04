import React, { useContext, useState } from 'react';
import { Layout, Col, Row, Card, Select } from 'antd';
import { ThemeContext } from '../../ThemeContext';
import CurrentR from './Current/CurrentR';

import OverCurrentR from './OverCurrent/OverCurrentR';
//import OverCurrentS from './OverCurrent/OverCurrentS';
//import OverCurrentT from './OverCurrent/OverCurrentT';
import CurrentUnbalanceRatio from './Other/CurrentUnbalanceRatio';


const { Content } = Layout;
const { Option } = Select;

const MonitorFirst = () => {
    const [MovePointer] = useState([250, 300, 400]);
    const [Volt] = useState([250, 300, 400]);


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
                    <Card className={` ${TxtTheme} ${BgTheme}`}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '20px' }}> 설비관리모니터링</span>

                            <Select defaultValue="Option1" style={{ width: 120 }} onChange={handleChange}>
                                <Option value="Option1">장비1</Option>
                                <Option value="Option2">장비2</Option>
                                <Option value="Option3">장비3</Option>
                            </Select>
                        </div>

                        <div className={`Current_Card ${TxtTheme} ${BgTheme}`} style={{ marginTop: '15px' }} >

                            <Card className={`Card1 ${TxtTheme} ${BgTheme}`} size='medium' >
                                <span> 전압</span>
                                <Row
                                    gutter={{
                                        xs: 10,
                                        sm: 10,
                                        md: 20,
                                        lg: 10,
                                    }}
                                >
                                    <Col span={8}><CurrentR Volt={Volt[0]} Name={Name[0]} NameColor={NameColor[0]} MovePointer={MovePointer[0]} key={1} /> </Col>
                                    <Col span={8}><CurrentR Volt={Volt[1]} Name={Name[1]} NameColor={NameColor[1]} MovePointer={MovePointer[1]} key={2} /> </Col>
                                    <Col span={8}><CurrentR Volt={Volt[2]} Name={Name[2]} NameColor={NameColor[2]} MovePointer={MovePointer[2]} key={3} /> </Col>


                                </Row>

                            </Card>

                            <Card className={`OverCurrent_Card ${TxtTheme} ${BgTheme}`} size='medium'>
                                <span>과전류</span>
                                <Row
                                    gutter={{
                                        xs: 10,
                                        sm: 10,
                                        md: 20,
                                        lg: 10,
                                    }}
                                >
                                    <Col span={8}> <OverCurrentR /> </Col>



                                </Row>
                            </Card>
                        </div>
                        <div className='Other_Card'>
                            <Card className={`Other_Card ${TxtTheme} ${BgTheme}`} size='medium'>

                                <Row
                                    gutter={{
                                        xs: 10,
                                        sm: 10,
                                        md: 20,
                                        lg: 10,
                                    }}
                                >
                                    <Col span={6}> <span> 전류 불평형률</span> <CurrentUnbalanceRatio />

                                    </Col>
                                    <Col span={6}><span> 누설전류</span>
                                    </Col>
                                    <Col span={6}><span> 온도</span>
                                    </Col>
                                    <Col span={6}><span>누적가동시간</span>
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
