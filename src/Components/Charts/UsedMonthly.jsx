import React, { useEffect, useContext } from 'react';
import ApexCharts from 'apexcharts';
import { ThemeContext } from '../../Components/ThemeContext';

function UsedMonthly() {
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const options = {
      series: [{
        name: '2024',
        type: 'column',
        data: [23, 11, 22, 27, 13, 22, 0, 0, 0, 0, 0],
        color: 'rgb(54,162,235)'
      }, {
        name: '2022',
        type: 'area',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
      }, {
        name: '2023',
        type: 'line',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
      }],
      chart: {
        height: 500,
        type: 'line',
        stacked: false,
      },
      stroke: {
        width: [0, 2, 5],
        curve: 'smooth'
      },
      fill: {
        opacity: [0.85, 0.25, 1],
      },
      labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월'],
      xaxis: {
        type: 'category',
        labels: {
          style: {
            colors: isDarkMode ? '#FFFFFF' : '#000000'
          },
          formatter: function (value) {
            // 레이블을 숫자 대신 월 이름으로 반환
            const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월'];
            return months[value - 1];
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: isDarkMode ? '#FFFFFF' : '#000000'
          }
        }
      },
      grid: {
        borderColor: isDarkMode ? '#444444' : '#e0e0e0'
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " Kw";
            }
            return y;
          }
        }
      }
    };

    var chart = new ApexCharts(document.querySelector("#used-monthly-chart"), options);
    chart.render();

    // 다크 모드 변경 시 차트 옵션 업데이트
    chart.updateOptions({
      xaxis: {
        labels: {
          style: {
            colors: isDarkMode ? '#FFFFFF' : '#000000'
          },
          formatter: function (value) {
            const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월'];
            return months[value - 1];
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: isDarkMode ? '#FFFFFF' : '#000000'
          }
        }
      },
      grid: {
        borderColor: isDarkMode ? '#444444' : '#e0e0e0'
      }
    });

    // 컴포넌트 언마운트 시 차트 인스턴스 제거
    return () => {
      chart.destroy();
    };
  }, [isDarkMode]);

  return (
    <div id="used-monthly-chart"></div>
  );
}

export default UsedMonthly;
