import React, { useRef, useEffect, useContext, useState } from 'react';
//import { Link } from 'react-router-dom';
//import { AiOutlineSwapRight } from "react-icons/ai";
import { Layout, Col, Row, Card /*Button*/ } from 'antd';
import RightBottomMainTabs from '../../Components/Tabs/MainTabs/Right-Bottom-MainTabs';
import CenterMainTabs from '../../Components/Tabs/MainTabs/Center-MainTabs';
import { ThemeContext } from '../../Components/ThemeContext';
import RightChart1 from '../../Components/Charts/RightChart1';
import RightChart2 from '../../Components/Charts/RightChart2';
import PeekChart from '../../Components/Charts/PeekChart';
import RightChart3 from '../../Components/Charts/RightChart3';
import { useRightChart3Data } from '../../Components/db/RightChart3_db';
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import { useMainDiagramData } from './MainDiagram/MainDiagram';
import { useDeviceData } from '../../Components/db/Device-m';
import mainSvg from '../main.svg'; // 이미지 경로를 자신의 것으로 변경하세요
//import connectSvg from '../Crop_connect.svg'; // 이미지 경로를 자신의 것으로 변경하세요
import connectSvgNoLine from '../Crop_connectNoLine.svg'; // 이미지 경로를 자신의 것으로 변경하세요
import lineSvg from '../line.svg';
import connectChildSvg from '../connectChild.svg';
import connectFirstChildSvg from '../connectFirstChild.svg';
import connectLastChildSvg from '../connectLastChild.svg';
import verticalLineSvg from '../verticalLine.svg';
//import ThermometerComponent from '../../Components/Charts/Thermometer';
import './Main.css';
//import { connect } from 'echarts';

const { Content } = Layout;

const ImageCanvas = ({ imageSrc, handleClick, id, scp_vid, width, height }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = imageSrc;

        img.onload = () => {
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            ctx.putImageData(imageData, 0, 0);
        };
    }, [imageSrc, width, height]);

    return (
        <canvas
            ref={canvasRef}
            onClick={() => handleClick(id, scp_vid)}
            style={{ position: "relative", left: "-31px", cursor: 'pointer', width: `${width}px`, height: `${height}px` }}
        />
    );
};
const width = 85;
const height = 110;

