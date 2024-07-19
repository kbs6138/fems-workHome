import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const DiagramInfo_Chart = ({ VoltData }) => {
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
      title: {
        text: 'Dynamic Time Axis'
      },
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
          show: false
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false
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
  }, [VoltData]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default DiagramInfo_Chart;
