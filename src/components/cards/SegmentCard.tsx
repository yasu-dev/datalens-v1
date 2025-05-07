import React from 'react';
import { CustomerSegment } from '../../data/customerDataService';
import { Users, TrendingUp, ShoppingBag } from 'lucide-react';

interface SegmentCardProps {
  segment: CustomerSegment;
  onClick: () => void;
}

const SegmentCard: React.FC<SegmentCardProps> = ({ segment, onClick }) => {
  // 利用頻度ステータスを決定
  const getFrequencyStatus = (frequency: number) => {
    if (frequency > 4) return { label: '高頻度', color: 'text-emerald-500' };
    if (frequency > 2) return { label: '中頻度', color: 'text-amber-500' };
    return { label: '低頻度', color: 'text-blue-500' };
  };
  
  // 支出額ステータスを決定
  const getSpendingStatus = (spending: number) => {
    if (spending > 20000) return { label: '高額支出', color: 'text-emerald-500' };
    if (spending > 10000) return { label: '中額支出', color: 'text-amber-500' };
    return { label: '低額支出', color: 'text-blue-500' };
  };
  
  const frequencyStatus = getFrequencyStatus(segment.attributes.avgVisitFrequency);
  const spendingStatus = getSpendingStatus(segment.attributes.avgSpending);
  
  return (
    <div 
      className="bg-white border border-neutral-200 hover:border-primary-300 rounded-lg shadow-sm hover:shadow transition p-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-medium text-neutral-800">{segment.name}</h3>
        <span className="bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded-full font-medium">
          {(segment.totalCustomers / 10000).toFixed(1)}万人
        </span>
      </div>
      
      <p className="text-sm text-neutral-600 mb-4 h-10 line-clamp-2">
        {segment.description}
      </p>
      
      <div className="space-y-3">
        {/* 来店頻度 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Users size={16} className="text-neutral-400 mr-2" />
            <span className="text-sm text-neutral-600">来店頻度</span>
          </div>
          <div className="flex items-center">
            <span className={`text-sm font-medium ${frequencyStatus.color}`}>
              {frequencyStatus.label}
            </span>
            <span className="text-xs text-neutral-500 ml-1">
              （月{segment.attributes.avgVisitFrequency.toFixed(1)}回）
            </span>
          </div>
        </div>
        
        {/* 平均支出 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ShoppingBag size={16} className="text-neutral-400 mr-2" />
            <span className="text-sm text-neutral-600">平均支出</span>
          </div>
          <div className="flex items-center">
            <span className={`text-sm font-medium ${spendingStatus.color}`}>
              {spendingStatus.label}
            </span>
            <span className="text-xs text-neutral-500 ml-1">
              （¥{segment.attributes.avgSpending.toLocaleString()}）
            </span>
          </div>
        </div>
        
        {/* 主要年齢・性別 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <TrendingUp size={16} className="text-neutral-400 mr-2" />
            <span className="text-sm text-neutral-600">主要層</span>
          </div>
          <span className="text-sm text-neutral-700">
            {segment.attributes.dominantAgeGroup}・{segment.attributes.dominantGender}
          </span>
        </div>
      </div>
      
      {/* 主要カテゴリータグ */}
      <div className="mt-4 flex flex-wrap gap-1">
        {segment.attributes.topCategories.map((category, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-100 text-neutral-800"
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SegmentCard; 