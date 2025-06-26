import { DraggableWidget } from '../DraggableWidget';
import { formatNumber } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  gradient?: 'primary' | 'secondary' | 'green' | 'blue';
}

export function StatsCard({
  title,
  value,
  change,
  changeType = 'positive',
  icon: Icon,
  gradient = 'primary',
}: StatsCardProps) {
  const getGradientClass = () => {
    switch (gradient) {
      case 'secondary':
        return 'gradient-secondary';
      case 'green':
        return 'bg-green-500/20';
      case 'blue':
        return 'bg-blue-500/20';
      default:
        return 'gradient-primary';
    }
  };

  const getIconColor = () => {
    switch (gradient) {
      case 'green':
        return 'text-green-400';
      case 'blue':
        return 'text-blue-400';
      default:
        return 'text-white';
    }
  };

  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-400';
      case 'negative':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <DraggableWidget>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1 text-white">
            {typeof value === 'number' ? formatNumber(value) : value}
          </p>
          {change && <p className={`text-xs mt-1 ${getChangeColor()}`}>{change}</p>}
        </div>
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${getGradientClass()}`}
        >
          <Icon className={`h-6 w-6 ${getIconColor()}`} />
        </div>
      </div>
    </DraggableWidget>
  );
}
