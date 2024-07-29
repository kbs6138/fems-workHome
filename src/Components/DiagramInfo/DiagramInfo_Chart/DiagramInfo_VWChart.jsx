// DiagramInfo_VWChart.js
import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const DiagramInfo_VWChart = ({ dataR, dataS, dataT, chartColor, Min, Max }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    dataR: [],
    dataS: [],
    dataT: []
  });

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    function randomData(value) {
      const now = new Date();
      return [now.getTime(), value];
    }

    if (chartData.dataR.length === 0) {
      const initialDataR = [];
      const initialDataS = [];
      const initialDataT = [];
      for (let i = 0; i < 6000; i++) {
        initialDataR.push(randomData(dataR));
        initialDataS.push(randomData(dataS));
        initialDataT.push(randomData(dataT));
      }
      setChartData({
        dataR: initialDataR,
        dataS: initialDataS,
        dataT: initialDataT
      });
    }

    const option = {
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          const date = new Date(params[0].value[0]);
          return params.map(param => {
            const seriesName = param.seriesName;
            const value = param.value[1];
            return `${seriesName}: ${value}`;
          }).join('<br/>') + `<br/>시간:   ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: true,
          lineStyle: {
            color: '#696969',
            type: 'dashed'
          }
        },
        axisLabel: {
          color: function (value, index) {
            if (value === chartData.dataR[chartData.dataR.length - 1][0]) {
              return '#7CFC00';
            }
            return 'white';
          },
          formatter: function (value, index) {
            const date = new Date(value);
            if (value === chartData.dataR[0][0] || value === chartData.dataR[chartData.dataR.length - 1][0]) {
              const hours = date.getHours().toString().padStart(2, '0');
              const minutes = date.getMinutes().toString().padStart(2, '0');
              const seconds = date.getSeconds().toString().padStart(2, '0');
              return `${hours}:${minutes}:${seconds}`;
            }
            return '';
          },
          showMaxLabel: true,
          showMinLabel: true,
          fontSize: 10.5 // Set the font size to 10px
        }
      },
      yAxis: {
        type: 'value',
        min: Min,
        max: Max,
        boundaryGap: [0, '100%'],
        splitLine: {
          show: true,
          lineStyle: {
            color: '#696969',
            type: 'dashed'
          }
        },
        axisLabel: {
          color: 'white',
          fontSize: 10.5 // Set the font size to 10px
        }
      },
      series: [
        {
          name: 'Data R',
          type: 'line',
          showSymbol: false,
          data: chartData.dataR,
          lineStyle: {
            color: chartColor,
            width: 2
          },
          itemStyle: {
            color: chartColor
          },
          markPoint: {
            data: [
              {
                name: '현재값 R',
                coord: chartData.dataR[chartData.dataR.length - 1],
                itemStyle: {
                  color: 'red'
                },
                symbol: 'circle',
                symbolSize: 8,
                label: {
                  show: false
                },
              }
            ],
            emphasis: {
              itemStyle: {
                color: 'red'
              }
            }
          }
        },
        {
          name: 'Data S',
          type: 'line',
          showSymbol: false,
          data: chartData.dataS,
          lineStyle: {
            color: chartColor,
            width: 2
          },
          itemStyle: {
            color: chartColor
          },
          markPoint: {
            data: [
              {
                name: '현재값 S',
                coord: chartData.dataS[chartData.dataS.length - 1],
                itemStyle: {
                  color: 'red'
                },
                symbol: 'circle',
                symbolSize: 8,
                label: {
                  show: false
                },
              }
            ],
            emphasis: {
              itemStyle: {
                color: 'red'
              }
            }
          }
        },
        {
          name: 'Data T',
          type: 'line',
          showSymbol: false,
          data: chartData.dataT,
          lineStyle: {
            color: chartColor,
            width: 2
          },
          itemStyle: {
            color: chartColor
          },
          markPoint: {
            data: [
              {
                name: '현재값 T',
                coord: chartData.dataT[chartData.dataT.length - 1],
                itemStyle: {
                  color: 'red'
                },
                symbol: 'circle',
                symbolSize: 8,
                label: {
                  show: false
                },
              }
            ],
            emphasis: {
              itemStyle: {
                color: 'red'
              }
            }
          }
        }
      ],

      textStyle: {
        fontFamily: 'NanumSquareNeo'
      }
    };

    myChart.setOption(option);

    const interval = setInterval(() => {
      setChartData((prevData) => {
        const newDataR = [...prevData.dataR];
        const newDataS = [...prevData.dataS];
        const newDataT = [...prevData.dataT];
        newDataR.shift();
        newDataS.shift();
        newDataT.shift();
        newDataR.push(randomData(dataR));
        newDataS.push(randomData(dataS));
        newDataT.push(randomData(dataT));
        return {
          dataR: newDataR,
          dataS: newDataS,
          dataT: newDataT
        };
      });

      // 차트 옵션 업데이트
      myChart.setOption({
        series: [
          { data: chartData.dataR },
          { data: chartData.dataS },
          { data: chartData.dataT }
        ]
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dataR, dataS, dataT, chartColor, Min, Max, chartData]);

  return <div ref={chartRef} style={{ width: '495px', height: '230px', marginTop: '-50px', marginLeft: '-10px' }} />;
};

export default DiagramInfo_VWChart;
