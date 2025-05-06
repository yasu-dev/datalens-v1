import React, { useMemo } from 'react';
import {
  LineChart,
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

interface TimeSeriesChartProps {
  data: any[];
  lines: {
    dataKey: string;
    color: string;
    name?: string;
    strokeWidth?: number;
  }[];
  height?: number;
  className?: string;
  showGrid?: boolean;
  formatter?: (value: ValueType, name: NameType) => string;
  yAxisUnit?: string;
}

// 月名から数値への変換（ソート用）
const getMonthNumber = (monthName: string): number => {
  if (!monthName) return 0;
  
  const months: {[key: string]: number} = {
    '1月': 1, '2月': 2, '3月': 3, '4月': 4, '5月': 5, '6月': 6, 
    '7月': 7, '8月': 8, '9月': 9, '10月': 10, '11月': 11, '12月': 12
  };
  
  for (const key in months) {
    if (monthName.includes(key)) {
      return months[key];
    }
  }
  return 0;
};

// カスタムツールチップ
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

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({
  data,
  lines,
  height = 300,
  className = '',
  showGrid = true,
  formatter,
  yAxisUnit = '',
}) => {
  // データを年月でソート
  const sortedData = useMemo(() => {
    return [...data].map(item => {
      // 年情報が欠けている場合は実績データの2023年とみなす
      const year = item.year || 2023;
      // 月情報を数値に変換
      const monthVal = typeof item.month === 'string' ? getMonthNumber(item.month) : parseInt(item.month) || 0;
      // ソート用のインデックスを追加
      return {
        ...item,
        sortIndex: (year * 100) + monthVal
      };
    }).sort((a, b) => a.sortIndex - b.sortIndex);
  }, [data]);
  
  // 予測データと実績データを分離
  const { actualData, predictionData } = useMemo(() => {
    const actual: any[] = [];
    const prediction: any[] = [];
    
    sortedData.forEach(item => {
      if (item.displayMonth && item.displayMonth.includes('予測')) {
        prediction.push(item);
      } else {
        actual.push(item);
      }
    });
    
    return { actualData: actual, predictionData: prediction };
  }, [sortedData]);

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={sortedData}
          margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />}
          <XAxis 
            dataKey="displayMonth" 
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
          <Tooltip 
            content={<CustomTooltip formatter={formatter} />} 
            cursor={{ stroke: '#CBD5E1', strokeWidth: 1, strokeDasharray: '3 3' }} 
          />
          
          {lines.map((line, index) => (
            <React.Fragment key={index}>
              {/* 実績データの線 */}
              <Line
                data={actualData}
                type="linear"
                dataKey={line.dataKey}
                name={line.name || line.dataKey}
                stroke={line.color}
                strokeWidth={line.strokeWidth || 2}
                activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
                dot={{ r: 0 }}
                connectNulls={true}
              />
              
              {/* 予測データの線 */}
              {predictionData.length > 0 && (
                <Line
                  data={predictionData}
                  type="linear"
                  dataKey={line.dataKey}
                  name={line.name || line.dataKey}
                  stroke="#E53935"  // 赤色
                  strokeWidth={line.strokeWidth || 2}
                  activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
                  dot={{ r: 3, fill: '#E53935', stroke: 'white', strokeWidth: 2 }}
                  connectNulls={true}
                />
              )}
            </React.Fragment>
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeSeriesChart; 