import React, { useState, useMemo, useEffect } from 'react';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import KpiCard from '../components/dashboard/KpiCard';
import { Map, Users, Clock, TrendingUp, Navigation, Building, Smartphone } from 'lucide-react';
import { useFilters } from '../contexts/FilterContext';
import {
  getFilteredTrafficByTimeData,
  getFilteredDwellTimeData,
  getFilteredMovementData,
  getFilteredLocationFlowData
} from '../data/filteredMockData';
import { prefectureData } from '../data/storeData';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

const AreaAnalysis: React.FC = () => {
  const { filters } = useFilters();
  const [selectedArea, setSelectedArea] = useState<string>('tokyo');
  const [selectedTab, setSelectedTab] = useState<'traffic' | 'dwell' | 'flow'>('traffic');
  
  // エリアIDから名前を取得する関数を先に定義
  const getAreaName = (id: string): string => {
    const areaNames: Record<string, string> = {
      tokyo: '東京',
      kanagawa: '神奈川',
      chiba: '千葉',
      saitama: '埼玉',
      osaka: '大阪',
      kyoto: '京都',
      hyogo: '兵庫',
      fukuoka: '福岡',
      hokkaido: '北海道',
      aichi: '愛知'
    };
    return areaNames[id] || id;
  };
  
  // フィルターに応じて選択エリアを自動で更新
  useEffect(() => {
    if (filters.areas.prefectures.length > 0) {
      // 選択された都道府県の最初の一つに合わせて地図の選択を更新
      const selectedPrefecture = filters.areas.prefectures[0];
      const prefMatch = prefectureData.find(pref => pref.name === selectedPrefecture);
      if (prefMatch) {
        setSelectedArea(prefMatch.id);
      }
    }
  }, [filters.areas.prefectures]);
  
  // フィルター適用済みデータを生成（変更時に再計算）
  const trafficByTimeData = useMemo(() => getFilteredTrafficByTimeData(filters), [filters]);
  const dwellTimeData = useMemo(() => getFilteredDwellTimeData(filters), [filters]);
  const movementData = useMemo(() => getFilteredMovementData(filters), [filters]);
  const locationFlowData = useMemo(() => getFilteredLocationFlowData(filters), [filters]);
  
  // フィルター適用した地域データ生成
  const areaData = useMemo(() => {
    // 基本トラフィックデータ
    const baseAreaData = {
      tokyo: 85,
      kanagawa: 72,
      chiba: 65,
      saitama: 70,
      osaka: 78,
      kyoto: 63,
      hyogo: 59,
      fukuoka: 68,
      hokkaido: 62,
      aichi: 76
    };
    
    // フィルター適用時の地域データを生成
    const result: Record<string, number> = {};
    
    Object.entries(baseAreaData).forEach(([key, value]) => {
      // フィルターの影響を反映（ランダム変動を含む）
      const variation = 0.7 + Math.random() * 0.6; // 0.7〜1.3の間で変動
      
      // 都道府県フィルターが適用されている場合
      if (filters.areas.prefectures.length > 0) {
        // 選択された都道府県のIDを取得
        const selectedPrefIds = prefectureData
          .filter(pref => filters.areas.prefectures.includes(pref.name))
          .map(pref => pref.id);
        
        // 選択された都道府県ならトラフィックを強調、それ以外は低下
        if (selectedPrefIds.includes(key)) {
          result[key] = Math.round(value * (1.2 + Math.random() * 0.3)); // 1.2〜1.5倍に増加
        } else {
          result[key] = Math.round(value * (0.5 + Math.random() * 0.3)); // 0.5〜0.8倍に減少
        }
      } else {
        // フィルターなしの場合はランダム変動のみ
        result[key] = Math.round(value * variation);
      }
    });
    
    return result;
  }, [filters]);
  
  // KPIデータの生成（フィルター対応）
  const areaKpiData = useMemo(() => {
    // 選択地域名を取得
    const areaName = getAreaName(selectedArea);
    
    // 来店者数の計算
    let visitors = 25342;
    // 都道府県フィルターが適用されている場合
    if (filters.areas.prefectures.length > 0) {
      const isPrefSelected = prefectureData
        .filter(pref => filters.areas.prefectures.includes(pref.name))
        .some(pref => pref.id === selectedArea);
      
      if (isPrefSelected) {
        // 選択された都道府県の場合、来店者数を増加
        visitors = Math.round(visitors * (1.1 + Math.random() * 0.4)); // 1.1〜1.5倍
      } else {
        // 選択されていない都道府県の場合、来店者数を減少
        visitors = Math.round(visitors * (0.5 + Math.random() * 0.3)); // 0.5〜0.8倍
      }
    } else {
      // フィルター無しの場合、ランダム変動
      visitors = Math.round(visitors * (0.8 + Math.random() * 0.4)); // 0.8〜1.2倍
    }
    
    // 前週比の計算（推移のトレンドを反映）
    const weekOverWeekChange = parseFloat((5.3 + (Math.random() * 8 - 4)).toFixed(1));
    
    // 平均滞在時間の計算
    const avgDwellTime = Math.round(35 * (0.8 + Math.random() * 0.4));
    
    // ピーク時間帯
    const peakHours = ['17:00', '18:00', '19:00', '12:00', '13:00'];
    const peakHour = peakHours[Math.floor(Math.random() * peakHours.length)];
    
    // 訪問店舗数
    const visitedStores = parseFloat((3.2 * (0.8 + Math.random() * 0.4)).toFixed(1));
    
    // モバイル利用率
    const mobileUsage = Math.round(68 * (0.8 + Math.random() * 0.4));
    
    // リピート率
    const repeatRate = Math.round(42 * (0.8 + Math.random() * 0.4));
    
    return {
      areaName,
      visitors,
      weekOverWeekChange,
      avgDwellTime,
      peakHour,
      visitedStores,
      mobileUsage,
      repeatRate
    };
  }, [selectedArea, filters]);
  
  // Format large numbers with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Movement destinations from the selected area
  const getMovementData = () => {
    return movementData
      .filter(item => item.source === 'エントランス')
      .map(item => ({
        area: item.target,
        volume: item.value,
      }));
  };

  // タブに対応するコンポーネントをレンダリング
  const renderTabContent = () => {
    switch(selectedTab) {
      case 'traffic':
        return (
          <div className="dashboard-card">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="card-title">時間帯別トラフィック</h2>
              <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded">eSIM位置情報利用</span>
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
            <p className="text-xs text-neutral-500 mt-3">※ 測位精度の限界により、屋内の正確な位置特定には誤差が生じる可能性があります</p>
          </div>
        );
      case 'dwell':
        return (
          <div className="dashboard-card">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="card-title">エリア別平均滞在時間</h2>
              <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded">滞在時間分析</span>
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
            <div className="mt-3 text-xs text-neutral-500 p-3 bg-neutral-50 rounded-md">
              <p className="font-medium mb-1">滞在時間検出の仕組み</p>
              <p>eSIMから取得した位置情報ポイントがある一定時間、特定のエリア内に留まっていることを検出し、統計処理しています。モール内では測位精度の限界から、フロアやゾーン単位での検出が中心となります。</p>
            </div>
          </div>
        );
      case 'flow':
        return (
          <div className="dashboard-card">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="card-title">エリア間移動フロー</h2>
              <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded">移動パターン分析</span>
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
            <div className="mt-3 text-xs text-neutral-500">
              <p>※ 同一ユーザーの連続する位置情報から推定された移動パターンを集計しています</p>
              <p>※ 短時間の通過は移動としてカウントされない場合があります</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-neutral-800">エリア分析</h1>
      
      {/* 位置情報プライバシー通知 */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex items-start">
        <div className="text-blue-500 mr-3 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="text-sm text-blue-700">
          <p className="font-medium">エリア分析では、eSIMの位置情報データを活用しています</p>
          <p>精度の制限により、大まかなゾーン・フロア単位での分析となります。屋内では店舗単位の詳細な特定は困難な場合があります。</p>
        </div>
      </div>
      
      {/* 横幅が広いとき用のレイアウト - 地図と4つのカードを横並びに */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Japan Map - 横幅が広いときは左側3カラム */}
        <div className="dashboard-card xl:col-span-3">
          <div className="mb-2">
            <h2 className="card-title flex items-center">
              <Map className="mr-2 text-primary-500" size={20} />
              地域別トラフィック
            </h2>
            <p className="text-sm text-neutral-500">エリアをクリックして詳細を表示 - 現在の選択: <span className="font-medium text-primary-600">{getAreaName(selectedArea)}</span></p>
          </div>
          <div className="flex flex-col h-[360px] justify-between relative">
            {/* トラフィック情報パネル */}
            <div className="absolute top-2 right-2 bg-white/90 rounded-md shadow-sm p-2 text-sm border border-neutral-200 z-10">
              <p className="font-medium text-neutral-800">{getAreaName(selectedArea)}</p>
              <p className="text-neutral-600">トラフィック: <span className="font-medium text-primary-600">{areaData[selectedArea]}</span></p>
            </div>
            
            {/* 静的な日本地図表示 */}
            <div className="w-full h-[280px] relative">
              <svg 
                viewBox="0 0 400 400" 
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* 日本地図のアウトライン */}
                <path 
                  d="M300,70 L280,60 L250,65 L240,80 L245,100 L260,115 L290,120 L310,110 L320,90 L300,70 M180,140 C180,140 200,170 210,190 C220,210 230,230 240,240 C250,250 260,260 270,265 C280,270 290,275 300,275 M210,190 C200,200 180,220 160,240 C140,260 130,270 120,290 C110,310 100,330 100,340 M160,240 C160,240 170,260 175,270 C180,280 185,290 190,295 M175,270 C170,275 160,280 150,280 C140,280 130,285 120,290"
                  fill="none"
                  stroke="#E5E5E5"
                  strokeWidth="1.5"
                />

                {/* 各都道府県（クリック領域用） */}
                <g>
                  {/* 北海道 */}
                  <path 
                    d="M300,70 L280,60 L250,65 L240,80 L245,100 L260,115 L290,120 L310,110 L320,90 L300,70" 
                    fill={selectedArea === 'hokkaido' ? '#0066CC' : '#D6EBFF'} 
                    stroke="#1E293B" 
                    strokeWidth={selectedArea === 'hokkaido' ? 2 : 1}
                    onClick={() => setSelectedArea('hokkaido')}
                    className="cursor-pointer hover:opacity-80 transition-all"
                  />
                  
                  {/* 東京 */}
                  <path 
                    d="M266,231 L263,229 L260,230 L258,236 L262,240 L266,239 L266,231" 
                    fill={selectedArea === 'tokyo' ? '#0066CC' : '#D6EBFF'} 
                    stroke="#1E293B" 
                    strokeWidth={selectedArea === 'tokyo' ? 2 : 1}
                    onClick={() => setSelectedArea('tokyo')}
                    className="cursor-pointer hover:opacity-80 transition-all"
                  />
                  
                  {/* 神奈川 */}
                  <path 
                    d="M264,245 L265,241 L261,239 L254,240 L250,244 L252,248 L258,248 L264,245" 
                    fill={selectedArea === 'kanagawa' ? '#0066CC' : '#D6EBFF'} 
                    stroke="#1E293B" 
                    strokeWidth={selectedArea === 'kanagawa' ? 2 : 1}
                    onClick={() => setSelectedArea('kanagawa')}
                    className="cursor-pointer hover:opacity-80 transition-all"
                  />
                  
                  {/* 千葉 */}
                  <path 
                    d="M275,230 L270,226 L264,227 L263,234 L266,240 L273,244 L278,240 L280,234 L275,230" 
                    fill={selectedArea === 'chiba' ? '#0066CC' : '#D6EBFF'} 
                    stroke="#1E293B" 
                    strokeWidth={selectedArea === 'chiba' ? 2 : 1}
                    onClick={() => setSelectedArea('chiba')}
                    className="cursor-pointer hover:opacity-80 transition-all"
                  />
                  
                  {/* 埼玉 */}
                  <path 
                    d="M260,221 L250,220 L242,224 L243,230 L249,231 L256,230.5 L262,227 L260,221" 
                    fill={selectedArea === 'saitama' ? '#0066CC' : '#D6EBFF'} 
                    stroke="#1E293B" 
                    strokeWidth={selectedArea === 'saitama' ? 2 : 1}
                    onClick={() => setSelectedArea('saitama')}
                    className="cursor-pointer hover:opacity-80 transition-all"
                  />
                  
                  {/* 大阪 */}
                  <path 
                    d="M187,287 L180,285 L178,288 L179,292 L184,294 L188,291 L187,287" 
                    fill={selectedArea === 'osaka' ? '#0066CC' : '#D6EBFF'} 
                    stroke="#1E293B" 
                    strokeWidth={selectedArea === 'osaka' ? 2 : 1}
                    onClick={() => setSelectedArea('osaka')}
                    className="cursor-pointer hover:opacity-80 transition-all"
                  />
                  
                  {/* 京都 */}
                  <path 
                    d="M183,274 L177,275 L175,281 L178,287 L185,288 L188,284 L187,277 L183,274" 
                    fill={selectedArea === 'kyoto' ? '#0066CC' : '#D6EBFF'} 
                    stroke="#1E293B" 
                    strokeWidth={selectedArea === 'kyoto' ? 2 : 1}
                    onClick={() => setSelectedArea('kyoto')}
                    className="cursor-pointer hover:opacity-80 transition-all"
                  />
                  
                  {/* 愛知 */}
                  <path 
                    d="M230,270 L222,270 L218,276 L220,282 L226,286 L234,284 L238,278 L230,270" 
                    fill={selectedArea === 'aichi' ? '#0066CC' : '#D6EBFF'} 
                    stroke="#1E293B" 
                    strokeWidth={selectedArea === 'aichi' ? 2 : 1}
                    onClick={() => setSelectedArea('aichi')}
                    className="cursor-pointer hover:opacity-80 transition-all"
                  />
                  
                  {/* 福岡 */}
                  <path 
                    d="M101,331 L95,328 L90,331 L89,338 L94,342 L101,340 L103,335 L101,331" 
                    fill={selectedArea === 'fukuoka' ? '#0066CC' : '#D6EBFF'} 
                    stroke="#1E293B" 
                    strokeWidth={selectedArea === 'fukuoka' ? 2 : 1}
                    onClick={() => setSelectedArea('fukuoka')}
                    className="cursor-pointer hover:opacity-80 transition-all"
                  />
                  
                  {/* 兵庫 */}
                  <path 
                    d="M170,281 L164,279 L157,282 L156,288 L160,292 L168,292 L171,287 L170,281" 
                    fill={selectedArea === 'hyogo' ? '#0066CC' : '#D6EBFF'} 
                    stroke="#1E293B" 
                    strokeWidth={selectedArea === 'hyogo' ? 2 : 1}
                    onClick={() => setSelectedArea('hyogo')}
                    className="cursor-pointer hover:opacity-80 transition-all"
                  />
                </g>
                
                {/* 都市名ラベル */}
                <g className="text-[9px] font-medium">
                  <text x="320" y="65" className="fill-neutral-700">北海道</text>
                  <text x="266" y="220" className="fill-neutral-700">東京</text>
                  <text x="264" y="255" className="fill-neutral-700">神奈川</text>
                  <text x="280" y="225" className="fill-neutral-700">千葉</text>
                  <text x="255" y="215" className="fill-neutral-700">埼玉</text>
                  <text x="187" y="300" className="fill-neutral-700">大阪</text>
                  <text x="183" y="270" className="fill-neutral-700">京都</text>
                  <text x="230" y="265" className="fill-neutral-700">愛知</text>
                  <text x="95" y="350" className="fill-neutral-700">福岡</text>
                  <text x="155" y="295" className="fill-neutral-700">兵庫</text>
                </g>

                {/* トラフィックデータ表示用の円（大きく独立して表示） */}
                <g>
                  {/* 北海道のトラフィック円 */}
                  <circle 
                    cx="280" 
                    cy="90" 
                    r={Math.max(15, Math.min(30, areaData.hokkaido / 3))} 
                    fill={selectedArea === 'hokkaido' ? 'rgba(0, 102, 204, 0.7)' : 'rgba(0, 102, 204, 0.5)'} 
                    stroke="#0066CC" 
                    strokeWidth="2"
                    className="transition-all duration-300"
                    onClick={() => setSelectedArea('hokkaido')}
                  />
                  <text x="280" y="90" textAnchor="middle" dominantBaseline="middle" className="text-[12px] fill-white font-bold" style={{ textShadow: '0px 0px 2px #000' }}>{areaData.hokkaido}</text>
                  
                  {/* 東京のトラフィック円 */}
                  <circle 
                    cx="263" 
                    cy="235" 
                    r={Math.max(15, Math.min(30, areaData.tokyo / 3))} 
                    fill={selectedArea === 'tokyo' ? 'rgba(0, 102, 204, 0.7)' : 'rgba(0, 102, 204, 0.5)'} 
                    stroke="#0066CC" 
                    strokeWidth="2"
                    className="transition-all duration-300"
                    onClick={() => setSelectedArea('tokyo')}
                  />
                  <text x="263" y="235" textAnchor="middle" dominantBaseline="middle" className="text-[12px] fill-white font-bold" style={{ textShadow: '0px 0px 2px #000' }}>{areaData.tokyo}</text>
                  
                  {/* 神奈川のトラフィック円 */}
                  <circle 
                    cx="258" 
                    cy="243" 
                    r={Math.max(15, Math.min(25, areaData.kanagawa / 3))} 
                    fill={selectedArea === 'kanagawa' ? 'rgba(0, 102, 204, 0.7)' : 'rgba(0, 102, 204, 0.5)'} 
                    stroke="#0066CC" 
                    strokeWidth="2"
                    className="transition-all duration-300"
                    onClick={() => setSelectedArea('kanagawa')}
                  />
                  <text x="258" y="243" textAnchor="middle" dominantBaseline="middle" className="text-[12px] fill-white font-bold" style={{ textShadow: '0px 0px 2px #000' }}>{areaData.kanagawa}</text>
                  
                  {/* 千葉のトラフィック円 */}
                  <circle 
                    cx="270" 
                    cy="235" 
                    r={Math.max(15, Math.min(25, areaData.chiba / 3))} 
                    fill={selectedArea === 'chiba' ? 'rgba(0, 102, 204, 0.7)' : 'rgba(0, 102, 204, 0.5)'} 
                    stroke="#0066CC" 
                    strokeWidth="2"
                    className="transition-all duration-300"
                    onClick={() => setSelectedArea('chiba')}
                  />
                  <text x="270" y="235" textAnchor="middle" dominantBaseline="middle" className="text-[12px] fill-white font-bold" style={{ textShadow: '0px 0px 2px #000' }}>{areaData.chiba}</text>
                  
                  {/* 埼玉のトラフィック円 */}
                  <circle 
                    cx="252" 
                    cy="225" 
                    r={Math.max(15, Math.min(25, areaData.saitama / 3))} 
                    fill={selectedArea === 'saitama' ? 'rgba(0, 102, 204, 0.7)' : 'rgba(0, 102, 204, 0.5)'} 
                    stroke="#0066CC" 
                    strokeWidth="2"
                    className="transition-all duration-300"
                    onClick={() => setSelectedArea('saitama')}
                  />
                  <text x="252" y="225" textAnchor="middle" dominantBaseline="middle" className="text-[12px] fill-white font-bold" style={{ textShadow: '0px 0px 2px #000' }}>{areaData.saitama}</text>
                  
                  {/* 大阪のトラフィック円 */}
                  <circle 
                    cx="183" 
                    cy="287" 
                    r={Math.max(15, Math.min(25, areaData.osaka / 3))} 
                    fill={selectedArea === 'osaka' ? 'rgba(0, 102, 204, 0.7)' : 'rgba(0, 102, 204, 0.5)'} 
                    stroke="#0066CC" 
                    strokeWidth="2"
                    className="transition-all duration-300"
                    onClick={() => setSelectedArea('osaka')}
                  />
                  <text x="183" y="287" textAnchor="middle" dominantBaseline="middle" className="text-[12px] fill-white font-bold" style={{ textShadow: '0px 0px 2px #000' }}>{areaData.osaka}</text>
                  
                  {/* 京都のトラフィック円 */}
                  <circle 
                    cx="182" 
                    cy="280" 
                    r={Math.max(15, Math.min(25, areaData.kyoto / 3))} 
                    fill={selectedArea === 'kyoto' ? 'rgba(0, 102, 204, 0.7)' : 'rgba(0, 102, 204, 0.5)'} 
                    stroke="#0066CC" 
                    strokeWidth="2"
                    className="transition-all duration-300"
                    onClick={() => setSelectedArea('kyoto')}
                  />
                  <text x="182" y="280" textAnchor="middle" dominantBaseline="middle" className="text-[12px] fill-white font-bold" style={{ textShadow: '0px 0px 2px #000' }}>{areaData.kyoto}</text>
                  
                  {/* 愛知のトラフィック円 */}
                  <circle 
                    cx="228" 
                    cy="275" 
                    r={Math.max(15, Math.min(25, areaData.aichi / 3))} 
                    fill={selectedArea === 'aichi' ? 'rgba(0, 102, 204, 0.7)' : 'rgba(0, 102, 204, 0.5)'} 
                    stroke="#0066CC" 
                    strokeWidth="2"
                    className="transition-all duration-300"
                    onClick={() => setSelectedArea('aichi')}
                  />
                  <text x="228" y="275" textAnchor="middle" dominantBaseline="middle" className="text-[12px] fill-white font-bold" style={{ textShadow: '0px 0px 2px #000' }}>{areaData.aichi}</text>
                  
                  {/* 福岡のトラフィック円 */}
                  <circle 
                    cx="95" 
                    cy="335" 
                    r={Math.max(15, Math.min(25, areaData.fukuoka / 3))} 
                    fill={selectedArea === 'fukuoka' ? 'rgba(0, 102, 204, 0.7)' : 'rgba(0, 102, 204, 0.5)'} 
                    stroke="#0066CC" 
                    strokeWidth="2"
                    className="transition-all duration-300"
                    onClick={() => setSelectedArea('fukuoka')}
                  />
                  <text x="95" y="335" textAnchor="middle" dominantBaseline="middle" className="text-[12px] fill-white font-bold" style={{ textShadow: '0px 0px 2px #000' }}>{areaData.fukuoka}</text>
                  
                  {/* 兵庫のトラフィック円 */}
                  <circle 
                    cx="165" 
                    cy="285" 
                    r={Math.max(15, Math.min(25, areaData.hyogo / 3))} 
                    fill={selectedArea === 'hyogo' ? 'rgba(0, 102, 204, 0.7)' : 'rgba(0, 102, 204, 0.5)'} 
                    stroke="#0066CC" 
                    strokeWidth="2"
                    className="transition-all duration-300"
                    onClick={() => setSelectedArea('hyogo')}
                  />
                  <text x="165" y="285" textAnchor="middle" dominantBaseline="middle" className="text-[12px] fill-white font-bold" style={{ textShadow: '0px 0px 2px #000' }}>{areaData.hyogo}</text>
                </g>
              </svg>
            </div>

            {/* 凡例 */}
            <div className="mt-2 bg-white rounded-md shadow-sm px-3 py-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-neutral-700">トラフィック:</span>
                  <div className="w-24 h-3 rounded-full mx-1 bg-gradient-to-r from-[#D6EBFF] to-[#0066CC]"></div>
                </div>
                <div className="flex justify-between w-20">
                  <span className="text-neutral-600">{Math.min(...Object.values(areaData))}</span>
                  <span className="text-neutral-600">{Math.max(...Object.values(areaData))}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-4 mt-2">
                <span className="font-medium text-neutral-700">円の大きさ:</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <div className="inline-block w-6 h-6 rounded-full bg-blue-500/50 border-2 border-blue-600"></div>
                    <span className="ml-1">少</span>
                  </div>
                  <div className="flex items-center">
                    <div className="inline-block w-8 h-8 rounded-full bg-blue-500/50 border-2 border-blue-600"></div>
                    <span className="ml-1">中</span>
                  </div>
                  <div className="flex items-center">
                    <div className="inline-block w-10 h-10 rounded-full bg-blue-500/50 border-2 border-blue-600"></div>
                    <span className="ml-1">多</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* KPI Cards - 横幅が広いときは右側2カラム、縦に積み重ねる */}
        <div className="xl:col-span-2 grid grid-cols-1 gap-4">
          <KpiCard 
            title={`${areaKpiData.areaName}の来店者数`} 
            value={formatNumber(areaKpiData.visitors)}
            change={areaKpiData.weekOverWeekChange}
            trend={areaKpiData.weekOverWeekChange > 0 ? "up" : "down"}
            subtitle="前週比"
            icon={<Users size={20} className="text-primary-500" />}
          />
          
          <KpiCard 
            title="平均滞在時間" 
            value={areaKpiData.avgDwellTime}
            subtitle="分"
            icon={<Clock size={20} className="text-secondary-500" />}
          />
          
          <KpiCard 
            title="ピーク時間帯" 
            value={areaKpiData.peakHour}
            subtitle="最混雑時間"
            icon={<TrendingUp size={20} className="text-accent-500" />}
          />
          
          <KpiCard 
            title="eSIM活用率" 
            value={areaKpiData.mobileUsage}
            isPercentage={true}
            icon={<Smartphone size={20} className="text-warning-500" />}
          />
        </div>
      </div>
      
      {/* タブ切り替え */}
      <div className="border-b border-neutral-200">
        <div className="flex -mb-px">
          <button 
            className={`px-4 py-2 mr-2 text-sm font-medium ${selectedTab === 'traffic' ? 'text-primary-600 border-b-2 border-primary-500' : 'text-neutral-600 hover:text-primary-600'}`}
            onClick={() => setSelectedTab('traffic')}
          >
            トラフィック分析
          </button>
          <button 
            className={`px-4 py-2 mr-2 text-sm font-medium ${selectedTab === 'dwell' ? 'text-primary-600 border-b-2 border-primary-500' : 'text-neutral-600 hover:text-primary-600'}`}
            onClick={() => setSelectedTab('dwell')}
          >
            滞在時間分析
          </button>
          <button 
            className={`px-4 py-2 mr-2 text-sm font-medium ${selectedTab === 'flow' ? 'text-primary-600 border-b-2 border-primary-500' : 'text-neutral-600 hover:text-primary-600'}`}
            onClick={() => setSelectedTab('flow')}
          >
            移動フロー分析
          </button>
        </div>
      </div>
      
      {/* タブコンテンツ */}
      {renderTabContent()}
      
      {/* 補足情報 */}
      <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-100 text-sm">
        <h3 className="font-medium text-neutral-800 mb-2">位置情報データの活用に関する注意点</h3>
        <ul className="list-disc list-inside space-y-1 text-neutral-700">
          <li>屋内測位精度の限界により、詳細な店舗単位の位置特定は困難な場合があります</li>
          <li>Wi-Fiアクセスポイントやビーコンとの併用で、屋内測位精度の向上が可能です</li>
          <li>データはユーザー同意に基づき匿名化・統計処理されています</li>
          <li>短時間の滞在や通過はノイズ除去のため集計対象外となる場合があります</li>
          <li>データの取得頻度はバッテリー消費を考慮して適切に設定されています</li>
        </ul>
      </div>
    </div>
  );
};

export default AreaAnalysis;