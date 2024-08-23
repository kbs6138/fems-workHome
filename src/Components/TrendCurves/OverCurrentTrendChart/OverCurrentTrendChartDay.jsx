import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const OverCurrentTrendChartDay = ({ TrendData, dataTypeForChart }) => {
  const [data, setData] = useState([]);
  const chartDomRef = useRef(null);

  useEffect(() => {
    if (Array.isArray(TrendData)) {
      setData(TrendData);
    } else {
      console.error("TrendData is not an array");
    }
  }, [TrendData]);

  useEffect(() => {
    if (!data || data.length === 0) {
      return;
    }

    const chartDom = chartDomRef.current;
    const myChart = echarts.init(chartDom);

    const xData = data.map(item => `${item.dd}일`);
    const rData = data.map(item => item[`${dataTypeForChart}_r`]?.toFixed(1));
    const sData = data.map(item => item[`${dataTypeForChart}_s`]?.toFixed(1));
    const tData = data.map(item => item[`${dataTypeForChart}_t`]?.toFixed(1));

    let legendData = [];
    let seriesData = [];

    // Logic for data types with custom colors
    switch (dataTypeForChart) {
      case 'volt':
      case 'am':
        legendData = ['L1', 'L2', 'L3'];
        seriesData = [
          {
            name: 'L1',
            type: 'line',
            data: rData,
            itemStyle: { color: '#00c700' },
            markLine: {
              silent: true,
              lineStyle: { color: 'white' },
              label: { fontSize: '8px', fontFamily: 'NanumSquareNeoBold' }
            }
          },
          {
            name: 'L2',
            type: 'line',
            data: sData,
            itemStyle: { color: '#f97289' }
          },
          {
            name: 'L3',
            type: 'line',
            data: tData,
            itemStyle: { color: '#7190f5' }
          }
        ];
        break;

      case 'wat':
        legendData = ['전력'];
        seriesData = [
          {
            name: '전력',
            type: 'line',
            data: data.map(item => item['wat']),
            itemStyle: { color: '#9370DB' }
          }
        ];
        break;

      case 'in_deg':
        legendData = ['내부온도'];
        seriesData = [
          {
            name: '내부온도',
            type: 'line',
            data: data.map(item => item['in_deg']),
            itemStyle: { color: '#FF69B4' }
          }
        ];
        break;

      case 'out_deg':
        legendData = ['외부온도'];
        seriesData = [
          {
            name: '외부온도',
            type: 'line',
            data: data.map(item => item['out_deg']),
            itemStyle: { color: '#7CFC00' }
          }
        ];
        break;

      case 'pf':
        legendData = ['역률'];
        seriesData = [
          {
            name: '역률',
            type: 'line',
            data: data.map(item => item['pf']),
            itemStyle: { color: '#00BFFF' }
          }
        ];
        break;

      default:
        legendData = [];
        seriesData = [];
    }

    const option = {
      tooltip: {
        trigger: 'axis',
        textStyle: { color: 'black', fontFamily: 'NanumSquareNeoBold' },
        formatter: function (params) {
          let tooltipText = `<div style="font-family: 'NanumSquareNeoBold';">${params[0].axisValueLabel}</div>`;
          params.forEach(param => {
            tooltipText += `
              <div style="font-family: 'NanumSquareNeoBold';">
                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${param.color};"></span>
                ${param.seriesName}: ${param.value}
              </div>
            `;
          });
          return tooltipText;
        }
      },
      grid: { left: '5%', right: '1%', top: '10%' },
      xAxis: {
        type: 'category',
        data: xData,
        axisLabel: { color: 'white', fontFamily: 'NanumSquareNeoBold' },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)',
            width: 1
          }
        }
      },
      yAxis: {
        axisLabel: { color: 'white', fontFamily: 'NanumSquareNeoBold' },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)',
            width: 1
          }
        }
      },
      dataZoom: [
        { startValue: 0 },
        { type: 'inside' }
      ],
      legend: {
        data: legendData,
        textStyle: { color: 'white', fontFamily: 'NanumSquareNeoBold' },
        itemWidth: 30,
        itemHeight: 15,
        orient: 'horizontal',
        left: 'center',
        top: 'top'
      },
      series: seriesData
    };

    myChart.setOption(option);

    const handleResize = () => myChart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      myChart.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [data, dataTypeForChart]);

  return <div id='OverCurrentTrendChart' ref={chartDomRef} className="OverCurrentTrendChart" style={{ width: '100%', height: '330px' }} />;
};

export default OverCurrentTrendChartDay;
