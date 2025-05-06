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
  ArrowDownUp 
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
  
  // Format large numbers with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-neutral-800">ダッシュボード</h1>
      
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
          title="ピーク時間帯" 
          value={kpiSummary.peakHour}
          subtitle="最も混雑する時間"
          icon={<TrendingUp size={20} className="text-accent-500" />}
        />
        
        <KpiCard 
          title="リピーター率" 
          value={kpiSummary.returningVisitors}
          isPercentage={true}
          icon={<ArrowDownUp size={20} className="text-warning-500" />}
        />
      </div>
      
      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic by Time of Day */}
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
        
        {/* Weekly Traffic Pattern */}
        <div className="dashboard-card">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="card-title">曜日別来店傾向</h2>
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
      
      {/* Charts Row 2 */}
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
        
        {/* Device Distribution */}
        <div className="dashboard-card">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="card-title">デバイス利用状況</h2>
          </div>
          <div className="flex flex-col h-full justify-center">
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
                      backgroundColor: index === 0 ? '#0066CC' : '#E53935' 
                    }}
                  ></div>
                </div>
              </div>
            ))}
            <div className="mt-4 text-center">
              <div className="inline-flex items-center justify-center p-3 bg-neutral-100 rounded-full">
                <Smartphone size={32} className="text-primary-500" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Area Dwell Time */}
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
  );
};

export default Dashboard;