import React, { useEffect, useRef, useContext } from 'react';
import * as echarts from 'echarts';
import { ThemeContext } from '../../../ThemeContext';
import { useGaugeData } from '../../../db/Gauge_db';

const OverCurrentS = () => {
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
}, [isDarkMode]); // 빈 배열로 초기화만 한 번 실행되도록 설정

useEffect(() => {
    const updateChartOptions = () => {
        const textColor = isDarkMode ? '#ffffff' : '#000000';
        const axisLineColor = isDarkMode ? '#ffffff' : '#000000';

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
                            let statusText = '';
                            let statusColor = '';
                            if (value < 70) {
                                statusText = 'L2';
                                statusColor = 'safe';
                            } else if (value <= 80) {
                                statusText = 'L2';
                                statusColor = 'caution';
                            } else {
                                statusText = 'L2';
                                statusColor = 'danger';
                            }
                            return `{${statusColor}|${statusText}}\n${value}A`;
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
                            value: data.length > 0 ? data[0].gaugeData : 0,
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
                            width: 5
                        }
                    },
                    axisLabel: {
                        color: axisLineColor,
                    },
                    pointer: {
                        itemStyle: {
                            color: (function () {
                                if (data.length > 0 && data[0].gaugeData < 70) {
                                    return '#33cc33'; // 안전 구간 바늘 색상
                                } else if (data.length > 0 && data[0].gaugeData < 80) {
                                    return '#ffcc00'; // 주의 구간 바늘 색상
                                } else {
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
}, [isDarkMode, data]); // 의존성 배열에 isDarkMode와 data 포함

return (
    <div id="OverCurrentS" ref={chartRef} className="OverCurrentS" />
);
};

export default OverCurrentS;