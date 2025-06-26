import { DraggableWidget } from "../DraggableWidget";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState } from "react";
import type { FitnessMetrics } from "@shared/schema";

interface PerformanceChartProps {
  metrics: FitnessMetrics[];
}

const timeRanges = [
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
  { key: 'year', label: 'Year' }
];

export function PerformanceChart({ metrics }: PerformanceChartProps) {
  const [selectedRange, setSelectedRange] = useState('week');

  // Transform metrics data for chart
  const chartData = metrics.map((metric, index) => ({
    name: new Date(metric.date).toLocaleDateString('en-US', { weekday: 'short' }),
    trainingLoad: (metric.caloriesBurned || 0) / 30, // Normalize calories to training load
    recoveryScore: (metric.hrvScore || 0) * 2, // Convert HRV to percentage
    sleepQuality: (metric.sleepQuality || 0) * 100,
  })).reverse(); // Show chronological order

  return (
    <DraggableWidget className="lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Workout Performance</h3>
        <div className="flex space-x-2">
          {timeRanges.map((range) => (
            <Button
              key={range.key}
              variant={selectedRange === range.key ? "default" : "ghost"}
              size="sm"
              className={
                selectedRange === range.key 
                  ? "bg-purple-600 text-white" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }
              onClick={() => setSelectedRange(range.key)}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            />
            <YAxis 
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: 'white'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="trainingLoad" 
              stroke="#8B5CF6" 
              strokeWidth={3}
              dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
              name="Training Load"
            />
            <Line 
              type="monotone" 
              dataKey="recoveryScore" 
              stroke="#06B6D4" 
              strokeWidth={3}
              dot={{ fill: '#06B6D4', strokeWidth: 2, r: 4 }}
              name="Recovery Score"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DraggableWidget>
  );
}
