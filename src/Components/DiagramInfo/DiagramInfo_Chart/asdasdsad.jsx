import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const DiagramInfo_Chart = ({ dataR, dataS, dataT, chartColor, Min, Max }) => {
  const chartRef = useRef(null);
  const [chartDataR, setChartDataR] = useState([]);
  const [chartDataS, setChartDataS] = useState([]);
  const [chartDataT, setChartDataT] = useState([]);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    function randomData(data) {
      const now = new Date();
      return [now.getTime(), data];
    }

    if (chartDataR.length === 0 && chartDataS.length === 0 && chartDataT.length === 0) {
      const initialDataR = [];
      const initialDataS = [];
      const initialDataT = [];
      for (let i = 0; i < 6000; i++) {
        initialDataR.push(randomData(dataR));
        initialDataS.push(randomData(dataS));
        initialDataT.push(randomData(dataT));
      }
      setChartDataR(initialDataR);
      setChartDataS(initialDataS);
      setChartDataT(initialDataT);
    }

    const option = {
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          const date = new Date(params[0].value[0]);
          return (
            `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} : ${params[0].value[1]}`
          );
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
            if (value === chartDataR[chartDataR.length - 1][0]) {
              return '#7CFC00';
            }
            return 'white';
          },
          formatter: function (value, index) {
            const date = new Date(value);
            if (value === chartDataR[0][0] || value === chartDataR[chartDataR.length - 1][0]) {
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
          name: 'Data R',
          type: 'line',
          showSymbol: false,
          data: chartDataR,
          lineStyle: {
            color: chartColor[0],
            width: 2
          },
          itemStyle: {
            color: chartColor[0]
          },
          markPoint: {
            data: [
              {
                name: '현재값',
                coord: chartDataR[chartDataR.length - 1],
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
          data: chartDataS,
          lineStyle: {
            color: chartColor[1],
            width: 2
          },
          itemStyle: {
            color: chartColor[1]
          },
          markPoint: {
            data: [
              {
                name: '현재값',
                coord: chartDataS[chartDataS.length - 1],
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
          data: chartDataT,
          lineStyle: {
            color: chartColor[2],
            width: 2
          },
          itemStyle: {
            color: chartColor[2]
          },
          markPoint: {
            data: [
              {
                name: '현재값',
                coord: chartDataT[chartDataT.length - 1],
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
      setChartDataR((prevData) => {
        const newData = [...prevData];
        newData.shift();
        newData.push(randomData(dataR));
        return newData;
      });
      setChartDataS((prevData) => {
        const newData = [...prevData];
        newData.shift();
        newData.push(randomData(dataS));
        return newData;
      });
      setChartDataT((prevData) => {
        const newData = [...prevData];
        newData.shift();
        newData.push(randomData(dataT));
        return newData;
      });

      myChart.setOption({
        series: [
          { data: chartDataR },
          { data: chartDataS },
          { data: chartDataT }
        ]
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dataR, dataS, dataT, chartColor, Min, Max, chartDataR, chartDataS, chartDataT]);

  return <div ref={chartRef} style={{ width: '495px', height: '230px', marginTop: '-50px', marginLeft:'-10px'}} />;
};

export default DiagramInfo_Chart;
