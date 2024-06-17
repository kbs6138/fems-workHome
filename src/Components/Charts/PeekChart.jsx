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
      value = value + Math.random() * 20 - 10;  // 범위 조정
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
    let value = Math.random() * 1000;  // 초기값 조정

    for (let i = 0; i < 1500; i++) {
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
      const fontFamily = 'NanumSquareNeo';

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
          },
          textStyle: {
            fontFamily: fontFamily
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
            color: textColor,
            fontFamily: fontFamily,
            formatter: function (value) {
              const date = new Date(value);
              return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            }
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
            color: textColor,
            fontFamily: fontFamily
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
                  yAxis: 100, // 기준선의 y값 설정
                  label: {
                    formatter: 'Max',
                    color: textColor,
                    fontFamily: fontFamily
                  },
                  lineStyle: {
                    color: isDarkMode ? '#ff0000' : '#ff0000',
                    type: 'solid'
                  }
                }
              ]
            },
            label: {
              fontFamily: fontFamily
            }
          }
        ],
        textStyle: {
          fontFamily: fontFamily
        }
      };

      myChart.setOption(option);
    };

    updateChartOptions();

    const intervalId = setInterval(function () {
      for (let i = 0; i < 5; i++) {
        data.shift();
        data.push(randomData());
      }
      if (data.length > 1500) {
        data = data.slice(data.length - 1500);
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
