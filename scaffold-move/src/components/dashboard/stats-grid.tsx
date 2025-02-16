import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BugIcon, Clock, Code, ShieldCheck } from "lucide-react";

const stats = [
  {
    title: "Total Audits",
    value: "142",
    change: "+24% from last month",
    icon: <ShieldCheck className="h-6 w-6 text-cyan-400" />,
  },
  {
    title: "Vulnerabilities Fixed",
    value: "892",
    change: "16% critical severity",
    icon: <BugIcon className="h-6 w-6 text-purple-400" />,
  },
  {
    title: "Avg. Audit Time",
    value: "2.4 Days",
    change: "18% faster than average",
    icon: <Clock className="h-6 w-6 text-green-400" />,
  },
  {
    title: "Languages Used",
    value: "5",
    change: "Solidity, Rust, Move",
    icon: <Code className="h-6 w-6 text-amber-400" />,
  },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-gray-800/50 border-gray-700">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.title}</div>
              <div className="text-xs text-gray-500 mt-2">{stat.change}</div>
            </div>
            <div className="p-3 rounded-full bg-gray-900/50">{stat.icon}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
