import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import io from "socket.io-client";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

ChartJS.register(LinearScale, CategoryScale, BarElement, Tooltip, Legend);

const socket = io("http://localhost:3000");

const Dashboard = () => {
  const navigate = useNavigate();
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Mood Rating (1-10)",
        data: [],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Stress Level (1-10)",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Anxiety Level (1-10)",
        data: [],
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
      {
        label: "Sleep Hours (hrs)",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    socket.on("chartData", (data) => {
      const labels = data.map((log) =>
        new Date(log.logDate).toLocaleDateString()
      );
      const moodRatings = data.map((log) => log.moodRating);
      const stressLevels = data.map((log) => log.stressLevel);
      const anxietyLevels = data.map((log) => log.anxietyLevel);
      const sleepHours = data.map((log) => log.sleepHours);

      setBarChartData((prevData) => ({
        ...prevData,
        labels,
        datasets: [
          { ...prevData.datasets[0], data: moodRatings },
          { ...prevData.datasets[1], data: stressLevels },
          { ...prevData.datasets[2], data: anxietyLevels },
          { ...prevData.datasets[3], data: sleepHours },
        ],
      }));
    });

    socket.emit("chartData", "Hello from client!");

    // Cleanup
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Values",
        },
      },
    },
  };

  const handleAddLogClick = () => {
    navigate("/addlog");
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="mt-8 flex justify-between">
        <h1 className="text-2xl font-bold mb-6 text-blue-600">Dashboard</h1>
        <Button type="primary" size="large" onClick={handleAddLogClick}>
          Add Log
        </Button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Health Chart</h2>
        <div className="h-64">
          <Bar data={barChartData} options={options} />{" "}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
