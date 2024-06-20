import React, { useEffect, useRef, useContext } from 'react';
import * as echarts from 'echarts';
import { ThemeContext } from '../../Components/ThemeContext';

const GaugeChart = () => {
    const chartRef = useRef(null);
    const { isDarkMode } = useContext(ThemeContext);

    useEffect(() => {
        const chartDom = chartRef.current;
        const myChart = echarts.init(chartDom);

        const updateChartOptions = () => {
            const textColor = isDarkMode ? '#ffffff' : '#000000';
            const axisLineColor = isDarkMode ? '#ffffff' : '#000000';

            const option = {
                animation: true,
                animationDuration: 1000,
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
                                let statusText = '';
                                let statusColor = '';
                                if (value < 70) {
                                    statusText = '안전';
                                    statusColor = 'safe';
                                } else if (value < 80) {
                                    statusText = '주의';
                                    statusColor = 'caution';
                                } else {
                                    statusText = '위험';
                                    statusColor = 'danger';
                                }
                                return `{${statusColor}|${statusText}}\n${value}%`;
                            },
                            fontSize: 15,
                            color: textColor,
                            fontFamily: 'NanumSquareNeoBold',
                            rich: {
                                safe: {
                                    color: '#33cc33',
                                    fontSize: 16,
                                    fontFamily: 'NanumSquareNeoBold',
                                },
                                caution: {
                                    color: '#ffcc00',
                                    fontSize: 16,
                                    fontFamily: 'NanumSquareNeoBold',
                                },
                                danger: {
                                    color: '#ff3300',
                                    fontSize: 16,
                                    fontFamily: 'NanumSquareNeoBold',
                                }
                            }
                        },
                        data: [
                            {
                                value: 50,
                                name: ''
                            }
                        ],
                        axisLine: {
                            lineStyle: {
                                color: [
                                    [0.7, '#33cc33'],
                                    [0.8, '#ffcc00'],
                                    [1, '#ff3300']
                                ],
                                width: 10
                            }
                        },
                        axisLabel: {
                            color: axisLineColor,
                        },
                    }
                ]
            };

            myChart.setOption(option);
        };

        updateChartOptions();

        return () => {
            myChart.dispose();
        };
    }, [isDarkMode]);

    return (
        <div id="gauge" ref={chartRef} className="gauge" />
    );
};

export default GaugeChart;
