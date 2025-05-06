import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
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

interface LineChartProps {
  data: any[];
  lines: {
    dataKey: string;
    color: string;
    name?: string;
    strokeWidth?: number;
  }[];
  xAxisDataKey: string;
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
    const isPrediction = typeof label === 'string' && label.includes('予測');
    
    return (
      <div className="bg-white shadow-md rounded-md p-2 text-sm border border-neutral-200">
        <p className="font-medium text-neutral-800 mb-1">{label}</p>
        {payload.map((entry, index) => {
          const value = entry.value as ValueType;
          const name = entry.name || entry.dataKey as NameType;
          const displayValue = formatter ? formatter(value, name) : value;
          
          return (
            <p 
              key={`item-${index}`} 
              className="text-neutral-600 flex items-center"
              style={{ color: isPrediction ? '#E53935' : entry.color as string }}
            >
              <span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: isPrediction ? '#E53935' : entry.color as string }}></span>
              {isPrediction ? `${name} (AI予測)` : name}: <span className="font-medium ml-1">{displayValue}</span>
            </p>
          );
        })}
      </div>
    );
  }

  return null;
};

const LineChart: React.FC<LineChartProps> = ({
  data,
  lines,
  xAxisDataKey,
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
        <RechartsLineChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />}
          <XAxis 
            dataKey={xAxisDataKey} 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748B', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748B', fontSize: 12 }}
            tickFormatter={(value) => `${value}${yAxisUnit}`}
            width={70}
          />
          {showTooltip && <Tooltip 
            content={<CustomTooltip formatter={formatter} />} 
            cursor={{ stroke: '#CBD5E1', strokeWidth: 1, strokeDasharray: '3 3' }} 
          />}
          {lines.map((line, index) => (
            <Line
              key={index}
              type="linear"
              dataKey={line.dataKey}
              stroke={line.color}
              strokeWidth={line.strokeWidth || 2}
              name={line.name || line.dataKey}
              activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
              dot={{ r: 0 }}
              animationDuration={800 + index * 200}
              animationEasing="ease-out"
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;