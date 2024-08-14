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

    // 게이지 데이터 설정
    const gaugeData = [
      {
        value: dataR || 0,
        name: 'L1',
        title: {
          offsetCenter: ['0%', '-60%'],
          textStyle: { color: '#FFFFFF', fontSize: 12 },
        },
        detail: {
          valueAnimation: true,
          offsetCenter: ['0%', '-40%'],
        },
        itemStyle: { color: 'rgb(0, 199, 0)' },
      },
      {
        value: dataS || 0,
        name: 'L2',
        title: {
          offsetCenter: ['0%', '-14%'],
          textStyle: { color: '#FFFFFF', fontSize: 12 },
        },
        detail: {
          valueAnimation: true,
          offsetCenter: ['0%', '8%'],
        },
        itemStyle: { color: 'rgb(252, 115, 138)' },
      },
      {
        value: dataT || 0,
        name: 'L3',
        title: {
          offsetCenter: ['0%', '33%'],
          textStyle: { color: '#FFFFFF', fontSize: 12 },
        },
        detail: {
          valueAnimation: true,
          offsetCenter: ['0%', '55%'],
        },
        itemStyle: { color: 'rgb(118, 150, 255)' },
      },
    ];

    // 차트 옵션 설정
    const option = {
      series: [
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: { show: false },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: { borderWidth: 1, borderColor: '#464646' },
          },
          axisLine: { lineStyle: { width: 20 } },
          splitLine: { show: false, distance: 0, length: 10 },
          axisTick: { show: false },
          axisLabel: { show: false, distance: 50 },
          data: gaugeData,
          title: { color: '#FFFFFF', fontSize: 12 },
          detail: {
            width: 50,
            height: 12,
            fontSize: 12,
            color: 'inherit',
            borderColor: 'inherit',
            borderRadius: 20,
            borderWidth: 1,
            formatter: '{value}%',
          },
        },
      ],
    };

    // 옵션을 차트에 설정
    myChart.setOption(option);

    // 리소스 정리
    return () => {
      myChart.dispose();
    };
  }, [dataR, dataS, dataT]);

  return (
    <div ref={chartRef} style={{ width: '100%', height: '280px', marginTop: '-40px' }}></div>
  );
};

export default DiagramDetailRSTChart;
