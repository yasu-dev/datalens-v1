import React, { useMemo } from 'react';
import KpiCard from '../components/dashboard/KpiCard';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';
import PieChart from '../components/charts/PieChart';
import HeatMapChart from '../components/charts/HeatMapChart';
import { 
  Users, 
  Clock, 
  TrendingUp, 
  BarChart3, 
  Smartphone, 
  ArrowDownUp,
  Map,
  Building,
  Repeat,
  ShoppingBag
} from 'lucide-react';
import { useFilters } from '../contexts/FilterContext';
import {
  getFilteredTrafficByTimeData,
  getFilteredWeeklyTrafficData,
  getFilteredCustomerSegmentsData,
  getFilteredKpiSummary,
  getFilteredTrafficHeatmapData,
  getFilteredDeviceDistributionData,
  getFilteredDwellTimeData,
  getFilteredVisitFrequencyData,
  getFilteredLocationFlowData
} from '../data/filteredMockData';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

const Dashboard: React.FC = () => {
  const { filters } = useFilters();
  
  // フィルター適用済みデータを生成（変更時に再計算）
  const trafficByTimeData = useMemo(() => getFilteredTrafficByTimeData(filters), [filters]);
  const weeklyTrafficData = useMemo(() => getFilteredWeeklyTrafficData(filters), [filters]);
  const customerSegmentsData = useMemo(() => getFilteredCustomerSegmentsData(filters), [filters]);
  const kpiSummary = useMemo(() => getFilteredKpiSummary(filters), [filters]);
  const trafficHeatmapData = useMemo(() => getFilteredTrafficHeatmapData(filters), [filters]);
  const deviceDistributionData = useMemo(() => getFilteredDeviceDistributionData(filters), [filters]);
  const dwellTimeData = useMemo(() => getFilteredDwellTimeData(filters), [filters]);
  const visitFrequencyData = useMemo(() => getFilteredVisitFrequencyData(filters), [filters]);
  const locationFlowData = useMemo(() => getFilteredLocationFlowData(filters), [filters]);
  
  // Format large numbers with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-neutral-800">ダッシュボード</h1>
      
      {/* 位置情報プライバシー通知 */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex items-start">
        <div className="text-blue-500 mr-3 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="text-sm text-blue-700">
          <p className="font-medium">位置情報データの利用について</p>
          <p>表示されるデータはユーザーの同意に基づいて匿名化・統計処理されています。<a href="#" className="underline font-medium">プライバシー設定を確認</a></p>
        </div>
      </div>
      
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="総来店者数" 
          value={formatNumber(kpiSummary.totalVisitors)}
          change={kpiSummary.weekOverWeekChange}
          trend="up"
          subtitle="前週比"
          icon={<Users size={20} className="text-primary-500" />}
        />
        
        <KpiCard 
          title="平均滞在時間" 
          value={kpiSummary.avgDwellTime}
          subtitle="分"
          icon={<Clock size={20} className="text-secondary-500" />}
        />
        
        <KpiCard 
          title="リピーター率" 
          value={kpiSummary.returningVisitors}
          isPercentage={true}
          icon={<Repeat size={20} className="text-warning-500" />}
        />

        <KpiCard 
          title="店舗訪問数/人" 
          value={3.2}
          subtitle="平均"
          icon={<ShoppingBag size={20} className="text-accent-500" />}
        />
      </div>

      {/* 追加のKPIカード（位置情報活用） */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="ピーク時間帯" 
          value={kpiSummary.peakHour}
          subtitle="最も混雑する時間"
          icon={<TrendingUp size={20} className="text-accent-500" />}
        />
        
        <KpiCard 
          title="人気エリア" 
          value="フードコート"
          subtitle="滞在者数"
          icon={<Map size={20} className="text-emerald-500" />}
        />
        
        <KpiCard 
          title="周辺施設連動" 
          value="57%"
          subtitle="他施設併用率"
          icon={<Building size={20} className="text-indigo-500" />}
        />
        
        <KpiCard 
          title="モバイル利用" 
          value="68%"
          subtitle="アクティブ率"
          icon={<Smartphone size={20} className="text-primary-500" />}
        />
      </div>
      
      {/* チャート行 - トラフィックと訪問回数 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 時間帯別トラフィック */}
        <div className="dashboard-card">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="card-title">時間帯別トラフィック</h2>
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
        
        {/* 訪問頻度分布 */}
        <div className="dashboard-card">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="card-title">訪問頻度分布</h2>
          </div>
          <img 
            src="/map_distribution.jpg" 
            alt="訪問頻度分布" 
            className="w-full"
            style={{ height: '250px', objectFit: 'cover' }}
          />
        </div>
      </div>
      
      {/* チャート行 - エリア滞在とヒートマップ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* エリア別平均滞在時間 */}
        <div className="dashboard-card">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="card-title">エリア別平均滞在時間</h2>
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
        
        {/* Traffic Heatmap */}
        <div className="dashboard-card">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="card-title">トラフィックヒートマップ (曜日 x 時間帯)</h2>
          </div>
          <HeatMapChart 
            data={trafficHeatmapData}
            height={250}
          />
        </div>
      </div>
      
      {/* チャート行 - セグメントと周辺施設 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Segments */}
        <div className="dashboard-card">
          <div className="mb-2 flex justify-between items-center">
            <h2 className="card-title">セグメント構成</h2>
          </div>
          <PieChart 
            data={customerSegmentsData}
            innerRadius={60}
            outerRadius={110}
            height={280}
            formatter={(value) => `${value}%`}
          />
        </div>
        
        {/* 移動フロー */}
        <div className="dashboard-card lg:col-span-2">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="card-title">エリア間移動フロー</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-neutral-50 border-b">
                  <th className="py-3 px-4 text-left text-sm font-medium text-neutral-600">出発エリア</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-neutral-600">到着エリア</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-neutral-600">移動人数</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-neutral-600">移動割合</th>
                </tr>
              </thead>
              <tbody>
                {locationFlowData.map((flow, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4 text-sm text-neutral-700">{flow.source}</td>
                    <td className="py-2 px-4 text-sm text-neutral-700">{flow.target}</td>
                    <td className="py-2 px-4 text-sm text-neutral-700">{formatNumber(flow.value)}</td>
                    <td className="py-2 px-4 text-sm text-neutral-700">
                      <div className="flex items-center">
                        <div className="w-16 bg-neutral-200 rounded-full h-2 mr-2">
                          <div 
                            className="h-2 rounded-full bg-blue-500"
                            style={{ width: `${flow.percentage}%` }}
                          ></div>
                        </div>
                        <span>{flow.percentage}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* デバイス分布 */}
      <div className="dashboard-card">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="card-title">デバイス利用状況</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {deviceDistributionData.map((device, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-neutral-700">{device.type}</span>
                <span className="text-neutral-500">{device.percentage}%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ 
                    width: `${device.percentage}%`, 
                    backgroundColor: index === 0 ? '#0066CC' : index === 1 ? '#00BF80' : index === 2 ? '#E53935' : '#FFB400' 
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;