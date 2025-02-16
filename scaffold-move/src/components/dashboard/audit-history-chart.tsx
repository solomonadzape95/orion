"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Audits Completed",
      data: [12, 19, 15, 25, 22, 30],
      borderColor: "rgb(56, 189, 248)",
      backgroundColor: "rgba(56, 189, 248, 0.5)",
      tension: 0.4,
    },
    {
      label: "Critical Issues Found",
      data: [5, 8, 6, 9, 7, 11],
      borderColor: "rgb(168, 85, 247)",
      backgroundColor: "rgba(168, 85, 247, 0.5)",
      tension: 0.4,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: "rgb(156, 163, 175)",
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: "rgba(75, 85, 99, 0.2)",
      },
      ticks: {
        color: "rgb(156, 163, 175)",
      },
    },
    y: {
      grid: {
        color: "rgba(75, 85, 99, 0.2)",
      },
      ticks: {
        color: "rgb(156, 163, 175)",
      },
    },
  },
};

export function AuditHistoryChart() {
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-200">Audit History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Line options={options} data={data} />
        </div>
      </CardContent>
    </Card>
  );
}
