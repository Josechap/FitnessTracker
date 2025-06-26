import {
  type User,
  type InsertUser,
  type FitnessMetrics,
  type InsertFitnessMetrics,
  type Workout,
  type InsertWorkout,
  type Nutrition,
  type InsertNutrition,
  type Goal,
  type InsertGoal,
  type AIRecommendation,
  type InsertAIRecommendation,
  type DashboardLayout,
  type InsertDashboardLayout,
} from '@shared/schema';

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Fitness Metrics
  getFitnessMetrics(userId: number, days?: number): Promise<FitnessMetrics[]>;
  createFitnessMetrics(metrics: InsertFitnessMetrics): Promise<FitnessMetrics>;
  getLatestFitnessMetrics(userId: number): Promise<FitnessMetrics | undefined>;

  // Workouts
  getWorkouts(userId: number, limit?: number): Promise<Workout[]>;
  createWorkout(workout: InsertWorkout): Promise<Workout>;
  getWorkoutById(id: number): Promise<Workout | undefined>;

  // Nutrition
  getNutrition(userId: number, days?: number): Promise<Nutrition[]>;
  createNutrition(nutrition: InsertNutrition): Promise<Nutrition>;
  getLatestNutrition(userId: number): Promise<Nutrition | undefined>;

  // Goals
  getGoals(userId: number): Promise<Goal[]>;
  createGoal(goal: InsertGoal): Promise<Goal>;
  updateGoal(id: number, goal: Partial<Goal>): Promise<Goal | undefined>;

  // AI Recommendations
  getAIRecommendations(userId: number, limit?: number): Promise<AIRecommendation[]>;
  createAIRecommendation(recommendation: InsertAIRecommendation): Promise<AIRecommendation>;

  // Dashboard Layout
  getDashboardLayout(userId: number): Promise<DashboardLayout | undefined>;
  saveDashboardLayout(layout: InsertDashboardLayout): Promise<DashboardLayout>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private fitnessMetrics: Map<number, FitnessMetrics> = new Map();
  private workouts: Map<number, Workout> = new Map();
  private nutrition: Map<number, Nutrition> = new Map();
  private goals: Map<number, Goal> = new Map();
  private aiRecommendations: Map<number, AIRecommendation> = new Map();
  private dashboardLayouts: Map<number, DashboardLayout> = new Map();

  private currentUserId = 1;
  private currentMetricsId = 1;
  private currentWorkoutId = 1;
  private currentNutritionId = 1;
  private currentGoalId = 1;
  private currentRecommendationId = 1;
  private currentLayoutId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Create demo user with explicit fields matching the schema
    const user: User = {
      id: 1,
      username: 'demo',
      email: 'demo@example.com',
      password: 'hashed_password',
      firstName: 'Demo',
      lastName: 'User',
      profileImage: 'https://example.com/avatar.jpg',
      membershipType: 'premium',
      createdAt: new Date()
    };
    this.users.set(1, user);
    this.currentUserId = 2;

    // Create fitness metrics for the last 7 days with explicit nulls
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      const metrics: FitnessMetrics = {
        id: this.currentMetricsId,
        userId: 1,
        date: date,
        steps: 8000 + Math.floor(Math.random() * 3000),
        caloriesBurned: 2200 + Math.floor(Math.random() * 400),
        hrvScore: 40 + Math.floor(Math.random() * 20),
        sleepHours: 7.5 + Math.random() * 1.5,
        sleepQuality: 0.7 + Math.random() * 0.3,
        weight: 175 - i * 0.2,
        bodyFatPercentage: 15 + Math.random() * 2,
        restingHeartRate: 60 + Math.floor(Math.random() * 10)
      } as FitnessMetrics;
      this.currentMetricsId++;
      this.fitnessMetrics.set(metrics.id, metrics);
    }

    // Create sample workouts with explicit types
    const workout: Workout = {
      id: 1,
      name: 'Morning Run',
      type: 'cardio',
      userId: 1,
      caloriesBurned: 420,
      duration: 45,
      exercises: [
        { name: 'Running', sets: 1, reps: null, weight: null, duration: 45 },
      ] as unknown as JsonValue,
      rpe: 7,
      notes: 'Felt good today!',
      completedAt: new Date()
    } as Workout;
    this.workouts.set(workout.id, workout);

    // Create sample nutrition entry with explicit types
    const nutrition: Nutrition = {
      id: this.currentNutritionId,
      userId: 1,
      date: new Date(),
      calories: 1800,
      protein: 150,
      carbs: 200,
      fats: 60,
      water: 8,
      meals: [
        {
          name: 'Breakfast',
          items: [
            { name: 'Oatmeal', calories: 300, protein: 10, carbs: 50, fats: 5 },
            { name: 'Eggs', calories: 140, protein: 12, carbs: 1, fats: 10 },
          ],
        },
      ] as unknown as JsonValue
    } as Nutrition;
    this.currentNutritionId++;
    this.nutrition.set(nutrition.id, nutrition);

    // Create sample goal with explicit types
    const goal: Goal = {
      id: this.currentGoalId,
      type: 'weight',
      userId: 1,
      title: 'Lose 10 lbs',
      targetValue: 10,
      currentValue: 0,
      unit: 'lbs',
      targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      probability: 0.75,
      isActive: true,
      createdAt: new Date(new Date().toISOString()) // Ensure proper date format
    } as Goal;
    this.currentGoalId++;
    this.goals.set(goal.id, goal);

    // Create AI recommendations with explicit types
    const recommendation: AIRecommendation = {
      id: this.currentRecommendationId,
      message: 'Consider increasing protein intake to support muscle recovery.',
      type: 'nutrition',
      userId: 1,
      title: 'Increase Protein Intake',
      priority: 'medium',
      isRead: false,
      createdAt: new Date(new Date().toISOString()) // Ensure proper date format
    } as AIRecommendation;
    this.currentRecommendationId++;
    this.aiRecommendations.set(recommendation.id, recommendation);
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      ...insertUser,
      id: this.currentUserId++,
      createdAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  // Fitness Metrics methods
  async getFitnessMetrics(userId: number, days = 7): Promise<FitnessMetrics[]> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return Array.from(this.fitnessMetrics.values())
      .filter(m => m.userId === userId && m.date && m.date >= cutoffDate)
      .sort((a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0));
  }

  async createFitnessMetrics(insertMetrics: InsertFitnessMetrics): Promise<FitnessMetrics> {
    const metrics: FitnessMetrics = {
      ...insertMetrics,
      id: this.currentMetricsId++,
      date: new Date(),
    };
    this.fitnessMetrics.set(metrics.id, metrics);
    return metrics;
  }

  async getLatestFitnessMetrics(userId: number): Promise<FitnessMetrics | undefined> {
    const userMetrics = Array.from(this.fitnessMetrics.values())
      .filter(m => m.userId === userId && m.date)
      .sort((a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0));

    return userMetrics[0];
  }

  // Workout methods
  async getWorkouts(userId: number, limit = 10): Promise<Workout[]> {
    return Array.from(this.workouts.values())
      .filter(w => w.userId === userId)
      .sort((a, b) => (b.completedAt?.getTime() || 0) - (a.completedAt?.getTime() || 0))
      .slice(0, limit);
  }

  async createWorkout(insertWorkout: InsertWorkout): Promise<Workout> {
    const workout: Workout = {
      ...insertWorkout,
      id: this.currentWorkoutId++,
      completedAt: new Date(),
    };
    this.workouts.set(workout.id, workout);
    return workout;
  }

  async getWorkoutById(id: number): Promise<Workout | undefined> {
    return this.workouts.get(id);
  }

  // Nutrition methods
  async getNutrition(userId: number, days = 7): Promise<Nutrition[]> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return Array.from(this.nutrition.values())
      .filter(n => n.userId === userId && n.date && n.date >= cutoffDate)
      .sort((a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0));
  }

  async createNutrition(insertNutrition: InsertNutrition): Promise<Nutrition> {
    const nutrition: Nutrition = {
      ...insertNutrition,
      id: this.currentNutritionId++,
      date: new Date(),
    };
    this.nutrition.set(nutrition.id, nutrition);
    return nutrition;
  }

  async getLatestNutrition(userId: number): Promise<Nutrition | undefined> {
    const userNutrition = Array.from(this.nutrition.values())
      .filter(n => n.userId === userId && n.date)
      .sort((a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0));

    return userNutrition[0];
  }

  // Goal methods
  async getGoals(userId: number): Promise<Goal[]> {
    return Array.from(this.goals.values())
      .filter(g => g.userId === userId && g.isActive)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async createGoal(insertGoal: InsertGoal): Promise<Goal> {
    const goal: Goal = {
      ...insertGoal,
      id: this.currentGoalId++,
      createdAt: new Date(),
    };
    this.goals.set(goal.id, goal);
    return goal;
  }

  async updateGoal(id: number, updateData: Partial<Goal>): Promise<Goal | undefined> {
    const existingGoal = this.goals.get(id);
    if (!existingGoal) return undefined;

    const updatedGoal = { ...existingGoal, ...updateData };
    this.goals.set(id, updatedGoal);
    return updatedGoal;
  }

  // AI Recommendations methods
  async getAIRecommendations(userId: number, limit = 10): Promise<AIRecommendation[]> {
    return Array.from(this.aiRecommendations.values())
      .filter(r => r.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0))
      .slice(0, limit);
  }

  async createAIRecommendation(insertRec: InsertAIRecommendation): Promise<AIRecommendation> {
    const recommendation: AIRecommendation = {
      ...insertRec,
      id: this.currentRecommendationId++,
      createdAt: new Date(),
    };
    this.aiRecommendations.set(recommendation.id, recommendation);
    return recommendation;
  }

  // Dashboard Layout methods
  async getDashboardLayout(userId: number): Promise<DashboardLayout | undefined> {
    return Array.from(this.dashboardLayouts.values()).find(layout => layout.userId === userId);
  }

  async saveDashboardLayout(insertLayout: InsertDashboardLayout): Promise<DashboardLayout> {
    // Check if layout exists for this user
    const existingLayout = Array.from(this.dashboardLayouts.values()).find(
      layout => layout.userId === insertLayout.userId,
    );

    if (existingLayout) {
      const updatedLayout: DashboardLayout = {
        ...existingLayout,
        updatedAt: new Date(),
      };
      this.dashboardLayouts.set(existingLayout.id, updatedLayout);
      return updatedLayout;
    } else {
      const newLayout: DashboardLayout = {
        id: this.currentLayoutId++,
        userId: insertLayout.userId,
        layoutData: {
          widgets: ['fitness', 'nutrition', 'goals', 'recommendations'],
        },
        updatedAt: new Date(),
      };
      this.dashboardLayouts.set(newLayout.id, newLayout);
      return newLayout;
    }
  }
}

export const storage = new MemStorage();
