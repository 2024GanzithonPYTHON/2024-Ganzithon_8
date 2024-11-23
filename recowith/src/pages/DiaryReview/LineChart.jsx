import React, { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import "./LineChart.css";

const LineChart = ({ labels, data }) => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const createChart = () => {
      Chart.register(
        LineController,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement
      );

      chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels, 
          datasets: [
            {
              label: "User Ratings",
              data: data, 
              borderColor: "#CBC0B0",
              borderWidth: 1,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              pointRadius: 4,
              pointBackgroundColor: "#92DEC9",
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 0,
              bottom: 0,
              left: 10,
              right: 10,
            },
          },
          elements: {
            point: {
              radius: 5,
              hoverRadius: 7,
            },
          },
          scales: {
            x: {
              grid: {
                drawBorder: false,
                color: "rgba(0, 0, 0, 0.1)",
                drawTicks: false,
              },
              ticks: {
                padding: 8,
              },
            },
            y: {
              min: 1,
              max: 5,
              grid: {
                drawBorder: false,
                color: "rgba(0, 0, 0, 0.1)",
                drawTicks: false,
              },
              ticks: {
                stepSize: 1,
                padding: 8,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          clip: false,
        },
      });
    };

    const destroyChart = () => {
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
    };

    const initializeChart = () => {
      destroyChart();
      createChart();
    };

    initializeChart();

    return () => {
      destroyChart();
    };
  }, [labels, data]);

  return (
    <div className="chart-container">
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineChart;

