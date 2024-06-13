import React from 'react';
import { Row, Col } from 'antd';

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
                                <td>전압(V)<br /><span style={{ color: '#00C700', fontWeight: 'bolder' }} id="volt_r">228.7</span></td>
                                <td>전류(A)<br /><span style={{ color: '#00C700', fontWeight: 'bolder' }} id="am_r">32.90</span></td>
                                <td>피상(VA)<br /><span style={{ color: '#00C700', fontWeight: 'bolder' }} id="wat_r">5283.6</span></td>
                                <td>유효(W)<br /><span style={{ color: '#00C700', fontWeight: 'bolder' }} id="wat_p_r">7553.3</span></td>
                                <td>무효(Var)<br /><span style={{ color: '#00C700', fontWeight: 'bolder' }} id="wat_n_r">5397.7</span></td>
                                <td>역률(%)<br /><span style={{ color: '#00C700', fontWeight: 'bolder' }} id="pf_r">70.0</span></td>
                                <td>I-THD(%)<br /><span style={{ color: '#00C700', fontWeight: 'bolder' }} id="ithd_r">115.2</span></td>
                                <td>V-THD(%)<br /><span style={{ color: '#00C700', fontWeight: 'bolder' }} id="vthd_r">1.9</span></td>
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
                                <td>전압(V)<br /><span style={{ color: '#FC738A', fontWeight: 'bolder' }} id="volt_s">230.5</span></td>
                                <td>전류(A)<br /><span style={{ color: '#FC738A', fontWeight: 'bolder' }} id="am_s">29.30</span></td>
                                <td>피상(VA)<br /><span style={{ color: '#FC738A', fontWeight: 'bolder' }} id="wat_s">4500.7</span></td>
                                <td>유효(W)<br /><span style={{ color: '#FC738A', fontWeight: 'bolder' }} id="wat_p_s">6785.4</span></td>
                                <td>무효(Var)<br /><span style={{ color: '#FC738A', fontWeight: 'bolder' }} id="wat_n_s">5077.9</span></td>
                                <td>역률(%)<br /><span style={{ color: '#FC738A', fontWeight: 'bolder' }} id="pf_s">66.4</span></td>
                                <td>I-THD(%)<br /><span style={{ color: '#FC738A', fontWeight: 'bolder' }} id="ithd_s">113.9</span></td>
                                <td>V-THD(%)<br /><span style={{ color: '#FC738A', fontWeight: 'bolder' }} id="vthd_s">2.0</span></td>
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
                                <td>전압(V)<br /><span style={{ fontWeight: 'bolder' }} id="volt_t" className='Span_str'>231.5</span></td>
                                <td>전류(A)<br /><span style={{ fontWeight: 'bolder' }} id="am_t" className='Span_str'> 30.20</span></td>
                                <td>피상(VA)<br /><span style={{ fontWeight: 'bolder' }} id="wat_t" className='Span_str'>4696.0</span></td>
                                <td>유효(W)<br /><span style={{ fontWeight: 'bolder' }} id="wat_p_t" className='Span_str'> 7008.9</span></td>
                                <td>무효(Var)<br /><span style={{ fontWeight: 'bolder' }} id="wat_n_t" className='Span_str'>5203.1</span></td>
                                <td>역률(%)<br /><span style={{ fontWeight: 'bolder' }} id="pf_t" className='Span_str'>67.0</span></td>
                                <td>I-THD(%)<br /><span style={{ fontWeight: 'bolder' }} id="ithd_t" className='Span_str'>117.1</span></td>
                                <td>V-THD(%)<br /><span style={{ fontWeight: 'bolder' }} id="vthd_t" className='Span_str'>1.6</span></td>
                            </tr>
                        </tbody>
                    </table>

                </Col>




                <Col span={8}>
                    <table class="table">

                        <tbody >
                            <tr>
                                <td>주파수(Hz) <br /><span style={{ fontWeight: 'bolder' }}

                                    id="hz"> 60.1</span>
                                </td>
                                <td>전체역률(%)<br /><span style={{ fontWeight: 'bolder' }}

                                    id="pf">46.9</span>
                                </td>
                            </tr>
                            <br />
                            <tr>
                                <td>전체피상(VA)<br /><span style={{ fontWeight: 'bolder' }}

                                    id="wat">326.6</span>
                                </td>
                                <td>전체무효(Var)<br /><span style={{ fontWeight: 'bolder' }}

                                    id="wat_n">155.9</span>
                                </td>
                            </tr>
                            <br />
                            <tr>
                                <td>합산전력(W)<br /><span style={{ fontWeight: 'bolder' }}

                                    id="wat_tot">32844.2</span>
                                </td>
                                <td>전류불평형률(%)<br /><span style={{ fontWeight: 'bolder' }}
                                    id="vthd_tot">243.7</span>
                                </td>
                            </tr>
                            <br />
                            <tr>
                                <td>누설전류(A)<br /><span style={{ fontWeight: 'bolder' }}

                                    id="am_n">0.00</span>
                                </td>
                            </tr>
                        </tbody>
                    </table></Col>
            </Row>


        </div>
    );
};

export default MechanicInfo;
