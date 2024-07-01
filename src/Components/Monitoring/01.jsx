import React, { useContext } from 'react';
import { Layout, Col, Row, Card } from 'antd';
import { ThemeContext } from '../../Components/ThemeContext';
import CurrentR from '../Charts/ManagementMonitoring/Current/CurrentR';
import CurrentS from '../Charts/ManagementMonitoring/Current/CurrentS';
import CurrentT from '../Charts/ManagementMonitoring/Current/CurrentT';
const { Content } = Layout;

const MonitorFirst = () => {
    const { isDarkMode } = useContext(ThemeContext);

    const TxtTheme = isDarkMode ? 'text-dark' : 'text-light';
    const BgTheme = isDarkMode ? 'bg-dark' : 'bg-light';

    return (
        <Content className="app-Content">
            <Row className='Main-Center-Content-Row'
                gutter={{
                    xs: 10,
                    sm: 10,
                    md: 20,
                    lg: 10,
                }}
            >
                <Col className="gutter-row" span={24}>
                    <div style={{ backgroundColor: 'white' }}>
                        <div className={`Main-Center-Content1 ${TxtTheme} ${BgTheme}`}>
                            <Card className={`Card1 ${TxtTheme} ${BgTheme}`} size='medium'>
                                <span>전류</span>

                                <Row className='Main-Center-Content-Row'
                                    gutter={{
                                        xs: 10,
                                        sm: 10,
                                        md: 20,
                                        lg: 10,
                                    }}
                                >
                                    <Col span={8}>  <CurrentR /> </Col>
                                    <Col span={8}><CurrentS /></Col>
                                    <Col span={8}><CurrentT /></Col>
                                </Row>

                            </Card>

                            <Card className={`Card1 ${TxtTheme} ${BgTheme}`} size='medium'>
                                <span>과전류</span>
                            </Card>
                        </div>
                        <div className='Main-Center-Content1'>
                            <Card className={`Card1 ${TxtTheme} ${BgTheme}`} size='medium'>
                                <span>전류불평형률 / 누설전류 / 온도 / 누적가동시간 </span>
                            </Card>

                        </div>
                    </div>
                </Col>
            </Row>
        </Content>
    );
};

export default MonitorFirst;

