import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineGraph = ({ data }) => {
    const chartContainer = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            // Create the chart instance
            chartInstance.current = new Chart(chartContainer.current, {
              type: "line",
              data: {
                labels: data.map((entry) => entry.year),
                datasets: [
                  {
                    label: "Number of Jobs",
                    data: data.map((entry) => entry.no_of_jobs),
                    borderColor: "rgb(75, 192, 192)",
                    tension: 0.1,
                  },
                  {
                    label: "Average Salary (USD)",
                    data: data.map((entry) => entry.avg_salary_in_usd),
                    borderColor: "rgb(255, 99, 132)",
                    tension: 0.1,
                    hidden: true,
                  },
                ],
              },
              options: {
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Job Count Ratio",
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              },
            });
        }

        // Cleanup function to destroy the chart instance when the component unmounts
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data]);

    return <canvas ref={chartContainer} />;
};

export default LineGraph;
