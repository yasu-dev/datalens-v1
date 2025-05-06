import React from 'react';
import { scaleLinear } from 'd3-scale';

interface HeatMapChartProps {
  data: Array<{
    day: string;
    hour: number;
    value: number;
  }>;
  xLabels?: string[];
  yLabels?: string[];
  height?: number;
  className?: string;
  minColor?: string;
  maxColor?: string;
  tooltip?: boolean;
}

const HeatMapChart: React.FC<HeatMapChartProps> = ({
  data,
  xLabels = [...Array(24)].map((_, i) => `${i}:00`),
  yLabels = ['月', '火', '水', '木', '金', '土', '日'],
  height = 300,
  className = '',
  minColor = '#EFF6FF',
  maxColor = '#0066CC',
  tooltip = true,
}) => {
  const [tooltipData, setTooltipData] = React.useState<{
    show: boolean;
    x: number;
    y: number;
    value: number;
    day: string;
    hour: string;
  }>({
    show: false,
    x: 0,
    y: 0,
    value: 0,
    day: '',
    hour: '',
  });

  // Find min and max values for color scaling
  const values = data.map(d => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  // Create color scale
  const colorScale = scaleLinear()
    .domain([minValue, maxValue])
    .range([minColor, maxColor] as any);

  const handleMouseEnter = (
    e: React.MouseEvent<SVGRectElement, MouseEvent>,
    value: number,
    day: string,
    hour: string
  ) => {
    if (tooltip) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left + 10;
      const y = e.clientY - rect.top + 10;
      
      setTooltipData({
        show: true,
        x,
        y,
        value,
        day,
        hour,
      });
    }
  };

  const handleMouseLeave = () => {
    if (tooltip) {
      setTooltipData({
        ...tooltipData,
        show: false,
      });
    }
  };

  // Calculate cell dimensions based on container and number of cells
  const cellWidth = 100 / xLabels.length;
  const cellHeight = (height - 30) / yLabels.length; // Reserve space for labels

  return (
    <div 
      className={`w-full relative ${className}`} 
      style={{ height: height }}
    >
      <div className="w-full h-full flex">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-around pr-2 text-xs text-neutral-600 font-medium">
          {yLabels.map((label, index) => (
            <div key={index} style={{ height: cellHeight }}>
              {label}
            </div>
          ))}
        </div>
        
        {/* Heat map grid */}
        <div className="flex-1 relative">
          <svg width="100%" height={height}>
            {/* Cells */}
            {data.map((d, i) => {
              const rowIndex = yLabels.indexOf(d.day);
              const colIndex = d.hour;
              
              if (rowIndex === -1) return null;
              
              const x = `${colIndex * cellWidth}%`;
              const y = rowIndex * cellHeight;
              const width = `${cellWidth}%`;
              const color = colorScale(d.value);
              
              return (
                <rect
                  key={i}
                  x={x}
                  y={y}
                  width={width}
                  height={cellHeight - 1}
                  fill={color as string}
                  rx={2}
                  ry={2}
                  onMouseEnter={(e) => handleMouseEnter(e, d.value, d.day, xLabels[d.hour])}
                  onMouseLeave={handleMouseLeave}
                  className="transition-colors duration-300"
                />
              );
            })}
            
            {/* X-axis labels */}
            <g transform={`translate(0, ${yLabels.length * cellHeight + 5})`}>
              {xLabels.filter((_, i) => i % 3 === 0).map((label, i) => (
                <text
                  key={i}
                  x={`${i * 3 * cellWidth + cellWidth / 2}%`}
                  y={15}
                  textAnchor="middle"
                  fill="#64748B"
                  fontSize={10}
                >
                  {label}
                </text>
              ))}
            </g>
          </svg>
          
          {/* Tooltip */}
          {tooltip && tooltipData.show && (
            <div
              className="absolute bg-white shadow-md rounded-md p-2 text-xs border border-neutral-200 z-10 pointer-events-none"
              style={{
                left: tooltipData.x,
                top: tooltipData.y,
              }}
            >
              <p className="font-medium text-neutral-800">
                {tooltipData.day} {tooltipData.hour}
              </p>
              <p className="text-neutral-600">
                値: <span className="font-medium">{tooltipData.value}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeatMapChart;