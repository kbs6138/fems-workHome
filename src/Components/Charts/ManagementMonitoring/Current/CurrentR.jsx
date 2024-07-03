import React, { useEffect, useRef, useContext } from 'react';
import * as echarts from 'echarts';
import { ThemeContext } from '../../../ThemeContext';
import { useCurrentRData } from './CurrentGauge_db';

const CurrentGauge = () => {
    const { data } = useCurrentRData();
    const chartRef = useRef(null);
    const { isDarkMode } = useContext(ThemeContext);
    const myChart = useRef(null);

    useEffect(() => {
        const chartDom = chartRef.current;
        myChart.current = echarts.init(chartDom);

        return () => {
            myChart.current.dispose();
        };
    }, []); // 빈 배열로 초기화만 한 번 실행되도록 설정

    useEffect(() => {
        const updateChartOptions = () => {
            const textColor = isDarkMode ? '#ffffff' : '#000000';
            const axisLineColor = isDarkMode ? '#ffffff' : '#000000';
            const Volt_r_Value = data.length > 0 ? data[0].volt_r : 0;
            const WarningArea = data.length > 0 ? data[0].max_am1 :0; // 기본값 설정

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
                                let statusText = 'L1';
                                return `${statusText}\n${value}V`;
                            },
                            fontSize: 12,
                            color: textColor,
                            fontFamily: 'NanumSquareNeoExtraBold',
                            rich: {
                                safe: {
                                    color: '#00C700',
                                    fontSize: 15,
                                    fontFamily: 'NanumSquareNeoBold',
                                }
                            }
                        },
                        data: [
                            {
                                value: Volt_r_Value
                            }
                        ],
                        axisLine: {
                            lineStyle: {
                                color: [
                                    [WarningArea, '#FF0000'], // 0 ~ WarningArea
                                    [0.4, '#00c700'], // 0.4 ~ 0.5
                                    [0.5, '#00C700'], // 0.5 ~ 1
                                    [1, '#FF0000'] // 나머지
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
                                    if (Volt_r_Value <= 180) {
                                        return '#FF0000'; // 180 이하 빨간색
                                    } else if (Volt_r_Value > 180 && Volt_r_Value <= 220) {
                                        return '#00C700'; // 180~220 녹색
                                    } else if (Volt_r_Value > 220 && Volt_r_Value <= 250) {
                                        return '#00C700'; // 220~250 녹색
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
        <div id="CurrentgaugeR" ref={chartRef} className="CurrentgaugeR" />
    );
};

export default CurrentGauge;
