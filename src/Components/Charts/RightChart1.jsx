import React, { useEffect, useContext } from 'react';
import * as echarts from 'echarts';
import { ThemeContext } from '../ThemeContext';
import './Charts.css';

const RightChart1 = () => {
    const { isDarkMode } = useContext(ThemeContext);

    useEffect(() => {
        const chartDom = document.getElementById('RightChart1');


        const myChart = echarts.init(chartDom, null, { renderer: 'canvas' });

        const option = {
            xAxis: {
                type: 'category',
                data: ['전일 사용', '당일 사용'],
                axisLabel: {
                    color: isDarkMode ? '#fff' : '#000',
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
                        fontSize: '13px',
                        fontFamily: 'NanumSquareNeoBold',
                        color: isDarkMode ? '#fff' : '#000'
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
            id="RightChart1"
            className="right-chart-1"
            style={{ width: '230px', height: '225px', position: 'absolute', transform: 'translate(10%, -50%)', right: '0' }}
        ></div>
    );
};

export default RightChart1;
