import { StatsGrid } from "@/components/dashboard/stats-grid";
// import { AuditHistoryChart } from "@/components/dashboard/audit-history-chart";
// import { LanguageDistribution } from "@/components/dashboard/language-distribution";
// import { VulnerabilityFeed } from "@/components/dashboard/vulnerability-feed";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <StatsGrid />

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AuditHistoryChart />
        <LanguageDistribution />
      </div> */}

      {/* <VulnerabilityFeed /> */}
    </div>
  );
}
