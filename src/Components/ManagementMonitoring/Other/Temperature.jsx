import React, { useEffect, useRef, useContext } from 'react';
import * as echarts from 'echarts';
import { ThemeContext } from '../../ThemeContext';
import { useGaugeData } from '../../db/Gauge_db';

const Temperature = () => {
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
            const textColor = isDarkMode ? '#ffffff' : '#ffffff';
            const axisLineColor = isDarkMode ? '#ffffff' : '#ffffff';

            const gaugeValue = 50;// 데이터가 있으면 사용하고, 없으면 59 사용 data.length > 0 ? data[0].gaugeData : 59; 
    
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
                                if (value < 60) {
                                    statusText = '안전';
                                    statusColor = 'safe';
                                } else {
                                    statusText = '위험';
                                    statusColor = 'danger';
                                }
                                return `{${statusColor}|${statusText}}\n${value} ℃`;
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
                                danger: {
                                    color: '#ff3300',
                                    fontSize: 16,
                                    fontFamily: 'NanumSquareNeoBold',
                                }
                            }
                        },
                        data: [
                            { value: gaugeValue }
                        ],
                        axisLine: {
                            lineStyle: {
                                color: [
                                    [0.6, '#33cc33'],
                                    [1, '#ff3300']
                                ],
                                width: 4
                            }
                        },
                        axisLabel: {
                            color: axisLineColor,
                            interval: 10,
                        },
                        pointer: {
                            itemStyle: {
                                color: gaugeValue < 60 ? '#33cc33' : '#ff3300' // 60 이하 녹색, 그 이상 빨간색
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
        <div id="Temperature" ref={chartRef} className="Temperature"  style={{left:'50px'}} />
    );
};

export default Temperature;
