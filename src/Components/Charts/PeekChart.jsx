import React, { useEffect, useContext, useRef } from 'react';
import * as echarts from 'echarts';
import { ThemeContext } from '../../Components/ThemeContext';
import { usePeekData } from '../db/Peek_db';

const PeekChart = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const chartRef = useRef(null);
  const { data } = usePeekData();

  useEffect(() => {
    const chartDom = chartRef.current;
    let myChart = echarts.init(chartDom);
    let option;

    const formatData = () => {
      const formattedData = [];
      const now = new Date(2024, 1, 1);
      for (let i = 0; i < 15; i++) {
        formattedData.push([
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
          data[`min_${i + 1}`]
        ]);
        now.setMinutes(now.getMinutes() + 1);
      }
      return formattedData;
    };

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
      const formattedData = formatData();

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
              params.value
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
          type: 'category',
          data: formattedData.map(item => item[0]),
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
            data: formattedData.map(item => item[1]),
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

    return () => {
      myChart.dispose();
    };
  }, [isDarkMode, data]);

  return (
    <div id="Peekchart" className="Peekchart" ref={chartRef} />
  );
};

export default PeekChart;
