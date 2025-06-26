import { DraggableWidget } from '../DraggableWidget';
import { Dumbbell, Apple } from 'lucide-react';
import type { Workout, Nutrition } from '@shared/schema';

interface DailyPlanProps {
  todaysWorkout?: Workout;
  nutrition: Nutrition | null;
}

export function DailyPlan({ todaysWorkout, nutrition }: DailyPlanProps) {
  return (
    <DraggableWidget>
      <h3 className="text-lg font-semibold mb-6 text-white">Today's Plan</h3>

      <div className="space-y-4">
        {/* Scheduled workout */}
        <div className="bg-purple-600/20 p-4 rounded-xl border border-purple-600/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <Dumbbell className="text-purple-400 h-4 w-4" />
              <span className="font-medium text-white">
                {todaysWorkout?.name || 'Upper Body Strength'}
              </span>
            </div>
            <span className="text-sm text-gray-400">6:00 PM</span>
          </div>
          <p className="text-sm text-gray-300">
            {todaysWorkout?.type === 'strength'
              ? 'Focus: Chest, Shoulders, Triceps'
              : 'High-intensity interval training'}
          </p>
          <p className="text-xs text-purple-400 mt-2">
            Estimated duration: {todaysWorkout?.duration || 75} min
          </p>
        </div>

        {/* Nutrition targets */}
        <div className="bg-green-600/20 p-4 rounded-xl border border-green-600/30">
          <div className="flex items-center space-x-3 mb-3">
            <Apple className="text-green-400 h-4 w-4" />
            <span className="font-medium text-white">Nutrition Targets</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-lg font-bold text-white">
                {Math.round(nutrition?.protein || 45)}g
              </p>
              <p className="text-xs text-gray-400">Protein</p>
              <p className="text-xs text-green-400">
                {Math.max(0, 165 - (nutrition?.protein || 45))}g left
              </p>
            </div>
            <div>
              <p className="text-lg font-bold text-white">{Math.round(nutrition?.carbs || 180)}g</p>
              <p className="text-xs text-gray-400">Carbs</p>
              <p className="text-xs text-orange-400">
                {Math.max(0, 250 - (nutrition?.carbs || 180))}g left
              </p>
            </div>
            <div>
              <p className="text-lg font-bold text-white">{Math.round(nutrition?.fats || 35)}g</p>
              <p className="text-xs text-gray-400">Fats</p>
              <p className="text-xs text-green-400">
                {Math.max(0, 80 - (nutrition?.fats || 35))}g left
              </p>
            </div>
          </div>
        </div>
      </div>
    </DraggableWidget>
  );
}
