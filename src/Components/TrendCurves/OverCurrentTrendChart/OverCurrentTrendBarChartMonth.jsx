import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const OverCurrentTrendBarChartMonth = () => {
  const chartDomRef = useRef(null);

  useEffect(() => {
    const chartDom = chartDomRef.current;
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
      },
      tooltip: {
        trigger: 'axis',
        textStyle: {
          color: 'black',
          fontFamily: 'NanumSquareNeo',
          fontSize: 12 
        },
      },
      legend: {
        data: ['L1', 'L2', 'L3'],
        textStyle: {
          color: 'white',
          fontFamily: 'NanumSquareNeoBold',
          fontSize: 12,
        },
        top: '3%',  // 위치 설정 (위에서 5% 아래)
        left: 'center', // 중앙 정렬
        // itemWidth: 12,  // 아이콘 너비
        // itemHeight: 12, // 아이콘 높이
        selectedMode: 'multiple', // 다중 선택 가능 (기본값이므로 생략 가능)
      },
      grid: {
        left: '3%',
        right: '0%',
        bottom:'20%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: ['1월', '2월', '3월', '4월', '5월', '6월','7월', '8월', '9월', '10월', '11월', '12월'],
        axisLabel: {
          color: 'white',
          fontFamily: 'NanumSquareNeoBold',
          fontSize: 10
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: 'white',
          fontFamily: 'NanumSquareNeoBold',
          fontSize: 10
        }
      },
      series: [
        {
          name: 'L1',
          type: 'bar',
          color:'#00c700',
          data: [229.3,226.3,227.1,227.4,227.8,227.3,228.4,220.1,216.6,218.5,217.6,217.9],
        },
        {
          name: 'L2',
          type: 'bar',
          color: '#f97289',
          data: [224.9,221.4,223.3,222.9,222.2,226.2,222.6,232,230,230.9,231.2,231.5],
        },
        {
          name: 'L3',
          type: 'bar',
          color: '#7190f5',
          data: [232.4,230,231.1,231.4,231.7,231.2,230.2,227.8,224.9,221.2,223.1,222.4],
        },
      ],
    };

    myChart.setOption(option);

    const handleResize = () => {
      myChart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      myChart.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      id='OverCurrentTrendChart'
      ref={chartDomRef}
      style={{ width: '100%', height: '400px' }}
    />
  );
};

export default OverCurrentTrendBarChartMonth;
