import React, { useEffect, useRef, useContext } from 'react';
import * as echarts from 'echarts';
import { ThemeContext } from '../../../ThemeContext';
import { useGaugeData } from '../../../db/Gauge_db';

const CurrentS = () => {
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
                        min: 0,
                        max: 500,
                        splitNumber: 5, // 눈금의 단위를 100으로 설정 (500 / 5 = 100)
                        detail: {
                            formatter: function (value) {
                                let statusText = '';
                                let statusColor = '';
                                if (value < 180) {
                                    statusText = 'L2';
                                    statusColor = 'safe';
                                } else if (value <= 200) {
                                    statusText = 'L2';
                                    statusColor = 'safe';
                                } else if (value <= 250) {
                                    statusText = 'L2';
                                    statusColor = 'safe';
                                } else {
                                    statusText = 'L2';
                                    statusColor = 'safe';
                                }
                                return `{${statusColor}|${statusText}}\n${value}V`;
                            },
                            fontSize: 12,
                            color: textColor,
                            fontFamily: 'NanumSquareNeoExtraBold',
                            rich: {
                                safe: {
                                    color: '#FC738A',
                                    fontSize: 15,
                                    fontFamily: 'NanumSquareNeoBold',
                                }
                            }
                        },
                        data: [
                            {
                                //value: data.length > 0 ? data[0].gaugeData : 0,
                                value: 220, // 여기에 직접 값을 설정
                                name: ''
                            }
                        ],
                        axisLine: {
                            lineStyle: {
                                color: [
                                    [0.36, '#FF0000'], // 0 ~ 180
                                    [0.4, '#00c700'], // 180 ~ 200
                                    [0.5, '#00C700'], // 200 ~ 250
                                    [1, '#FF0000'] // 250 ~ 500
                                ],
                                width: 3
                            }
                        },
                        axisLabel: {
                            color: axisLineColor,
                            interval: 100, // 100단위로 눈금이 나오도록 설정
                        },
                        pointer: {
                            itemStyle: {
                                color: (function () {
                                    //const gaugeValue = data.length > 0 ? data[0].gaugeData : 0;
                                    const gaugeValue = 220; // 여기에 직접 값을 설정
                                    if (gaugeValue <= 180) {
                                        return '#FF0000'; // 180 이하 빨간색
                                    } else if (gaugeValue > 180 && gaugeValue <= 200) {
                                        return '#00C700'; // 180~200 노란색
                                    } else if (gaugeValue > 200 && gaugeValue <= 250) {
                                        return '#00C700'; // 200~250 녹색
                                    } else {
                                        return '#FF0000'; // 250 이상 빨간색
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
        <div id="CurrentgaugeS" ref={chartRef} className="CurrentgaugeS" />
    );
};

export default CurrentS;
