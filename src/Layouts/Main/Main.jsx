// Main.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSwapRight } from "react-icons/ai";
import { Layout, Col, Row, Card, Button } from 'antd';
import RightBottomMainTabs from '../../Components/Tabs/MainTabs/Right-Bottom-MainTabs';
import CenterMainTabs from '../../Components/Tabs/MainTabs/Center-MainTabs';
import { ThemeContext } from '../../Components/ThemeContext';
import RightChart1 from '../../Components/Charts/RightChart1';
import RightChart2 from '../../Components/Charts/RightChart2';
import ThermometerComponent from '../../Components/Charts/Thermometer';
import PeekChart from '../../Components/Charts/PeekChart';
import RightChart3 from '../../Components/Charts/RightChart3';
import { useRightChart3Data } from '../../Components/db/RightChart3_db';
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";

import DiagPic from '../계통도.png';

//import diagramPicture from '../다이어그램.png';
const { Content } = Layout;

const AppMain = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const { data } = useRightChart3Data();

    const TxtTheme = isDarkMode ? 'text-light' : 'text-dark';
    const BgTheme = isDarkMode ? 'bg-light' : 'bg-dark';

    return (
        <Content className="app-Content">

            <Card className={` Main-Top-Info-Card ${BgTheme}`} bordered={false}>
                <Row className={`Main-Top-Info-Row ${BgTheme}`}
                    gutter={{
                        xs: 10,
                        sm: 10,
                        md: 20,
                        lg: 5,
                    }}
                >
                    <Col className="gutter-row" span={6}>
                        <div className='Main-Top-Info1'>
                            <Col className={`Main-Top-Info1-Col1 ${TxtTheme} ${BgTheme}`} span={12} >
                                <span className='Main-Top-Info1-span' >적산 전력량</span>
                                <p className='Main-Top-Info1-p'>All Wat Value</p>
                            </Col>
                            <Col span={12} className={` Main-Top-Info1-Col2 ${TxtTheme} ${BgTheme}`}>
                                <h1 className='Main-Top-Info1-h1'>2,635 Kwh</h1>
                            </Col>
                        </div>
                    </Col>

                    <Col className="gutter-row" span={6}>
                        <div className='Main-Top-Info2' style={{ display: 'flex' }}>
                            <Col className={` Main-Top-Info2-Col1 ${TxtTheme} ${BgTheme}`} span={12} >
                                <span className='Main-Top-Info2-span'>수전 용량</span>
                                <p className='Main-Top-Info2-p'>Recieve Energy</p>
                            </Col>
                            <Col className={` Main-Top-Info2-Col2 ${TxtTheme} ${BgTheme}`} span={12} >
                                <h1 className='Main-Top-Info2-h1'>1,000 Kw</h1>
                            </Col>
                        </div>
                    </Col>

                    <Col className="gutter-row" span={6}>
                        <div className='Main-Top-Info3' style={{ display: 'flex' }}>
                            <Col className={` Main-Top-Info3-Col1 ${TxtTheme} ${BgTheme}`} span={12} >
                                <span className='Main-Top-Info3-span'>계약 전력</span>
                                <p className='Main-Top-Info3-p'>Reservation Amount</p>
                            </Col>
                            <Col className={` Main-Top-Info3-Col2 ${TxtTheme} ${BgTheme}`} span={12} >
                                <h1 className='Main-Top-Info3-h1'>1,000 Kw</h1>
                            </Col>
                        </div>
                    </Col>

                    <Col className="gutter-row" span={6}>
                        <div className='Main-Top-Info4' style={{ display: 'flex' }}>
                            <Col className={` Main-Top-Info4-Col1 ${TxtTheme} ${BgTheme}`} span={12} >
                                <span className='Main-Top-Info4-span'>목표피크전력</span>
                                <p className='Main-Top-Info4-p'>Target Peek Amount</p>
                            </Col>
                            <Col className={` Main-Top-Info4-Col2 ${TxtTheme} ${BgTheme}`} span={12} >
                                <h1 className='Main-Top-Info4-h1'>80 Kw</h1>
                            </Col>
                        </div>
                    </Col>

                </Row>
            </Card>
            {/********************************************** 최상단 끝 **********************************************/}
            <Row className='Main-Center-Content-Row'
                gutter={{
                    xs: 10,
                    sm: 10,
                    md: 20,
                    lg: 10,
                }}
            >
                <Col className="gutter-row" span={9}>
                    <div className='Main-Center-Content1'>
                        <Card className={`Card1 ${TxtTheme} ${BgTheme}`} bordered={false}>
                            <span className='Card1-Title'>Peek Monitor</span>
                            <PeekChart style={{ display: 'flex', justifyContent: 'center' }} />

                        </Card>
                    </div>
                </Col>

                <Col className="gutter-row" span={9}>
                    <div className='Main-Center-Content2' >
                        <Card size='medium' className={`Card2 ${TxtTheme} ${BgTheme}`} bordered={false}>
                            <span className='Card2-Title'> Trend Analysis Monitor</span>
                            <CenterMainTabs />
                        </Card>
                    </div>
                </Col>

                <Col className="gutter-row" span={6}>
                    <div className="card-container">
                        <Card className={`Card3-top ${TxtTheme} ${BgTheme}`} bordered={false}>
                            <Row gutter={[16, 12]} justify="center" align="middle">
                                <Col span={14}>
                                    <div className="Card1-grid-text">
                                        <span className="Card1-grid-Title-text">당일 사용량</span>
                                        <p className="Card1-grid-SubTitle-text">전일 사용량 대비
                                            <span className="Card1-grid-Percent-text">
                                                <span className="Card1-grid-Percent-value">20.65%</span>{/*데이터 연결해야함*/}
                                                <span className="Card1-grid-Percent-Near-text">증가</span><BiUpArrowAlt size={30} color='red' />
                                            </span>
                                        </p>
                                    </div>
                                </Col>
                                <Col span={10}>
                                    <RightChart1 />
                                </Col>
                            </Row>
                        </Card>
                    </div>
                    <div className="card-container">
                        <Card className={`Card3-middle ${TxtTheme} ${BgTheme}`} bordered={false}>
                            <Row gutter={[16, 12]} justify="center" align="middle">
                                <Col span={12}>
                                    <div className="Card2-grid-text">
                                        <span className="Card2-grid-Title-text">당일 역률 평균</span>
                                        <p className="Card2-grid-SubTitle-text">전일 역률 대비
                                            <span className="Card2-grid-Percent-text">
                                                <span className="Card2-grid-Percent-value">12%</span>{/*데이터 연결해야함*/}
                                                <span className="Card2-grid-Percent-Near-text">감소</span><BiDownArrowAlt size={30} color='#667EFE' />

                                            </span>
                                        </p>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <RightChart2 />
                                </Col>
                            </Row>
                        </Card>
                    </div>
                    <div>
                        <Card className={`Card3-bottom ${TxtTheme} ${BgTheme}`} bordered={false}>
                            <Row gutter={[16, 12]} justify="center" align="middle">
                                <Col span={12} style={{ marginTop: '-10px' }}>
                                    <span>
                                        <span className='Card3-grid-L1-text'>L1</span>
                                        <p className="Card3-grid-L1-subtext">: {data.length > 0 ? data[0].r : '-'}</p>
                                    </span>
                                    <span>
                                        <span className='Card3-grid-L2-text'>L2</span>
                                        <p className="Card3-grid-L2-subtext">: {data.length > 0 ? data[0].s : '-'}</p>
                                    </span>
                                    <span>
                                        <span className='Card3-grid-L3-text'>L3</span>
                                        <p className="Card3-grid-L3-subtext">: {data.length > 0 ? data[0].t : '-'}</p>
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <RightChart3 data={data} />
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </Col>

            </Row>
            <Row className='Main-Bottom-Content-Row'
                gutter={{
                    xs: 10,
                    sm: 10,
                    md: 20,
                    lg: 10,
                }}
            >
                <Col className="gutter-row" span={5}>
                    <Card className={`Card4 Main-Bottom-Content1 ${TxtTheme} ${BgTheme}`} bordered={false}>
                        <span className='Card3-Title'>Electric Diagram</span>
                        <Row>
                            <Col span={8}>
                                <img src={DiagPic} width='120px' />
                            </Col>

                            <Col span={8}>
                                <img src={DiagPic} width='120px' />
                                <div style={{ position: 'absolute', top: '25%', left: '70%', transform: 'translate(-50%, -50%)' }}>
                                    <ThermometerComponent />
                                </div>
                            </Col>

                            <Col span={8}>
                                <img src={DiagPic} width='120px' />
                            </Col>

                        </Row>
                    </Card>
                </Col>

                <Col className="gutter-row" span={6}>
                    <Card size='medium' className={`  Card5  Main-Bottom-Content2  ${TxtTheme} ${BgTheme}`} bordered={false}>


                        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>상세정보
                            <Link to="/DiagramInfo">
                                <Button type="link" className='Diagram_Info_Button'>
                                    상세조회
                                    <AiOutlineSwapRight style={{ fontSize: '20px', color: 'lightgrey' }} />
                                </Button>
                            </Link>
                        </span>

                    
                        <Row style={{ display: 'flex', justifyContent: 'space-between' , marginTop:'15px' }} gutter={[22, 5]}>
                            <Col span={12} className='Diagram_Info_Col'>
                                <p>전압</p>
                                <span>V</span>
                            </Col>

                            <Col span={12} className='Diagram_Info_Col'>
                                <p>전류</p>
                                <span>A</span>
                            </Col>

                            <Col span={12} className='Diagram_Info_Col'>
                                <p>전력</p>
                                <span>W</span>
                            </Col>

                            <Col span={12} className='Diagram_Info_Col'>
                                <p>역률</p>
                                <span>W/VA</span>
                            </Col>

                            <Col span={12} className='Diagram_Info_Col'>
                                <p>외부온도</p>
                                <span>°C</span>
                            </Col>

                            <Col span={12} className='Diagram_Info_Col'>
                                <p>내부온도</p>
                                <span>°C</span>
                            </Col>
                        </Row>
                    </Card>

                </Col>


                <Col className="gutter-row" span={13}>
                    <Card size='medium' className={` Card5  Main-Bottom-Content2 ${TxtTheme} ${BgTheme}`} bordered={false}>
                        <RightBottomMainTabs />
                    </Card>

                </Col>

            </Row>
        </Content>
    );
};

export default AppMain;
