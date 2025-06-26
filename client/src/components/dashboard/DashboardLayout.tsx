import { Responsive, WidthProvider } from "react-grid-layout";
import { BREAKPOINTS, GRID_COLS, WIDGET_CONSTRAINTS } from "@/lib/utils";
import { useWidgetLayout } from "@/hooks/useWidgetLayout";
import { StatsCard } from "./widgets/StatsCard";
import { PerformanceChart } from "./widgets/PerformanceChart";
import { GoalProgress } from "./widgets/GoalProgress";
import { AIRecommendations } from "./widgets/AIRecommendations";
import { DailyPlan } from "./widgets/DailyPlan";
import { WeeklySummary } from "./widgets/WeeklySummary";
import { 
  Footprints, 
  Flame, 
  Heart, 
  Moon 
} from "lucide-react";
import type { 
  User, 
  FitnessMetrics, 
  Workout, 
  Nutrition, 
  Goal, 
  AIRecommendation,
  DashboardLayout as DashboardLayoutType
} from "@shared/schema";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface DashboardLayoutProps {
  user: User;
  metrics: FitnessMetrics | null;
  weeklyMetrics: FitnessMetrics[];
  workouts: Workout[];
  nutrition: Nutrition | null;
  goals: Goal[];
  recommendations: AIRecommendation[];
  savedLayout: DashboardLayoutType | null;
}

export function DashboardLayout({
  user,
  metrics,
  weeklyMetrics,
  workouts,
  nutrition,
  goals,
  recommendations,
  savedLayout
}: DashboardLayoutProps) {
  const { layouts, onLayoutChange } = useWidgetLayout(
    user.id, 
    savedLayout?.layoutData || undefined
  );

  const renderWidget = (key: string) => {
    switch (key) {
      case 'stats-steps':
        return (
          <StatsCard
            title="Today's Steps"
            value={metrics?.steps || 8432}
            change="+12% vs yesterday"
            changeType="positive"
            icon={Footprints}
            gradient="primary"
          />
        );
      
      case 'stats-calories':
        return (
          <StatsCard
            title="Calories Burned"
            value={metrics?.caloriesBurned || 2340}
            change="Goal: 2,500"
            changeType="neutral"
            icon={Flame}
            gradient="secondary"
          />
        );
      
      case 'stats-hrv':
        return (
          <StatsCard
            title="HRV Score"
            value={`${metrics?.hrvScore || 45}ms`}
            change="Excellent recovery"
            changeType="positive"
            icon={Heart}
            gradient="green"
          />
        );
      
      case 'stats-sleep':
        return (
          <StatsCard
            title="Sleep Quality"
            value={`${(metrics?.sleepHours || 8.2).toFixed(1)}h`}
            change={`Deep: ${((metrics?.sleepHours || 8.2) * 0.25).toFixed(1)}h`}
            changeType="positive"
            icon={Moon}
            gradient="blue"
          />
        );
      
      case 'performance-chart':
        return <PerformanceChart metrics={weeklyMetrics} />;
      
      case 'goal-progress':
        return <GoalProgress goals={goals} />;
      
      case 'ai-recommendations':
        return <AIRecommendations recommendations={recommendations} />;
      
      case 'daily-plan':
        return <DailyPlan todaysWorkout={workouts[0]} nutrition={nutrition} />;
      
      case 'weekly-summary':
        return <WeeklySummary workouts={workouts} weeklyMetrics={weeklyMetrics} />;
      
      default:
        return <div>Unknown widget: {key}</div>;
    }
  };

  return (
    <div className="p-6">
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={BREAKPOINTS}
        cols={GRID_COLS}
        rowHeight={60}
        onLayoutChange={onLayoutChange}
        isDraggable={true}
        isResizable={true}
        compactType="vertical"
        preventCollision={false}
        margin={[16, 16]}
        containerPadding={[0, 0]}
        useCSSTransforms={true}
      >
        {(layouts.lg || []).map((item) => (
          <div key={item.i} className="react-grid-item">
            {renderWidget(item.i)}
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}
