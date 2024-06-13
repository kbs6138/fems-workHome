// PeekChart.jsx
import React, { useEffect, useContext } from 'react';
import * as echarts from 'echarts';
import { ThemeContext } from '../../Components/ThemeContext';

const PeekChart = () => {
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    var chartDom = document.getElementById('Peekchart');
    var myChart = echarts.init(chartDom);
    var option;

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
    let now = new Date(1997, 9, 3);
    let oneDay = 24 * 3600 * 1000;
    let value = Math.random() * 1000;

    for (var i = 0; i < 1000; i++) {
      data.push(randomData());
    }

    const getTextColor = () => {
      return isDarkMode ? '#ffffff' : '#000000';
    };

    const updateChartOptions = () => {
      const textColor = getTextColor();

      option = {
        title: {
          text: 'Dynamic Data & Time Axis',
          textStyle: {
            color: textColor
          }
        },
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
            show: false
          },
          axisLabel: {
            color: textColor
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          },
          axisLabel: {
            color: textColor
          }
        },
        series: [
          {
            name: 'Fake Data',
            type: 'line',
            showSymbol: false,
            data: data
          }
        ]
      };

      myChart.setOption(option);
    };

    updateChartOptions();

    setInterval(function () {
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
    }, 1000);

    return () => {
      myChart.dispose();
    };
  }, [isDarkMode]);

  return <div id="Peekchart" style={{ width: '100%', height: '500px' }}></div>;
};

export default PeekChart;
