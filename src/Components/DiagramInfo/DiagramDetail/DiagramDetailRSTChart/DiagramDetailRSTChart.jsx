import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const DiagramDetailRSTChart = ({ dataR, dataS, dataT }) => {
  useEffect(() => {
    const chartDom = document.getElementById('DiagramDetailRSTChart');
    const myChart = echarts.init(chartDom, null, {
      renderer: 'canvas',
      useDirtyRect: false,
    });

    // 게이지 데이터 설정
    const gaugeData = [
      {
        value: dataR || 0,
        name: 'L1',
        title: {
          offsetCenter: ['0%', '-60%'],  // 여백 추가
          textStyle: {
            color: '#FFFFFF',  // 흰색 텍스트
            fontSize: 12       // 폰트 크기 12px
          }
        },
        detail: {
          valueAnimation: true,
          offsetCenter: ['0%', '-40%']  // 여백 추가
        },
        itemStyle: {
          color: 'rgb(0, 199, 0)'  // L1의 색상 설정
        }
      },
      {
        value: dataS || 0,
        name: 'L2',
        title: {
          offsetCenter: ['0%', '-14%'],  // 여백 추가
          textStyle: {
            color: '#FFFFFF',  // 흰색 텍스트
            fontSize: 12       // 폰트 크기 12px
          }
        },
        detail: {
          valueAnimation: true,
          offsetCenter: ['0%', '8%']  // 여백 추가
        },
        itemStyle: {
          color: 'rgb(252, 115, 138)'  // L2의 색상 설정
        }
      },
      {
        value: dataT || 0,
        name: 'L3',
        title: {
          offsetCenter: ['0%', '33%'],  // 여백 추가
          textStyle: {
            color: '#FFFFFF',  // 흰색 텍스트
            fontSize: 12       // 폰트 크기 12px
          }
        },
        detail: {
          valueAnimation: true,
          offsetCenter: ['0%', '55%']  // 여백 추가
        },
        itemStyle: {
          color: 'rgb(118, 150, 255)'  // L3의 색상 설정
        }
      }
    ];

    // 차트 옵션 설정
    const option = {
      series: [
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              borderWidth: 1,
              borderColor: '#464646'
            }
          },
          axisLine: {
            lineStyle: {
              width: 20
            }
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 10
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            distance: 50
          },
          data: gaugeData,
          title: {
            color: '#FFFFFF', // 흰색 텍스트 색상
            fontSize: 12      // 폰트 크기 12px
          },
          detail: {
            width: 50,
            height: 12,
            fontSize: 12,
            color: 'inherit',
            borderColor: 'inherit',
            borderRadius: 20,
            borderWidth: 1,
            formatter: '{value}%' // 데이터 값에 %를 붙임
          }
        }
      ]
    };

    // 옵션 설정
    option && myChart.setOption(option);

    // 윈도우 리사이즈 이벤트 추가
    const resizeChart = () => {
      myChart.resize();
    };
    window.addEventListener('resize', resizeChart);

    // 리소스 정리
    return () => {
      window.removeEventListener('resize', resizeChart);
      myChart.dispose();
    };
  }, [dataR, dataS, dataT]);

  return (
    <div id="DiagramDetailRSTChart" style={{ width: '100%', height: '280px', marginTop: '-40px' }}></div>
  );
};

export default DiagramDetailRSTChart;
