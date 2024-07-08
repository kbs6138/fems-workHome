import React, { useEffect, useRef, useContext } from 'react';
import * as echarts from 'echarts';
import { ThemeContext } from '../../../ThemeContext';
import { useCurrentRData } from './CurrentGauge_db';

const CurrentGauge = ({ Volt, Name, NameColor, MovePointer, FirstArea, SecondArea, ThirdArea }) => {
    const { data } = useCurrentRData();
    const chartRef = useRef(null);
    const { isDarkMode } = useContext(ThemeContext);
    const myChart = useRef(null);

    useEffect(() => {
        const chartDom = chartRef.current;
        myChart.current = echarts.init(chartDom);

        //console.log(Volt, Name, NameColor, MovePointer);

        return () => {
            myChart.current.dispose();
        };
    }, [Volt, Name, NameColor, MovePointer, FirstArea, SecondArea, ThirdArea]);

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
                                return `${statusText}\n${Volt}V`;
                            },
                            fontSize: 12,
                            color: textColor,
                            fontFamily: 'NanumSquareNeoExtraBold',
                        },
                        data: [
                            {
                                value: Volt
                            }
                        ],
                        axisLine: {
                            lineStyle: {
                                color: [
                                    [FirstArea, '#FF0000'],
                                    [SecondArea, '#00C700'],
                                    [ThirdArea, '#FF0000']
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
                                    if (Volt <= 180) {
                                        return '#FF0000';
                                    } else if (Volt > 180 && Volt <= 220) {
                                        return '#00C700';
                                    } else if (Volt > 220 && Volt <= 250) {
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
                const currentValue = Volt;
                myChart.current.setOption({
                    series: [{
                        data: [{ value: Volt - 2 }]
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
    }, [isDarkMode, data, Volt, MovePointer, Name, FirstArea, SecondArea, ThirdArea]);


    return (
        <div id="CurrentgaugeR" ref={chartRef} className="CurrentgaugeR" />
    );
};

export default CurrentGauge;
