import { useQuery } from "@tanstack/react-query";
import type { User, FitnessMetrics, Workout, Nutrition, Goal, AIRecommendation, DashboardLayout } from "@shared/schema";

interface DashboardData {
  user: User;
  metrics: FitnessMetrics | null;
  workouts: Workout[];
  nutrition: Nutrition | null;
  goals: Goal[];
  recommendations: AIRecommendation[];
  layout: DashboardLayout | null;
}

export function useDashboardData(userId: number) {
  return useQuery<DashboardData>({
    queryKey: [`/api/dashboard/${userId}`],
    enabled: !!userId,
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
  });
}

export function useFitnessMetrics(userId: number, days: number = 7) {
  return useQuery<FitnessMetrics[]>({
    queryKey: [`/api/fitness-metrics/${userId}?days=${days}`],
    enabled: !!userId,
  });
}

export function useWorkouts(userId: number, limit: number = 10) {
  return useQuery<Workout[]>({
    queryKey: ['/api/workouts', userId, { limit }],
    enabled: !!userId,
  });
}

export function useNutrition(userId: number, days: number = 7) {
  return useQuery<Nutrition[]>({
    queryKey: ['/api/nutrition', userId, { days }],
    enabled: !!userId,
  });
}

export function useGoals(userId: number) {
  return useQuery<Goal[]>({
    queryKey: ['/api/goals', userId],
    enabled: !!userId,
  });
}

export function useAIRecommendations(userId: number, limit: number = 10) {
  return useQuery<AIRecommendation[]>({
    queryKey: ['/api/recommendations', userId, { limit }],
    enabled: !!userId,
  });
}
