import { pgTable, text, serial, integer, boolean, timestamp, real, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  profileImage: text("profile_image"),
  membershipType: text("membership_type").default("free"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const fitnessMetrics = pgTable("fitness_metrics", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  date: timestamp("date").defaultNow(),
  steps: integer("steps"),
  caloriesBurned: integer("calories_burned"),
  hrvScore: real("hrv_score"),
  sleepHours: real("sleep_hours"),
  sleepQuality: real("sleep_quality"),
  weight: real("weight"),
  bodyFatPercentage: real("body_fat_percentage"),
  restingHeartRate: integer("resting_heart_rate"),
});

export const workouts = pgTable("workouts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(), // strength, cardio, hiit, mobility
  duration: integer("duration"), // minutes
  caloriesBurned: integer("calories_burned"),
  exercises: jsonb("exercises"), // JSON array of exercises
  rpe: integer("rpe"), // Rate of Perceived Exertion 1-10
  notes: text("notes"),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const nutrition = pgTable("nutrition", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  date: timestamp("date").defaultNow(),
  calories: integer("calories"),
  protein: real("protein"),
  carbs: real("carbs"),
  fats: real("fats"),
  water: real("water"), // liters
  meals: jsonb("meals"), // JSON array of meals
});

export const goals = pgTable("goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  type: text("type").notNull(), // weight_loss, muscle_gain, strength, endurance
  targetValue: real("target_value"),
  currentValue: real("current_value"),
  unit: text("unit"), // lbs, kg, reps, etc.
  targetDate: timestamp("target_date"),
  probability: real("probability"), // AI-calculated probability 0-1
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const aiRecommendations = pgTable("ai_recommendations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  type: text("type").notNull(), // recovery, nutrition, workout, sleep
  title: text("title").notNull(),
  message: text("message").notNull(),
  priority: text("priority").default("medium"), // low, medium, high
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const dashboardLayouts = pgTable("dashboard_layouts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  layoutData: jsonb("layout_data").notNull(), // React Grid Layout data
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertFitnessMetricsSchema = createInsertSchema(fitnessMetrics).omit({
  id: true,
  date: true,
});

export const insertWorkoutSchema = createInsertSchema(workouts).omit({
  id: true,
  completedAt: true,
});

export const insertNutritionSchema = createInsertSchema(nutrition).omit({
  id: true,
  date: true,
});

export const insertGoalSchema = createInsertSchema(goals).omit({
  id: true,
  createdAt: true,
});

export const insertAIRecommendationSchema = createInsertSchema(aiRecommendations).omit({
  id: true,
  createdAt: true,
});

export const insertDashboardLayoutSchema = createInsertSchema(dashboardLayouts).omit({
  id: true,
  updatedAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type FitnessMetrics = typeof fitnessMetrics.$inferSelect;
export type InsertFitnessMetrics = z.infer<typeof insertFitnessMetricsSchema>;
export type Workout = typeof workouts.$inferSelect;
export type InsertWorkout = z.infer<typeof insertWorkoutSchema>;
export type Nutrition = typeof nutrition.$inferSelect;
export type InsertNutrition = z.infer<typeof insertNutritionSchema>;
export type Goal = typeof goals.$inferSelect;
export type InsertGoal = z.infer<typeof insertGoalSchema>;
export type AIRecommendation = typeof aiRecommendations.$inferSelect;
export type InsertAIRecommendation = z.infer<typeof insertAIRecommendationSchema>;
export type DashboardLayout = typeof dashboardLayouts.$inferSelect;
export type InsertDashboardLayout = z.infer<typeof insertDashboardLayoutSchema>;
