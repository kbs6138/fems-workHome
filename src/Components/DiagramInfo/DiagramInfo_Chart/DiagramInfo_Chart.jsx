// DiagramInfo_Chart.js
import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const DiagramInfo_Chart = ({ dataS, chartColor, Min, Max, data }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    function randomData() {
      const now = new Date();
      const value = (dataS, data);

      return [now.getTime(), value];
    }

    if (chartData.length === 0) {
      const initialData = [];
      for (let i = 0; i < 6000; i++) {
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
          fontSize: 10.5 // Set the font size to 10px
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
          fontSize: 10.5 // Set the font size to 10px
        }
      },
      series: [
        {
          type: 'line',
          showSymbol: false,
          data: chartData,
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
                coord: chartData[chartData.length - 1],
                itemStyle: {
                  color: 'red'
                },
                symbol: 'circle',
                symbolSize: 10,
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
            fontSize: 10.5 // Set the font size to 10px
          },
        },
        series: [{ data: chartData }]
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dataS, chartColor, Min, Max, chartData, data]);

  return <div ref={chartRef} style={{ width: '495px', height: '230px', marginTop: '-50px', marginLeft: '-10px' }} />;
};

export default DiagramInfo_Chart;
