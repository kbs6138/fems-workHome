import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const DiagramDetail_MinuteChart = ({ data, chartColor, Min, Max }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    function randomData() {
      const now = new Date();
      const value = data;
      return [now.getTime(), value];
    }

    if (chartData.length === 0) {
      const initialData = [];
      for (let i = 0; i < 60; i++) {
        initialData.push(randomData());
      }
      setChartData(initialData);
    }

    const option = {
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          const date = new Date(params[0].value[0]);
          return (
            `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} : ${params[0].value[1]}`
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
            color: '#696969',
            type: 'dashed'
          }
        },
        axisLabel: {
          color: function (value, index) {
            if (value === chartData[chartData.length - 1][0]) {
              return '#7CFC00';
            }
            return 'white';
          },
          formatter: function (value, index) {
            const date = new Date(value);
            if (value === chartData[0][0] || value === chartData[chartData.length - 1][0]) {
              const hours = date.getHours().toString().padStart(2, '0');
              const minutes = date.getMinutes().toString().padStart(2, '0');
              const seconds = date.getSeconds().toString().padStart(2, '0');
              return `${hours}:${minutes}:${seconds}`;
            }
            return '';
          },
          showMaxLabel: true,
          showMinLabel: true,
          fontSize: 10.5
        },
        axisLine: {
          show: true // x축 선 숨기기
        },
        axisTick: {
          show: true // x축 눈금 숨기기
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
            color: '#696969',
            type: 'dashed'
          }
        },
        axisLabel: {
          color: 'white',
          show: false, // y축 레이블 숨기기
          fontSize: 10.5
        },
        axisLine: {
          show: false // y축 선 숨기기
        },
        axisTick: {
          show: true // y축 눈금 숨기기
        }
      },
      series: [
        {
          type: 'line',
          showSymbol: false,
          data: chartData,
          lineStyle: {
            color: chartColor,
            width: 1.2
          },
          itemStyle: {
            color: chartColor
          },
          markPoint: {
            data: [
              {
                name: '현재값',
                coord: chartData[chartData.length - 1],
                itemStyle: {
                  color: 'red'
                },
                symbol: 'circle',
                symbolSize: 7,
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
      setChartData((prevData) => {
        const newData = [...prevData];
        newData.shift();
        newData.push(randomData());
        return newData;
      });

      myChart.setOption({
        xAxis: {
          axisLabel: {
            color: function (value, index) {
              if (value === chartData[chartData.length - 1][0]) {
                return '#7CFC00';
              }
              return 'white';
            },
            formatter: function (value, index) {
              const date = new Date(value);
              if (value === chartData[0][0] || value === chartData[chartData.length - 1][0]) {
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                const seconds = date.getSeconds().toString().padStart(2, '0');
                return `${hours}:${minutes}:${seconds}`;
              }
              return '';
            },
            showMaxLabel: true,
            showMinLabel: true,
            fontSize: 10.5
          },
        },
        series: [{ data: chartData }]
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [data, chartColor, Min, Max, chartData]);

  return (
    <div id='DiagramDetail_MinuteChart' ref={chartRef} style={{ width: '100%', height: '80px', background: 'rgb(42 ,63 ,97)', boxShadow: '0px 0px 10px 2px rgb(22, 42, 69)', borderRadius: '10px', marginTop: '5px', backgroundColor: '#263752' }} />
  );
};

export default DiagramDetail_MinuteChart;
