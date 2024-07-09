import React, { useEffect, useRef, useContext } from 'react';
import * as echarts from 'echarts';
import { ThemeContext } from '../../../ThemeContext';
import { useGaugeData } from '../../../db/Gauge_db';

const OverCurrentR = ({ Name, OverCurrentValue, NameColor, OverCurrentFirstArea, OverCurrentSecondArea, OverCurrentThirdArea }) => {
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
    }, [isDarkMode, Name, OverCurrentValue, OverCurrentFirstArea, OverCurrentSecondArea, OverCurrentThirdArea]); // 빈 배열로 초기화만 한 번 실행되도록 설정

    useEffect(() => {
        const updateChartOptions = () => {
            const textColor = isDarkMode ? '#ffffff' : '#ffffff';
            const axisLineColor = isDarkMode ? '#ffffff' : '#ffffff';

            console.log(OverCurrentThirdArea);

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
                                return `${statusText}\n${OverCurrentValue}A`;
                            },
                            fontSize: 13,
                            color: textColor,
                            fontFamily: 'NanumSquareNeoExtraBold',
                        },
                        data: [
                            {
                                value: OverCurrentValue,
                            }
                        ],
                        axisLine: {
                            lineStyle: {
                                color: [
                                    [OverCurrentFirstArea, '#33cc33'],
                                    [OverCurrentSecondArea, '#ffcc00'],
                                    [OverCurrentThirdArea, '#ff3300']
                                    
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
                                    if (OverCurrentValue <= 30) {
                                        return '#33cc33'; // 안전 구간 바늘 색상
                                    } else if (OverCurrentValue > 30 && OverCurrentValue <= 39) {
                                        return '#ffcc00'; // 주의 구간 바늘 색상
                                    } else if (OverCurrentValue > 39 && OverCurrentValue <= 100) {
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
    }, [isDarkMode, data, OverCurrentValue, Name, NameColor, OverCurrentFirstArea, OverCurrentSecondArea, OverCurrentThirdArea]); // 의존성 배열에 isDarkMode와 data 포함

    return (
        <div id="OverCurrentR" ref={chartRef} className="OverCurrentR" />
    );
};

export default OverCurrentR;
