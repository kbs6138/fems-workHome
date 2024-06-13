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
                data: ['전일 역률', '금일 역률'],
                axisLabel: {
                    fontWeight: 'bold', // X축 레이블 텍스트 굵기 설정
                    color: isDarkMode ? '#fff' : 'black',
                    fontSize: '15px',
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
                        { value: 90, name: '전일 역률' },
                        { value: 75, name: '금일 역률' }
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
                        formatter: (params) => `${params.value.toLocaleString()} Kw`,
                        fontWeight: 'bold', // 텍스트 굵기 설정
                        fontSize: '15px',
                        fontFamily: 'NanumSquareNeo',
                        color: 'white'
                    },
                    markLine: {
                        data: [
                            {
                                yAxis: 100,
                                label: {
                                    formatter: 'max : 100%',
                                    position: 'insideEndTop', // 레이블 위치를 그래프 안쪽으로 이동
                                    fontWeight: 'bold', // 텍스트 굵기 설정
                                    fontSize: '12px',
                                    fontFamily: 'NanumSquareNeo',
                                    color: 'white'
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
            className="RightChart2"
            style={{ width: '250px', height: '250px', position: 'absolute', top: '85%', left: '50%', transform: 'translate(-50%, -50%)' }} // 인라인 스타일로 부모 요소의 크기에 맞게 설정
        ></div>
    );
};

export default RightChart2;
