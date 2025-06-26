import type { Express } from 'express';
import { createServer, type Server } from 'http';
import { storage } from './storage';
import {
  insertFitnessMetricsSchema,
  insertWorkoutSchema,
  insertNutritionSchema,
  insertGoalSchema,
  insertAIRecommendationSchema,
  insertDashboardLayoutSchema,
} from '@shared/schema';

export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard data endpoint
  app.get('/api/dashboard/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);

      const [
        user,
        latestMetrics,
        recentWorkouts,
        latestNutrition,
        goals,
        recommendations,
        dashboardLayout,
      ] = await Promise.all([
        storage.getUser(userId),
        storage.getLatestFitnessMetrics(userId),
        storage.getWorkouts(userId, 5),
        storage.getLatestNutrition(userId),
        storage.getGoals(userId),
        storage.getAIRecommendations(userId, 5),
        storage.getDashboardLayout(userId),
      ]);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        user,
        metrics: latestMetrics,
        workouts: recentWorkouts,
        nutrition: latestNutrition,
        goals,
        recommendations,
        layout: dashboardLayout,
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch dashboard data' });
    }
  });

  // Fitness metrics endpoints
  app.get('/api/fitness-metrics/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const days = req.query.days ? parseInt(req.query.days as string) : 7;

      const metrics = await storage.getFitnessMetrics(userId, days);
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch fitness metrics' });
    }
  });

  app.post('/api/fitness-metrics', async (req, res) => {
    try {
      const validatedData = insertFitnessMetricsSchema.parse(req.body);
      const metrics = await storage.createFitnessMetrics(validatedData);
      res.status(201).json(metrics);
    } catch (error) {
      res.status(400).json({ message: 'Invalid fitness metrics data' });
    }
  });

  // Workout endpoints
  app.get('/api/workouts/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      const workouts = await storage.getWorkouts(userId, limit);
      res.json(workouts);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch workouts' });
    }
  });

  app.post('/api/workouts', async (req, res) => {
    try {
      const validatedData = insertWorkoutSchema.parse(req.body);
      const workout = await storage.createWorkout(validatedData);
      res.status(201).json(workout);
    } catch (error) {
      res.status(400).json({ message: 'Invalid workout data' });
    }
  });

  // Nutrition endpoints
  app.get('/api/nutrition/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const days = req.query.days ? parseInt(req.query.days as string) : 7;

      const nutrition = await storage.getNutrition(userId, days);
      res.json(nutrition);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch nutrition data' });
    }
  });

  app.post('/api/nutrition', async (req, res) => {
    try {
      const validatedData = insertNutritionSchema.parse(req.body);
      const nutrition = await storage.createNutrition(validatedData);
      res.status(201).json(nutrition);
    } catch (error) {
      res.status(400).json({ message: 'Invalid nutrition data' });
    }
  });

  // Goals endpoints
  app.get('/api/goals/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const goals = await storage.getGoals(userId);
      res.json(goals);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch goals' });
    }
  });

  app.post('/api/goals', async (req, res) => {
    try {
      const validatedData = insertGoalSchema.parse(req.body);
      const goal = await storage.createGoal(validatedData);
      res.status(201).json(goal);
    } catch (error) {
      res.status(400).json({ message: 'Invalid goal data' });
    }
  });

  app.patch('/api/goals/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const goal = await storage.updateGoal(id, req.body);

      if (!goal) {
        return res.status(404).json({ message: 'Goal not found' });
      }

      res.json(goal);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update goal' });
    }
  });

  // AI Recommendations endpoints
  app.get('/api/recommendations/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      const recommendations = await storage.getAIRecommendations(userId, limit);
      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch recommendations' });
    }
  });

  app.post('/api/recommendations', async (req, res) => {
    try {
      const validatedData = insertAIRecommendationSchema.parse(req.body);
      const recommendation = await storage.createAIRecommendation(validatedData);
      res.status(201).json(recommendation);
    } catch (error) {
      res.status(400).json({ message: 'Invalid recommendation data' });
    }
  });

  // Dashboard layout endpoints
  app.get('/api/dashboard-layout/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const layout = await storage.getDashboardLayout(userId);
      res.json(layout);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch dashboard layout' });
    }
  });

  app.post('/api/dashboard-layout', async (req, res) => {
    try {
      const validatedData = insertDashboardLayoutSchema.parse(req.body);
      const layout = await storage.saveDashboardLayout(validatedData);
      res.json(layout);
    } catch (error) {
      res.status(400).json({ message: 'Invalid layout data' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
