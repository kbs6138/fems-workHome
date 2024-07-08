import React from 'react';
import { Row, Col } from 'antd';
import '../Tabs/MainTabs/Tabs.css';

const MechanicInfo = () => {
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
                                <td>전압(V)<span id="volt_r" className='L1_Span_str'>228.7</span></td>
                                <td>전류(A)<span id="am_r" className='L1_Span_str'> 32.90</span></td>
                                <td>피상(VA)<span id="wat_r" className='L1_Span_str'>5283.6</span></td>
                                <td>유효(W)<span id="wat_p_r" className='L1_Span_str'>7553.3</span></td>
                                <td>무효(Var)<span id="wat_n_r" className='L1_Span_str' >5397.7</span></td>
                                <td>역률(%)<span id="pf_r" className='L1_Span_str'>70.0</span></td>
                                <td>I-THD(%)<span id="ithd_r" className='L1_Span_str'>115.2</span></td>
                                <td>V-THD(%)<span id="vthd_r" className='L1_Span_str'>1.9</span></td>
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
                                <td>전압(V)<span id="volt_s" className='L2_Span_str'>230.5</span></td>
                                <td>전류(A)<span id="am_s" className='L2_Span_str'>29.30</span></td>
                                <td>피상(VA)<span id="wat_s" className='L2_Span_str'>4500.7</span></td>
                                <td>유효(W)<span id="wat_p_s" className='L2_Span_str'>6785.4</span></td>
                                <td>무효(Var)<span id="wat_n_s" className='L2_Span_str'>5077.9</span></td>
                                <td>역률(%)<span id="pf_s" className='L2_Span_str'>66.4</span></td>
                                <td>I-THD(%)<span id="ithd_s" className='L2_Span_str'>113.9</span></td>
                                <td>V-THD(%)<span id="vthd_s" className='L2_Span_str'>2.0</span></td>
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
                                <td>전압(V)<span id="volt_t" className='L3_Span_str'>231.5</span></td>
                                <td>전류(A)<span id="am_t" className='L3_Span_str'> 30.20</span></td>
                                <td>피상(VA)<span id="wat_t" className='L3_Span_str'>4696.0</span></td>
                                <td>유효(W)<span id="wat_p_t" className='L3_Span_str'> 7008.9</span></td>
                                <td>무효(Var)<span id="wat_n_t" className='L3_Span_str'>5203.1</span></td>
                                <td>역률(%)<span id="pf_t" className='L3_Span_str'>67.0</span></td>
                                <td>I-THD(%)<span id="ithd_t" className='L3_Span_str'>117.1</span></td>
                                <td>V-THD(%)<span id="vthd_t" className='L3_Span_str'>1.6</span></td>
                            </tr>
                        </tbody>
                    </table>

                </Col>




                <Col span={8}>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td style={{ paddingBottom: '15px' }}>주파수(Hz) <span style={{ fontWeight: 'bolder', marginTop: '5px' }} id="hz"> 60.1</span></td>
                                <td style={{ paddingBottom: '15px' }}>전체역률(%)<span style={{ fontWeight: 'bolder', marginTop: '5px' }} id="pf">46.9</span></td>
                            </tr>
                            <tr>
                                <td style={{ paddingBottom: '15px' }}>전체피상(VA)<span style={{ fontWeight: 'bolder', marginTop: '5px' }} id="wat">326.6</span></td>
                                <td style={{ paddingBottom: '15px' }}>전체무효(Var)<span style={{ fontWeight: 'bolder', marginTop: '5px' }} id="wat_n">155.9</span></td>
                            </tr>
                            <tr>
                                <td style={{ paddingBottom: '15px' }}>합산전력(W)<span style={{ fontWeight: 'bolder', marginTop: '5px' }} id="wat_tot">32844.2</span></td>
                                <td style={{ paddingBottom: '15px' }}>전류불평형률(%)<span style={{ fontWeight: 'bolder', marginTop: '5px' }} id="vthd_tot">243.7</span></td>
                            </tr>
                            <tr>
                                <td style={{ paddingBottom: '15px' }}>누설전류(A)<span style={{ fontWeight: 'bolder', marginTop: '5px' }} id="am_n">0.00</span></td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
            </Row>


        </div>
    );
};

export default MechanicInfo;
