import React, { useEffect, useRef, useContext } from 'react';
import * as echarts from 'echarts';
import { ThemeContext } from '../../ThemeContext';
import { useGaugeData } from '../../db/Gauge_db';

const OverCurrentR = ({ Name, OverCurrentValue, NameColor, OverCurrentFirstArea, OverCurrentSecondArea, OverCurrentThirdArea }) => {
    const { data } = useGaugeData();
    const chartRef = useRef(null);
    const { isDarkMode } = useContext(ThemeContext);
    const myChart = useRef(null);

    useEffect(() => {
        const chartDom = chartRef.current;
        myChart.current = echarts.init(chartDom);

        return () => {
            myChart.current.dispose();
        };
    }, [isDarkMode, Name, OverCurrentValue, OverCurrentFirstArea, OverCurrentSecondArea, OverCurrentThirdArea]);

    useEffect(() => {
        const updateChartOptions = () => {
            if (!data) {
                return;
            }

            const textColor = NameColor; // NameColor로 텍스트 색상 설정
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
                                return `${statusText}\n${OverCurrentValue}A`;
                            },
                            fontSize: 12,
                            color: textColor, // NameColor로 텍스트 색상 적용
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
                                })(),
                                shadowColor: 'rgba(0, 0, 0, 0.5)', // 그림자 색상
                                shadowBlur: 10, // 그림자 흐림 정도
                                shadowOffsetX: 2, // 그림자 수평 오프셋
                                shadowOffsetY: 2 // 그림자 수직 오프셋
                            },
                            animation: true,
                            animationDuration: 300,
                            animationEasing: 'linear'
                        }
                    }
                ]
            };

            myChart.current.setOption(option);
        };

        if (myChart.current) {
            updateChartOptions();
        }
    }, [isDarkMode, data, OverCurrentValue, Name, NameColor, OverCurrentFirstArea, OverCurrentSecondArea, OverCurrentThirdArea]);

    return (
        <div id="OverCurrentR" ref={chartRef} className="OverCurrentR" />
    );
};

export default OverCurrentR;
