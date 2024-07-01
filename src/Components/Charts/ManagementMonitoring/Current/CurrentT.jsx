import React, { useEffect, useRef, useContext } from 'react';
import * as echarts from 'echarts';
import { ThemeContext } from '../../../ThemeContext';
import { useGaugeData } from '../../../db/Gauge_db';

const CurrentT = () => {
    const { data } = useGaugeData();
    const chartRef = useRef(null);
    
    const { isDarkMode } = useContext(ThemeContext);
    const myChart = useRef(null); // 차트 인스턴스를 useRef로 관리

    useEffect(() => {
        const chartDom = chartRef.current;
        myChart.current = echarts.init(chartDom);

        return () => {
            myChart.current.dispose();
        };
    }, [isDarkMode]); // 빈 배열로 초기화만 한 번 실행되도록 설정

    useEffect(() => {
        const updateChartOptions = () => {
            const textColor = isDarkMode ? '#ffffff' : '#000000';
            const axisLineColor = isDarkMode ? '#ffffff' : '#000000';
    
            const option = {
                animation: true,
                animationDuration: 10000,
                animationEasing: 'cubicOut',
                tooltip: {
                    formatter: '{a} <br/>{b} : {c}V'
                },
                series: [
                    {
                        name: 'Pressure',
                        type: 'gauge',
                        detail: {
                            formatter: function (value) {
                                let statusText = '';
                                let statusColor = '';
                                if (value < 70) {
                                    statusText = 'L2';
                                    statusColor = 'safe';
                                } else if (value <= 80) {
                                    statusText = 'L2';
                                    statusColor = 'caution';
                                } else {
                                    statusText = 'L2';
                                    statusColor = 'danger';
                                }
                                return `{${statusColor}|${statusText}}\n${value}V`;
                            },
                            fontSize: 12,
                            color: textColor,
                            fontFamily: 'NanumSquareNeoBold',
                            rich: {
                                safe: {
                                    color: '#FFFFFF',
                                    fontSize: 13.5,
                                    fontFamily: 'NanumSquareNeoBold',
                                },
                                caution: {
                                    color: '#FFFFFF',
                                    fontSize: 13.5,
                                    fontFamily: 'NanumSquareNeoBold',
                                },
                                danger: {
                                    color: '#FFFFFF',
                                    fontSize: 13.5,
                                    fontFamily: 'NanumSquareNeoBold',
                                },
                                
                            }
                        },
                        data: [
                            {   
                                value: 72, // 여기에 직접 값을 설정
                                //value: data.length > 0 ? data[0].gaugeData : 0,
                                name: ''
                            }
                        ],
                        axisLine: {
                            lineStyle: {
                                color: [
                                    [0.7, '#ff3300'],
                                    [0.8, '#33cc33'],
                                    [1, '#ff3300']
                                ],
                                width: 6
                            }
                        },
                        axisLabel: {
                            color: axisLineColor,
                        },
                        pointer: {
                            itemStyle: {
                                color: (function () {
                                    //const gaugeValue = data.length > 0 ? data[0].gaugeData : 0;

                                    const gaugeValue = 72; // 여기에 직접 값을 설정
                                    if (gaugeValue <= 70) {
                                        return '#ff3300'; // 70 이하 빨간색
                                    } else if (gaugeValue > 70 && gaugeValue <= 80) {
                                        return '#33cc33'; // 70~80 녹색
                                    } else {
                                        return '#ff3300'; // 80 이상 빨간색
                                    }
                                })()
                            }
                        }
                    }
                ]
            };
    
            myChart.current.setOption(option);
        };
    
        if (myChart.current) {
            updateChartOptions();
        }
    }, [isDarkMode, data]); // 의존성 배열에 isDarkMode와 data 포함

    return (
        <div id="gaugeT" ref={chartRef} className="gaugeT" />
    );
};

export default CurrentT;
