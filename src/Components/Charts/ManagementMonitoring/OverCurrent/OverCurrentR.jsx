import React, { useEffect, useRef, useContext } from 'react';
import * as echarts from 'echarts';
import { ThemeContext } from '../../../ThemeContext';
import { useGaugeData } from '../../../db/Gauge_db';

const OverCurrentR = ({ Name, OverCurrentVolt, NameColor }) => {
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
    }, [isDarkMode, Name, OverCurrentVolt]); // 빈 배열로 초기화만 한 번 실행되도록 설정

    useEffect(() => {
        const updateChartOptions = () => {
            const textColor = isDarkMode ? '#ffffff' : '#ffffff';
            const axisLineColor = isDarkMode ? '#ffffff' : '#ffffff';

            const option = {
                animation: true,
                animationDuration: 10000,
                animationEasing: 'cubicOut',
                tooltip: {
                    formatter: '{a} <br/>{b} : {c}%'
                },
                series: [
                    {
                        name: 'Pressure',
                        type: 'gauge',
                        detail: {
                            formatter: function (value) {
                                let statusText = Name;
                                return `${statusText}\n${OverCurrentVolt}A`;
                            },
                            fontSize: 13,
                            color: textColor,
                            fontFamily: 'NanumSquareNeoExtraBold',
                        },
                        data: [
                            {
                                value: OverCurrentVolt,
                                // value: data.length > 0 ? data[0].gaugeData : 0,
                                name: ''
                            }
                        ],
                        axisLine: {
                            lineStyle: {
                                color: [
                                    [0.3, '#33cc33'],
                                    [0.35, '#ffcc00'],
                                    [1, '#ff3300']
                                ],
                                width: 3
                            }
                        },
                        axisLabel: {
                            color: axisLineColor,
                        },
                        pointer: {
                            itemStyle: {
                                color: (function () {
                                    if (OverCurrentVolt <= 30) {
                                        return '#33cc33'; // 안전 구간 바늘 색상
                                    } else if (OverCurrentVolt > 30 && OverCurrentVolt <= 35) {
                                        return '#ffcc00'; // 주의 구간 바늘 색상
                                    } else if (OverCurrentVolt > 35 && OverCurrentVolt <= 100) {
                                        return '#ff3300'; // 위험 구간 바늘 색상
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
    }, [isDarkMode, data, OverCurrentVolt, Name,NameColor]); // 의존성 배열에 isDarkMode와 data 포함

    return (
        <div id="OverCurrentR" ref={chartRef} className="OverCurrentR" />
    );
};

export default OverCurrentR;
