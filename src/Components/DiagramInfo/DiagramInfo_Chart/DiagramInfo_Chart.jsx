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
      const now = new Date();
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
          show: true,
          lineStyle: {
            color: '#696969', // 그리드 선 색상 설정
            type: 'dashed' // 그리드 선 스타일 설정 (점선)
          }
        },
        axisLabel: {
          color: 'white',
          fontFamily: 'NanumSquareNeo',
          formatter: function (value, index) {
            const date = new Date(value);
            if (value === data[0][0] || value === data[data.length - 1][0]) {
              const hours = date.getHours().toString().padStart(2, '0');
              const minutes = date.getMinutes().toString().padStart(2, '0');
              const seconds = date.getSeconds().toString().padStart(2, '0');
              return `${hours}:${minutes}:${seconds}`;
            }
            return '';
          },
          showMaxLabel: true,
          showMinLabel: true,
        }
      },
      yAxis: {
        type: 'value',
        min: Min,
        max: Max,
        boundaryGap: [0, '100%'],
        splitLine: {
          show: true,
          lineStyle: {
            color: '#696969', // 그리드 선 색상 설정
            type: 'dashed' // 그리드 선 스타일 설정 (점선)
          }
        },
        axisLabel: {
          color: 'white',
          fontFamily: 'NanumSquareNeo',
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
            width: 2
          },
          itemStyle: {
            color: chartColor
          },
          markPoint: {
            data: [
              {
                name: '현재값',
                coord: data[data.length - 1],
                itemStyle: {
                  color: 'red'
                },
                symbol: 'circle',
                symbolSize: 8,
                label: {
                  show: false
                },
              }
            ],
            emphasis: {
              itemStyle: {
                color: 'red'
              }
            }
          }
        }
      ],
      textStyle: {
        fontFamily: 'NanumSquareNeo'
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

      myChart.setOption({
        xAxis: {
          axisLabel: {
            formatter: function (value, index) {
              const date = new Date(value);
              if (value === data[0][0] || value === data[data.length - 1][0]) {
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                const seconds = date.getSeconds().toString().padStart(2, '0');
                return `${hours}:${minutes}:${seconds}`;
              }
              return '';
            },
          },
        },
        series: [{ data }]
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [VoltData, chartColor, Min, Max]);

  return <div ref={chartRef} style={{ width: '100%', height: '245px', marginTop: '-40px' }} />;
};

export default DiagramInfo_Chart;
