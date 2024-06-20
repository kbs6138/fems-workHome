import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import './Charts.css';  // 필요한 CSS 파일을 import


const RightChart3 = () => {
  useEffect(() => {
    const chartDom = document.getElementById('RightChart3');
    const myChart = echarts.init(chartDom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });

    const option = {
      color: ['#00C700','#FC738A', '#7696ff'],
      radar: [
        {
          indicator: [
            { name: 'L1' },
            { name: 'L2' },
            { name: 'L3' }
          ],
          center: ['50%', '60%'],
          radius: 45,
          startAngle: 90,
          splitNumber: 4,
          shape: 'circle',
          axisName: {
            formatter: '【{value}】',
            color: '#428BD4'
          },
          splitArea: {
            areaStyle: {
              color: ['#313946', '#313946', '#546A82', '#8B99B3'],
              shadowColor: 'rgba(0, 0, 0, 0.8)',
              shadowBlur: 10
            }
          },
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
              value: [150, 25,  1500],
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
    <div id="RightChart3" style={{ width: '100%', height: '130px', marginTop:'-20px' }}></div>
  );
};

export default RightChart3;
