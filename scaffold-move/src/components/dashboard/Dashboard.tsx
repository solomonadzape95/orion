"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { supabase } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Database } from "@/lib/supabase/types";

type Audit = Database["public"]["Tables"]["audits"]["Row"];
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export function Dashboard() {
  const { account } = useWallet();
  const [audits, setAudits] = useState<Audit[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!account?.address) return;

    const fetchDashboardData = async () => {
      try {
        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("wallet_address", account.address)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);

        // Fetch user's audits
        const { data: auditsData, error: auditsError } = await supabase
          .from("audits")
          .select("*")
          .eq("user_id", account.address)
          .order("created_at", { ascending: false });

        if (auditsError) throw auditsError;
        setAudits(auditsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();

    // Subscribe to real-time updates
    const auditsSubscription = supabase
      .channel("audits_channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "audits",
          filter: `user_id=eq.${account.address}`,
        },
        (payload) => {
          // Update audits list based on the change
          if (payload.eventType === "INSERT") {
            setAudits((prev) => [payload.new as Audit, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setAudits((prev) =>
              prev.map((audit) =>
                audit.id === payload.new.id ? (payload.new as Audit) : audit
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      auditsSubscription.unsubscribe();
    };
  }, [account?.address]);

  const getAuditStats = () => {
    const total = audits.length;
    const completed = audits.filter((a) => a.status === "completed").length;
    const avgScore =
      audits.reduce((acc, curr) => acc + (curr.security_score || 0), 0) /
        total || 0;

    return { total, completed, avgScore };
  };

  const stats = getAuditStats();

  // Prepare data for the chart
  const chartData = audits
    .slice()
    .reverse()
    .map((audit) => ({
      date: new Date(audit.created_at).toLocaleDateString(),
      score: audit.security_score,
    }));

  return <div className="container mx-auto p-4 space-y-6">hi</div>;
}
