import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";

import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

const API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinChart = ({ coinId }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${API_URL}/${coinId}/market_chart?vs_currency=usd&days=7`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch chart data");
        }

        const data = await res.json();

        const prices = data.prices.map((price) => ({
          x: price[0],
          y: price[1],
        }));

        setChartData({
          datasets: [
            {
              label: "Price (USD)",
              data: prices,

              borderColor: "#007bff",
              backgroundColor: "rgba(0,123,255,0.15)",

              fill: true,
              tension: 0.4,

              // Hide points normally
              pointRadius: 0,

              // Show circle on hover
              pointHoverRadius: 7,
              pointHoverBackgroundColor: "#007bff",
              pointHoverBorderColor: "#ffffff",
              pointHoverBorderWidth: 2,

              // Smooth hover
              hitRadius: 20,
              hoverRadius: 7,
            },
          ],
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [coinId]);

  if (loading) {
    return <p>Loading chart...</p>;
  }

  if (!chartData) {
    return <p>No chart data available.</p>;
  }

  return (
    <div
      style={{
        marginTop: "30px",
        background: "#0f172a",
        padding: "20px",
        borderRadius: "20px",
      }}
    >
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,

          interaction: {
            mode: "nearest",
            intersect: false,
          },

          plugins: {
            legend: {
              display: false,
            },

            tooltip: {
              mode: "index",
              intersect: false,
              backgroundColor: "#111827",
              titleColor: "#fff",
              bodyColor: "#fff",
              borderColor: "#007bff",
              borderWidth: 1,
              padding: 12,

              callbacks: {
                label: function (context) {
                  return `$${context.parsed.y.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`;
                },
              },
            },
          },

          scales: {
            x: {
              type: "time",

              time: {
                unit: "day",
              },

              ticks: {
                autoSkip: true,
                maxTicksLimit: 7,
                color: "#cbd5e1",
              },

              grid: {
                color: "rgba(255,255,255,0.05)",
              },
            },

            y: {
              ticks: {
                color: "#cbd5e1",

                callback: function (value) {
                  return `$${value.toLocaleString()}`;
                },
              },

              grid: {
                color: "rgba(255,255,255,0.05)",
              },
            },
          },
        }}

        height={350}
      />
    </div>
  );
};

export default CoinChart;