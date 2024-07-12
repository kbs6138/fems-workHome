import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const OverCurrentTrendChart = () => {
  const chartDomRef = useRef(null);

  useEffect(() => {
    const chartDom = chartDomRef.current;
    const myChart = echarts.init(chartDom);

    const option = {
      tooltip: {
        trigger: 'axis',
        textStyle: {
          color: 'black',
          fontFamily: 'NanumSquareNeoBold'
        }
      },
      grid: {
        left: '5%',
        right: '10%',
        bottom: '15%'
      },
      xAxis: {
        type: 'category',
        data: Array.from({ length: 591 }, (_, i) => i + 10),
        axisLabel: {
          color: 'white',
          fontFamily: 'NanumSquareNeoBold'
        }
      },
      yAxis: {
        axisLabel: {
          color: 'white',
          fontFamily: 'NanumSquareNeoBold'
        }
      },
      dataZoom: [
        {
          startValue: 10
        },
        {
          type: 'inside'
        }
      ],
      visualMap: {
        top: 50,
        right: 10,
        textStyle: {
          color: 'white',
          fontFamily: 'NanumSquareNeoBold'
        },
        pieces: [
          {
            gt: 0,
            lte: 50,
            color: '#93CE07'
          },
          {
            gt: 50,
            lte: 100,
            color: '#FBDB0F'
          },
          {
            gt: 100,
            lte: 150,
            color: '#FC7D02'
          },
          {
            gt: 150,
            lte: 200,
            color: '#FD0100'
          },
          {
            gt: 200,
            lte: 300,
            color: '#AA069F'
          },
          {
            gt: 300,
            color: '#AC3B2A'
          }
        ],
        outOfRange: {
          color: '#999'
        }
      },
      series: {
        type: 'line',
        data: Array.from({ length: 591 }, (_, i) => i + 10),
        itemStyle: {
          color: 'white',
          fontFamily: 'NanumSquareNeoBold'
        },
        markLine: {
          silent: true,
          lineStyle: {
            color: 'white',
            fontFamily: 'NanumSquareNeoBold'
          },
          data: [
            {
              yAxis: 50
            },
            {
              yAxis: 100
            },
            {
              yAxis: 150
            },
            {
              yAxis: 200
            },
            {
              yAxis: 300
            }
          ]
        }
      }
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return <div ref={chartDomRef} style={{ width: '100%', height: '600px', fontFamily: 'NanumSquareNeoBold' }} />;
};

export default OverCurrentTrendChart;
