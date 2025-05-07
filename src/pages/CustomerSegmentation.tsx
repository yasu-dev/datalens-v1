import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchInitialSegments, CustomerSegment, FilterCriteria } from '../data/customerDataService';
import SegmentCard from '../components/cards/SegmentCard';
import SegmentFilterPanel from '../components/filters/SegmentFilterPanel';
import DataAccessWarning from '../components/privacy/DataAccessWarning';
import { Shield } from 'lucide-react';

const CustomerSegmentation: React.FC = () => {
  const [segments, setSegments] = useState<CustomerSegment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterCriteria>({});
  const navigate = useNavigate();
  
  // 初期データロード
  useEffect(() => {
    const loadSegments = async () => {
      setIsLoading(true);
      try {
        const data = await fetchInitialSegments(filters);
        setSegments(data);
      } catch (error) {
        console.error('Failed to load segments:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSegments();
  }, [filters]);
  
  // セグメント選択処理
  const handleSegmentSelect = (segmentId: string) => {
    navigate(`/segment-analysis/${segmentId}`);
  };
  
  // フィルター適用処理
  const handleFilterChange = (newFilters: FilterCriteria) => {
    setFilters(newFilters);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-neutral-800">顧客セグメント選択</h1>
      
      <DataAccessWarning level="segment" />
      
      <div className="bg-white border border-neutral-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Shield className="text-blue-600" size={24} />
          </div>
          <div>
            <h2 className="text-lg font-medium text-neutral-800">セグメント分析フロー</h2>
            <p className="text-neutral-600 mt-1">
              顧客セグメントを選択して詳細な分析に進みます。段階的に絞り込むことで、より詳細な顧客インサイトを得ることができます。
              個人データを含む詳細分析には、追加の認証とアクセス記録が必要です。
            </p>
          </div>
        </div>
        
        <div className="mt-4 flex items-center">
          <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">セグメント選択</div>
          <div className="h-0.5 w-8 bg-neutral-200"></div>
          <div className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-medium">セグメント分析</div>
          <div className="h-0.5 w-8 bg-neutral-200"></div>
          <div className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-medium">顧客リスト</div>
          <div className="h-0.5 w-8 bg-neutral-200"></div>
          <div className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-medium">個人詳細分析</div>
        </div>
      </div>
      
      <SegmentFilterPanel 
        filters={filters}
        onChange={handleFilterChange}
      />
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <p className="text-sm text-neutral-500">{segments.length}件のセグメントが見つかりました</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {segments.map(segment => (
              <SegmentCard 
                key={segment.id}
                segment={segment}
                onClick={() => handleSegmentSelect(segment.id)}
              />
            ))}
          </div>
          
          {segments.length === 0 && (
            <div className="bg-white border border-neutral-200 rounded-lg p-8 text-center">
              <p className="text-neutral-600">条件に一致するセグメントがありません。フィルター条件を調整してください。</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CustomerSegmentation; 