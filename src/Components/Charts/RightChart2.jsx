import React, { useEffect, useContext } from 'react';
import * as echarts from 'echarts';
import { ThemeContext } from '../ThemeContext'; // ThemeContext 경로는 프로젝트 구조에 맞게 수정
import './Charts.css';  // 필요한 CSS 파일을 import

const RightChart2 = () => {
    const { isDarkMode } = useContext(ThemeContext);

    useEffect(() => {
        const chartDom = document.getElementById('RightChart2');
        const myChart = echarts.init(chartDom);

        const option = {
            xAxis: {
                type: 'category',
                data: ['전일 역률', '당일 역률'],
                axisLabel: {
                    color: isDarkMode ? '#fff' : '#fff',
                    fontSize: '13px',
                    fontFamily: 'NanumSquareNeoBold'
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    show: false
                }
            },
            series: [
                {
                    data: [
                        { value: 90, name: '전일 역률' },
                        { value: 75, name: '당일 역률' }
                    ],
                    type: 'bar',
                    showBackground: true,
                    itemStyle: {
                        color: (params) => params.name === '전일 역률'
                            ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 1, color: 'rgba(255, 69, 0, 0.5)' },
                                { offset: 0, color: 'rgba(255, 18, 114, 0.5)' },
                            ])
                            : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 1, color: 'rgba(255, 69, 0, 1)' },
                                { offset: 0, color: 'rgba(255, 18, 114, 1)' },
                            ])
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: (params) => `${params.value.toLocaleString()} %`,
                        fontSize: '13px',
                        fontFamily: 'NanumSquareNeoBold',
                        color: isDarkMode ? 'white' : '#fff'
                    },
                    markLine: {
                        data: [
                            {
                                yAxis: 100,
                                label: {
                                    formatter: 'max : 100%',
                                    position: 'insideEndTop',
                                    fontSize: '10px',
                                    fontFamily: 'NanumSquareNeoExtraBold',
                                    color: isDarkMode ? 'white' : '#fff'
                                }
                            }
                        ],
                        lineStyle: {
                            color: 'red',
                            type: 'solid'
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
        return () => {
            myChart.dispose();
        };
    }, [isDarkMode]);
    return (
        <div
            id="RightChart2"
            className="right-chart-2"
            style={{ width: '230px', height: '225px', position: 'absolute', transform: 'translate(10%, -50%)', right: '0' }}
        ></div>
    );
};

export default RightChart2;
