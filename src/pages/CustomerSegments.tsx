import React, { useState, useMemo, useEffect } from 'react';
import PieChart from '../components/charts/PieChart';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';
import KpiCard from '../components/dashboard/KpiCard';
import { 
  Users, 
  Clock, 
  Smartphone, 
  ShoppingBag,
  ChevronDown
} from 'lucide-react';
import { useFilters } from '../contexts/FilterContext';
import {
  getFilteredCustomerSegmentsData,
  getFilteredDwellTimeData,
  getFilteredTrafficByTimeData,
  getFilteredWeeklyTrafficData,
} from '../data/filteredMockData';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

const CustomerSegments: React.FC = () => {
  const { filters } = useFilters();
  const [selectedSegment, setSelectedSegment] = useState<string>('週末来店層');
  
  // フィルター適用済みデータを生成（変更時に再計算）
  const customerSegmentsData = useMemo(() => getFilteredCustomerSegmentsData(filters), [filters]);
  const deviceTierData = useMemo(() => {
    // デバイス層別データを生成（フィルターに応じて変化）
    const baseDeviceTierData = [
      { tier: 'ハイエンド', percentage: 38 },
      { tier: 'ミドルレンジ', percentage: 42 },
      { tier: 'ローエンド', percentage: 20 },
    ];
    
    // デバイスタイプフィルター適用時
    if (!filters.deviceTypes.includes('All')) {
      // 選択されたデバイスタイプに応じて調整
      if (filters.deviceTypes.includes('ハイエンド')) {
        return baseDeviceTierData.map(item => ({
          ...item,
          percentage: item.tier === 'ハイエンド' ? 65 : item.tier === 'ミドルレンジ' ? 25 : 10
        }));
      } else if (filters.deviceTypes.includes('ミドルレンジ')) {
        return baseDeviceTierData.map(item => ({
          ...item,
          percentage: item.tier === 'ミドルレンジ' ? 70 : item.tier === 'ハイエンド' ? 20 : 10
        }));
      } else if (filters.deviceTypes.includes('ローエンド')) {
        return baseDeviceTierData.map(item => ({
          ...item,
          percentage: item.tier === 'ローエンド' ? 60 : item.tier === 'ミドルレンジ' ? 30 : 10
        }));
      }
    }
    
    // フィルターなしまたはAll選択時はランダム変動を加えた元データ
    const impact = 0.8 + Math.random() * 0.4; // 0.8〜1.2の間で変動
    const adjustedData = baseDeviceTierData.map(item => ({
      ...item,
      percentage: Math.round(item.percentage * impact)
    }));
    
    // 合計が100%になるように調整
    const total = adjustedData.reduce((sum, item) => sum + item.percentage, 0);
    return adjustedData.map(item => ({
      ...item,
      percentage: Math.round((item.percentage / total) * 100)
    }));
  }, [filters]);
  
  const dwellTimeData = useMemo(() => getFilteredDwellTimeData(filters), [filters]);
  const trafficByTimeData = useMemo(() => getFilteredTrafficByTimeData(filters), [filters]);
  const weeklyTrafficData = useMemo(() => getFilteredWeeklyTrafficData(filters), [filters]);
  
  // セグメントフィルター変更時に選択セグメントを自動更新
  useEffect(() => {
    if (!filters.segments.includes('All') && filters.segments.length > 0) {
      setSelectedSegment(filters.segments[0]);
    }
  }, [filters.segments]);
  
  // Format large numbers with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // セグメント特有のメトリクス（フィルター対応）
  const segmentMetricsBase: Record<string, {
    visitors: number;
    avgDwellTime: number;
    avgPurchase: number;
    deviceUsage: string;
    weekTrend: number;
  }> = {
    '週末来店層': {
      visitors: 22756,
      avgDwellTime: 55,
      avgPurchase: 5800,
      deviceUsage: 'ハイエンド (52%)',
      weekTrend: 3.2,
    },
    '平日夜間層': {
      visitors: 18432,
      avgDwellTime: 35,
      avgPurchase: 3200,
      deviceUsage: 'ミドルレンジ (64%)',
      weekTrend: 1.8,
    },
    '高頻度来店層': {
      visitors: 12840,
      avgDwellTime: 48,
      avgPurchase: 7500,
      deviceUsage: 'ハイエンド (48%)',
      weekTrend: 2.5,
    },
    'モバイルヘビーユーザー': {
      visitors: 11235,
      avgDwellTime: 40,
      avgPurchase: 4200,
      deviceUsage: 'ハイエンド (75%)',
      weekTrend: 5.6,
    },
    'シニア層': {
      visitors: 8124,
      avgDwellTime: 65,
      avgPurchase: 6300,
      deviceUsage: 'ミドルレンジ (58%)',
      weekTrend: -1.2,
    },
    'ファミリー層': {
      visitors: 8543,
      avgDwellTime: 75,
      avgPurchase: 9200,
      deviceUsage: 'ミドルレンジ (55%)',
      weekTrend: 4.3,
    },
  };

  // フィルター条件を適用したセグメントメトリクス
  const segmentMetrics = useMemo(() => {
    const result: typeof segmentMetricsBase = JSON.parse(JSON.stringify(segmentMetricsBase));
    
    // エリアフィルター適用時の影響
    if (filters.areas.prefectures.length > 0 || filters.areas.cities.length > 0 || filters.areas.stores.length > 0) {
      // エリア限定の場合、数値を変動
      Object.keys(result).forEach(segment => {
        const areaImpact = 0.6 + Math.random() * 0.8; // 0.6〜1.4の間で変動
        result[segment].visitors = Math.round(result[segment].visitors * areaImpact);
        result[segment].avgDwellTime = Math.round(result[segment].avgDwellTime * (0.8 + Math.random() * 0.4));
        result[segment].avgPurchase = Math.round(result[segment].avgPurchase * (0.8 + Math.random() * 0.4));
        result[segment].weekTrend = parseFloat((result[segment].weekTrend * (0.5 + Math.random() * 1.0)).toFixed(1));
      });
    }
    
    // セグメントフィルター適用時
    if (!filters.segments.includes('All')) {
      // 選択されたセグメントは強調表示
      filters.segments.forEach(segmentName => {
        if (result[segmentName]) {
          result[segmentName].visitors = Math.round(result[segmentName].visitors * (1.1 + Math.random() * 0.3));
          result[segmentName].weekTrend = parseFloat((Math.abs(result[segmentName].weekTrend) * 1.2).toFixed(1)) * 
            (result[segmentName].weekTrend >= 0 ? 1 : -1);
        }
      });
    }
    
    // デバイスタイプフィルター適用時
    if (!filters.deviceTypes.includes('All')) {
      Object.keys(result).forEach(segment => {
        // デバイスタイプによって各セグメントへの影響も変える
        if (filters.deviceTypes.includes('iOS')) {
          if (segment === 'モバイルヘビーユーザー' || segment === '週末来店層') {
            result[segment].deviceUsage = 'iOS (85%)';
          } else {
            result[segment].deviceUsage = 'iOS (65%)';
          }
        } else if (filters.deviceTypes.includes('Android')) {
          if (segment === 'シニア層' || segment === 'ファミリー層') {
            result[segment].deviceUsage = 'Android (75%)';
          } else {
            result[segment].deviceUsage = 'Android (60%)';
          }
        } else if (filters.deviceTypes.includes('ハイエンド')) {
          result[segment].deviceUsage = 'ハイエンド (80%)';
        } else if (filters.deviceTypes.includes('ミドルレンジ')) {
          result[segment].deviceUsage = 'ミドルレンジ (85%)';
        } else if (filters.deviceTypes.includes('ローエンド')) {
          result[segment].deviceUsage = 'ローエンド (90%)';
        }
      });
    }
    
    return result;
  }, [filters, segmentMetricsBase]);

  const metrics = segmentMetrics[selectedSegment] || segmentMetrics['週末来店層'];

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-neutral-800">顧客セグメント分析</h1>
      
      {/* Segment Selector */}
      <div className="bg-white rounded-lg shadow-card p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-medium text-neutral-800 mb-1">セグメント選択</h2>
            <p className="text-sm text-neutral-500">詳細を確認したいセグメントを選択してください</p>
          </div>
          
          <div className="mt-3 md:mt-0">
            <div className="relative">
              <select
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
                className="select pr-10 py-2 appearance-none bg-white w-full md:w-auto"
              >
                {customerSegmentsData.map((segment) => (
                  <option key={segment.name} value={segment.name}>
                    {segment.name} ({segment.value}%)
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown size={16} className="text-neutral-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Segment KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="セグメント訪問者数" 
          value={formatNumber(metrics.visitors)}
          change={metrics.weekTrend}
          trend={metrics.weekTrend >= 0 ? 'up' : 'down'}
          subtitle="前週比"
          icon={<Users size={20} className="text-primary-500" />}
        />
        
        <KpiCard 
          title="平均滞在時間" 
          value={metrics.avgDwellTime}
          subtitle="分"
          icon={<Clock size={20} className="text-secondary-500" />}
        />
        
        <KpiCard 
          title="平均購入額" 
          value={`¥${formatNumber(metrics.avgPurchase)}`}
          subtitle="訪問あたり"
          icon={<ShoppingBag size={20} className="text-accent-500" />}
        />
        
        <KpiCard 
          title="主要デバイス" 
          value={metrics.deviceUsage}
          icon={<Smartphone size={20} className="text-warning-500" />}
        />
      </div>
      
      {/* Segment Distribution and Device Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="dashboard-card">
          <div className="mb-2">
            <h2 className="card-title">セグメント構成</h2>
          </div>
          <PieChart 
            data={customerSegmentsData}
            innerRadius={60}
            outerRadius={140}
            height={360}
            formatter={(value) => `${value}%`}
          />
        </div>
        
        <div className="dashboard-card">
          <div className="mb-4">
            <h2 className="card-title">デバイス層別使用率</h2>
            <p className="text-sm text-neutral-500">{selectedSegment}のデバイス使用状況</p>
          </div>
          <BarChart 
            data={deviceTierData}
            dataKey="percentage"
            nameKey="tier"
            color="#8B5CF6"
            height={240}
            formatter={(value: ValueType, name: NameType) => `${value as number}%`}
            yAxisUnit="%"
          />
        </div>
      </div>
      
      {/* Visiting Patterns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="dashboard-card">
          <div className="mb-4">
            <h2 className="card-title">{selectedSegment}の来店時間帯</h2>
          </div>
          <LineChart 
            data={trafficByTimeData}
            lines={[
              { dataKey: 'volume', color: '#0066CC', name: '人数' }
            ]}
            xAxisDataKey="time"
            height={250}
            formatter={(value: ValueType, name: NameType) => `${formatNumber(value as number)} 人`}
            yAxisUnit="人"
          />
        </div>
        
        <div className="dashboard-card">
          <div className="mb-4">
            <h2 className="card-title">{selectedSegment}の曜日別来店傾向</h2>
          </div>
          <BarChart 
            data={weeklyTrafficData}
            dataKey="volume"
            nameKey="day"
            color="#00BF80"
            height={250}
            formatter={(value: ValueType, name: NameType) => `${formatNumber(value as number)} 人`}
            yAxisUnit="人"
          />
        </div>
      </div>
      
      {/* Area Preferences */}
      <div className="dashboard-card">
        <div className="mb-4">
          <h2 className="card-title">{selectedSegment}のエリア別滞在時間</h2>
        </div>
        <BarChart 
          data={dwellTimeData}
          dataKey="time"
          nameKey="area"
          color="#E53935"
          height={250}
          formatter={(value: ValueType, name: NameType) => `${value as number} 分`}
          yAxisUnit="分"
        />
      </div>
    </div>
  );
};

export default CustomerSegments;