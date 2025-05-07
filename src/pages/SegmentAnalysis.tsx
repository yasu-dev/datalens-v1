import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSegmentDetails, fetchSegmentMetrics, SegmentDetails, SegmentMetrics } from '../data/customerDataService';
import AnalysisPathBreadcrumb from '../components/navigation/AnalysisPathBreadcrumb';
import DataAccessWarning from '../components/privacy/DataAccessWarning';
import { Users, TrendingUp, ArrowRight, BarChart4, Calendar } from 'lucide-react';
import PieChart from '../components/charts/PieChart';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';

const SegmentAnalysis: React.FC = () => {
  const { segmentId } = useParams<{ segmentId: string }>();
  const [segmentDetails, setSegmentDetails] = useState<SegmentDetails | null>(null);
  const [metrics, setMetrics] = useState<SegmentMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'demographics' | 'behavior'>('demographics');
  const navigate = useNavigate();
  
  // データロード
  useEffect(() => {
    const loadData = async () => {
      if (!segmentId) return;
      
      setIsLoading(true);
      try {
        // 並列でデータ取得
        const [details, metricsData] = await Promise.all([
          fetchSegmentDetails(segmentId),
          fetchSegmentMetrics(segmentId)
        ]);
        
        setSegmentDetails(details);
        setMetrics(metricsData);
      } catch (error) {
        console.error('Failed to load segment data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [segmentId]);
  
  // 顧客リスト画面への遷移
  const handleViewCustomerList = () => {
    if (segmentId) {
      navigate(`/customer-list/${segmentId}`);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="loader"></div>
      </div>
    );
  }
  
  if (!segmentDetails || !metrics) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
        セグメントデータの取得に失敗しました。
      </div>
    );
  }
  
  return (
    <div className="space-y-6 animate-fade-in">
      <AnalysisPathBreadcrumb 
        path={[
          { label: 'セグメント選択', url: '/customer-segmentation' },
          { label: segmentDetails.name, url: '#' }
        ]}
        accessLevel="segment"
      />
      
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">{segmentDetails.name}</h1>
          <p className="text-neutral-600 mt-1">{segmentDetails.description}</p>
        </div>
        <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-md text-sm font-medium">
          {(segmentDetails.totalCustomers / 10000).toFixed(1)}万人
        </span>
      </div>
      
      <DataAccessWarning level="segment" />
      
      {/* KPIサマリー */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 総顧客数 */}
        <div className="bg-white border border-neutral-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-neutral-500">総顧客数</div>
            <Users size={16} className="text-neutral-400" />
          </div>
          <div className="text-2xl font-bold text-neutral-800">
            {metrics.totalCustomers.toLocaleString()}
          </div>
          <div className="text-xs text-neutral-500 mt-1">
            全顧客の{((metrics.totalCustomers / 45000000) * 100).toFixed(1)}%
          </div>
        </div>
        
        {/* 平均LTV */}
        <div className="bg-white border border-neutral-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-neutral-500">平均顧客生涯価値</div>
            <TrendingUp size={16} className="text-neutral-400" />
          </div>
          <div className="text-2xl font-bold text-neutral-800">
            ¥{metrics.avgLTV.toLocaleString()}
          </div>
          <div className="text-xs text-emerald-500 mt-1">
            シェア拡大中
          </div>
        </div>
        
        {/* 解約率 */}
        <div className="bg-white border border-neutral-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-neutral-500">解約率</div>
            <TrendingUp size={16} className="text-neutral-400" />
          </div>
          <div className="text-2xl font-bold text-neutral-800">
            {metrics.churnRate}%
          </div>
          <div className="text-xs text-neutral-500 mt-1">
            過去30日間
          </div>
        </div>
        
        {/* 成長率 */}
        <div className="bg-white border border-neutral-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-neutral-500">成長率</div>
            <TrendingUp size={16} className="text-neutral-400" />
          </div>
          <div className="text-2xl font-bold text-neutral-800">
            {metrics.growthRate > 0 ? '+' : ''}{metrics.growthRate}%
          </div>
          <div className="text-xs text-neutral-500 mt-1">
            前年同期比
          </div>
        </div>
      </div>
      
      {/* トレンドグラフ */}
      <div className="bg-white border border-neutral-200 rounded-lg p-6">
        <h2 className="text-lg font-medium text-neutral-800 mb-4">トレンド推移</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 訪問トレンド */}
          <div>
            <h3 className="text-sm font-medium text-neutral-700 mb-2">来店数トレンド</h3>
            <LineChart 
              data={metrics.visitTrend}
              lines={[{ dataKey: 'value', color: '#0066CC', name: '来店数指数' }]}
              xAxisDataKey="period"
              height={200}
              formatter={(value) => `${value}`}
            />
          </div>
          
          {/* 支出トレンド */}
          <div>
            <h3 className="text-sm font-medium text-neutral-700 mb-2">支出トレンド</h3>
            <LineChart 
              data={metrics.spendingTrend}
              lines={[{ dataKey: 'value', color: '#00BF80', name: '支出指数' }]}
              xAxisDataKey="period"
              height={200}
              formatter={(value) => `${value}`}
            />
          </div>
        </div>
      </div>
      
      {/* 詳細分析タブ */}
      <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
        {/* タブナビゲーション */}
        <div className="border-b border-neutral-200">
          <div className="flex">
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'demographics' 
                  ? 'border-b-2 border-primary-500 text-primary-600' 
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
              onClick={() => setActiveTab('demographics')}
            >
              人口統計分析
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'behavior' 
                  ? 'border-b-2 border-primary-500 text-primary-600' 
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
              onClick={() => setActiveTab('behavior')}
            >
              行動パターン分析
            </button>
          </div>
        </div>
        
        {/* タブコンテンツ */}
        <div className="p-6">
          {activeTab === 'demographics' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 年齢分布 */}
              <div>
                <h3 className="text-sm font-medium text-neutral-700 mb-3">年齢分布</h3>
                <div className="h-[220px]">
                  <PieChart 
                    data={segmentDetails.demographicBreakdown.ageGroups}
                    innerRadius={40}
                    outerRadius={80}
                    height={220}
                    formatter={(value) => `${value}%`}
                  />
                </div>
              </div>
              
              {/* 性別分布 */}
              <div>
                <h3 className="text-sm font-medium text-neutral-700 mb-3">性別分布</h3>
                <div className="h-[220px]">
                  <PieChart 
                    data={segmentDetails.demographicBreakdown.genders}
                    innerRadius={40}
                    outerRadius={80}
                    height={220}
                    formatter={(value) => `${value}%`}
                  />
                </div>
              </div>
              
              {/* 婚姻状況 */}
              <div>
                <h3 className="text-sm font-medium text-neutral-700 mb-3">婚姻状況</h3>
                <div className="h-[220px]">
                  <PieChart 
                    data={segmentDetails.demographicBreakdown.maritalStatus}
                    innerRadius={40}
                    outerRadius={80}
                    height={220}
                    formatter={(value) => `${value}%`}
                  />
                </div>
              </div>
              
              {/* 職業 */}
              <div>
                <h3 className="text-sm font-medium text-neutral-700 mb-3">職業分布</h3>
                <BarChart 
                  data={segmentDetails.demographicBreakdown.occupations}
                  dataKey="value"
                  nameKey="name"
                  color="#0066CC"
                  height={220}
                  formatter={(value) => `${value}%`}
                />
              </div>
              
              {/* 収入帯 */}
              <div>
                <h3 className="text-sm font-medium text-neutral-700 mb-3">世帯年収</h3>
                <BarChart 
                  data={segmentDetails.demographicBreakdown.incomeRanges}
                  dataKey="value"
                  nameKey="name"
                  color="#00BF80"
                  height={220}
                  formatter={(value) => `${value}%`}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 訪問頻度分布 */}
              <div>
                <h3 className="text-sm font-medium text-neutral-700 mb-3">来店頻度分布</h3>
                <BarChart 
                  data={segmentDetails.behavioralPatterns.visitFrequency}
                  dataKey="value"
                  nameKey="name"
                  color="#0066CC"
                  height={220}
                  formatter={(value) => `${value}%`}
                />
              </div>
              
              {/* 来店時間帯 */}
              <div>
                <h3 className="text-sm font-medium text-neutral-700 mb-3">来店時間帯</h3>
                <BarChart 
                  data={segmentDetails.behavioralPatterns.visitTimes}
                  dataKey="value"
                  nameKey="name"
                  color="#00BF80"
                  height={220}
                  formatter={(value) => `${value}%`}
                />
              </div>
              
              {/* 好みのエリア */}
              <div>
                <h3 className="text-sm font-medium text-neutral-700 mb-3">訪問エリア傾向</h3>
                <BarChart 
                  data={segmentDetails.behavioralPatterns.preferredAreas}
                  dataKey="value"
                  nameKey="name"
                  color="#F59E0B"
                  height={220}
                  formatter={(value) => `${value}%`}
                />
              </div>
              
              {/* 購入カテゴリ */}
              <div>
                <h3 className="text-sm font-medium text-neutral-700 mb-3">購入カテゴリ</h3>
                <BarChart 
                  data={segmentDetails.behavioralPatterns.purchaseCategories}
                  dataKey="value"
                  nameKey="name"
                  color="#8B5CF6"
                  height={220}
                  formatter={(value) => `${value}%`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* フットアクション */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleViewCustomerList}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <span>顧客リストを表示</span>
          <ArrowRight size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default SegmentAnalysis; 