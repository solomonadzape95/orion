"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Solidity", "Rust", "Move", "Vyper", "Cairo"],
  datasets: [
    {
      data: [45, 25, 20, 7, 3],
      backgroundColor: [
        "rgba(56, 189, 248, 0.8)",
        "rgba(168, 85, 247, 0.8)",
        "rgba(34, 197, 94, 0.8)",
        "rgba(251, 146, 60, 0.8)",
        "rgba(236, 72, 153, 0.8)",
      ],
      borderColor: [
        "rgb(56, 189, 248)",
        "rgb(168, 85, 247)",
        "rgb(34, 197, 94)",
        "rgb(251, 146, 60)",
        "rgb(236, 72, 153)",
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right" as const,
      labels: {
        color: "rgb(156, 163, 175)",
        padding: 20,
      },
    },
  },
};

export function LanguageDistribution() {
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-200">Language Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Doughnut options={options} data={data} />
        </div>
      </CardContent>
    </Card>
  );
}
