import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const RightChart3 = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const dom = chartRef.current;
    const myChart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false,
    });

    const option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        type: 'scroll',
        bottom: 10,
        data: (function () {
          const list = [];
          for (let i = 1; i <= 28; i++) {
            list.push(i + 2000 + '');
          }
          return list;
        })(),
      },
      radar: {
        top: 10, // 상단 여백을 추가하여 레이블이 잘리지 않도록 조정
        shape: 'circle',
        indicator: [
          { text: 'IE8-', max: 400 },
          { text: 'IE9+', max: 400 },
          { text: 'Safari', max: 400 },
        ],
      },
      series: (function () {
        const series = [];
        for (let i = 1; i <= 30; i++) {
          series.push({
            type: 'radar',
            symbol: 'none',
            lineStyle: {
              width: 0.5,
            },
            emphasis: {
              areaStyle: {
                color: 'rgba(0,250,0,0.3)',
              },
            },
            itemStyle: {
              color: ['#F04675'][i % 1],
            },
            data: [
              {
                value: [
                  (40 - i) * 10,
                  (38 - i) * 4 + 60,
                  i * 5 + 10,
                  i * 9,
                  (i * i) / 2,
                ],
              },
            ],
          });
        }
        return series;
      })(),
    };

    if (option && typeof option === 'object') {
      myChart.setOption(option);
    }

    const handleResize = () => {
      myChart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      myChart.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: '100px', height: '200px', marginTop:'-50px' }} />;
};

export default RightChart3;
