import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Layout, Col, Row, Card, Select, Button } from 'antd';
import { ThemeContext } from '../ThemeContext';
import CurrentR from './Current/CurrentR';
import OverCurrentR from './OverCurrent/OverCurrentR';
import CurrentUnbalanceRatio from './Other/CurrentUnbalanceRatio';
import LeakageCurrent from './Other/LeakageCurrent';
import Temperature from './Other/Temperature';
import AccumulatedOperatingTime from './Other/AccumulatedOperatingTime';
import { useCurrentData } from '../db/Current_db';
import { AiOutlineSwapRight } from "react-icons/ai";

const { Content } = Layout;
const { Option } = Select;

const MonitorFirst = () => {
    const { data } = useCurrentData();


    const [Name, setName] = useState([]);


    const [CurrentValue, setCurrentValue] = useState([]);
    const [OverCurrentValue, setOverCurrentValue] = useState([]);

    //const [TemperatureValue, setTemperatureValue] = useState([]); //온도
    //const [CurrentUnbalanceRatioValue, setCurrentUnbalanceRatioValue] = useState([]); //전류불평형률
    //const [LeakageCurrentValue, setLeakageCurrentValue] = useState([]); //누설전류
    //const [AccumulatedOperatingTimeValue, setAccumulatedOperatingTimeValue] = useState([]); //누적가동시간

    /** 전압 구간 */
    const [CurrentFirstArea, setCurrentFirstArea] = useState([]);
    const [CurrentSecondArea, setCurrentSecondArea] = useState([]);
    const [CurrentThirdArea, setCurrentThirdArea] = useState([]);
    /** 전압 구간 */

    /** 과전류 구간 */
    const [OverCurrentFirstArea, setOverCurrentFirstArea] = useState([]);
    const [OverCurrentSecondArea, setOverCurrentSecondArea] = useState([]);
    const [OverCurrentThirdArea, setOverCurrentThirdArea] = useState([]);
    /** 과전류 구간 */

    const [MovePointer, setMovePointer] = useState([]);


    const { isDarkMode } = useContext(ThemeContext);

    const TxtTheme = isDarkMode ? 'text-dark' : 'text-light';
    const BgTheme = isDarkMode ? 'bg-dark' : 'bg-light';

    const handleChange = () => {
    };

    useEffect(() => {
        if (data && data.length > 0) {
            setMovePointer([210, 220, 185]);
            setName([data[0].name, data[1].name, data[2].name]);

            /** 전압 구간 */
            setCurrentValue([data[0].value, data[1].value, data[2].value]);
            setCurrentFirstArea([data[0].area1, data[1].area1, data[2].area1]);
            setCurrentSecondArea([data[0].area2, data[1].area2, data[2].area2]);
            setCurrentThirdArea([data[0].area3, data[1].area3, data[2].area3]);
            /** 전압 구간 */

            /** 과전류 구간 */
            setOverCurrentValue([data[3].value, data[4].value, data[5].value]);
            setOverCurrentFirstArea([data[3].area1, data[4].area1, data[5].area1]);
            setOverCurrentSecondArea([data[3].area2, data[4].area2, data[5].area2]);
            setOverCurrentThirdArea([data[3].area3, data[4].area3, data[5].area3]);
            /** 과전류 구간 */

        }
    }, [data]);
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
                    <Card className={` ${TxtTheme} ${BgTheme}`} bordered={false} style={{ padding: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <span style={{ fontSize: '20px' }}> 설비관리모니터링</span>

                            <Select defaultValue="Option1" style={{ width: 120, background: 'none', color: '#FFFFFF' }} onChange={handleChange}>
                                <Option value="Option1" >장비1</Option>
                                <Option value="Option2" >장비2</Option>
                                <Option value="Option3" >장비3</Option>
                            </Select>
                        </div>



                        <Row
                            gutter={{
                                xs: 10,
                                sm: 10,
                                md: 20,
                                lg: 10,
                            }}
                        >
                            <Col span={12} >
                                <Card className={`Current_Card ${TxtTheme} ${BgTheme}`} size='small' bordered={false} >
                                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '10px', marginTop: '10px' }}>전압
                                    </span>
                                    <Row
                                        gutter={{
                                            xs: 10,
                                            sm: 10,
                                            md: 20,
                                            lg: 10,
                                        }}
                                    >
                                        <Col span={8}>
                                            <CurrentR
                                                CurrentVolt={CurrentValue[0]}
                                                Name={Name[0]}
                                                MovePointer={MovePointer[0]}
                                                CurrentFirstArea={CurrentFirstArea[0]}
                                                CurrentSecondArea={CurrentSecondArea[0]}
                                                CurrentThirdArea={CurrentThirdArea[0]} key={1} />
                                        </Col>

                                        <Col span={8}>
                                            <CurrentR
                                                CurrentVolt={CurrentValue[1]}
                                                Name={Name[1]}
                                                MovePointer={MovePointer[1]}
                                                CurrentFirstArea={CurrentFirstArea[1]}
                                                CurrentSecondArea={CurrentSecondArea[1]}
                                                CurrentThirdArea={CurrentThirdArea[1]} key={2} />
                                        </Col>

                                        <Col span={8}>
                                            <CurrentR
                                                CurrentVolt={CurrentValue[2]}
                                                Name={Name[2]}
                                                MovePointer={MovePointer[2]}
                                                CurrentFirstArea={CurrentFirstArea[2]}
                                                CurrentSecondArea={CurrentSecondArea[2]}
                                                CurrentThirdArea={CurrentThirdArea[2]} key={3} />
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>

                            <Col span={12} >
                                <Card className={`OverCurrent_Card ${TxtTheme} ${BgTheme}`} size='small' bordered={false} >
                                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '10px', marginTop: '10px' }}>과전류

                                        <Link to="/OverCurrentTrendCurve">
                                            <Button type="link" className='OverCurrent_Button'>
                                                과전류 추이그래프
                                                <AiOutlineSwapRight style={{ fontSize: '20px', color: 'lightgrey' }} />
                                            </Button>
                                        </Link>
                                    </span>
                                    <Row
                                        gutter={{
                                            xs: 10,
                                            sm: 10,
                                            md: 20,
                                            lg: 10,
                                        }}
                                    >
                                        <Col span={8}>
                                            <OverCurrentR
                                                Name={Name[0]}
                                                OverCurrentValue={OverCurrentValue[0]}
                                                OverCurrentFirstArea={OverCurrentFirstArea[0]}
                                                OverCurrentSecondArea={OverCurrentSecondArea[0]}
                                                OverCurrentThirdArea={OverCurrentThirdArea[0]} key={1} />
                                        </Col>

                                        <Col span={8}>
                                            <OverCurrentR
                                                Name={Name[1]}
                                                OverCurrentValue={OverCurrentValue[1]}
                                                OverCurrentFirstArea={OverCurrentFirstArea[1]}
                                                OverCurrentSecondArea={OverCurrentSecondArea[1]}
                                                OverCurrentThirdArea={OverCurrentThirdArea[1]} key={2} />
                                        </Col>

                                        <Col span={8}>
                                            <OverCurrentR
                                                Name={Name[2]}
                                                OverCurrentValue={OverCurrentValue[2]}
                                                OverCurrentFirstArea={OverCurrentFirstArea[2]}
                                                OverCurrentSecondArea={OverCurrentSecondArea[2]}
                                                OverCurrentThirdArea={OverCurrentThirdArea[2]} key={3} />
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>

                        </Row>

                        <br />


                        <Row
                            gutter={{
                                xs: 10,
                                sm: 10,
                                md: 20,
                                lg: 10,
                            }}
                        >
                            <Col span={6}>
                                <Card className={`Temperature_Card ${TxtTheme} ${BgTheme}`} size='medium' bordered={false} >
                                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> 온도 </span>
                                    <Temperature />
                                </Card>
                            </Col>

                            <Col span={6} >
                                <Card className={`CurrentUnbalanceRatio_Card ${TxtTheme} ${BgTheme}`} size='medium' bordered={false} >
                                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> 전류 불평형률
                                        <Link to="/UnbalanceRatioCurve">
                                            <Button type="link" className='CurrentUnbalanceRatio_Button'>
                                                전류불평형률  추이그래프
                                                <AiOutlineSwapRight style={{ fontSize: '20px', color: 'lightgrey' }} />
                                            </Button>
                                        </Link>
                                    </span>
                                    <CurrentUnbalanceRatio />
                                </Card>
                            </Col>

                            <Col span={6}>
                                <Card className={`LeakageCurrent_Card ${TxtTheme} ${BgTheme}`} size='medium' bordered={false} >
                                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> 누설전류
                                        <Link to="/LeakageCurrentCurve">
                                            <Button type="link" className='LeakageCurrent_Button'>
                                                누설전류 추이그래프
                                                <AiOutlineSwapRight style={{ fontSize: '20px', color: 'lightgrey' }} />
                                            </Button>
                                        </Link>
                                    </span>
                                    <LeakageCurrent />
                                </Card>
                            </Col>



                            <Col span={6}>
                                <Card className={`AccumulatedOperatingTime_Card ${TxtTheme} ${BgTheme}`} size='medium' bordered={false} >
                                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> 누적가동시간 </span>
                                    <AccumulatedOperatingTime />
                                </Card>

                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row >
        </Content >
    );
};

export default MonitorFirst;
