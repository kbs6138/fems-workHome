import React, { useContext } from 'react';
import { Layout, Col, Row, Card, Select } from 'antd';
import { ThemeContext } from '../../ThemeContext';
import CurrentR from './Current/CurrentR';
import CurrentS from './Current/CurrentS';
import CurrentT from './Current/CurrentT';

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
            <Row className='Main-Center-Content-Row'
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

                        <div className={`Main-Center-Content1 ${TxtTheme} ${BgTheme}`} style={{ marginTop: '15px' }} >

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
                                    <Col span={8}> <CurrentR /> </Col>
                                    <Col span={8}> <CurrentS /> </Col>
                                    <Col span={7}> <CurrentT /> </Col>
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
                    </Card>
                </Col>
            </Row>
        </Content>
    );
};

export default MonitorFirst;
