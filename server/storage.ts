import { 
  users, fitnessMetrics, workouts, nutrition, goals, aiRecommendations, dashboardLayouts,
  type User, type InsertUser, type FitnessMetrics, type InsertFitnessMetrics,
  type Workout, type InsertWorkout, type Nutrition, type InsertNutrition,
  type Goal, type InsertGoal, type AIRecommendation, type InsertAIRecommendation,
  type DashboardLayout, type InsertDashboardLayout
} from "@shared/schema";

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
    // Create demo user
    const demoUser: User = {
      id: 1,
      username: "alex_johnson",
      email: "alex.johnson@example.com",
      password: "hashed_password",
      firstName: "Alex",
      lastName: "Johnson",
      profileImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
      membershipType: "premium",
      createdAt: new Date(),
    };
    this.users.set(1, demoUser);
    this.currentUserId = 2;

    // Create fitness metrics for the last 7 days
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const metrics: FitnessMetrics = {
        id: this.currentMetricsId++,
        userId: 1,
        date,
        steps: 8000 + Math.floor(Math.random() * 3000),
        caloriesBurned: 2200 + Math.floor(Math.random() * 400),
        hrvScore: 40 + Math.floor(Math.random() * 20),
        sleepHours: 7.5 + Math.random() * 1.5,
        sleepQuality: 0.7 + Math.random() * 0.3,
        weight: 175 - (i * 0.2),
        bodyFatPercentage: 15 + Math.random() * 2,
        restingHeartRate: 60 + Math.floor(Math.random() * 10),
      };
      this.fitnessMetrics.set(metrics.id, metrics);
    }

    // Create sample workouts
    const sampleWorkouts: InsertWorkout[] = [
      {
        userId: 1,
        name: "Upper Body Strength",
        type: "strength",
        duration: 75,
        caloriesBurned: 320,
        exercises: [
          { name: "Bench Press", sets: 4, reps: 8, weight: 185 },
          { name: "Pull-ups", sets: 3, reps: 12 },
          { name: "Shoulder Press", sets: 3, reps: 10, weight: 135 }
        ],
        rpe: 8,
        notes: "Great session, felt strong",
      },
      {
        userId: 1,
        name: "HIIT Cardio",
        type: "hiit",
        duration: 30,
        caloriesBurned: 280,
        exercises: [
          { name: "Burpees", duration: 45, rest: 15 },
          { name: "Mountain Climbers", duration: 45, rest: 15 },
          { name: "Jump Squats", duration: 45, rest: 15 }
        ],
        rpe: 9,
        notes: "Intense workout, good sweat",
      }
    ];

    sampleWorkouts.forEach(workout => {
      const newWorkout: Workout = {
        ...workout,
        id: this.currentWorkoutId++,
        completedAt: new Date(),
      };
      this.workouts.set(newWorkout.id, newWorkout);
    });

    // Create nutrition data
    const nutritionData: Nutrition = {
      id: this.currentNutritionId++,
      userId: 1,
      date: new Date(),
      calories: 2340,
      protein: 165,
      carbs: 250,
      fats: 80,
      water: 3.2,
      meals: [
        { name: "Breakfast", calories: 450, protein: 25 },
        { name: "Lunch", calories: 650, protein: 45 },
        { name: "Dinner", calories: 720, protein: 55 },
        { name: "Snacks", calories: 520, protein: 40 }
      ],
    };
    this.nutrition.set(nutritionData.id, nutritionData);

    // Create goals
    const sampleGoals: InsertGoal[] = [
      {
        userId: 1,
        title: "Lose 10 lbs",
        type: "weight_loss",
        targetValue: 165,
        currentValue: 175,
        unit: "lbs",
        targetDate: new Date("2024-12-31"),
        probability: 0.87,
        isActive: true,
      },
      {
        userId: 1,
        title: "Bench 225 lbs",
        type: "strength",
        targetValue: 225,
        currentValue: 185,
        unit: "lbs",
        targetDate: new Date("2025-01-31"),
        probability: 0.64,
        isActive: true,
      }
    ];

    sampleGoals.forEach(goal => {
      const newGoal: Goal = {
        ...goal,
        id: this.currentGoalId++,
        createdAt: new Date(),
      };
      this.goals.set(newGoal.id, newGoal);
    });

    // Create AI recommendations
    const recommendations: InsertAIRecommendation[] = [
      {
        userId: 1,
        type: "recovery",
        title: "Recovery Focus",
        message: "Your HRV is elevated. Consider a light cardio session instead of heavy lifting today.",
        priority: "high",
        isRead: false,
      },
      {
        userId: 1,
        type: "nutrition",
        title: "Nutrition Timing",
        message: "Increase protein intake by 20g to support your strength goals this week.",
        priority: "medium",
        isRead: false,
      },
      {
        userId: 1,
        type: "sleep",
        title: "Sleep Optimization",
        message: "Try going to bed 30 minutes earlier to hit your 8.5h sleep target.",
        priority: "medium",
        isRead: false,
      }
    ];

    recommendations.forEach(rec => {
      const newRec: AIRecommendation = {
        ...rec,
        id: this.currentRecommendationId++,
        createdAt: new Date(),
      };
      this.aiRecommendations.set(newRec.id, newRec);
    });
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
      .filter(m => m.userId === userId && m.date >= cutoffDate)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
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
      .filter(m => m.userId === userId)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
    
    return userMetrics[0];
  }

  // Workout methods
  async getWorkouts(userId: number, limit = 10): Promise<Workout[]> {
    return Array.from(this.workouts.values())
      .filter(w => w.userId === userId)
      .sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime())
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
      .filter(n => n.userId === userId && n.date >= cutoffDate)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
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
      .filter(n => n.userId === userId)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
    
    return userNutrition[0];
  }

  // Goal methods
  async getGoals(userId: number): Promise<Goal[]> {
    return Array.from(this.goals.values())
      .filter(g => g.userId === userId && g.isActive)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
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
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
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
    return Array.from(this.dashboardLayouts.values())
      .find(layout => layout.userId === userId);
  }

  async saveDashboardLayout(insertLayout: InsertDashboardLayout): Promise<DashboardLayout> {
    // Check if layout exists for this user
    const existingLayout = Array.from(this.dashboardLayouts.values())
      .find(layout => layout.userId === insertLayout.userId);

    if (existingLayout) {
      const updatedLayout: DashboardLayout = {
        ...existingLayout,
        ...insertLayout,
        updatedAt: new Date(),
      };
      this.dashboardLayouts.set(existingLayout.id, updatedLayout);
      return updatedLayout;
    } else {
      const newLayout: DashboardLayout = {
        ...insertLayout,
        id: this.currentLayoutId++,
        updatedAt: new Date(),
      };
      this.dashboardLayouts.set(newLayout.id, newLayout);
      return newLayout;
    }
  }
}

export const storage = new MemStorage();
