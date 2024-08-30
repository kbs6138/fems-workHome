import React from 'react';
import { Row, Col } from 'antd';
import '../Tabs/MainTabs/Tabs.css';

const MechanicInfo = ({ MainDiagramData }) => {
    return (
        <div className="table_container">
            <Row
                gutter={{
                    xs: 10,
                    sm: 10,
                    md: 20,
                    lg: 10,
                }}
            >
                <Col className="gutter-row" xs={24} sm={24} md={16} lg={16}>
                    {/* L1 Table */}
                    <thead>
                        <tr>
                            <span className='L1_span'>L1 정보</span>
                        </tr>
                    </thead>
                    <Row gutter={[5, 5]} style={{marginBottom:'20px'}}>
                        <Col span={24} xs={6} sm={6} md={3} lg={3}>
                            <div className='L1_div'>전압(V)<span id="volt_r" className='L1_Span_str'> {MainDiagramData[0]?.volt_r}</span></div>
                        </Col>
                        <Col span={24} xs={6} sm={6} md={3} lg={3}>
                            <div className='L1_div'>전류(A)<span id="am_r" className='L1_Span_str'>{MainDiagramData[0]?.am_r}</span></div>
                        </Col>
                        <Col span={24} xs={6} sm={6} md={3} lg={3}>
                            <div className='L1_div'>피상(VA)<span id="wat_r" className='L1_Span_str'>{MainDiagramData[0]?.wat_r}</span></div>
                        </Col>
                        <Col span={24} xs={6} sm={6} md={3} lg={3}>
                            <div className='L1_div'>유효(W)<span id="wat_p_r" className='L1_Span_str'>{MainDiagramData[0]?.wat_p_r}</span></div>
                        </Col>
                        <Col span={24} xs={6} sm={6} md={3} lg={3}>
                            <div className='L1_div'>무효(Var)<span id="wat_n_r" className='L1_Span_str'>{MainDiagramData[0]?.wat_n_r}</span></div>
                        </Col>
                        <Col span={24} xs={6} sm={6} md={3} lg={3}>
                            <div className='L1_div'>역률(%)<span id="pf_r" className='L1_Span_str'>{MainDiagramData[0]?.pf_r}</span></div>
                        </Col>
                        <Col span={24} xs={6} sm={6} md={3} lg={3}>
                            <div className='L1_div'>I-THD(%)<span id="ithd_r" className='L1_Span_str'>{MainDiagramData[0]?.ithd_r}</span></div>
                        </Col>
                        <Col span={24} xs={6} sm={6} md={3} lg={3}>
                            <div className='L1_div'>V-THD(%)<span id="vthd_r" className='L1_Span_str'>{MainDiagramData[0]?.vthd_r}</span></div>
                        </Col>
                    </Row>

                    {/* L2 Table */}
                    <thead >
                        <tr>
                            <span className='L2_span'>L2 정보</span>
                        </tr>
                    </thead>
                    <Row gutter={[5, 5]} style={{marginBottom:'20px'}}>
                        <Col span={24} xs={6} sm={6} md={3} lg={3}>
                            <div className='L2_div'>전압(V)<span id="volt_s" className='L2_Span_str'> {MainDiagramData[0]?.volt_s}</span></div>
                        </Col>
                        <Col span={24} xs={6} sm={6} md={3} lg={3}>
                            <div className='L2_div'>전류(A)<span id="am_s" className='L2_Span_str'>{MainDiagramData[0]?.am_s}</span></div>
                        </Col>
                        <Col span={24} xs={6} sm={6} md={3} lg={3}>
                            <div className='L2_div'>피상(VA)<span id="wat_s" className='L2_Span_str'>{MainDiagramData[0]?.wat_s}</span></div>
                        </Col>
                        <Col span={24} xs={6} sm={6} md={3} lg={3}>
                            <div className='L2_div'>유효(W)<span id="wat_p_s" className='L2_Span_str'>{MainDiagramData[0]?.wat_p_s}</span></div>
                        </Col>
                        <Col span={24} xs={6} sm={6} md={3} lg={3}>
                            <div className='L2_div'>무효(Var)<span id="wat_n_s" className='L2_Span_str'>{MainDiagramData[0]?.wat_n_s}</span></div>
                        </Col>
                        <Col span={24} xs={6} sm={6} md={3} lg={3}>
                            <div className='L2_div'>역률(%)<span id="pf_s" className='L2_Span_str'>{MainDiagramData[0]?.pf_s}</span></div>
                        </Col>
                        <Col span={24} xs={6} sm={6} md={3} lg={3}>
                            <div className='L2_div'>I-THD(%)<span id="ithd_s" className='L2_Span_str'>{MainDiagramData[0]?.ithd_s}</span></div>
                        </Col>
                        <Col span={24} xs={6} sm={6} md={3} lg={3}>
                            <div className='L2_div'>V-THD(%)<span id="vthd_s" className='L2_Span_str'>{MainDiagramData[0]?.vthd_s}</span></div>
                        </Col>
                    </Row>

                    {/* L3 Table */}
                    <thead>
                        <tr>
                            <span className='L3_span'>L3 정보</span>
                        </tr>
                    </thead>
                    <Row gutter={[5, 5]}>
                        <Col span={24} xs={6} sm={6} md={3} lg={3}>
                            <div className='L3_div'>전압(V)<span id="volt_t" className='L3_Span_str'> {MainDiagramData[0]?.volt_t}</span></div>
                        </Col>
                        <Col span={24} xs={6} sm={6} md={3} lg={3}>
                            <div className='L3_div'>전류(A)<span id="am_t" className='L3_Span_str'>{MainDiagramData[0]?.am_t}</span></div>
                        </Col>
                        <Col span={24} xs={6} sm={6} md={3} lg={3}>
                            <div className='L3_div'>피상(VA)<span id="wat_t" className='L3_Span_str'>{MainDiagramData[0]?.wat_t}</span></div>
                        </Col>
                        <Col span={24} xs={6} sm={6} md={3} lg={3}>
                            <div className='L3_div'>유효(W)<span id="wat_p_t" className='L3_Span_str'>{MainDiagramData[0]?.wat_p_t}</span></div>
                        </Col>
                        <Col span={24} xs={6} sm={6} md={3} lg={3}>
                            <div className='L3_div'>무효(Var)<span id="wat_n_t" className='L3_Span_str'>{MainDiagramData[0]?.wat_n_t}</span></div>
                        </Col>
                        <Col span={24} xs={6} sm={6} md={3} lg={3}>
                            <div className='L3_div'>역률(%)<span id="pf_t" className='L3_Span_str'>{MainDiagramData[0]?.pf_t}</span></div>
                        </Col>
                        <Col span={24} xs={6} sm={6} md={3} lg={3}>
                            <div className='L3_div'>I-THD(%)<span id="ithd_t" className='L3_Span_str'>{MainDiagramData[0]?.ithd_t}</span></div>
                        </Col>
                        <Col span={24} xs={6} sm={6} md={3} lg={3}>
                            <div className='L3_div'>V-THD(%)<span id="vthd_t" className='L3_Span_str'>{MainDiagramData[0]?.vthd_t}</span></div>
                        </Col>
                    </Row>
                </Col>

                    <table className="table table4">
                        <tbody>
                            <tr>
                                <td style={{ paddingBottom: '15px' }}>주파수(Hz) <span style={{ fontWeight: 'bolder', marginTop: '5px' }} id="hz">{MainDiagramData[0]?.hz}</span></td>
                                <td style={{ paddingBottom: '15px' }}>전체역률(%)<span style={{ fontWeight: 'bolder', marginTop: '5px' }} id="pf">{MainDiagramData[0]?.pf}</span></td>
                            </tr>
                            <tr>
                                <td style={{ paddingBottom: '15px' }}>전체피상(VA)<span style={{ fontWeight: 'bolder', marginTop: '5px' }} id="wat_p">{MainDiagramData[0]?.wat_p}</span></td>
                                <td style={{ paddingBottom: '15px' }}>전체무효(Var)<span style={{ fontWeight: 'bolder', marginTop: '5px' }} id="wat_n">{MainDiagramData[0]?.wat_n}</span></td>
                            </tr>
                            <tr>
                                <td style={{ paddingBottom: '15px' }}>합산전력(W)<span style={{ fontWeight: 'bolder', marginTop: '5px' }} id="wat_tot">{MainDiagramData[0]?.wat_tot}</span></td>
                                <td style={{ paddingBottom: '15px' }}>전류불평형률(%)<span style={{ fontWeight: 'bolder', marginTop: '5px' }} id="thd">{MainDiagramData[0]?.thd}</span></td>
                            </tr>
                            <tr>
                                <td style={{ paddingBottom: '15px' }}>누설전류(A)<span style={{ fontWeight: 'bolder', marginTop: '5px' }} id="igr">{MainDiagramData[0]?.igr}</span></td>
                            </tr>
                        </tbody>
                    </table>
            </Row>
        </div>
    );
};

export default MechanicInfo;
