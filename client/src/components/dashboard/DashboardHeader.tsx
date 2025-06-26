import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Menu } from 'lucide-react';
import { getReadinessStatus, cn } from '@/lib/utils';
import type { User, FitnessMetrics } from '@shared/schema';

interface DashboardHeaderProps {
  user: User | null;
  metrics: FitnessMetrics | null;
  onMenuToggle: () => void;
}

export function DashboardHeader({ user, metrics, onMenuToggle }: DashboardHeaderProps) {
  const readinessScore = metrics ? (metrics.hrvScore || 0) * 2 : 0; // Convert HRV to percentage
  const readiness = getReadinessStatus(readinessScore);

  return (
    <header className="p-6 border-b border-white/10">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden glassmorphism p-3"
            onClick={onMenuToggle}
          >
            <Menu className="h-5 w-5 text-white" />
          </Button>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Good morning, {user?.firstName || 'there'}! 🔥
            </h2>
            <p className="text-gray-400 mt-1">Ready to crush your goals today?</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Readiness score */}
          <div className="glassmorphism px-4 py-2 rounded-xl flex items-center space-x-2">
            <div
              className={cn(
                'w-3 h-3 rounded-full pulse-ring',
                readiness.status === 'excellent'
                  ? 'bg-green-400'
                  : readiness.status === 'good'
                    ? 'bg-yellow-400'
                    : 'bg-red-400',
              )}
            />
            <Badge variant="secondary" className={cn('text-sm font-medium', readiness.color)}>
              {Math.round(readinessScore)}% {readiness.label}
            </Badge>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="glassmorphism p-3 relative">
            <Bell className="h-5 w-5 text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full" />
          </Button>
        </div>
      </div>
    </header>
  );
}
