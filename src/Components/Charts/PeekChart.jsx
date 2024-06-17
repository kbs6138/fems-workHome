import React, { useEffect, useContext, useRef } from 'react';
import * as echarts from 'echarts';
import { ThemeContext } from '../../Components/ThemeContext';

const PeekChart = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);
    let option;

    function randomData() {
      now = new Date(+now + oneDay);
      value = value + Math.random() * 21 - 10;
      return {
        name: now.toString(),
        value: [
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
          Math.round(value)
        ]
      };
    }

    let data = [];
    let now = new Date(2024, 1, 1);
    let oneDay = 24 * 3600 * 1000;
    let value = Math.random() * 1000;

    for (var i = 0; i < 1000; i++) {
      data.push(randomData());
    }

    const getTextColor = () => {
      return isDarkMode ? '#ffffff' : '#000000';
    };

    const getGridLineColor = () => {
      return isDarkMode ? '#444444' : '#cccccc';
    };

    const updateChartOptions = () => {
      const textColor = getTextColor();
      const gridLineColor = getGridLineColor();

      option = {
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return (
              date.getDate() +
              '/' +
              (date.getMonth() + 1) +
              '/' +
              date.getFullYear() +
              ' : ' +
              params.value[1]
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
              color: gridLineColor
            }
          },
          axisLabel: {
            color: textColor
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '10%'],
          splitLine: {
            show: true,
            lineStyle: {
              color: gridLineColor
            }
          },
          axisLabel: {
            color: textColor
          }
        },
        series: [
          {
            type: 'line',
            showSymbol: false,
            data: data,
            markLine: {
              data: [
                {
                  yAxis: 1000, // 기준선의 y값 설정
                  label: {
                    formatter: 'Max',
                    color: textColor
                  },
                  lineStyle: {
                    color: isDarkMode ? '#ff0000' : '#ff0000',
                    type: 'solid'
                  }
                }
              ]
            }
          }
        ]
      };

      myChart.setOption(option);
    };

    updateChartOptions();

    const intervalId = setInterval(function () {
      for (var i = 0; i < 5; i++) {
        data.shift();
        data.push(randomData());
      }
      myChart.setOption({
        series: [
          {
            data: data
          }
        ]
      });
    }, 100);

    const handleResize = () => {
      myChart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
      myChart.dispose();
    };
  }, [isDarkMode]);

  return (
    <div id="Peekchart" className="Peekchart" ref={chartRef} />
  );
};

export default PeekChart;
