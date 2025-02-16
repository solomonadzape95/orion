"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuditHistoryChart } from "@/components/dashboard/audit-history-chart";
import { LanguageDistribution } from "@/components/dashboard/language-distribution";
import { Activity, AlertTriangle, Code2, FileCheck2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <ScrollArea className="h-full">
      <div className="container p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Audits"
            value="156"
            description="+12% from last month"
            trend="up"
            icon={<FileCheck2 className="h-4 w-4" />}
          />
          <StatCard
            title="Critical Issues"
            value="23"
            description="-5% from last month"
            trend="down"
            icon={<AlertTriangle className="h-4 w-4" />}
          />
          <StatCard
            title="Lines Analyzed"
            value="45.2K"
            description="+28% from last month"
            trend="up"
            icon={<Code2 className="h-4 w-4" />}
          />
          <StatCard
            title="Active Projects"
            value="12"
            description="3 pending review"
            trend="neutral"
            icon={<Activity className="h-4 w-4" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Audit History</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <AuditHistoryChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Language Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <LanguageDistribution />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ActivityItem
                  title="Smart Contract Audit Completed"
                  description="DEX Protocol v2.0"
                  time="2 hours ago"
                  status="success"
                />
                <ActivityItem
                  title="Critical Vulnerability Detected"
                  description="Lending Protocol"
                  time="5 hours ago"
                  status="error"
                />
                <ActivityItem
                  title="New Audit Request"
                  description="NFT Marketplace"
                  time="1 day ago"
                  status="pending"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}

function StatCard({
  title,
  value,
  description,
  trend,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  trend: "up" | "down" | "neutral";
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              {icon}
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <h3 className="text-2xl font-bold">{value}</h3>
            </div>
          </div>
          <div className={cn(
            "text-sm",
            trend === "up" && "text-green-500",
            trend === "down" && "text-red-500",
            trend === "neutral" && "text-gray-500"
          )}>
            {description}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityItem({
  title,
  description,
  time,
  status,
}: {
  title: string;
  description: string;
  time: string;
  status: "success" | "error" | "pending";
}) {
  return (
    <div className="flex items-center space-x-4">
      <div className={cn(
        "w-2 h-2 rounded-full",
        status === "success" && "bg-green-500",
        status === "error" && "bg-red-500",
        status === "pending" && "bg-yellow-500"
      )} />
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="text-sm text-muted-foreground">{time}</div>
    </div>
  );
}
