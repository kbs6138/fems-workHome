import React, { useEffect, useRef, useContext } from 'react';
import * as echarts from 'echarts';
import { debounce } from 'lodash';
import { ThemeContext } from '../../Components/ThemeContext';

const GaugeChart = () => {
    const chartRef = useRef(null);
    const { isDarkMode } = useContext(ThemeContext);

    useEffect(() => {
        const chartDom = chartRef.current;
        const myChart = echarts.init(chartDom);

        const updateChartOptions = () => {
            const textColor = isDarkMode ? '#ffffff' : '#000000';
            const axisLineColor = isDarkMode ? '#ffffff' : '#000000';  // 축 색상 설정

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
                                if (value < 70) {
                                    statusText = '안전';
                                } else if (value < 80) {
                                    statusText = '주의';
                                } else {
                                    statusText = '위험';
                                }
                                return `${statusText}\n${value}%`;
                            },
                            fontSize: 20,
                            color: textColor, // 텍스트 색상 설정
                        },
                        data: [
                            {
                                value: 60,
                                name: ''  // name은 formatter에서 설정
                            }
                        ],
                        axisLine: {
                            lineStyle: {
                                color: [
                                    [0.7, '#33cc33'], // 0~70%는 초록색
                                    [0.8, '#ffcc00'], // 70~80%는 노란색
                                    [1, '#ff3300']   // 80~100%는 빨간색
                                ],
                                width: 10
                            }
                        },
                        axisLabel: {
                            color: axisLineColor, // 축 라벨 색상 설정
                        },
                        title: {
                            show: true,
                            offsetCenter: [0, '70%'],
                            fontSize: 20,
                            color: textColor, // 제목 색상 설정
                        }
                    }
                ]
            };

            myChart.setOption(option);
        };

        updateChartOptions();

        const handleResize = debounce(() => {
            myChart.resize();
        }, 300);

        window.addEventListener('resize', handleResize);

        return () => {
            myChart.dispose();
            window.removeEventListener('resize', handleResize);
        };
    }, [isDarkMode]);

    return (
        <div className="gauge-container">
            <div id="gauge" ref={chartRef} className="gauge" />
        </div>
    );
};

export default GaugeChart;
