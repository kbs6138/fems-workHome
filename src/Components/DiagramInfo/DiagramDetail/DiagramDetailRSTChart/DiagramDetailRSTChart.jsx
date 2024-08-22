import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const DiagramDetailRSTChart = ({ dataR, dataS, dataT }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // 차트 인스턴스를 초기화합니다.
    const myChart = echarts.init(chartRef.current, null, {
      renderer: 'canvas',
      useDirtyRect: false,
    });

    // 레이더 차트 데이터 설정
    const option = {
      color: ['#FF0000'],
      radar: {
        indicator: [
          { name: 'L1', color: '#00C700' },
          { name: 'L2', color: '#FC738A' },
          { name: 'L3', color: '#7696ff' }
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
      },
      series: [
        {
          type: 'radar',
          emphasis: {
            lineStyle: {
              width: 1
            }
          },
          symbol: 'none', // 동그라미 점 포인트 제거
          data: [
            {
              value: [dataR || 0, dataS || 0, dataT || 0]
            }
          ],
          lineStyle: {
            width: 2 // 선 두께 설정
          }
        }
      ]
    };

    // 차트 옵션 설정
    myChart.setOption(option);

    // 리소스 정리
    const resizeChart = () => {
      myChart.resize();
    };

    window.addEventListener('resize', resizeChart);

    return () => {
      window.removeEventListener('resize', resizeChart);
      myChart.dispose();
    };
  }, [dataR, dataS, dataT]);

  return (
    <div ref={chartRef} style={{ width: '100%', height: '180px' }}></div>
  );
};

export default DiagramDetailRSTChart;
