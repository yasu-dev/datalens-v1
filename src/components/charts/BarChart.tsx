import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import { 
  NameType, 
  ValueType 
} from 'recharts/types/component/DefaultTooltipContent';

interface BarChartProps {
  data: any[];
  dataKey: string;
  nameKey: string;
  color?: string;
  barSize?: number;
  height?: number;
  className?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  formatter?: (value: ValueType, name: NameType) => string;
  yAxisUnit?: string;
}

const CustomTooltip = ({ 
  active, 
  payload, 
  label, 
  formatter 
}: TooltipProps<ValueType, NameType> & { formatter?: (value: ValueType, name: NameType) => string }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value as ValueType;
    const name = payload[0].name as NameType || payload[0].dataKey as NameType;
    const displayValue = formatter ? formatter(value, name) : value;
    
    return (
      <div className="bg-white shadow-md rounded-md p-2 text-sm border border-neutral-200">
        <p className="font-medium text-neutral-800">{label}</p>
        <p className="text-neutral-600">
          {name}: <span className="font-medium">{displayValue}</span>
        </p>
      </div>
    );
  }

  return null;
};

const BarChart: React.FC<BarChartProps> = ({
  data,
  dataKey,
  nameKey,
  color = '#0066CC',
  barSize = 30,
  height = 300,
  className = '',
  showGrid = true,
  showTooltip = true,
  formatter,
  yAxisUnit = '',
}) => {
  return (
    <div className={`w-full h-${height} ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
          barSize={barSize}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />}
          <XAxis 
            dataKey={nameKey} 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748B', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748B', fontSize: 12 }}
            tickFormatter={(value) => `${value}${yAxisUnit}`}
            width={60}
          />
          {showTooltip && <Tooltip 
            content={<CustomTooltip formatter={formatter} />} 
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} 
          />}
          <Bar 
            dataKey={dataKey} 
            fill={color} 
            radius={[4, 4, 0, 0]}
            animationDuration={800}
            animationEasing="ease-out"
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;