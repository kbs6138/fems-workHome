import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const OverCurrentTrendChart = ({ TrendData, selectedTimeUnit, dataTypeForChart }) => {
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

    const rData = data.map(item => item[`${dataTypeForChart}_r`]);
    const sData = data.map(item => item[`${dataTypeForChart}_s`]);
    const tData = data.map(item => item[`${dataTypeForChart}_t`]);

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
        right: '1%',
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
