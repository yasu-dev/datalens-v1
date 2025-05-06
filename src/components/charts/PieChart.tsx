import React from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
  Legend,
} from 'recharts';
import { 
  NameType, 
  ValueType 
} from 'recharts/types/component/DefaultTooltipContent';

interface PieChartProps {
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
  dataKey?: string;
  nameKey?: string;
  colors?: string[];
  innerRadius?: number;
  outerRadius?: number;
  height?: number;
  className?: string;
  showTooltip?: boolean;
  showLegend?: boolean;
  formatter?: (value: any) => string;
}

const COLORS = [
  '#0066CC', '#00BF80', '#E53935', '#F59E0B', 
  '#8B5CF6', '#10B981', '#6366F1', '#EC4899'
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
  if (percent < 0.05) return null;
  
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  const percentValue = (percent * 100).toFixed(0);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor="middle"
      dominantBaseline="central"
      className="text-xs font-medium"
      style={{ 
        fontWeight: 'bold',
        textShadow: '0px 0px 2px rgba(0,0,0,0.5)'
      }}
    >
      {`${percentValue}%`}
    </text>
  );
};

const CustomTooltip = ({ 
  active, 
  payload,
  formatter 
}: TooltipProps<ValueType, NameType> & { formatter?: (value: any) => string }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const value = data.value;
    const displayValue = formatter ? formatter(value) : value;
    
    return (
      <div className="bg-white shadow-md rounded-md p-2 text-sm border border-neutral-200">
        <p className="font-medium text-neutral-800">{data.name}</p>
        <p className="text-neutral-600">
          <span style={{ color: data.color }}>
            値: <span className="font-medium">{displayValue}</span>
          </span>
        </p>
      </div>
    );
  }

  return null;
};

const CustomLegend = (props: any) => {
  const { payload } = props;
  
  return (
    <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs mt-2">
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center">
          <div 
            className="w-3 h-3 mr-1 rounded-sm" 
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-neutral-700">{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

const PieChart: React.FC<PieChartProps> = ({
  data,
  dataKey = 'value',
  nameKey = 'name',
  colors = COLORS,
  innerRadius = 0,
  outerRadius = 80,
  height = 300,
  className = '',
  showTooltip = true,
  showLegend = true,
  formatter,
}) => {
  // 異なるコンテナサイズでも一貫した見た目を実現するため、内径と外径の比率を一定に保つ
  const chartRatio = 0.9; // チャートが占める比率
  const innerRadiusRatio = innerRadius > 0 ? innerRadius / outerRadius : 0; // 内径/外径の比率を保存
  
  // 高さに基づいて最適な外径を計算（上部の余白を確保するため小さめに）
  const calculatedOuterRadius = Math.min(height * 0.35, outerRadius);
  // 比率を維持した内径を計算
  const calculatedInnerRadius = calculatedOuterRadius * innerRadiusRatio;
  
  return (
    <div className={`w-full ${className}`} style={{ height: height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart margin={{ top: 20, right: 5, left: 5, bottom: 5 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={innerRadius > 0 ? renderCustomizedLabel : undefined}
            outerRadius={calculatedOuterRadius}
            innerRadius={calculatedInnerRadius}
            fill="#8884d8"
            dataKey={dataKey}
            nameKey={nameKey}
            animationDuration={800}
            animationEasing="ease-out"
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color || colors[index % colors.length]} 
                stroke="white"
                strokeWidth={1}
              />
            ))}
          </Pie>
          {showTooltip && <Tooltip content={<CustomTooltip formatter={formatter} />} />}
          {showLegend && (
            <Legend 
              content={<CustomLegend />} 
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ paddingTop: '5px' }}
            />
          )}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;