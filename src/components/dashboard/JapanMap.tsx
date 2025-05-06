import React from 'react';

interface Prefecture {
  id: string;
  name: string;
  value?: number;
  d: string;
}

interface JapanMapProps {
  data?: Record<string, number>;
  minColor?: string;
  maxColor?: string;
  height?: number;
  width?: number;
  className?: string;
  onClick?: (prefId: string) => void;
  selectedPrefectures?: string[];
}

// SVG paths for simplified Japan map (showing major prefectures)
const prefectures: Prefecture[] = [
  { id: 'tokyo', name: '東京', d: 'M133.3,115.7l-1.6-1.1l-1.3,0.4l-0.8,2.8l1.7,1.8l2-0.4L133.3,115.7z' },
  { id: 'kanagawa', name: '神奈川', d: 'M132.1,122.9l0.4-2.1l-1.8-1l-3.6,0.6l-2,1.9l1.4,1.4l2.8,0.1L132.1,122.9z' },
  { id: 'chiba', name: '千葉', d: 'M137.5,115.3l-2.2-2.1l-3.1,0.5l-0.4,3.1l1.3,3.1l3.4,1.9l2.8-1.6l0.9-3.1L137.5,115.3z' },
  { id: 'saitama', name: '埼玉', d: 'M130.2,110.5l-4.6-0.5l-3.9,1.9l0.4,2.6l3.2,0.6l3.4-0.3l2.9-1.6L130.2,110.5z' },
  { id: 'osaka', name: '大阪', d: 'M93.8,143.8l-3.3-1l-1.1,1.2l0.4,2.3l2.9,1.2l2-1.5L93.8,143.8z' },
  { id: 'kyoto', name: '京都', d: 'M91.5,137.2l-3.1,0.6l-1,2.9l1.2,2.7l3.8,0.4l1.4-2.1l-0.5-3.2L91.5,137.2z' },
  { id: 'hyogo', name: '兵庫', d: 'M85.5,140.5l-2.9-0.8l-3.3,1.4l-0.6,2.9l2.1,2.1l4.1-0.2l1.7-2.5L85.5,140.5z' },
  { id: 'fukuoka', name: '福岡', d: 'M50.5,165.8l-3.1-1.5l-2.4,1.2l-0.5,3.3l2.2,2.2l3.5-0.8l1.2-2.5L50.5,165.8z' },
  { id: 'hokkaido', name: '北海道', d: 'M150,50l-10-5l-15,3l-5,7l2,10l8,8l13,2l10-5l5-10L150,50z' },
  { id: 'aichi', name: '愛知', d: 'M115,135l-4,0l-2,3l1,3l3,2l4-1l2-3L115,135z' }
];

const JapanMap: React.FC<JapanMapProps> = ({
  data = {},
  minColor = '#EFF6FF',
  maxColor = '#0066CC',
  height = 300,
  width = 400,
  className = '',
  onClick,
  selectedPrefectures = [],
}) => {
  // Calculate color for each prefecture
  const values = Object.values(data);
  const minValue = values.length ? Math.min(...values) : 0;
  const maxValue = values.length ? Math.max(...values) : 100;
  
  const getColor = (value?: number) => {
    if (value === undefined) return minColor;
    
    // Normalize the value between 0 and 1
    const normalized = (value - minValue) / (maxValue - minValue || 1);
    
    // Convert hex colors to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 };
    };
    
    const minRgb = hexToRgb(minColor);
    const maxRgb = hexToRgb(maxColor);
    
    // Interpolate between the colors
    const r = Math.round(minRgb.r + normalized * (maxRgb.r - minRgb.r));
    const g = Math.round(minRgb.g + normalized * (maxRgb.g - minRgb.g));
    const b = Math.round(minRgb.b + normalized * (maxRgb.b - minRgb.b));
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <div className="w-full h-full relative">
        <svg 
          viewBox="0 0 200 200" 
          width="100%" 
          height="100%"
          className="w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <g transform="translate(30, 50) scale(1.5)">
            {prefectures.map(pref => {
              const value = data[pref.id];
              const isSelected = selectedPrefectures.includes(pref.id);
              const prefColor = getColor(value);
              
              return (
                <path
                  key={pref.id}
                  id={pref.id}
                  d={pref.d}
                  fill={prefColor}
                  stroke={isSelected ? '#1E293B' : '#CBD5E1'}
                  strokeWidth={isSelected ? 2.5 : 1}
                  onClick={() => onClick && onClick(pref.id)}
                  className="transition-all duration-300 hover:opacity-80 hover:shadow-lg cursor-pointer"
                  filter={isSelected ? "drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.2))" : "none"}
                >
                  <title>{pref.name}: {value || '0'}</title>
                </path>
              );
            })}
          </g>
        </svg>
        
        {/* Legend */}
        <div className="absolute bottom-1 right-1 left-1 bg-white rounded-md shadow-sm px-3 py-2 text-xs flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-neutral-700">値:</span>
            <div className="w-24 h-3 rounded-full mx-1 bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${minColor}, ${maxColor})` }}></div>
          </div>
          <div className="flex justify-between w-20">
            <span className="text-neutral-600">{minValue}</span>
            <span className="text-neutral-600">{maxValue}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JapanMap;