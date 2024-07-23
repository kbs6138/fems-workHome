import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const DiagramInfo_Chart = ({ VoltData, chartColor, Min, Max }) => {
  const chartRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);
    let option;

    function randomData() {
      const now = new Date(+new Date() + 1000 * 60 * 60 * 24);
      const value = VoltData;
      return [now.getTime(), value];
    }

    // 초기 데이터 생성
    if (data.length === 0) {
      const initialData = [];
      for (let i = 0; i < 500; i++) {
        initialData.push(randomData());
      }
      setData(initialData);
    }

    option = {
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          const date = new Date(params[0].value[0]);
          return (
            date.getDate() +
            '/' +
            (date.getMonth() + 1) +
            '/' +
            date.getFullYear() +
            ' ' +
            date.getHours() +
            ':' +
            date.getMinutes() +
            ':' +
            date.getSeconds() +
            ' : ' +
            params[0].value[1]
          );
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false,
        },
        axisLabel: {
          color: 'white', // x축 텍스트 색상 설정
          fontFamily: 'NanumSquareNeo', // 폰트 패밀리 설정
          show:false
        }
      },
      yAxis: {
        type: 'value',
        min: Min,
        max: Max,
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false
        },
        axisLabel: {
          color: 'white', // y축 텍스트 색상 설정
          fontFamily: 'NanumSquareNeo', // 폰트 패밀리 설정
        }
      },
      series: [
        {
          name: '전압 데이터',
          type: 'line',
          showSymbol: false,
          data: data,
          lineStyle: {
            color: chartColor,
            width: 1 // 선 두께 설정
          },
          itemStyle: {
            color: chartColor
          },
          markPoint: {
            data: [
              {
                name: '현재값',
                coord: data[data.length - 1], // 마지막 데이터 포인트의 좌표
                itemStyle: {
                  color: 'red' // 빨간색으로 설정
                },
                symbol: 'circle',
                symbolSize: 8, // 점의 크기 조절
                label: {
                  show: false // 라벨 숨기기
                },
              }
            ],
            // 현재 데이터의 마지막 점을 표시
            emphasis: {
              itemStyle: {
                color: 'red'
              }
            }
          }
        }
      ],
      textStyle: {
        fontFamily: 'NanumSquareNeo' // 전체 텍스트에 폰트 패밀리 설정
      }
    };

    myChart.setOption(option);

    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData];
        newData.shift();
        newData.push(randomData());
        return newData;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [VoltData, chartColor, Min, Max]);

  return <div ref={chartRef} style={{ width: '100%', height: '245px', marginTop: '-40px' }} />;
};

export default DiagramInfo_Chart;
