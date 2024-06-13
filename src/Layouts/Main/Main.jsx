import React from 'react';
import { Layout, Col, Row, Card } from 'antd';
import RightBottomMainTabs from '../../Components/Tabs/MainTabs/Right-Bottom-MainTabs';

const { Content } = Layout;



const AppMain = () => {

    return (
        <Content
            className="app-Content">
            <div className="app-Content-div">

                <Row className='Main-Top-Info-Row'
                    gutter={{
                        xs: 10,
                        sm: 10,
                        md: 20,
                        lg: 5,
                    }}
                >
                    <Col className="gutter-row" span={6}>

                        <div className='Main-Top-Info1' style={{ display: 'flex' }}>
                            <Col className='Main-Top-Info1-Col1' span={12}>
                                <span className='Main-Top-Info1-span'>적산 전력량</span>
                                <p className='Main-Top-Info1-p'>All Wat Value</p>
                            </Col>
                            <Col className='Main-Top-Info1-Col2' span={12}>
                                <h1 className='Main-Top-Info1-h1'>2,635 Kwh</h1>
                            </Col>
                        </div>
                    </Col>



                    <Col className="gutter-row" span={6}>

                        <div className='Main-Top-Info2' style={{ display: 'flex' }}>
                            <Col className='Main-Top-Info2-Col1' span={12}>
                                <span className='Main-Top-Info2-span'>수전 용량</span>
                                <p className='Main-Top-Info2-p'>Recieve Energy</p>
                            </Col>
                            <Col className='Main-Top-Info2-Col2' span={12}>
                                <h1 className='Main-Top-Info2-h1'>1,000 Kw</h1>
                            </Col>
                        </div>

                    </Col>

                    <Col className="gutter-row" span={6}>
                        <div className='Main-Top-Info3' style={{ display: 'flex' }}>
                            <Col className='Main-Top-Info3-Col1' span={12}>
                                <span className='Main-Top-Info3-span'>계약 전력</span>
                                <p className='Main-Top-Info3-p'>Reservation Amount</p>
                            </Col>
                            <Col className='Main-Top-Info3-Col2' span={12}>
                                <h1 className='Main-Top-Info3-h1'>1,000 Kw</h1>
                            </Col>
                        </div>
                    </Col>

                    <Col className="gutter-row" span={6}>

                        <div className='Main-Top-Info4' style={{ display: 'flex' }}>
                            <Col className='Main-Top-Info4-Col1' span={12}>
                                <span className='Main-Top-Info4-span'>목표피크전력</span>
                                <p className='Main-Top-Info4-p'>Target Peek Amount</p>
                            </Col>
                            <Col className='Main-Top-Info4-Col2' span={12}>
                                <h1 className='Main-Top-Info4-h1'>80 Kw</h1>
                            </Col>
                        </div>

                    </Col>
                </Row>

                {/********************************************** 최상단 끝 **********************************************/}


                <Row className='Main-Center-Content-Row'
                    gutter={{
                        xs: 10,
                        sm: 10,
                        md: 20,
                        lg: 10,
                    }}
                >
                    <Col className="gutter-row" span={8}>
                        <div className='Main-Center-Content1'>
                            <Card className='Card1' title="Peek Monitor">
                            </Card>
                        </div>
                    </Col>

                    <Col className="gutter-row" span={8}>
                        <div className='Main-Center-Content2'>
                            <Card className='Card2' title="Trend Analysis Monitor">
                            </Card>
                        </div>
                    </Col>

                    <Col className="gutter-row" span={8}>
                        <div className='Main-Center-Content3'>
                            <Card className='Card3'>
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
                    <Col className="gutter-row" span={12}>
                        <div className='Main-Bottom-Content1' >
                        <Card className='Card4' title="Electric Diagram">
                                
                            </Card>
                        </div>
                    </Col>

                    <Col className="gutter-row" span={12}>
                        <div className='Main-Bottom-Content2'>
                            <Card className='Card5'>
                                <RightBottomMainTabs />
                            </Card>
                        </div>
                    </Col>
                </Row>




            </div>
        </Content>
    );
};

export default AppMain;
