import React, { useState, useMemo, useEffect } from 'react';
import LineChart from '../components/charts/LineChart';
import TimeSeriesChart from '../components/charts/TimeSeriesChart';
import BarChart from '../components/charts/BarChart';
import KpiCard from '../components/dashboard/KpiCard';
import { 
  TrendingUp, 
  Calendar, 
  Users, 
  Clock,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useFilters } from '../contexts/FilterContext';
import {
  getFilteredMonthlyTrendData,
  getFilteredTrafficByTimeData,
  getFilteredConnectivityData,
  getFilteredJourneyStagesData
} from '../data/filteredMockData';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

const TrendsAnalysis: React.FC = () => {
  const { filters } = useFilters();
  const [timeRange, setTimeRange] = useState<string>('1年');
  const [showAiPrediction, setShowAiPrediction] = useState<boolean>(false);
  
  // フィルター適用済みデータを生成（変更時に再計算）
  const monthlyTrendData = useMemo(() => getFilteredMonthlyTrendData(filters), [filters]);
  const trafficByTimeData = useMemo(() => getFilteredTrafficByTimeData(filters), [filters]);
  const connectivityData = useMemo(() => getFilteredConnectivityData(filters), [filters]);
  const journeyStagesData = useMemo(() => getFilteredJourneyStagesData(filters), [filters]);
  
  // Format large numbers with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // フィルター状態に応じたトレンドメトリクス計算
  const trendMetrics = useMemo(() => {
    // フィルター設定に基づいて成長率を調整
    const baseGrowth = 3.8;
    const areaFactorImpact = 
      filters.areas.prefectures.length > 0 || 
      filters.areas.cities.length > 0 || 
      filters.areas.stores.length > 0 
        ? Math.random() * 4 - 2 // -2〜+2の範囲で変動
        : 0;
    
    const segmentImpact = 
      !filters.segments.includes('All') 
        ? Math.random() * 5 - 1 // -1〜+4の範囲で変動
        : 0;
    
    const deviceImpact = 
      !filters.deviceTypes.includes('All') 
        ? Math.random() * 3 - 1 // -1〜+2の範囲で変動
        : 0;
    
    const growthRate = parseFloat((baseGrowth + areaFactorImpact + segmentImpact + deviceImpact).toFixed(1));
    
    // 他のメトリクスも同様に調整
    return {
      monthlyGrowth: growthRate,
      peakTimeChange: parseFloat(((-0.5 + Math.random() * 3 - 1.5) * (growthRate > 0 ? -1 : 1)).toFixed(1)),
      avgDwellTimeChange: parseFloat((2.2 + Math.random() * 4 - 2).toFixed(1)),
      seasonalityScore: parseFloat((7.6 + Math.random() * 2 - 1).toFixed(1))
    };
  }, [filters]);
  
  // AIによる予測データを生成
  const aiPredictionData = useMemo(() => {
    // 過去のデータを基に、将来の予測トレンドを計算
    const lastRealDataIndex = monthlyTrendData.length - 1;
    const lastRealValue = monthlyTrendData[lastRealDataIndex].visitors;
    const lastAvgDwellTime = monthlyTrendData[lastRealDataIndex].avgDwellTime;
    
    // トレンドメトリクスに基づいて成長率を調整
    const growthRate = 1 + (trendMetrics.monthlyGrowth / 100);
    const dwellTimeGrowthRate = 1 + (trendMetrics.avgDwellTimeChange / 100);
    
    // 実績データのみを先に準備
    const combinedData = [...monthlyTrendData];
    
    // 予測データを追加する場合
    if (showAiPrediction) {
      // 予測データを生成し、実績データに連続させて追加（2024年の1月から3月）
      const predictionData = [
        {
          year: 2024,
          month: '1月',
          displayMonth: '2024年1月(予測)',
          visitors: Math.round(lastRealValue * growthRate),
          avgDwellTime: Math.round(lastAvgDwellTime * dwellTimeGrowthRate)
        } as typeof monthlyTrendData[0],
        {
          year: 2024,
          month: '2月',
          displayMonth: '2024年2月(予測)',
          visitors: Math.round(lastRealValue * growthRate * growthRate),
          avgDwellTime: Math.round(lastAvgDwellTime * dwellTimeGrowthRate * dwellTimeGrowthRate)
        } as typeof monthlyTrendData[0],
        {
          year: 2024,
          month: '3月',
          displayMonth: '2024年3月(予測)',
          visitors: Math.round(lastRealValue * growthRate * growthRate * growthRate),
          avgDwellTime: Math.round(lastAvgDwellTime * dwellTimeGrowthRate * dwellTimeGrowthRate * dwellTimeGrowthRate)
        } as typeof monthlyTrendData[0]
      ];
      
      // デバッグ用：予測データの内容をコンソールに出力
      console.log('生成された予測データ (2024年):', predictionData);
      
      // 予測データを結合
      combinedData.push(...predictionData);
    }
    
    return combinedData;
  }, [monthlyTrendData, showAiPrediction, trendMetrics.monthlyGrowth, trendMetrics.avgDwellTimeChange]);

  // デバッグ用：最終的なデータを確認
  useEffect(() => {
    if (showAiPrediction) {
      console.log('表示用データ (データ数):', aiPredictionData.length);
      console.log('実績データの年月範囲:', 
        `${aiPredictionData[0].year}年${aiPredictionData[0].month} 〜 ${aiPredictionData[11].year}年${aiPredictionData[11].month}`);
      
      if (aiPredictionData.length > 12) {
        console.log('予測データの年月範囲:', 
          `${aiPredictionData[12].year}年${aiPredictionData[12].month} 〜 ${aiPredictionData[aiPredictionData.length-1].year}年${aiPredictionData[aiPredictionData.length-1].month}`);
      }
    }
  }, [aiPredictionData, showAiPrediction]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-neutral-800">トレンド分析</h1>
        
        <div className="mt-3 md:mt-0">
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="select pr-10 py-2 appearance-none bg-white"
            >
              <option value="3ヶ月">過去3ヶ月</option>
              <option value="6ヶ月">過去6ヶ月</option>
              <option value="1年">過去1年</option>
              <option value="2年">過去2年</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <ChevronDown size={16} className="text-neutral-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Trend KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="月間成長率" 
          value={trendMetrics.monthlyGrowth}
          isPercentage={true}
          trend={trendMetrics.monthlyGrowth > 0 ? "up" : "down"}
          subtitle="来店者数"
          icon={<TrendingUp size={20} className="text-primary-500" />}
        />
        
        <KpiCard 
          title="ピーク時間変化" 
          value={trendMetrics.peakTimeChange}
          isPercentage={true}
          trend={trendMetrics.peakTimeChange > 0 ? "up" : "down"}
          subtitle="前年比シフト"
          icon={<Calendar size={20} className="text-secondary-500" />}
        />
        
        <KpiCard 
          title="滞在時間変化" 
          value={trendMetrics.avgDwellTimeChange}
          isPercentage={true}
          trend={trendMetrics.avgDwellTimeChange > 0 ? "up" : "down"}
          subtitle="前年比"
          icon={<Clock size={20} className="text-accent-500" />}
        />
        
        <KpiCard 
          title="季節性スコア" 
          value={trendMetrics.seasonalityScore}
          subtitle="(1-10スケール)"
          icon={<Calendar size={20} className="text-warning-500" />}
        />
      </div>
      
      {/* Monthly Visitors Trend */}
      <div className="dashboard-card">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="card-title">月間来店者数推移</h2>
          <button
            onClick={() => setShowAiPrediction(!showAiPrediction)}
            className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              showAiPrediction 
                ? 'bg-primary-100 text-primary-700 border border-primary-300' 
                : 'bg-white text-neutral-600 border border-neutral-300 hover:bg-neutral-50'
            }`}
          >
            <Sparkles size={16} className={`mr-1.5 ${showAiPrediction ? 'text-primary-500' : 'text-neutral-400'}`} />
            AIトレンド予測
          </button>
        </div>
        <div className="relative">
          <TimeSeriesChart 
            data={aiPredictionData}
            lines={[
              { dataKey: 'visitors', color: '#0066CC', name: '来店者数' }
            ]}
            height={300}
            formatter={(value: ValueType, name: NameType) => `${formatNumber(value as number)} 人`}
            yAxisUnit="人"
          />
          
          {/* 説明ラベル */}
          {showAiPrediction && (
            <div className="absolute top-2 right-2 bg-white bg-opacity-80 rounded px-3 py-1.5 text-xs">
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  <span className="w-3 h-1 bg-blue-500 mr-1"></span>
                  <span className="text-neutral-600">実績データ</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-1 bg-red-500 mr-1"></span>
                  <span className="text-red-600 font-medium">AI予測データ</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Average Dwell Time Trend */}
      <div className="dashboard-card">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="card-title">平均滞在時間推移</h2>
        </div>
        <TimeSeriesChart 
          data={aiPredictionData}
          lines={[
            { dataKey: 'avgDwellTime', color: '#00BF80', name: '平均滞在時間' }
          ]}
          height={250}
          formatter={(value: ValueType, name: NameType) => `${value as number} 分`}
          yAxisUnit="分"
        />
      </div>
      
      {/* Connectivity Trend */}
      <div className="dashboard-card">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="card-title">接続方式別利用傾向</h2>
        </div>
        <LineChart 
          data={connectivityData}
          lines={[
            { dataKey: '4G', color: '#E53935', name: '4G' },
            { dataKey: '5G', color: '#8B5CF6', name: '5G' }
          ]}
          xAxisDataKey="time"
          height={250}
          formatter={(value: ValueType, name: NameType) => `${formatNumber(value as number)} 接続`}
          yAxisUnit="接続"
        />
      </div>
      
      {/* Customer Journey Funnel */}
      <div className="dashboard-card">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="card-title">カスタマージャーニー (認知から再来店まで)</h2>
        </div>
        <div className="relative">
          <BarChart 
            data={journeyStagesData}
            dataKey="percentage"
            nameKey="stage"
            color="#0066CC"
            height={250}
            formatter={(value: ValueType, name: NameType) => `${value}%`}
            yAxisUnit="%"
          />
          <div className="absolute top-2 right-2 bg-white bg-opacity-80 rounded px-3 py-1.5 text-xs">
            <div className="flex items-center">
              <span className="text-neutral-600 font-medium">基準来店者:</span>
              <span className="ml-1 text-primary-700 font-bold">{formatNumber(journeyStagesData[0].count)} 人</span>
            </div>
          </div>
        </div>
      </div>

      {/* デバッグ情報（開発環境のみ表示） */}
      {import.meta.env.DEV && showAiPrediction && (
        <div className="p-4 bg-gray-100 rounded-md text-xs font-mono">
          <h3 className="font-bold mb-2">デバッグ情報 - 予測データ</h3>
          <div>
            {aiPredictionData.slice(-3).map((item, index) => (
              <div key={index} className="mb-1">
                <span style={{ color: '#E53935' }}>
                  {JSON.stringify(item)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <div className="font-bold mb-1">インデックス参照値</div>
            <div>実績データ: {monthlyTrendData.length}件</div>
            <div>予測込データ: {aiPredictionData.length}件</div>
            <div>差分（予測）: {aiPredictionData.length - monthlyTrendData.length}件</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendsAnalysis;