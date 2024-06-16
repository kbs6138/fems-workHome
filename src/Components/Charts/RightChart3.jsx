import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import './Charts.css';  // 필요한 CSS 파일을 import


const RightChart3 = () => {
  useEffect(() => {
    const chartDom = document.getElementById('RightChart3');
    const myChart = echarts.init(chartDom, null, {
      renderer: 'svg',
      useDirtyRect: false
    });

    const option = {
      color: ['#67F9D8', '#FFE434', '#56A040', '#FF917C'],
      radar: [
        {
          indicator: [
            { text: 'L1' },
            { text: 'L2' },
            { text: 'L3' }
          ],
          center: ['25%', '50%'],
          radius: 120,
          startAngle: 90,
          splitNumber: 4,
          shape: 'circle',
          axisName: {
            formatter: '【{value}】',
            color: '#428BD4'
          },
          splitArea: {
            areaStyle: {
              color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 10
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(211, 253, 250, 0.8)'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(211, 253, 250, 0.8)'
            }
          }
        },

      ],
      series: [
        {
          type: 'radar',
          emphasis: {
            lineStyle: {
              width: 1
            }
          },
          data: [
            {
              value: [100, 8, 2000],
              name: 'Data A'
            },
            {
              value: [60, 5,  1500],
              name: 'Data B',

            },
            {
              value: [200, 40,  2500],
              name: 'Data C',

            }
          ]
        },

      ]
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
    <div id="RightChart3" style={{ width: '600px', height: '200px' }}></div>
  );
};

export default RightChart3;
