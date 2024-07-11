import React, { useEffect, useRef, useContext } from 'react';
import * as echarts from 'echarts';
import { ThemeContext } from '../../ThemeContext';
import { useCurrentRData } from './CurrentGauge_db';

const CurrentGauge = ({ CurrentVolt, Name, NameColor, MovePointer, CurrentFirstArea, CurrentSecondArea, CurrentThirdArea }) => {
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
    }, [CurrentVolt, Name, NameColor, MovePointer, CurrentFirstArea, CurrentSecondArea, CurrentThirdArea]);

    useEffect(() => {
        const updateChartOptions = () => {
            if (!data) {
                return; // 데이터가 없는 경우 차트 업데이트를 건너뜀
            }

            const textColor = isDarkMode ? '#ffffff' : '#ffffff';
            const axisLineColor = isDarkMode ? '#ffffff' : '#ffffff';

            const option = {
                series: [
                    {
                        name: 'Pressure',
                        type: 'gauge',
                        min: 0,
                        max: 500,
                        splitNumber: 5,
                        detail: {
                            formatter: function (value) {
                                let statusText = Name;
                                return `${statusText}\n${CurrentVolt}V`;
                            },
                            fontSize: 12,
                            color: textColor,
                            fontFamily: 'NanumSquareNeoExtraBold',
                        },
                        data: [
                            {
                                value: CurrentVolt
                            }
                        ],
                        axisLine: {
                            lineStyle: {
                                color: [
                                    [CurrentFirstArea, '#FF0000'],
                                    [CurrentSecondArea, '#00C700'],
                                    [CurrentThirdArea, '#FF0000']
                                ],
                                width: 3
                            }
                        },
                        axisLabel: {
                            color: axisLineColor,
                            interval: 100,
                        },
                        pointer: {
                            itemStyle: {
                                color: (function () {
                                    if (CurrentVolt <= 180) {
                                        return '#FF0000';
                                    } else if (CurrentVolt > 180 && CurrentVolt <= 220) {
                                        return '#00C700';
                                    } else if (CurrentVolt > 220 && CurrentVolt <= 250) {
                                        return '#00C700';
                                    } else {
                                        return '#FF0000';
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

            // 애니메이션 반복 설정
            const animatePointer = () => {
                const currentValue = CurrentVolt;
                myChart.current.setOption({
                    series: [{
                        data: [{ value: CurrentVolt - 2 }]
                    }]
                });

                setTimeout(() => {
                    myChart.current.setOption({
                        series: [{
                            data: [{ value: currentValue + 2 }]
                        }]
                    });
                }, 100);
            };

            const intervalId = setInterval(animatePointer, 500);

            return () => {
                clearInterval(intervalId);
            };
        };

        if (myChart.current) {
            updateChartOptions();
        }
    }, [isDarkMode, data, CurrentVolt, MovePointer, Name, CurrentFirstArea, CurrentSecondArea, CurrentThirdArea]);

    return (
        <div id="CurrentgaugeR" ref={chartRef} className="CurrentgaugeR" style={{ left: '-20px' }} />
    );
};

export default CurrentGauge;
