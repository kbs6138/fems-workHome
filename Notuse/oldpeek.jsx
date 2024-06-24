import React, { useEffect, useContext, useRef } from 'react';
import * as echarts from 'echarts';
import { ThemeContext } from '../src/Components/ThemeContext';
import { usePeekData } from '../src/Components/db/Peek_db';


const PeekChart = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const chartRef = useRef(null);

    useEffect(() => {
        const chartDom = chartRef.current;
        const myChart = echarts.init(chartDom);
        let option;

        const formatData = () => {
            const formattedData = [];
            const now = new Date(2024, 1, 1);
            for (let i = 0; i < 15; i++) {
                formattedData.push([
                    [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                    data[`min_${i + 1}`]
                ]);
                now.setMinutes(now.getMinutes() + 1);
            }
            return formattedData;
        };

        const getTextColor = () => {
            return isDarkMode ? '#ffffff' : '#000000';
        };

        const getGridLineColor = () => {
            return isDarkMode ? '#444444' : '#cccccc';
        };

        const updateChartOptions = () => {
            const textColor = getTextColor();
            const gridLineColor = getGridLineColor();
            const fontFamily = 'NanumSquareNeo';

            option = {
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        params = params[0];
                        var date = new Date(params.name);
                        return (
                            date.getDate() +
                            '/' +
                            (date.getMonth() + 1) +
                            '/' +
                            date.getFullYear() +
                            ' : ' +
                            params.value[1]
                        );
                    },
                    axisPointer: {
                        animation: false
                    },
                    textStyle: {
                        fontFamily: fontFamily
                    }
                },
                xAxis: {
                    type: 'time',
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: gridLineColor
                        }
                    },
                    axisLabel: {
                        color: textColor,
                        fontFamily: fontFamily,
                        formatter: function (value) {
                            const date = new Date(value);
                            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '10%'],
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: gridLineColor
                        }
                    },
                    axisLabel: {
                        color: textColor,
                        fontFamily: fontFamily
                    }
                },
                series: [
                    {
                        type: 'line',
                        showSymbol: false,
                        data: data,
                        markLine: {
                            data: [
                                {
                                    yAxis: 700, // 기준선의 y값 설정
                                    label: {
                                        formatter: 'Max',
                                        color: textColor,
                                        fontFamily: fontFamily
                                    },
                                    lineStyle: {
                                        color: isDarkMode ? '#ff0000' : '#ff0000',
                                        type: 'solid'
                                    }
                                }
                            ]
                        },
                        label: {
                            fontFamily: fontFamily
                        }
                    }
                ],
                textStyle: {
                    fontFamily: fontFamily
                }
            };

            myChart.setOption(option);
        };

        updateChartOptions();

        const intervalId = setInterval(function () {
            for (let i = 0; i < 5; i++) {
                data.shift();
                data.push(randomData());
            }
            if (data.length > 1500) {
                data = data.slice(data.length - 1500);
            }
            myChart.setOption({
                series: [
                    {
                        data: data
                    }
                ]
            });
        }, 1000);

        const handleResize = () => {
            myChart.resize();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener('resize', handleResize);
            myChart.dispose();
        };
    }, [isDarkMode]);

    return (
        <div id="Peekchart" className="Peekchart" ref={chartRef} />
    );
};

export default PeekChart;