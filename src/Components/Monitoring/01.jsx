import React, { useContext } from 'react';
import { Layout, Col, Row, Card } from 'antd';
import { ThemeContext } from '../../Components/ThemeContext';

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
                <Col className="gutter-row" span={9}>
                    <div className='Main-Center-Content1'>
                        <Card className={`Card1 ${TxtTheme} ${BgTheme}`}>
                            <span className='Card1-Title'>Peek Monitor</span>
                        </Card>
                    </div>
                </Col>
                <Col className="gutter-row" span={9}>
                    <div className='Main-Center-Content2'>
                        <Card size='medium' className={`Card2 ${TxtTheme} ${BgTheme}`}>
                            <span className='Card2-Title'> Trend Analysis Monitor</span>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Content>
    );
};

export default MonitorFirst;
