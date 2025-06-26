import { DraggableWidget } from "../DraggableWidget";
import { Brain, Lightbulb, Utensils, Bed } from "lucide-react";
import type { AIRecommendation } from "@shared/schema";

interface AIRecommendationsProps {
  recommendations: AIRecommendation[];
}

const getRecommendationIcon = (type: string) => {
  switch (type) {
    case 'nutrition':
      return Utensils;
    case 'sleep':
      return Bed;
    case 'recovery':
      return Lightbulb;
    default:
      return Lightbulb;
  }
};

const getRecommendationColor = (type: string) => {
  switch (type) {
    case 'nutrition':
      return 'border-orange-400 text-orange-400';
    case 'sleep':
      return 'border-blue-400 text-blue-400';
    case 'recovery':
      return 'border-green-400 text-green-400';
    default:
      return 'border-purple-400 text-purple-400';
  }
};

export function AIRecommendations({ recommendations }: AIRecommendationsProps) {
  return (
    <DraggableWidget>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
          <Brain className="text-white h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">AI Coach</h3>
          <p className="text-xs text-gray-400">Personalized insights</p>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => {
          const Icon = getRecommendationIcon(rec.type);
          const colorClass = getRecommendationColor(rec.type);
          
          return (
            <div key={rec.id} className={`bg-dark-tertiary/30 p-4 rounded-xl border-l-4 ${colorClass.split(' ')[0]}`}>
              <div className="flex items-start space-x-3">
                <Icon className={`${colorClass.split(' ')[1]} mt-1 h-4 w-4`} />
                <div>
                  <p className="text-sm font-medium mb-1 text-white">{rec.title}</p>
                  <p className="text-xs text-gray-300">{rec.message}</p>
                </div>
              </div>
            </div>
          );
        })}

        {recommendations.length === 0 && (
          <div className="text-center py-8">
            <Brain className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No recommendations available.</p>
            <p className="text-sm text-gray-500 mt-1">Check back later for AI insights!</p>
          </div>
        )}
      </div>
    </DraggableWidget>
  );
}
