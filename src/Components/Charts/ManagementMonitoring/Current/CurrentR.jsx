import React, { useEffect, useRef, useContext } from 'react';
import * as echarts from 'echarts';
import { ThemeContext } from '../../../ThemeContext';
import { useCurrentRData } from './CurrentGauge_db';

const CurrentGauge = ({ CurrentVolt, Name, NameColor, MovePointer }) => {
    const { data } = useCurrentRData();
    const chartRef = useRef(null);
    const { isDarkMode } = useContext(ThemeContext);
    const myChart = useRef(null);

    useEffect(() => {
        const chartDom = chartRef.current;
        myChart.current = echarts.init(chartDom);

        //console.log(CurrentVolt, Name, NameColor, MovePointer);

        return () => {
            myChart.current.dispose();
        };
    }, [CurrentVolt, Name, NameColor, MovePointer]);

    useEffect(() => {
        const updateChartOptions = () => {
            const textColor = isDarkMode ? '#ffffff' : '#ffffff';
            const axisLineColor = isDarkMode ? '#ffffff' : '#ffffff';
            const WarningArea = data.length > 0 ? data[0].max_am1 : 0;

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
                                    [WarningArea, '#FF0000'],
                                    [0.5, '#00C700'],
                                    [1, '#FF0000']
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
                                })()
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
                const currentValue = MovePointer;
                myChart.current.setOption({
                    series: [{
                        data: [{ value: MovePointer - 5 }]
                    }]
                });

                setTimeout(() => {
                    myChart.current.setOption({
                        series: [{
                            data: [{ value: currentValue + 5 }]
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
    }, [isDarkMode, data, CurrentVolt, MovePointer, Name]);


    return (
        <div id="CurrentgaugeR" ref={chartRef} className="CurrentgaugeR" />
    );
};

export default CurrentGauge;
