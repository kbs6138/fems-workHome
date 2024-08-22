import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const OverCurrentTrendBarChartMonth = () => {
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
          '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'
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
            226.2, 226.9, 227.4, 227.9, 228.2, 228.3, 228.5, 228.9, 226.5, 226.9, 227.2, 227.1
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
            229.6, 230.2, 230.8, 231.3, 231.7, 231.7, 231.7, 232, 232.4, 232.4, 229.8, 230 
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
            230.2, 231.1, 231.5, 231.9, 232.2, 232.3, 232.5, 232.9, 233, 230.4, 230.7, 230.7
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

export default OverCurrentTrendBarChartMonth;
