import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  fetchSegmentDetails, 
  fetchCustomerProfiles, 
  CustomerSegment, 
  CustomerProfileSummary, 
  FilterCriteria
} from '../data/customerDataService';
import AnalysisPathBreadcrumb from '../components/navigation/AnalysisPathBreadcrumb';
import VirtualizedCustomerTable from '../components/tables/VirtualizedCustomerTable';
import { Filter } from 'lucide-react';

const CustomerList: React.FC = () => {
  const { segmentId } = useParams<{ segmentId: string }>();
  const navigate = useNavigate();
  
  // 状態管理
  const [segmentInfo, setSegmentInfo] = useState<CustomerSegment | null>(null);
  const [customers, setCustomers] = useState<CustomerProfileSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [filters, setFilters] = useState<FilterCriteria>({});
  
  // セグメント情報の取得
  useEffect(() => {
    const fetchSegmentInfo = async () => {
      if (!segmentId) return;
      
      try {
        const segmentData = await fetchSegmentDetails(segmentId);
        setSegmentInfo(segmentData);
      } catch (error) {
        console.error('Failed to fetch segment info:', error);
      }
    };
    
    fetchSegmentInfo();
  }, [segmentId]);
  
  // 顧客データの取得
  useEffect(() => {
    const fetchCustomerData = async () => {
      if (!segmentId) return;
      
      setIsLoading(true);
      try {
        const result = await fetchCustomerProfiles(segmentId, {
          page: currentPage,
          pageSize,
          ...filters
        });
        
        setCustomers(result.items);
        setTotalCount(result.totalCount);
      } catch (error) {
        console.error('Failed to fetch customer data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCustomerData();
  }, [segmentId, currentPage, pageSize, filters]);
  
  // ページ変更ハンドラー
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // 顧客選択ハンドラー - 直接個人詳細分析画面に遷移
  const handleCustomerSelect = (customerId: string) => {
    navigate(`/personal-analysis/${customerId}`);
  };
  
  // フィルター適用ハンドラー
  const handleFilterChange = (newFilters: FilterCriteria) => {
    setFilters(newFilters);
    setCurrentPage(1); // フィルター変更時は1ページ目に戻る
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      {segmentInfo && (
        <AnalysisPathBreadcrumb 
          path={[
            { label: 'セグメント選択', url: '/customer-segmentation' },
            { label: segmentInfo.name, url: `/segment-analysis/${segmentId}` },
            { label: '顧客リスト', url: '#' }
          ]}
        />
      )}
      
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">
            顧客リスト
          </h1>
          {segmentInfo && (
            <p className="text-neutral-600 mt-1">
              このセグメントには {totalCount.toLocaleString()} 名の顧客がいます。
            </p>
          )}
        </div>
        <button 
          className="px-4 py-2 bg-white border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          onClick={() => setFilters({})}
        >
          <div className="flex items-center">
            <Filter size={16} className="mr-1" />
            <span>フィルター</span>
          </div>
        </button>
      </div>
      
      {/* メインコンテンツ - 顧客テーブル */}
      <VirtualizedCustomerTable 
        customers={customers}
        isLoading={isLoading}
        totalCount={totalCount}
        page={currentPage}
        onPageChange={handlePageChange}
        onCustomerSelect={handleCustomerSelect}
        pageSize={pageSize}
      />
    </div>
  );
};

export default CustomerList; 