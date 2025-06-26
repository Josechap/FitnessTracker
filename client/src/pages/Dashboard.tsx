import { useState } from "react";
import { useDashboardData, useFitnessMetrics } from "@/hooks/useDashboardData";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userId = 1; // Demo user ID

  const { data: dashboardData, isLoading } = useDashboardData(userId);
  const { data: weeklyMetrics } = useFitnessMetrics(userId, 7);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-primary">
        <div className="md:ml-64 p-6">
          <div className="space-y-6">
            <Skeleton className="h-20 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Skeleton className="lg:col-span-2 h-64" />
              <Skeleton className="h-64" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-dark-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Dashboard Unavailable</h1>
          <p className="text-gray-400">Unable to load dashboard data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-primary text-white">
      <Sidebar 
        user={dashboardData.user}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <main className="md:ml-64 min-h-screen">
        <DashboardHeader 
          user={dashboardData.user}
          metrics={dashboardData.metrics}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <DashboardLayout
          user={dashboardData.user}
          metrics={dashboardData.metrics}
          weeklyMetrics={weeklyMetrics || []}
          workouts={dashboardData.workouts}
          nutrition={dashboardData.nutrition}
          goals={dashboardData.goals}
          recommendations={dashboardData.recommendations}
          savedLayout={dashboardData.layout}
        />
      </main>
    </div>
  );
}
