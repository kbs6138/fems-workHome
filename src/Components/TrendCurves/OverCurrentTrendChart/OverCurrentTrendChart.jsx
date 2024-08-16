import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const OverCurrentTrendChart = ({ TrendData, selectedTimeUnit }) => {
  const [data, setData] = useState([]);
  const chartDomRef = useRef(null);

  //selectedTimeUnit은 object여서 object내에 timeunit을 추출해서 새로운 timeunit 변수에 정수로 저장해줌
  const timeUnit = selectedTimeUnit.timeUnit;

  useEffect(() => {
    if (Array.isArray(TrendData)) {
      const filteredData = TrendData.filter((item, index) => {
        if (timeUnit === 60) {
          // 시간 단위로 필터링 (중복 제거)
          return index === 0 || TrendData[index - 1].hr !== item.hr;
        } else {
          // 분 단위로 필터링
          return item.min % timeUnit === 0;
        }
      });
      setData(filteredData);
    } else {
      console.error("TrendData is not an array");
    }
  }, [TrendData, timeUnit]);

  useEffect(() => {
    if (!data || data.length === 0) {
      return;
    }

    const chartDom = chartDomRef.current;
    const myChart = echarts.init(chartDom);

    const xData = data.map(item => `${item.hr}:${item.min}`);

    const rData = data.map(item => item.volt_r);
    const sData = data.map(item => item.volt_s);
    const tData = data.map(item => item.volt_t);

    const option = {
      // 그래프 위에 마우스를 가져다 댈 시 나오는 팝업 설정
      tooltip: {
        trigger: 'axis',
        textStyle: {
          color: 'black',
          fontFamily: 'NanumSquareNeoBold',
          fontSize: 12 
        }
      },
      formatter: function(params) {
        let tooltipText = `<div>${params[0].axisValueLabel}</div>`;
        params.forEach(param => {
          tooltipText += `
            <div>
              <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${param.color};"></span>
              ${param.seriesName}: ${param.value}
            </div>
          `;
        });
        return tooltipText;
      },
      grid: {
        left: '5%',
        right: '0%',
        top: '10%'
      },
      xAxis: {
        // 카테고리 설정
        type: 'category',
        data: xData,
        axisLabel: {
          color: 'white',
          fontFamily: 'NanumSquareNeoBold',
          fontSize: 10
        }
      },
      yAxis: {
        // min:100, // 보여지는 최솟값 설정
        // max: 400, // 보여지는 최대값 설정
        axisLabel: {
          // 좌측 세로로 그려져 있는 벨류값
          color: 'white',
          fontFamily: 'NanumSquareNeoBold',
          fontSize: 10 
        }
      },
      dataZoom: [
        {
          startValue: 0
        },
        {
          type: 'inside'
        }
      ],

      //   top: -5,
      //   right: 0,
      //   textStyle: {
      //     color: 'white',
      //     fontFamily: 'NanumSquareNeoBold',
      //     fontSize: 8 
      //   },
      //   pieces: [
      //     // ex) gt:0 lte:50 color:black -> 0 초과 50 이하일 경우 색상을 black으로 설정
      //     // gt: greater than : ~ 보다 클 경우, lte: less than or equal to : ~ 보다 작거나 같을 경우
      //     {
      //       gt: 0,
      //       lte: 50,
      //       color: '#93CE07'
      //     },
      //     {
      //       gt: 50,
      //       lte: 100,
      //       color: '#FBDB0F'
      //     },
      //     {
      //       gt: 100,
      //       lte: 150,
      //       color: '#FC7D02'
      //     },
      //     {
      //       gt: 150,
      //       lte: 200,
      //       color: '#FD0100'
      //     },
      //     {
      //       gt: 200,
      //       lte: 300,
      //       color: '#AA069F'
      //     },
      //     {
      //       gt: 300,
      //       lte: 400,
      //       color: '#AC3B2A'
      //     }
      //   ],
      //   outOfRange: { // 범위를 벗어난 경우 그래프 색 설정
      //     color: '#999'
      //   }
      //},
      series: [
        {
          // 첫번째로 그려지는 그래프
          name: 'L1',
          type: 'line',
          data: rData,
          itemStyle: {
            color: '#00c700',
            fontFamily: 'NanumSquareNeoBold'
          },
          markLine: {
            silent: true,
            lineStyle: {
              color: 'white',
              fontFamily: 'NanumSquareNeoBold'
            },
            label: {
              fontSize: '8px'
            }
          }
        },
        {
          // 2번째로 그려지는 그래프
          name: 'L2',
          type: 'line',
          data: sData,
          itemStyle: {
            color: '#f97289',
            fontFamily: 'NanumSquareNeoBold'
          }
        },
        {
          // 3번째로 그려지는 그래프
          name: 'L3',
          type: 'line',
          data: tData,
          itemStyle: {
            color: '#7190f5',
            fontFamily: 'NanumSquareNeoBold'
          }
        }
      ]
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
  }, [data]);

  return <div id='OverCurrentTrendChart' ref={chartDomRef} className="OverCurrentTrendChart" style={{ position: 'relative', top:'-10px' , width: '100%', height: '330px', fontFamily: 'NanumSquareNeoBold' }} />;
};

export default OverCurrentTrendChart;
