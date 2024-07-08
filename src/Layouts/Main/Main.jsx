// Main.jsx
import React, { useContext } from 'react';
import { Layout, Col, Row, Card } from 'antd';
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

            <Card className={`${BgTheme}`}>
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
                        <Card className={`Card1 ${TxtTheme} ${BgTheme}`}>
                            <span className='Card1-Title'>Peek Monitor</span>
                            <PeekChart style={{ display: 'flex', justifyContent: 'center' }} />

                        </Card>
                    </div>
                </Col>

                <Col className="gutter-row" span={9}>
                    <div className='Main-Center-Content2' >
                        <Card size='medium' className={`Card2 ${TxtTheme} ${BgTheme}`}>
                            <span className='Card2-Title'> Trend Analysis Monitor</span>
                            <CenterMainTabs />
                        </Card>
                    </div>
                </Col>

                <Col className="gutter-row" span={6}>
                    <div className="card-container">
                        <Card className={`Card3-top ${TxtTheme} ${BgTheme}`}>
                            <Row gutter={[16, 12]} justify="center" align="middle">
                                <Col span={14}>
                                    <div className="Card1-grid-text">
                                        <span className="Card1-grid-Title-text">당일 사용량</span>
                                        <p className="Card1-grid-SubTitle-text">전일 사용량 대비
                                            <span className="Card1-grid-Percent-text">
                                                <span className="Card1-grid-Percent-value">20.65%</span>
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
                        <Card className={`Card3-middle ${TxtTheme} ${BgTheme}`}>
                            <Row gutter={[16, 12]} justify="center" align="middle">
                                <Col span={12}>
                                    <div className="Card2-grid-text">
                                        <span className="Card2-grid-Title-text">당일 역률 평균</span>
                                        <p className="Card2-grid-SubTitle-text">전일 역률 대비
                                            <span className="Card2-grid-Percent-text">
                                                <span className="Card2-grid-Percent-value">12%</span>
                                                <span className="Card2-grid-Percent-Near-text">감소</span><BiDownArrowAlt size={30} color='#7696ff' />

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
                        <Card className={`Card3-bottom ${TxtTheme} ${BgTheme}`}>
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
                <Col className="gutter-row" span={8}>
                    <Card className={`Card4 Main-Bottom-Content1 ${TxtTheme} ${BgTheme}`}>
                        <span className='Card3-Title'>Electric Diagram</span>
                        <Row>
                            <Col span={8}>
                                <img src={DiagPic} width='130px' />
                            </Col>

                            <Col span={8}>
                                <img src={DiagPic} width='130px' />
                                <div style={{ position: 'absolute', top: '25%', left: '70%', transform: 'translate(-50%, -50%)' }}>
                                    <ThermometerComponent />
                                </div>
                            </Col>
                            
                            <Col span={8}>
                                <img src={DiagPic} width='130px' />
                            </Col>
                            {/*
                            <Col span={8}>
                                <div style={{ marginTop: '30px', marginLeft: '10px' }}>
                                    <div style={{ position: 'absolute', top: '10%', left: '60%', transform: 'translate(-50%, -50%)' }}>
                                        <ThermometerComponent />
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="120px" height="200px" viewBox="0 0 355.000000 553.000000" preserveAspectRatio="none">
                                        <g transform="translate(0.000000,553.000000) scale(0.100000,-0.100000)" fill="#FFFFFF" stroke="none">
                                            <path d="M420 5286 l0 -203 -50 -6 c-120 -14 -252 -115 -308 -234 -23 -51 -27 -70 -27 -163 0 -93 3 -111 27 -162 l27 -58 -27 -57 c-24 -51 -27 -70 -27 -158 0 -93 2 -105 33 -168 57 -115 176 -210 281 -224 l41 -6 0 -179 c0 -150 2 -180 15 -184 8 -4 15 -15 15 -26 0 -11 15 -35 34 -54 29 -29 41 -34 82 -34 42 0 51 4 86 41 l39 41 44 -47 c70 -75 89 -136 89 -285 0 -152 -19 -213 -92 -287 l-46 -48 -8 31 c-12 47 -50 76 -107 82 -47 4 -53 2 -86 -31 -27 -27 -35 -43 -35 -71 0 -22 -5 -36 -13 -36 -17 0 -11 -2389 6 -2406 9 -9 139 -14 434 -19 l423 -7 35 35 c29 29 35 42 35 76 0 51 -20 92 -57 119 l-28 21 60 58 c84 82 134 98 295 98 122 0 127 -1 192 -33 58 -28 138 -99 138 -122 0 -3 -15 -10 -32 -15 -45 -14 -78 -66 -78 -122 0 -38 6 -51 34 -79 l34 -34 196 0 197 0 -2 -129 c0 -71 2 -134 6 -140 10 -16 1187 -15 1203 1 15 15 17 569 3 583 -6 6 -241 9 -610 7 l-601 -2 0 -140 0 -140 -130 0 c-126 0 -130 1 -120 19 27 51 -3 151 -50 166 -11 4 -20 12 -19 18 3 27 -3 40 -43 84 -165 179 -586 152 -682 -44 -12 -23 -30 -44 -42 -47 -12 -3 -36 -22 -53 -41 -33 -38 -42 -96 -21 -136 11 -19 5 -19 -342 -17 l-353 3 0 320 0 320 424 1 424 1 29 32 c21 24 28 41 28 74 0 46 -27 99 -60 117 -20 11 -20 12 -3 41 23 39 79 84 137 109 102 46 293 43 392 -5 47 -23 134 -103 134 -123 0 -4 -15 -12 -32 -17 -44 -13 -78 -66 -78 -121 0 -34 6 -51 29 -76 l29 -33 199 0 198 0 2 -127 c1 -70 4 -132 8 -138 10 -15 1187 -14 1203 2 15 15 17 559 3 573 -6 6 -241 9 -610 7 l-600 -2 -3 -138 -3 -137 -129 -3 c-120 -2 -128 -1 -121 15 29 64 9 138 -45 169 -16 10 -25 21 -20 24 16 10 -45 94 -89 124 -65 45 -138 68 -241 73 -113 7 -186 -7 -269 -48 -68 -34 -145 -113 -138 -141 4 -13 -1 -18 -15 -18 -11 0 -38 -18 -60 -40 -37 -36 -40 -43 -36 -82 3 -24 8 -51 12 -61 8 -16 -11 -17 -345 -15 l-354 3 0 320 0 320 422 1 c335 1 426 4 438 14 27 23 45 67 45 111 0 36 -6 48 -41 81 l-41 39 27 35 c70 91 166 129 325 128 150 -1 258 -46 309 -128 26 -42 26 -46 0 -46 -12 0 -36 -15 -55 -34 -28 -28 -34 -42 -34 -75 0 -23 7 -55 15 -71 29 -56 37 -57 251 -52 l195 5 -2 -131 c0 -72 2 -135 6 -141 10 -16 1187 -15 1203 1 15 15 17 569 3 583 -6 6 -241 9 -610 7 l-601 -2 0 -140 0 -140 -130 0 c-126 0 -130 1 -120 19 30 58 -1 139 -64 167 -17 7 -24 13 -14 14 48 1 -44 113 -125 153 -80 39 -145 50 -266 45 -129 -6 -198 -29 -268 -92 -61 -55 -83 -93 -63 -106 12 -8 10 -10 -8 -10 -31 0 -77 -25 -96 -52 -18 -25 -21 -90 -6 -118 9 -17 -4 -18 -263 -25 -149 -4 -308 -5 -352 -3 l-80 3 0 330 0 330 424 1 424 1 29 32 c47 52 34 143 -27 187 l-25 19 24 36 c31 45 105 95 170 114 75 23 229 20 311 -6 53 -16 78 -31 121 -73 30 -29 54 -57 54 -62 0 -5 -15 -14 -32 -19 -44 -13 -78 -66 -78 -121 0 -34 6 -51 29 -76 l29 -33 199 0 198 0 2 -132 c1 -73 4 -137 8 -143 10 -15 1187 -14 1203 2 15 15 17 569 3 584 -6 5 -241 8 -610 6 l-600 -2 -3 -138 -3 -137 -129 -3 c-120 -2 -128 -1 -121 15 29 66 11 131 -44 169 -20 13 -30 24 -23 24 16 0 1 30 -36 75 -118 144 -441 168 -611 45 -46 -33 -96 -103 -86 -119 3 -6 -1 -11 -10 -11 -28 0 -73 -32 -91 -65 -16 -31 -16 -79 1 -117 7 -17 -14 -18 -349 -18 l-356 0 0 156 0 156 31 -26 c43 -37 106 -36 151 2 18 15 52 40 76 55 94 61 146 181 146 342 1 164 -49 287 -144 353 -21 15 -43 39 -49 54 -23 65 -125 88 -180 42 l-31 -26 0 149 0 149 60 12 c131 24 240 101 298 210 59 111 64 227 17 345 l-23 58 26 57 c24 50 27 70 27 157 0 92 -3 106 -32 167 -17 37 -50 87 -73 112 -50 54 -161 113 -231 122 l-49 7 0 203 c0 175 -2 204 -15 204 -13 0 -15 -29 -15 -204z m156 -267 c69 -26 156 -105 188 -172 52 -105 55 -226 9 -323 l-16 -33 -46 45 c-25 25 -74 59 -110 77 -61 30 -73 32 -166 32 -92 0 -106 -3 -167 -32 -37 -17 -87 -50 -111 -72 -24 -23 -47 -41 -50 -41 -8 0 -34 86 -42 136 -3 23 -1 70 5 105 43 236 276 364 506 278z m-86 -410 c35 -5 91 -24 123 -41 56 -30 117 -87 117 -110 0 -18 -78 -87 -128 -112 -146 -74 -319 -46 -432 69 l-44 45 44 45 c52 53 127 93 197 105 26 4 50 8 53 9 3 0 34 -4 70 -10z m-333 -230 c24 -22 74 -55 111 -72 61 -29 75 -32 167 -32 93 0 105 2 166 32 35 18 84 50 108 72 24 22 48 38 52 35 20 -12 41 -118 37 -188 -7 -137 -88 -255 -213 -313 -52 -24 -72 -28 -155 -28 -82 0 -103 4 -150 26 -30 15 -73 42 -96 62 -83 72 -133 217 -114 330 9 57 29 117 37 117 3 0 26 -18 50 -41z m435 -847 c64 -65 -17 -161 -100 -118 -51 27 -51 109 1 134 28 14 77 6 99 -16z m6 -698 c27 -31 28 -44 2 -77 -55 -69 -164 -23 -143 60 13 55 99 65 141 17z m2787 -163 c-12 -11 -1045 -501 -1057 -501 -10 0 -11 494 -1 503 3 4 245 7 537 7 308 0 526 -4 521 -9z m-2112 -91 c47 -37 43 -114 -8 -145 -31 -19 -81 -1 -100 36 -21 39 -5 93 33 114 36 19 45 19 75 -5z m719 -7 c43 -39 29 -113 -26 -140 -32 -15 -36 -15 -61 1 -52 34 -56 108 -7 146 29 23 64 20 94 -7z m1393 -592 c-12 -11 -1045 -501 -1057 -501 -9 0 -11 493 -1 503 3 4 245 7 537 7 308 0 526 -4 521 -9z m-2122 -90 c30 -12 51 -60 42 -100 -7 -32 -54 -78 -64 -62 -3 5 -19 11 -36 13 -23 2 -32 10 -43 40 -12 30 -12 41 0 64 7 16 24 34 38 41 30 15 32 15 63 4z m711 -2 c61 -28 57 -119 -7 -153 -37 -20 -37 -20 -65 1 -66 50 -43 158 35 162 7 1 23 -4 37 -10z m1411 -598 c-12 -10 -1022 -481 -1047 -488 -17 -5 -18 11 -18 239 0 135 3 248 7 251 3 4 245 7 537 7 295 0 526 -4 521 -9z m-2112 -91 c47 -37 43 -114 -8 -145 -31 -19 -81 -1 -100 36 -21 39 -5 93 33 114 36 19 45 19 75 -5z m719 -7 c43 -39 29 -113 -26 -140 -32 -15 -36 -15 -61 1 -52 34 -56 108 -7 146 29 23 64 20 94 -7z m1393 -582 c-12 -11 -1046 -501 -1057 -501 -10 0 -11 494 -1 503 3 4 245 7 537 7 312 0 526 -4 521 -9z m-2112 -91 c34 -27 44 -78 23 -119 -16 -31 -27 -35 -76 -31 -51 4 -78 52 -59 107 10 30 47 62 75 63 6 0 23 -9 37 -20z m719 -7 c43 -39 29 -124 -24 -142 -43 -15 -76 -4 -94 31 -21 41 -11 91 23 118 30 23 65 20 95 -7z" />
                                        </g>
                                    </svg>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div style={{ marginTop: '30px', marginLeft: '100px' }}>
                                    <div style={{ position: 'absolute', top: '10%', left: '120%', transform: 'translate(-50%, -50%)' }}>
                                        <ThermometerComponent />
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="120px" height="200px" viewBox="0 0 355.000000 553.000000" preserveAspectRatio="none">
                                        <g transform="translate(0.000000,553.000000) scale(0.100000,-0.100000)" fill="#FFFFFF" stroke="none">
                                            <path d="M420 5286 l0 -203 -50 -6 c-120 -14 -252 -115 -308 -234 -23 -51 -27 -70 -27 -163 0 -93 3 -111 27 -162 l27 -58 -27 -57 c-24 -51 -27 -70 -27 -158 0 -93 2 -105 33 -168 57 -115 176 -210 281 -224 l41 -6 0 -179 c0 -150 2 -180 15 -184 8 -4 15 -15 15 -26 0 -11 15 -35 34 -54 29 -29 41 -34 82 -34 42 0 51 4 86 41 l39 41 44 -47 c70 -75 89 -136 89 -285 0 -152 -19 -213 -92 -287 l-46 -48 -8 31 c-12 47 -50 76 -107 82 -47 4 -53 2 -86 -31 -27 -27 -35 -43 -35 -71 0 -22 -5 -36 -13 -36 -17 0 -11 -2389 6 -2406 9 -9 139 -14 434 -19 l423 -7 35 35 c29 29 35 42 35 76 0 51 -20 92 -57 119 l-28 21 60 58 c84 82 134 98 295 98 122 0 127 -1 192 -33 58 -28 138 -99 138 -122 0 -3 -15 -10 -32 -15 -45 -14 -78 -66 -78 -122 0 -38 6 -51 34 -79 l34 -34 196 0 197 0 -2 -129 c0 -71 2 -134 6 -140 10 -16 1187 -15 1203 1 15 15 17 569 3 583 -6 6 -241 9 -610 7 l-601 -2 0 -140 0 -140 -130 0 c-126 0 -130 1 -120 19 27 51 -3 151 -50 166 -11 4 -20 12 -19 18 3 27 -3 40 -43 84 -165 179 -586 152 -682 -44 -12 -23 -30 -44 -42 -47 -12 -3 -36 -22 -53 -41 -33 -38 -42 -96 -21 -136 11 -19 5 -19 -342 -17 l-353 3 0 320 0 320 424 1 424 1 29 32 c21 24 28 41 28 74 0 46 -27 99 -60 117 -20 11 -20 12 -3 41 23 39 79 84 137 109 102 46 293 43 392 -5 47 -23 134 -103 134 -123 0 -4 -15 -12 -32 -17 -44 -13 -78 -66 -78 -121 0 -34 6 -51 29 -76 l29 -33 199 0 198 0 2 -127 c1 -70 4 -132 8 -138 10 -15 1187 -14 1203 2 15 15 17 559 3 573 -6 6 -241 9 -610 7 l-600 -2 -3 -138 -3 -137 -129 -3 c-120 -2 -128 -1 -121 15 29 64 9 138 -45 169 -16 10 -25 21 -20 24 16 10 -45 94 -89 124 -65 45 -138 68 -241 73 -113 7 -186 -7 -269 -48 -68 -34 -145 -113 -138 -141 4 -13 -1 -18 -15 -18 -11 0 -38 -18 -60 -40 -37 -36 -40 -43 -36 -82 3 -24 8 -51 12 -61 8 -16 -11 -17 -345 -15 l-354 3 0 320 0 320 422 1 c335 1 426 4 438 14 27 23 45 67 45 111 0 36 -6 48 -41 81 l-41 39 27 35 c70 91 166 129 325 128 150 -1 258 -46 309 -128 26 -42 26 -46 0 -46 -12 0 -36 -15 -55 -34 -28 -28 -34 -42 -34 -75 0 -23 7 -55 15 -71 29 -56 37 -57 251 -52 l195 5 -2 -131 c0 -72 2 -135 6 -141 10 -16 1187 -15 1203 1 15 15 17 569 3 583 -6 6 -241 9 -610 7 l-601 -2 0 -140 0 -140 -130 0 c-126 0 -130 1 -120 19 30 58 -1 139 -64 167 -17 7 -24 13 -14 14 48 1 -44 113 -125 153 -80 39 -145 50 -266 45 -129 -6 -198 -29 -268 -92 -61 -55 -83 -93 -63 -106 12 -8 10 -10 -8 -10 -31 0 -77 -25 -96 -52 -18 -25 -21 -90 -6 -118 9 -17 -4 -18 -263 -25 -149 -4 -308 -5 -352 -3 l-80 3 0 330 0 330 424 1 424 1 29 32 c47 52 34 143 -27 187 l-25 19 24 36 c31 45 105 95 170 114 75 23 229 20 311 -6 53 -16 78 -31 121 -73 30 -29 54 -57 54 -62 0 -5 -15 -14 -32 -19 -44 -13 -78 -66 -78 -121 0 -34 6 -51 29 -76 l29 -33 199 0 198 0 2 -132 c1 -73 4 -137 8 -143 10 -15 1187 -14 1203 2 15 15 17 569 3 584 -6 5 -241 8 -610 6 l-600 -2 -3 -138 -3 -137 -129 -3 c-120 -2 -128 -1 -121 15 29 66 11 131 -44 169 -20 13 -30 24 -23 24 16 0 1 30 -36 75 -118 144 -441 168 -611 45 -46 -33 -96 -103 -86 -119 3 -6 -1 -11 -10 -11 -28 0 -73 -32 -91 -65 -16 -31 -16 -79 1 -117 7 -17 -14 -18 -349 -18 l-356 0 0 156 0 156 31 -26 c43 -37 106 -36 151 2 18 15 52 40 76 55 94 61 146 181 146 342 1 164 -49 287 -144 353 -21 15 -43 39 -49 54 -23 65 -125 88 -180 42 l-31 -26 0 149 0 149 60 12 c131 24 240 101 298 210 59 111 64 227 17 345 l-23 58 26 57 c24 50 27 70 27 157 0 92 -3 106 -32 167 -17 37 -50 87 -73 112 -50 54 -161 113 -231 122 l-49 7 0 203 c0 175 -2 204 -15 204 -13 0 -15 -29 -15 -204z m156 -267 c69 -26 156 -105 188 -172 52 -105 55 -226 9 -323 l-16 -33 -46 45 c-25 25 -74 59 -110 77 -61 30 -73 32 -166 32 -92 0 -106 -3 -167 -32 -37 -17 -87 -50 -111 -72 -24 -23 -47 -41 -50 -41 -8 0 -34 86 -42 136 -3 23 -1 70 5 105 43 236 276 364 506 278z m-86 -410 c35 -5 91 -24 123 -41 56 -30 117 -87 117 -110 0 -18 -78 -87 -128 -112 -146 -74 -319 -46 -432 69 l-44 45 44 45 c52 53 127 93 197 105 26 4 50 8 53 9 3 0 34 -4 70 -10z m-333 -230 c24 -22 74 -55 111 -72 61 -29 75 -32 167 -32 93 0 105 2 166 32 35 18 84 50 108 72 24 22 48 38 52 35 20 -12 41 -118 37 -188 -7 -137 -88 -255 -213 -313 -52 -24 -72 -28 -155 -28 -82 0 -103 4 -150 26 -30 15 -73 42 -96 62 -83 72 -133 217 -114 330 9 57 29 117 37 117 3 0 26 -18 50 -41z m435 -847 c64 -65 -17 -161 -100 -118 -51 27 -51 109 1 134 28 14 77 6 99 -16z m6 -698 c27 -31 28 -44 2 -77 -55 -69 -164 -23 -143 60 13 55 99 65 141 17z m2787 -163 c-12 -11 -1045 -501 -1057 -501 -10 0 -11 494 -1 503 3 4 245 7 537 7 308 0 526 -4 521 -9z m-2112 -91 c47 -37 43 -114 -8 -145 -31 -19 -81 -1 -100 36 -21 39 -5 93 33 114 36 19 45 19 75 -5z m719 -7 c43 -39 29 -113 -26 -140 -32 -15 -36 -15 -61 1 -52 34 -56 108 -7 146 29 23 64 20 94 -7z m1393 -592 c-12 -11 -1045 -501 -1057 -501 -9 0 -11 493 -1 503 3 4 245 7 537 7 308 0 526 -4 521 -9z m-2122 -90 c30 -12 51 -60 42 -100 -7 -32 -54 -78 -64 -62 -3 5 -19 11 -36 13 -23 2 -32 10 -43 40 -12 30 -12 41 0 64 7 16 24 34 38 41 30 15 32 15 63 4z m711 -2 c61 -28 57 -119 -7 -153 -37 -20 -37 -20 -65 1 -66 50 -43 158 35 162 7 1 23 -4 37 -10z m1411 -598 c-12 -10 -1022 -481 -1047 -488 -17 -5 -18 11 -18 239 0 135 3 248 7 251 3 4 245 7 537 7 295 0 526 -4 521 -9z m-2112 -91 c47 -37 43 -114 -8 -145 -31 -19 -81 -1 -100 36 -21 39 -5 93 33 114 36 19 45 19 75 -5z m719 -7 c43 -39 29 -113 -26 -140 -32 -15 -36 -15 -61 1 -52 34 -56 108 -7 146 29 23 64 20 94 -7z m1393 -582 c-12 -11 -1046 -501 -1057 -501 -10 0 -11 494 -1 503 3 4 245 7 537 7 312 0 526 -4 521 -9z m-2112 -91 c34 -27 44 -78 23 -119 -16 -31 -27 -35 -76 -31 -51 4 -78 52 -59 107 10 30 47 62 75 63 6 0 23 -9 37 -20z m719 -7 c43 -39 29 -124 -24 -142 -43 -15 -76 -4 -94 31 -21 41 -11 91 23 118 30 23 65 20 95 -7z" />
                                        </g>
                                    </svg>
                                </div>
                            </Col>
                            */}

                        </Row>
                    </Card>
                </Col>



                <Col className="gutter-row" span={16}>
                    <Card size='medium' className={` Card5  Main-Bottom-Content2 ${TxtTheme} ${BgTheme}`}>
                        <RightBottomMainTabs />
                    </Card>

                </Col>

            </Row>
        </Content>
    );
};

export default AppMain;
