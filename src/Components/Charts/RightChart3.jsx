import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import './Charts.css';
import { useRightChart3Data } from '../db/RightChart3_db';

const RightChart3 = () => {
  const { data } = useRightChart3Data();

  //console.log(data);
  useEffect(() => {
    const chartDom = document.getElementById('RightChart3');
    const myChart = echarts.init(chartDom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });


    const option = {
      color: ['#FF0000'],
      radar: [
        {
          indicator: [
            {
              name: 'L1',
              color: '#00C700'
            },
            {
              name: 'L2',
              color: '#FC738A'
            },
            {
              name: 'L3',
              color: '#7696ff'
            }
          ],
          center: ['50%', '60%'],
          radius: 50,
          startAngle: 90,
          splitNumber: 4,
          shape: 'circle',
          axisName: {
            formatter: '【{value}】',
            color: '#428BD4'
          },
          splitArea: {
            areaStyle: {
              color: ['#313946'],
              shadowColor: 'rgba(0, 0, 0, 0.8)',
              shadowBlur: 10
            }
          }
        }
      ],
      series: [
        {
          type: 'radar',
          emphasis: {
            lineStyle: {
              width: 1
            }
          },
          symbol: 'none', // 동그라미 점 포인트 제거
          data: Array.isArray(data) && data.length > 0 ? data.map(item => ({
            value: [item.r, item.s, item.t]
          })) : [{ value: [0, 0, 0] }],
          lineStyle: {
            width: 0.3 // 선 두께 설정
          }
        }
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
  }, [data]);

  return (
    <div id="RightChart3" style={{ width: '100%', height: '140px', marginTop: '-20px' }}></div>
  );
};

export default RightChart3;

