import React, { useContext, useState, useEffect } from 'react';
import { Layout, Col, Row, Card, Select } from 'antd';
import { ThemeContext } from '../../ThemeContext';
import CurrentR from './Current/CurrentR';
import OverCurrentR from './OverCurrent/OverCurrentR';
import CurrentUnbalanceRatio from './Other/CurrentUnbalanceRatio';
import LeakageCurrent from './Other/LeakageCurrent';
import Temperature from './Other/Temperature';
import AccumulatedOperatingTime from './Other/AccumulatedOperatingTime';
import { useCurrentData } from '../../db/Current_db';

const { Content } = Layout;
const { Option } = Select;

const MonitorFirst = () => {
    const { data } = useCurrentData();


    const [Name, setName] = useState([]);
    const [Value, setCurrentValue] = useState([]);

    const [FirstArea, setFirstArea] = useState([]);
    const [SecondArea, setSecondArea] = useState([]);
    const [ThirdArea, setThirdArea] = useState([]);




    const [MovePointer, setMovePointer] = useState([]);
    const [OverCurrentVolt, setOverCurrentVolt] = useState([]);

    const { isDarkMode } = useContext(ThemeContext);

    const TxtTheme = isDarkMode ? 'text-dark' : 'text-light';
    const BgTheme = isDarkMode ? 'bg-dark' : 'bg-light';

    const handleChange = () => {
    };

    useEffect(() => {
        if (data && data.length > 0) {
            setMovePointer([210, 220, 185]);
            setOverCurrentVolt([35, 20, 40]);
            setName([data[0].name, data[1].name, data[2].name]);
            setCurrentValue([data[0].value, data[1].value, data[2].value]);
            setFirstArea([data[0].area1, data[1].area1, data[2].area1]);
            setSecondArea([data[0].area2, data[1].area2, data[2].area2]);
            setThirdArea([data[0].area3, data[1].area3, data[2].area3]);





        }
    }, [data]);

    console.log(SecondArea);
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

                            <Select defaultValue="Option1" style={{ width: 120, background: '#263752', color: '#000000' }} onChange={handleChange}>
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
                                    <Col span={8}><CurrentR Volt={Value[0]} Name={Name[0]} MovePointer={MovePointer[0]} SecondArea={SecondArea[0]} FirstArea={FirstArea[0]} ThirdArea={ThirdArea[0]} key={1} /> </Col>
                                    <Col span={8}><CurrentR Volt={Value[1]} Name={Name[1]} MovePointer={MovePointer[1]} SecondArea={SecondArea[1]} FirstArea={FirstArea[1]} ThirdArea={ThirdArea[0]} key={2} /> </Col>
                                    <Col span={8}><CurrentR Volt={Value[2]} Name={Name[2]} MovePointer={MovePointer[2]} SecondArea={SecondArea[2]} FirstArea={FirstArea[2]} ThirdArea={ThirdArea[0]} key={3} /> </Col>
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
                            <Card className={`Other_Card ${TxtTheme} ${BgTheme}`} size='medium' bordered={false} >

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
