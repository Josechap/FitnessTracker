import { DraggableWidget } from '../DraggableWidget';
import { Button } from '@/components/ui/button';
import type { Workout, FitnessMetrics } from '@shared/schema';

interface WeeklySummaryProps {
  workouts: Workout[];
  weeklyMetrics: FitnessMetrics[];
}

export function WeeklySummary({ workouts, weeklyMetrics }: WeeklySummaryProps) {
  // Calculate weekly stats
  const workoutsCompleted = workouts.length;
  const avgSleep =
    weeklyMetrics.reduce((sum, m) => sum + (m.sleepHours || 0), 0) / (weeklyMetrics.length || 1);
  const avgNutritionAdherence = 86; // Mock data for demo
  const weightChange =
    weeklyMetrics.length >= 2
      ? (weeklyMetrics[0].weight || 0) - (weeklyMetrics[weeklyMetrics.length - 1].weight || 0)
      : -1.2;

  return (
    <DraggableWidget>
      <h3 className="text-lg font-semibold mb-6 text-white">This Week</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Workouts Completed</span>
          <span className="font-semibold text-white">{workoutsCompleted}/5</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Avg Sleep Quality</span>
          <span className="font-semibold text-green-400">{avgSleep.toFixed(1)}h</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Nutrition Adherence</span>
          <span className="font-semibold text-orange-400">{avgNutritionAdherence}%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Weight Change</span>
          <span className={`font-semibold ${weightChange < 0 ? 'text-green-400' : 'text-red-400'}`}>
            {weightChange > 0 ? '+' : ''}
            {weightChange.toFixed(1)} lbs
          </span>
        </div>
      </div>

      {/* Quick action buttons */}
      <div className="mt-6 space-y-2">
        <Button className="w-full gradient-primary font-medium hover:shadow-lg transition-all duration-200">
          Start Today's Workout
        </Button>
        <Button
          variant="ghost"
          className="w-full glassmorphism font-medium hover:bg-white/10 transition-colors text-white"
        >
          Log Meal
        </Button>
      </div>
    </DraggableWidget>
  );
}
