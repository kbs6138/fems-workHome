import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const RightChart3 = () => {
  useEffect(() => {
    const chartDom = document.getElementById('chart-container');
    const myChart = echarts.init(chartDom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });

    const option = {
      title: {
        top: 10,
        left: 10
      },
      tooltip: {
        trigger: 'item'
      },
      visualMap: {
        top: 'middle',
        right: 10,
        color: ['#fff028', '#ffd324'],
        calculable: true
      },
      radar: [
        {
          indicator: [
            { text: 'L1', max: 600 },
            { text: 'L2', max: 500 },
            { text: 'L3', max: 300 }
          ],
          center: ['40%', '55%'],
          splitNumber: 3,
          shape: 'circle',
          axisName: {
            formatter: '【{value}】',
            color: '#ffffff'
          },
          splitArea: {
            areaStyle: {
              color: [
                {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: 'rgba(84, 184, 255, 0.2)' },
                    { offset: 1, color: 'rgba(126, 132, 255, 0.4)' }
                  ]
                },
                {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: 'rgba(126, 132, 255, 0.4)' },
                    { offset: 1, color: 'rgba(143, 10, 254, 0.2)' }
                  ]
                }
              ],
              shadowColor: 'rgba(0, 0, 0, 0.8)'
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(21, 253, 250, 0.8)'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(11, 253, 250, 0.8)'
            }
          }
        }
      ],
      series: (function () {
        const series = [];
        for (let i = 1; i <= 28; i++) {
          series.push({
            type: 'radar',
            symbol: 'none',
            lineStyle: {
              width: 1
            },
            emphasis: {
              areaStyle: {
                color: 'rgba(0,250,0,0.3)'
              }
            },
            data: [
              {
                value: [
                  (40 - i) * 10,
                  (38 - i) * 4 + 60,
                  i * 5 + 10,
                  i * 9,
                  (i * i) / 2
                ],
                name: i + 2000 + ''
              }
            ]
          });
        }
        return series;
      })()
    };

    if (option && typeof option === 'object') {
      myChart.setOption(option);
    }

    const resizeChart = () => {
      myChart.resize();
    };

    window.addEventListener('resize', resizeChart);

    return () => {
      window.removeEventListener('resize', resizeChart);
      myChart.dispose();
    };
  }, []);

  return (
    <div id="chart-container" style={{ width: '600px', height: '250px' }}></div>
  );
};

export default RightChart3;
