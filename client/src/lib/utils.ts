import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Layout breakpoints for responsive grid
export const BREAKPOINTS = {
  lg: 1200,
  md: 996,
  sm: 768,
  xs: 480,
  xxs: 0
};

// Default grid columns for different breakpoints
export const GRID_COLS = {
  lg: 12,
  md: 10,
  sm: 6,
  xs: 4,
  xxs: 2
};

// Widget size constraints
export const WIDGET_CONSTRAINTS = {
  minW: 2,
  minH: 2,
  maxW: 12,
  maxH: 8
};

// Default widget layouts
export const DEFAULT_LAYOUTS = {
  lg: [
    { i: 'stats-steps', x: 0, y: 0, w: 3, h: 2 },
    { i: 'stats-calories', x: 3, y: 0, w: 3, h: 2 },
    { i: 'stats-hrv', x: 6, y: 0, w: 3, h: 2 },
    { i: 'stats-sleep', x: 9, y: 0, w: 3, h: 2 },
    { i: 'performance-chart', x: 0, y: 2, w: 8, h: 4 },
    { i: 'ai-recommendations', x: 8, y: 2, w: 4, h: 4 },
    { i: 'goal-progress', x: 0, y: 6, w: 8, h: 4 },
    { i: 'daily-plan', x: 8, y: 6, w: 4, h: 3 },
    { i: 'weekly-summary', x: 8, y: 9, w: 4, h: 3 }
  ],
  md: [
    { i: 'stats-steps', x: 0, y: 0, w: 2, h: 2 },
    { i: 'stats-calories', x: 2, y: 0, w: 2, h: 2 },
    { i: 'stats-hrv', x: 4, y: 0, w: 2, h: 2 },
    { i: 'stats-sleep', x: 6, y: 0, w: 2, h: 2 },
    { i: 'performance-chart', x: 0, y: 2, w: 6, h: 4 },
    { i: 'ai-recommendations', x: 6, y: 2, w: 4, h: 4 },
    { i: 'goal-progress', x: 0, y: 6, w: 6, h: 4 },
    { i: 'daily-plan', x: 6, y: 6, w: 4, h: 3 },
    { i: 'weekly-summary', x: 6, y: 9, w: 4, h: 3 }
  ],
  sm: [
    { i: 'stats-steps', x: 0, y: 0, w: 3, h: 2 },
    { i: 'stats-calories', x: 3, y: 0, w: 3, h: 2 },
    { i: 'stats-hrv', x: 0, y: 2, w: 3, h: 2 },
    { i: 'stats-sleep', x: 3, y: 2, w: 3, h: 2 },
    { i: 'performance-chart', x: 0, y: 4, w: 6, h: 4 },
    { i: 'ai-recommendations', x: 0, y: 8, w: 6, h: 4 },
    { i: 'goal-progress', x: 0, y: 12, w: 6, h: 4 },
    { i: 'daily-plan', x: 0, y: 16, w: 6, h: 3 },
    { i: 'weekly-summary', x: 0, y: 19, w: 6, h: 3 }
  ],
  xs: [
    { i: 'stats-steps', x: 0, y: 0, w: 4, h: 2 },
    { i: 'stats-calories', x: 0, y: 2, w: 4, h: 2 },
    { i: 'stats-hrv', x: 0, y: 4, w: 4, h: 2 },
    { i: 'stats-sleep', x: 0, y: 6, w: 4, h: 2 },
    { i: 'performance-chart', x: 0, y: 8, w: 4, h: 4 },
    { i: 'ai-recommendations', x: 0, y: 12, w: 4, h: 4 },
    { i: 'goal-progress', x: 0, y: 16, w: 4, h: 4 },
    { i: 'daily-plan', x: 0, y: 20, w: 4, h: 3 },
    { i: 'weekly-summary', x: 0, y: 23, w: 4, h: 3 }
  ]
};

// Format numbers with appropriate precision
export function formatNumber(value: number, precision = 1): string {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(precision) + 'M';
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(precision) + 'K';
  }
  return value.toFixed(precision);
}

// Format percentage
export function formatPercentage(value: number): string {
  return Math.round(value * 100) + '%';
}

// Format time duration
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

// Get readiness status based on score
export function getReadinessStatus(score: number): { status: string; color: string; label: string } {
  if (score >= 85) {
    return { status: 'excellent', color: 'text-green-400', label: 'Ready' };
  } else if (score >= 70) {
    return { status: 'good', color: 'text-yellow-400', label: 'Caution' };
  } else {
    return { status: 'poor', color: 'text-red-400', label: 'Rest' };
  }
}

// Get goal probability status
export function getGoalProbabilityStatus(probability: number): { status: string; color: string; label: string } {
  if (probability >= 0.8) {
    return { status: 'likely', color: 'text-green-400', label: 'Likely' };
  } else if (probability >= 0.6) {
    return { status: 'possible', color: 'text-yellow-400', label: 'Possible' };
  } else {
    return { status: 'unlikely', color: 'text-red-400', label: 'Unlikely' };
  }
}
