import { DraggableWidget } from '../DraggableWidget';
import { Progress } from '@/components/ui/progress';
import { getGoalProbabilityStatus } from '@/lib/utils';
import { Weight, Dumbbell, Target } from 'lucide-react';
import type { Goal } from '@shared/schema';

interface GoalProgressProps {
  goals: Goal[];
}

const getGoalIcon = (type: string) => {
  switch (type) {
    case 'weight_loss':
    case 'weight_gain':
      return Weight;
    case 'strength':
      return Dumbbell;
    default:
      return Target;
  }
};

export function GoalProgress({ goals }: GoalProgressProps) {
  return (
    <DraggableWidget className="lg:col-span-2">
      <h3 className="text-xl font-semibold mb-6 text-white">Goal Achievement Probability</h3>

      <div className="space-y-4">
        {goals.map(goal => {
          const Icon = getGoalIcon(goal.type);
          const probability = (goal.probability || 0) * 100;
          const status = getGoalProbabilityStatus(goal.probability || 0);

          return (
            <div key={goal.id} className="bg-dark-tertiary/50 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      goal.type === 'weight_loss' ? 'bg-purple-600' : 'bg-orange-600'
                    }`}
                  >
                    <Icon className="text-white h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{goal.title}</p>
                    <p className="text-sm text-gray-400">
                      Target:{' '}
                      {goal.targetDate
                        ? new Date(goal.targetDate).toLocaleDateString('en-US', {
                            month: 'short',
                            year: 'numeric',
                          })
                        : 'No target date'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${status.color}`}>{Math.round(probability)}%</p>
                  <p className="text-xs text-gray-400">{status.label}</p>
                </div>
              </div>
              <Progress
                value={probability}
                className="h-2"
                style={{
                  background: 'rgba(75, 85, 99, 0.3)',
                }}
              />
            </div>
          );
        })}

        {goals.length === 0 && (
          <div className="text-center py-8">
            <Target className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No active goals set.</p>
            <p className="text-sm text-gray-500 mt-1">Create your first goal to track progress!</p>
          </div>
        )}
      </div>
    </DraggableWidget>
  );
}
