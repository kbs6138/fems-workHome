import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const TestChartDay = () => {
  const chartDomRef = useRef(null);

  useEffect(() => {
    const chartDom = chartDomRef.current;
    const myChart = echarts.init(chartDom);

    const option = {
      legend: {
        data: ['L1', 'L2', 'L3'],
        textStyle: {
          color: 'white',
          fontFamily: 'NanumSquareNeoBold',
        }
      },
      tooltip: {
        trigger: 'axis',
        textStyle: {
          color: 'black',
          fontFamily: 'NanumSquareNeoBold',
        },
      },
      grid: {
        left: '5%',
        right: '1%',
        top: '10%',
      },
      xAxis: {
        type: 'category',
        data: [
          '1일', '2일', '3일', '4일', '5일', '6일', '7일', '8일', '9일', '10일', '11일', '12일', '13일', '14일', '15일',
          '16일', '17일', '18일', '19일', '20일', '22일', '23일', '24일', '25일', '26일', '27일', '28일', '29일', '30일', '31일',
        ],
        axisLabel: {
          color: 'white',
          fontFamily: 'NanumSquareNeoBold',
        },
      },
      yAxis: {
        axisLabel: {
          color: 'white',
          fontFamily: 'NanumSquareNeoBold',
        },
      },
      dataZoom: [
        { startValue: 0 },
        { type: 'inside' },
      ],
      series: [
        {
          name: 'L1',
          type: 'line',
          data: [
            226.2, 226.9, 227.4, 227.9, 228.2, 228.3, 228.5, 228.9, 226.5, 226.9, 227.2, 227.1, 226.7, 226.6, 227, 227.1, 226.8, 226, 226.1, 225.7, 227.1, 227.8, 228.4, 227.7, 225.9, 219.8, 218.4, 217.3, 218.4, 217.8, 217.4,
          ],
          itemStyle: {
            color: '#00c700',
            fontFamily: 'NanumSquareNeoBold',
          },
        },
        {
          name: 'L2',
          type: 'line',
          data: [
            229.6, 230.2, 230.8, 231.3, 231.7, 231.7, 231.7, 232, 232.4, 232.4, 229.8, 230, 230.2, 230.3, 230.7, 230.5, 229.9, 230.2, 230.3, 230.1, 229.3, 229.3, 228.9, 228.1, 230.5, 231.2, 230.9, 229.3, 228.1, 224.3, 224.3,
          ],
          itemStyle: {
            color: '#f97289',
            fontFamily: 'NanumSquareNeoBold',
          },
        },
        {
          name: 'L3',
          type: 'line',
          data: [
            230.2, 231.1, 231.5, 231.9, 232.2, 232.3, 232.5, 232.9, 233, 230.4, 230.7, 230.7, 231.3, 231, 230.8, 230.7, 231, 231.1, 230.8, 230.1, 229.8, 228.9, 231.5, 232, 232.6, 231.9, 230, 228.3, 224.5, 228.3, 222,
          ],
          itemStyle: {
            color: '#7190f5',
            fontFamily: 'NanumSquareNeoBold',
          },
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return <div ref={chartDomRef} style={{ width: '100%', height: '330px', fontFamily: 'NanumSquareNeoBold' }} />;
};

export default TestChartDay;
