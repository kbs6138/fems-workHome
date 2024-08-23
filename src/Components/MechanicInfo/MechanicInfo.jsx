import React from 'react';
import { Row, Col } from 'antd';
import '../Tabs/MainTabs/Tabs.css';

const MechanicInfo = ({ MainDiagramData }) => {
    return (


        <div>


            <Row>
                <Col span={16}>
                    <table className="table table1">
                        <thead>
                            <tr>
                                <th>L1 정보</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>전압(V)<span id="volt_r" className='L1_Span_str'> {MainDiagramData[0]?.volt_r}</span></td>
                                <td>전류(A)<span id="am_r" className='L1_Span_str'>{MainDiagramData[0]?.am_r}</span></td>
                                <td>피상(VA)<span id="wat_r" className='L1_Span_str'>{MainDiagramData[0]?.wat_r}</span></td>
                                <td>유효(W)<span id="wat_p_r" className='L1_Span_str'>{MainDiagramData[0]?.wat_p_r}</span></td>
                                <td>무효(Var)<span id="wat_n_r" className='L1_Span_str' >{MainDiagramData[0]?.wat_n_r}</span></td>
                                <td>역률(%)<span id="pf_r" className='L1_Span_str'>{MainDiagramData[0]?.pf_r}</span></td>
                                <td>I-THD(%)<span id="ithd_r" className='L1_Span_str'>{MainDiagramData[0]?.ithd_r}</span></td>
                                <td>V-THD(%)<span id="vthd_r" className='L1_Span_str'>{MainDiagramData[0]?.vthd_r}</span></td>
                            </tr>
                        </tbody>
                    </table>




                    {/* L2 정보 */}
                    <table className="table table2">
                        <thead>
                            <tr>
                                <th >L2 정보</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td>전압(V)<span id="volt_s" className='L2_Span_str'> {MainDiagramData[0]?.volt_s}</span></td>
                                <td>전류(A)<span id="am_s" className='L2_Span_str'>{MainDiagramData[0]?.am_s}</span></td>
                                <td>피상(VA)<span id="wat_s" className='L2_Span_str'>{MainDiagramData[0]?.wat_s}</span></td>
                                <td>유효(W)<span id="wat_p_s" className='L2_Span_str'>{MainDiagramData[0]?.wat_p_s}</span></td>
                                <td>무효(Var)<span id="wat_n_s" className='L2_Span_str' >{MainDiagramData[0]?.wat_n_s}</span></td>
                                <td>역률(%)<span id="pf_s" className='L2_Span_str'>{MainDiagramData[0]?.pf_s}</span></td>
                                <td>I-THD(%)<span id="ithd_s" className='L2_Span_str'>{MainDiagramData[0]?.ithd_s}</span></td>
                                <td>V-THD(%)<span id="vthd_s" className='L2_Span_str'>{MainDiagramData[0]?.vthd_s}</span></td>
                            </tr>
                        </tbody>
                    </table>

                    {/* L3 정보 */}
                    <table className="table table3">
                        <thead>
                            <tr>
                                <th>L3 정보</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>

                                <td>전압(V)<span id="volt_t" className='L3_Span_str'> {MainDiagramData[0]?.volt_t}</span></td>
                                <td>전류(A)<span id="am_t" className='L3_Span_str'>{MainDiagramData[0]?.am_s}</span></td>
                                <td>피상(VA)<span id="wat_t" className='L3_Span_str'>{MainDiagramData[0]?.wat_t}</span></td>
                                <td>유효(W)<span id="wat_p_t" className='L3_Span_str'>{MainDiagramData[0]?.wat_p_t}</span></td>
                                <td>무효(Var)<span id="wat_n_t" className='L3_Span_str' >{MainDiagramData[0]?.wat_n_t}</span></td>
                                <td>역률(%)<span id="pf_t" className='L3_Span_str'>{MainDiagramData[0]?.pf_t}</span></td>
                                <td>I-THD(%)<span id="ithd_t" className='L3_Span_str'>{MainDiagramData[0]?.ithd_t}</span></td>
                                <td>V-THD(%)<span id="vthd_t" className='L3_Span_str'>{MainDiagramData[0]?.vthd_t}</span></td>

                            </tr>
                        </tbody>
                    </table>

                </Col>




                <Col span={8}>
                    <table className="table">
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
                </Col>
            </Row>


        </div>
    );
};

export default MechanicInfo;