const AppMain = () => {

    const { data: DeviceData } = useDeviceData();
    const { isDarkMode } = useContext(ThemeContext);
    const { data } = useRightChart3Data();

    const [selectedDiagramId, setSelectedDiagramId] = useState('');
    const [scpId, setScpId] = useState();
    const [selectedDevice, setSelectedDevice] = useState('');
    const { data: MainDiagramData } = useMainDiagramData(scpId, selectedDevice, selectedDiagramId);

    useEffect(() => {
        if (DeviceData && DeviceData.length > 0) {
            setSelectedDevice(DeviceData[0].scp_vid);
        }
    }, [DeviceData]);

    const handleImageClick = (id, scp_vid) => {
        setSelectedDiagramId(id);
        setScpId(scp_vid);
    };



    const TxtTheme = isDarkMode ? 'text-light' : 'text-dark';
    const BgTheme = isDarkMode ? 'bg-light' : 'bg-dark';

    //-----------------------------------------------------------------------
    const groupedDevices = DeviceData.reduce((acc, device) => {
        const [parentVid] = device.scp_vid.split('_');

        if (!acc[parentVid]) {
            acc[parentVid] = {
                parent: null,
                children: []
            };
        }

        if (device.scp_vid.includes('_')) {
            acc[parentVid].children.push(device);
        } else {
            acc[parentVid].parent = device;
        }

        return acc;
    }, {});
    //-----------------------------------------------------------------------

    console.log(MainDiagramData[0]?.ithd_r)
    return (
        <Content className="app-Content">

            <Card className={`Main-Top-Info-Card ${BgTheme}`} bordered={false}>
                <Row className={`Main-Top-Info-Row ${BgTheme}`}
                    gutter={{
                        xs: 10,
                        sm: 10,
                        md: 20,
                        lg: 5,
                    }}
                >
                    {/* 첫 번째 줄 */}
                    <Col className="gutter-row" xs={24} sm={12} md={12} lg={6}>
                        <div className='Main-Top-Info1' style={{ display: 'flex', flexDirection: 'row' }}>
                            <Col className={`Main-Top-Info1-Col1 ${TxtTheme} ${BgTheme}`} span={12}>
                                <span className='Main-Top-Info1-span'>적산 전력량</span>
                                <p className='Main-Top-Info1-p'>All Wat Value</p>
                            </Col>
                            <Col span={12} className={`Main-Top-Info1-Col2 ${TxtTheme} ${BgTheme}`}>
                                <h1 className='Main-Top-Info1-h1'>2,635 Kwh</h1>
                            </Col>
                        </div>
                    </Col>

                    <Col className="gutter-row" xs={24} sm={12} md={12} lg={6}>
                        <div className='Main-Top-Info2' style={{ display: 'flex', flexDirection: 'row' }}>
                            <Col className={`Main-Top-Info2-Col1 ${TxtTheme} ${BgTheme}`} span={12}>
                                <span className='Main-Top-Info2-span'>수전 용량</span>
                                <p className='Main-Top-Info2-p'>Recieve Energy</p>
                            </Col>
                            <Col className={`Main-Top-Info2-Col2 ${TxtTheme} ${BgTheme}`} span={12}>
                                <h1 className='Main-Top-Info2-h1'>1,000 Kw</h1>
                            </Col>
                        </div>
                    </Col>

                    {/* 두 번째 줄 */}
                    <Col className="gutter-row" xs={24} sm={12} md={12} lg={6}>
                        <div className='Main-Top-Info3' style={{ display: 'flex', flexDirection: 'row' }}>
                            <Col className={`Main-Top-Info3-Col1 ${TxtTheme} ${BgTheme}`} span={12}>
                                <span className='Main-Top-Info3-span'>계약 전력</span>
                                <p className='Main-Top-Info3-p'>Reservation Amount</p>
                            </Col>
                            <Col className={`Main-Top-Info3-Col2 ${TxtTheme} ${BgTheme}`} span={12}>
                                <h1 className='Main-Top-Info3-h1'>1,000 Kw</h1>
                            </Col>
                        </div>
                    </Col>

                    <Col className="gutter-row" xs={24} sm={12} md={12} lg={6}>
                        <div className='Main-Top-Info4' style={{ display: 'flex', flexDirection: 'row' }}>
                            <Col className={`Main-Top-Info4-Col1 ${TxtTheme} ${BgTheme}`} span={12}>
                                <span className='Main-Top-Info4-span'>목표피크전력</span>
                                <p className='Main-Top-Info4-p'>Target Peek Amount</p>
                            </Col>
                            <Col className={`Main-Top-Info4-Col2 ${TxtTheme} ${BgTheme}`} span={12}>
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
                <Col className="gutter-row" xs={24} md={9}>
                    <div className='Main-Center-Content1'>
                        <Card className={`Card1 ${TxtTheme} ${BgTheme}`} bordered={false}>
                            <span className='Card1-Title'>Peek Monitor</span>
                            <PeekChart style={{ display: 'flex', justifyContent: 'center' }} />
                        </Card>
                    </div>
                </Col>

                <Col className="gutter-row" xs={24} md={9}>
                    <div className='Main-Center-Content2'>
                        <Card size='medium' className={`Card2 ${TxtTheme} ${BgTheme}`} bordered={false}>
                            <span className='Card2-Title'> Trend Analysis Monitor</span>
                            <CenterMainTabs />
                        </Card>
                    </div>
                </Col>

                <Col className="gutter-row" xs={24} md={6}>
                    <div className="card-container">
                        <Card className={`Card3-top ${TxtTheme} ${BgTheme}`} bordered={false}>
                            <Row gutter={[16, 12]} justify="center" align="middle">
                                <Col span={14}>
                                    <div className="Card1-grid-text">
                                        <span className="Card1-grid-Title-text">당일 사용량</span>
                                        <p className="Card1-grid-SubTitle-text">전일 사용량 대비
                                            <span className="Card1-grid-Percent-text">
                                                <span className="Card1-grid-Percent-value">20.65%</span>
                                                <span className="Card1-grid-Percent-Near-text">증가</span>
                                                <BiUpArrowAlt size={30} color='red' />
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
                                                <span className="Card2-grid-Percent-value">12%</span>
                                                <span className="Card2-grid-Percent-Near-text">감소</span>
                                                <BiDownArrowAlt size={30} color='#667EFE' />
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
                <Col className="gutter-row" xs={24} sm={24} md={12} lg={12}>
                    <Card className={`Card4 Main-Bottom-Content1 ${TxtTheme} ${BgTheme}`} bordered={false}>
                        <span className='Card3-Title'>Electric Diagram</span>
                        <Card span={24} bordered={false} className='Diagram_pic_Card'>
                            <ImageCanvas
                                imageSrc={mainSvg}
                                id='1 배전반'
                                scp_vid='2300136001'
                                handleClick={handleImageClick}
                                width={width}
                                height={height}
                            />
                            <div className='connectWrapper_Parentdiv'>
                                {Object.values(groupedDevices).map(({ parent, children }, parentIndex, parentArray) => (
                                    <div key={parent?.scp_vid} className='connectWrapper' style={{ display: 'flex' }}>
                                        <div style={{ position: "relative", display: "flex", height: "auto", width: "auto", alignItems: "center" }}>
                                            <img style={{ width: "90px" }} src={connectSvgNoLine} alt="" />
                                            <div className='connectWrapper_table'>
                                                {parent && (
                                                    <table
                                                        className='ElectricDiagramTable'
                                                        id={parent.device_name}
                                                        scp_vid={parent.scp_vid}
                                                        onClick={() => handleImageClick(parent.device_name, parent.scp_vid)}
                                                    >
                                                        <tr>
                                                            <td rowSpan={2} style={{ fontSize: '13px' }}>{parent.device_name}</td>
                                                            <td>MCCB</td>
                                                            <td>KA</td>
                                                        </tr>
                                                        <tr>
                                                            <td>000AF/00AT</td>
                                                            <td>00</td>
                                                        </tr>
                                                    </table>
                                                )}
                                            </div>
                                            <img style={{ width: "40px" }} src={lineSvg} alt="" />
                                        </div>

                                        <div>
                                            {children.map((child, index) => {
                                                const isFirstChild = index === 0;
                                                const isLastChild = index === children.length - 1;
                                                const isLastParent = parentIndex === parentArray.length - 1;
                                                const totalChildren = children.length;
                                                const isAfterMiddle = index >= Math.ceil(totalChildren / 2) - 1;

                                                const imgSrc = isFirstChild
                                                    ? connectFirstChildSvg
                                                    : isLastChild
                                                        ? connectLastChildSvg
                                                        : connectChildSvg;

                                                return (
                                                    <div style={{ display: "flex" }} key={child.scp_vid}>
                                                        {!((isLastParent && isAfterMiddle)) && (
                                                            <img style={{ position: "absolute", width: "auto", height: "70px", left: "3px" }} src={verticalLineSvg} alt="" />
                                                        )}
                                                        <img style={{ width: "40px" }} src={imgSrc} alt="" />
                                                        <div className='connectWrapper_table'>
                                                            <table
                                                                className='ElectricDiagramTable'
                                                                id={child.device_name}
                                                                scp_vid={child.scp_vid}
                                                                onClick={() => handleImageClick(child.device_name, child.scp_vid)}
                                                            >
                                                                <tr>
                                                                    <td rowSpan={2} style={{ fontSize: '13px' }}>{child.device_name}</td>
                                                                    <td>MCCB</td>
                                                                    <td>KA</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>000AF/00AT</td>
                                                                    <td>00</td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </Card>
                    </Card>
                </Col>

                <Col className="gutter-row" xs={24} sm={24} md={12} lg={12}>
                    <Card size='medium' className={` Card5  Main-Bottom-Content2 ${TxtTheme} ${BgTheme}`} bordered={false}>
                        <RightBottomMainTabs MainDiagramData={MainDiagramData} />
                    </Card>
                </Col>
            </Row>

        </Content>
    );
};

export default AppMain;
