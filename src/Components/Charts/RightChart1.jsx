import React, { useEffect, useContext } from 'react';
import * as echarts from 'echarts';
import { ThemeContext } from '../ThemeContext'; // ThemeContext 경로는 프로젝트 구조에 맞게 수정
import './Charts.css';  // 필요한 CSS 파일을 import

const RightChart1 = () => {
    const { isDarkMode } = useContext(ThemeContext);

    useEffect(() => {
        const chartDom = document.getElementById('RightChart1');
        const myChart = echarts.init(chartDom);

        const option = {
            xAxis: {
                type: 'category',
                data: ['전일 사용', '당일 사용'],
                axisLabel: {
                    fontWeight: 'bold',
                    color: isDarkMode ? '#fff' : 'black',
                    fontSize: '14px',
                    fontFamily: 'NanumSquareNeo'
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
                        { value: 10000, name: '전일 사용' },
                        { value: 12600, name: '당일 사용' }
                    ],
                    type: 'bar',
                    showBackground: true,
                    itemStyle: {
                        color: (params) => params.name === '전일 사용'
                            ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                              { offset: 1, color: 'rgba(75, 115, 225, 0.5)' },
                              { offset: 0, color: 'rgba(88, 226, 193, 0.5)' }
                            ])
                            : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                              { offset: 1, color: 'rgba(75, 115, 225, 1)' },
                              { offset: 0, color: 'rgba(88, 226, 193, 1)' }
                            ])
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: (params) => `${params.value.toLocaleString()} Kw`,
                        fontWeight: 'bold',
                        fontSize: '15px',
                        fontFamily: 'NanumSquareNeo',
                        color: isDarkMode ? 'white' : 'black'
                    },

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
            id="RightChart1"
            className="RightChart1"
            style={{ width: '300px', height: '250px', position: 'absolute', top: '65%', left: '40%', transform: 'translate(-50%, -50%)' }}
        ></div>
    );
};

export default RightChart1;
