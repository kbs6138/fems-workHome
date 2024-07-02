import React, { useContext } from 'react';
import { Layout, Col, Row, Card, Select } from 'antd';
import { ThemeContext } from '../../ThemeContext';
import CurrentR from './Current/CurrentR';
import CurrentS from './Current/CurrentS';
import CurrentT from './Current/CurrentT';
import OverCurrentR from './OverCurrent/OverCurrentR';
import OverCurrentS from './OverCurrent/OverCurrentS';
import OverCurrentT from './OverCurrent/OverCurrentT';

const { Content } = Layout;
const { Option } = Select;

const MonitorFirst = () => {
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

                            <Card className={`Card1 ${TxtTheme} ${BgTheme}`} size='medium'>
                                <span>전류</span>


                                <Row
                                    gutter={{
                                        xs: 10,
                                        sm: 10,
                                        md: 20,
                                        lg: 10,
                                    }}
                                >
                                    <Col span={8}> <CurrentR /> </Col>
                                    <Col span={8}> <CurrentS /> </Col>
                                    <Col span={8}> <CurrentT /> </Col>
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
                                    <Col span={8}> <OverCurrentS /> </Col>
                                    <Col span={8}> <OverCurrentT /> </Col>
                                </Row>
                            </Card>
                        </div>
                        <div className='Other_Card'>
                            <Card className={`Other_Card ${TxtTheme} ${BgTheme}`} size='medium'>
                                <span>전류불평형률 / 누설전류 / 온도 / 누적가동시간 </span>

                                <Row
                                    gutter={{
                                        xs: 10,
                                        sm: 10,
                                        md: 20,
                                        lg: 10,
                                    }}
                                >
                                    <Col span={6}> <OverCurrentR /> </Col>
                                    <Col span={6}> <OverCurrentR /> </Col>
                                    <Col span={6}> <OverCurrentR /> </Col>
                                    <Col span={6}> <OverCurrentR /> </Col>

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
