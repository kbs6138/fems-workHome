import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Col, Row, Card, Button, Carousel } from 'antd';
import { ThemeContext } from '../ThemeContext';
import CurrentR from './Current/CurrentR';
import OverCurrentR from './OverCurrent/OverCurrentR';
import Temperature from './Other/Temperature';
import CurrentUnbalanceRatio from './Other/CurrentUnbalanceRatio';
import LeakageCurrent from './Other/LeakageCurrent';
import AccumulatedOperatingTime from './Other/AccumulatedOperatingTime';
import { useCurrentData } from '../db/Current_db';
import { AiOutlineSwapRight } from "react-icons/ai";
import { useMediaQuery } from 'react-responsive'; // 화면 크기 확인을 위한 패키지

const { Content } = Layout;

const MonitorFirst = () => {
    const { data } = useCurrentData();
    const [Name, setName] = useState([]);
    const [CurrentValue, setCurrentValue] = useState([]);
    const [OverCurrentValue, setOverCurrentValue] = useState([]);

    const [CurrentFirstArea, setCurrentFirstArea] = useState([]);
    const [CurrentSecondArea, setCurrentSecondArea] = useState([]);
    const [CurrentThirdArea, setCurrentThirdArea] = useState([]);

    const [OverCurrentFirstArea, setOverCurrentFirstArea] = useState([]);
    const [OverCurrentSecondArea, setOverCurrentSecondArea] = useState([]);
    const [OverCurrentThirdArea, setOverCurrentThirdArea] = useState([]);

    const [MovePointer, setMovePointer] = useState([]);
    const [NameColor, setNameColor] = useState(['#00c700', '#fc738a', '#7696ff']);

    const { isDarkMode } = useContext(ThemeContext);

    // 모바일 화면 확인
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const TxtTheme = isDarkMode ? 'text-dark' : 'text-light';
    const BgTheme = isDarkMode ? 'bg-dark' : 'bg-light';

    const handleChange = () => { };

    useEffect(() => {
        if (data && data.length > 0) {
            setMovePointer([210, 220, 185]);
            setName([data[0].name, data[1].name, data[2].name]);

            setCurrentValue([data[0].value, data[1].value, data[2].value]);
            setCurrentFirstArea([data[0].area1, data[1].area1, data[2].area1]);
            setCurrentSecondArea([data[0].area2, data[1].area2, data[2].area2]);
            setCurrentThirdArea([data[0].area3, data[1].area3, data[2].area3]);

            setOverCurrentValue([data[3].value, data[4].value, data[5].value]);
            setOverCurrentFirstArea([data[3].area1, data[4].area1, data[5].area1]);
            setOverCurrentSecondArea([data[3].area2, data[4].area2, data[5].area2]);
            setOverCurrentThirdArea([data[3].area3, data[4].area3, data[5].area3]);
        }
    }, [data]);

    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    return (
        <Content className="app-Content">
            {/* 모바일 화면에서 Carousel 표시 */}
            {isMobile ? (
                <div>
                    {/* Current Carousel */}
                    <Card size='small' className='Current_Carousel_Card' bordered={false}>
                        <Carousel>
                            <div>
                                <Card className={`Current_Carousel_Inner_Card ${TxtTheme} ${BgTheme}`} size='small' bordered={false}>
                                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '10px', marginTop: '10px' }}>전압</span>
                                    <Row className='Current_Carousel_Row' gutter={{ xs: 10, sm: 10, md: 20, lg: 10 }}>
                                        <Col  span={24}>
                                            <CurrentR
                                                CurrentVolt={CurrentValue[0]}
                                                Name={Name[0]}
                                                NameColor={NameColor[0]}
                                                MovePointer={MovePointer[0]}
                                                CurrentFirstArea={CurrentFirstArea[0]}
                                                CurrentSecondArea={CurrentSecondArea[0]}
                                                CurrentThirdArea={CurrentThirdArea[0]} key={0} />
                                        </Col>
                                    </Row>
                                </Card>
                            </div>
                            <div>
                                <Card className={`Current_Carousel_Inner_Card ${TxtTheme} ${BgTheme}`} size='small' bordered={false}>
                                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '10px', marginTop: '10px' }}>전압</span>
                                    <Row gutter={{ xs: 10, sm: 10, md: 20, lg: 10 }}>
                                        <Col span={24}>
                                            <CurrentR
                                                CurrentVolt={CurrentValue[1]}
                                                Name={Name[1]}
                                                NameColor={NameColor[1]}
                                                MovePointer={MovePointer[1]}
                                                CurrentFirstArea={CurrentFirstArea[1]}
                                                CurrentSecondArea={CurrentSecondArea[1]}
                                                CurrentThirdArea={CurrentThirdArea[1]} key={1} />
                                        </Col>
                                    </Row>
                                </Card>
                            </div>
                            <div>
                                <Card className={`Current_Carousel_Inner_Card ${TxtTheme} ${BgTheme}`} size='small' bordered={false}>
                                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '10px', marginTop: '10px' }}>전압</span>
                                    <Row gutter={{ xs: 10, sm: 10, md: 20, lg: 10 }}>
                                        <Col span={24}>
                                            <CurrentR
                                                CurrentVolt={CurrentValue[2]}
                                                Name={Name[2]}
                                                NameColor={NameColor[2]}
                                                MovePointer={MovePointer[2]}
                                                CurrentFirstArea={CurrentFirstArea[2]}
                                                CurrentSecondArea={CurrentSecondArea[2]}
                                                CurrentThirdArea={CurrentThirdArea[2]} key={2} />
                                        </Col>
                                    </Row>
                                </Card>
                            </div>
                        </Carousel>
                    </Card>

                    {/* OverCurrent Carousel */}
                    <Card size='small' className='OverCurrent_Carousel_Card' bordered={false} style={{ marginTop: '15px' }}>
                        <Carousel>
                            <div>
                                <Card className={`OverCurrent_Carousel_Inner_Card ${TxtTheme} ${BgTheme}`} size='small' bordered={false}>
                                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '10px', marginTop: '10px' }}>과전류
                                        <Link to="/OverCurrentTrendCurve">
                                            <Button type="link" className='OverCurrent_Button'>
                                                과전류 추이그래프
                                                <AiOutlineSwapRight style={{ fontSize: '20px', color: 'lightgrey' }} />
                                            </Button>
                                        </Link>
                                    </span>
                                    <Row gutter={{ xs: 10, sm: 10, md: 20, lg: 10 }}>
                                        <Col span={24}>
                                            <OverCurrentR
                                                Name={Name[0]}
                                                NameColor={NameColor[0]}
                                                OverCurrentValue={OverCurrentValue[0]}
                                                OverCurrentFirstArea={OverCurrentFirstArea[0]}
                                                OverCurrentSecondArea={OverCurrentSecondArea[0]}
                                                OverCurrentThirdArea={OverCurrentThirdArea[0]} key={0} />
                                        </Col>
                                    </Row>
                                </Card>
                            </div>
                            <div>
                                <Card className={`OverCurrent_Carousel_Inner_Card ${TxtTheme} ${BgTheme}`} size='small' bordered={false}>
                                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '10px', marginTop: '10px' }}>과전류
                                        <Link to="/OverCurrentTrendCurve">
                                            <Button type="link" className='OverCurrent_Button'>
                                                과전류 추이그래프
                                                <AiOutlineSwapRight style={{ fontSize: '20px', color: 'lightgrey' }} />
                                            </Button>
                                        </Link>
                                    </span>
                                    <Row gutter={{ xs: 10, sm: 10, md: 20, lg: 10 }}>
                                        <Col span={24}>
                                            <OverCurrentR
                                                Name={Name[1]}
                                                NameColor={NameColor[1]}
                                                OverCurrentValue={OverCurrentValue[1]}
                                                OverCurrentFirstArea={OverCurrentFirstArea[1]}
                                                OverCurrentSecondArea={OverCurrentSecondArea[1]}
                                                OverCurrentThirdArea={OverCurrentThirdArea[1]} key={1} />
                                        </Col>
                                    </Row>
                                </Card>
                            </div>
                            <div>
                                <Card className={`OverCurrent_Carousel_Inner_Card ${TxtTheme} ${BgTheme}`} size='small' bordered={false}>
                                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '10px', marginTop: '10px' }}>과전류
                                        <Link to="/OverCurrentTrendCurve">
                                            <Button type="link" className='OverCurrent_Button'>
                                                과전류 추이그래프
                                                <AiOutlineSwapRight style={{ fontSize: '20px', color: 'lightgrey' }} />
                                            </Button>
                                        </Link>
                                    </span>
                                    <Row gutter={{ xs: 10, sm: 10, md: 20, lg: 10 }}>
                                        <Col span={24}>
                                            <OverCurrentR
                                                Name={Name[2]}
                                                NameColor={NameColor[2]}
                                                OverCurrentValue={OverCurrentValue[2]}
                                                OverCurrentFirstArea={OverCurrentFirstArea[2]}
                                                OverCurrentSecondArea={OverCurrentSecondArea[2]}
                                                OverCurrentThirdArea={OverCurrentThirdArea[2]} key={2} />
                                        </Col>
                                    </Row>
                                </Card>
                            </div>
                        </Carousel>
                    </Card>
                </div>
            ) : (
                <Row gutter={{ xs: 10, sm: 10, md: 20, lg: 10 }}>
                    <Col span={12}>
                        <Card className={`Current_Card ${TxtTheme} ${BgTheme}`} size='small' bordered={false}>
                            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '10px', marginTop: '10px' }}>전압</span>
                            <Row gutter={{ xs: 10, sm: 10, md: 20, lg: 10 }}>
                                <Col span={8}>
                                    <CurrentR
                                        CurrentVolt={CurrentValue[0]}
                                        Name={Name[0]}
                                        NameColor={NameColor[0]}
                                        MovePointer={MovePointer[0]}
                                        CurrentFirstArea={CurrentFirstArea[0]}
                                        CurrentSecondArea={CurrentSecondArea[0]}
                                        CurrentThirdArea={CurrentThirdArea[0]} key={0} />
                                </Col>
                                <Col span={8}>
                                    <CurrentR
                                        CurrentVolt={CurrentValue[1]}
                                        Name={Name[1]}
                                        NameColor={NameColor[1]}
                                        MovePointer={MovePointer[1]}
                                        CurrentFirstArea={CurrentFirstArea[1]}
                                        CurrentSecondArea={CurrentSecondArea[1]}
                                        CurrentThirdArea={CurrentThirdArea[1]} key={1} />
                                </Col>
                                <Col span={8}>
                                    <CurrentR
                                        CurrentVolt={CurrentValue[2]}
                                        Name={Name[2]}
                                        NameColor={NameColor[2]}
                                        MovePointer={MovePointer[2]}
                                        CurrentFirstArea={CurrentFirstArea[2]}
                                        CurrentSecondArea={CurrentSecondArea[2]}
                                        CurrentThirdArea={CurrentThirdArea[2]} key={2} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card className={`OverCurrent_Card ${TxtTheme} ${BgTheme}`} size='small' bordered={false}>
                            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '10px', marginTop: '10px' }}>과전류
                                <Link to="/OverCurrentTrendCurve">
                                    <Button type="link" className='OverCurrent_Button'>
                                        과전류 추이그래프
                                        <AiOutlineSwapRight style={{ fontSize: '20px', color: 'lightgrey' }} />
                                    </Button>
                                </Link>
                            </span>
                            <Row gutter={{ xs: 10, sm: 10, md: 20, lg: 10 }}>
                                <Col span={8}>
                                    <OverCurrentR
                                        Name={Name[0]}
                                        NameColor={NameColor[0]}
                                        OverCurrentValue={OverCurrentValue[0]}
                                        OverCurrentFirstArea={OverCurrentFirstArea[0]}
                                        OverCurrentSecondArea={OverCurrentSecondArea[0]}
                                        OverCurrentThirdArea={OverCurrentThirdArea[0]} key={0} />
                                </Col>
                                <Col span={8}>
                                    <OverCurrentR
                                        Name={Name[1]}
                                        NameColor={NameColor[1]}
                                        OverCurrentValue={OverCurrentValue[1]}
                                        OverCurrentFirstArea={OverCurrentFirstArea[1]}
                                        OverCurrentSecondArea={OverCurrentSecondArea[1]}
                                        OverCurrentThirdArea={OverCurrentThirdArea[1]} key={1} />
                                </Col>
                                <Col span={8}>
                                    <OverCurrentR
                                        Name={Name[2]}
                                        NameColor={NameColor[2]}
                                        OverCurrentValue={OverCurrentValue[2]}
                                        OverCurrentFirstArea={OverCurrentFirstArea[2]}
                                        OverCurrentSecondArea={OverCurrentSecondArea[2]}
                                        OverCurrentThirdArea={OverCurrentThirdArea[2]} key={2} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            )}

            <br />
            <Row gutter={{ xs: 10, sm: 10, md: 20, lg: 10 }}>
                <Col className="gutter-row" xs={24} sm={24} md={6} lg={6}>
                    <Card className={`Temperature_Card ${TxtTheme} ${BgTheme}`} size='medium' bordered={false}>
                        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '10px', marginTop: '10px' }}>온도</span>
                        <Temperature key={1} />
                    </Card>
                </Col>
                <Col className="gutter-row" xs={24} sm={24} md={6} lg={6}>
                    <Card className={`CurrentUnbalanceRatio_Card ${TxtTheme} ${BgTheme}`} size='medium' bordered={false}>
                        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '10px', marginTop: '10px' }}>전류불평형률</span>
                        <CurrentUnbalanceRatio key={2} />
                    </Card>
                </Col>
                <Col className="gutter-row" xs={24} sm={24} md={6} lg={6}>
                    <Card className={`LeakageCurrent_Card ${TxtTheme} ${BgTheme}`} size='medium' bordered={false}>
                        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '10px', marginTop: '10px' }}>누설전류</span>
                        <LeakageCurrent key={3} />
                    </Card>
                </Col>
                <Col className="gutter-row" xs={24} sm={24} md={6} lg={6}>
                    <Card className={`AccumulatedOperatingTime_Card ${TxtTheme} ${BgTheme}`} size='medium' bordered={false}>
                        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '10px', marginTop: '10px' }}>누적가동시간</span>
                        <AccumulatedOperatingTime key={4} />
                    </Card>
                </Col>
            </Row>
        </Content>
    );
};

export default MonitorFirst;
