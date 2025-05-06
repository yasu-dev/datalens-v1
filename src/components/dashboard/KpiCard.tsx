import React from 'react';
import { ArrowUpRight, ArrowDownRight, Percent } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  subtitle?: string;
  isPercentage?: boolean;
  className?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  change,
  trend = 'neutral',
  icon,
  subtitle,
  isPercentage = false,
  className = '',
}) => {
  // Determine trend color
  const trendColor = 
    trend === 'up' 
      ? 'text-success-500' 
      : trend === 'down' 
        ? 'text-error-500' 
        : 'text-neutral-500';
  
  // Trend icon
  const trendIcon = 
    trend === 'up' 
      ? <ArrowUpRight size={16} /> 
      : trend === 'down' 
        ? <ArrowDownRight size={16} /> 
        : null;

  return (
    <div className={`dashboard-card ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-neutral-500 text-sm font-medium mb-1">{title}</h3>
          <div className="flex items-baseline">
            <p className="text-2xl font-bold text-neutral-800">{value}</p>
            {isPercentage && <span className="ml-1 text-neutral-500">%</span>}
          </div>
        </div>
        {icon && (
          <div className="bg-primary-50 p-2 rounded-lg">
            {icon}
          </div>
        )}
      </div>

      {(change !== undefined || subtitle) && (
        <div className="mt-3 flex items-center text-sm">
          {change !== undefined && (
            <div className={`flex items-center ${trendColor} mr-2`}>
              {trendIcon}
              <span className="font-medium">{Math.abs(change)}%</span>
            </div>
          )}
          {subtitle && <p className="text-neutral-500">{subtitle}</p>}
        </div>
      )}
    </div>
  );
};

export default KpiCard;