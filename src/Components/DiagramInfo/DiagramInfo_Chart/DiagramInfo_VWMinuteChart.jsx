import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const DiagramInfo_VWMinuteChart = ({ dataR, dataS, dataT, chartColor, Min, Max, rstColor }) => {
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
      for (let i = 0; i < 60; i++) {
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
          }).join('<br/>') + `<br/>시간: ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
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
          fontSize: 10.5
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
          fontSize: 10.5
        }
      },
      series: [
        {
          name: 'L1',
          type: 'line',
          showSymbol: false,
          data: chartData.dataR,
          lineStyle: {
            color: rstColor[0],
            width: 1.2
          },
          itemStyle: {
            color: rstColor[0]
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
                symbolSize: 7,
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
          name: 'L2',
          type: 'line',
          showSymbol: false,
          data: chartData.dataS,
          lineStyle: {
            color: rstColor[1],
            width: 1.2
          },
          itemStyle: {
            color: rstColor[1]
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
                symbolSize: 7,
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
          name: 'L3',
          type: 'line',
          showSymbol: false,
          data: chartData.dataT,
          lineStyle: {
            color: rstColor[2],
            width: 1.2
          },
          itemStyle: {
            color: rstColor[2]
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
                symbolSize: 7,
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
  }, [dataR, dataS, dataT, chartColor, Min, Max, chartData, rstColor]);

  return <div ref={chartRef} style={{ width: '100%', height: '80px', background: 'rgb(42 ,63 ,97)', boxShadow: '0px 0px 10px 2px rgb(22, 42, 69)', borderRadius: '10px', marginTop: '5px', backgroundColor: '#263752' }} />;
};

export default DiagramInfo_VWMinuteChart;
