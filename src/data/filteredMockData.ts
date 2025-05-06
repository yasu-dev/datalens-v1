import { FilterState } from '../contexts/FilterContext';
import {
  trafficByTimeData as originalTrafficByTimeData,
  weeklyTrafficData as originalWeeklyTrafficData,
  customerSegmentsData as originalCustomerSegmentsData,
  dwellTimeData as originalDwellTimeData,
  deviceDistributionData as originalDeviceDistributionData,
  deviceTierData as originalDeviceTierData,
  monthlyTrendData as originalMonthlyTrendData,
  trafficHeatmapData as originalTrafficHeatmapData,
  movementData as originalMovementData,
  connectivityData as originalConnectivityData,
  kpiSummary as originalKpiSummary,
  journeyStagesData as originalJourneyStagesData,
} from './mockData';
import { allStores, prefectureData } from './storeData';

// データ変動率設定（フィルター適用時の変動具合）
const VARIATION_FACTOR = {
  MINOR: 0.9, // 軽微な変動
  MEDIUM: 0.7, // 中程度の変動
  MAJOR: 0.5, // 大きな変動
};

// ランダム値を生成（基準値の周囲で変動）
const getRandomVariation = (baseValue: number, factor = VARIATION_FACTOR.MEDIUM) => {
  const variationRange = baseValue * (1 - factor);
  return baseValue - variationRange + Math.random() * (variationRange * 2);
};

// 日付フィルターの影響度を計算
const getDateRangeImpact = (filters: FilterState) => {
  const startDate = new Date(filters.dateRange.start);
  const endDate = new Date(filters.dateRange.end);
  const daysDifference = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // 日数が30日以上なら影響度なし、少なくなるほど影響度増加
  if (daysDifference >= 30) return 1;
  return 0.7 + (daysDifference / 100);
};

// エリアフィルターの一致度を計算
const getAreaMatchFactor = (filters: FilterState) => {
  // 何も選択されていない場合は全体を表示
  if (filters.areas.prefectures.length === 0 && 
      filters.areas.cities.length === 0 && 
      filters.areas.stores.length === 0) {
    return 1;
  }

  // 都道府県が選択されている場合
  if (filters.areas.prefectures.length > 0) {
    // 全データ中の都道府県数
    const totalPrefectures = prefectureData.length;
    // 選択された都道府県数
    const selectedPrefectures = filters.areas.prefectures.length;
    // 選択された都道府県の割合
    return selectedPrefectures / totalPrefectures;
  }

  // 市区町村が選択されている場合
  if (filters.areas.cities.length > 0) {
    const totalCities = prefectureData.reduce((sum, pref) => sum + pref.cities.length, 0);
    return filters.areas.cities.length / totalCities * 0.8; // 市区町村選択は都道府県よりも限定的
  }

  // 店舗が選択されている場合
  if (filters.areas.stores.length > 0) {
    const totalStores = allStores.length;
    return filters.areas.stores.length / totalStores * 0.6; // 店舗選択は最も限定的
  }

  return 1;
};

// セグメントフィルターの一致度を計算
const getSegmentMatchFactor = (filters: FilterState) => {
  // Allが選択されている場合は全体を表示
  if (filters.segments.includes('All')) {
    return 1;
  }
  
  // 選択されたセグメント数が多いほど、データ量も多い
  return filters.segments.length / (originalCustomerSegmentsData.length - 1); // Allを除く
};

// デバイスタイプフィルターの一致度を計算
const getDeviceTypeMatchFactor = (filters: FilterState) => {
  // Allが選択されている場合は全体を表示
  if (filters.deviceTypes.includes('All')) {
    return 1;
  }
  
  // 選択されたデバイスタイプ数が多いほど、データ量も多い
  return filters.deviceTypes.length / (originalDeviceTierData.length + originalDeviceDistributionData.length - 1);
};

// 総合的なフィルター一致度を計算
const getOverallFilterImpact = (filters: FilterState) => {
  const dateImpact = getDateRangeImpact(filters);
  const areaImpact = getAreaMatchFactor(filters);
  const segmentImpact = getSegmentMatchFactor(filters);
  const deviceImpact = getDeviceTypeMatchFactor(filters);
  
  // 各フィルターの影響度を組み合わせて総合的な値を算出
  return dateImpact * areaImpact * segmentImpact * deviceImpact;
};

// 時間帯別トラフィックデータをフィルター適用
export const getFilteredTrafficByTimeData = (filters: FilterState) => {
  const impact = getOverallFilterImpact(filters);
  
  return originalTrafficByTimeData.map(item => ({
    ...item,
    volume: Math.round(item.volume * impact * getRandomVariation(1, VARIATION_FACTOR.MINOR))
  }));
};

// 曜日別トラフィックデータをフィルター適用
export const getFilteredWeeklyTrafficData = (filters: FilterState) => {
  const impact = getOverallFilterImpact(filters);
  
  return originalWeeklyTrafficData.map(item => ({
    ...item,
    volume: Math.round(item.volume * impact * getRandomVariation(1, VARIATION_FACTOR.MINOR))
  }));
};

// 顧客セグメントデータをフィルター適用
export const getFilteredCustomerSegmentsData = (filters: FilterState) => {
  const impact = getOverallFilterImpact(filters);
  
  // セグメントフィルターが適用されている場合、選択されたセグメントのみを含む
  if (!filters.segments.includes('All')) {
    const filteredData = originalCustomerSegmentsData
      .filter(segment => filters.segments.includes(segment.name))
      .map(segment => ({
        ...segment,
        value: Math.round(segment.value * getRandomVariation(1.5, VARIATION_FACTOR.MEDIUM)) // 選択されたセグメントのみなので割合を増加
      }));
    
    // 合計が100%になるように調整
    const total = filteredData.reduce((sum, item) => sum + item.value, 0);
    return filteredData.map(item => ({
      ...item,
      value: Math.round((item.value / total) * 100)
    }));
  }
  
  // すべてのセグメントを含む場合
  const adjustedData = originalCustomerSegmentsData.map(segment => ({
    ...segment,
    value: Math.round(segment.value * impact * getRandomVariation(1, VARIATION_FACTOR.MEDIUM))
  }));
  
  // 合計が100%になるように調整
  const total = adjustedData.reduce((sum, item) => sum + item.value, 0);
  return adjustedData.map(item => ({
    ...item,
    value: Math.round((item.value / total) * 100)
  }));
};

// エリア別滞在時間データをフィルター適用
export const getFilteredDwellTimeData = (filters: FilterState) => {
  const impact = getOverallFilterImpact(filters);
  
  return originalDwellTimeData.map(item => ({
    ...item,
    time: Math.round(item.time * impact * getRandomVariation(1, VARIATION_FACTOR.MINOR))
  }));
};

// デバイス分布データをフィルター適用
export const getFilteredDeviceDistributionData = (filters: FilterState) => {
  // デバイスタイプフィルターが適用されている場合
  if (!filters.deviceTypes.includes('All')) {
    // デバイスタイプに関するフィルターを適用（iOSとAndroidの場合）
    if (filters.deviceTypes.includes('iOS') && !filters.deviceTypes.includes('Android')) {
      return [{ type: 'iOS', percentage: 100 }];
    }
    if (filters.deviceTypes.includes('Android') && !filters.deviceTypes.includes('iOS')) {
      return [{ type: 'Android', percentage: 100 }];
    }
    // 他のデバイスタイプが選択されている場合（ハイエンド、ミドルレンジ、ローエンド）
    // 端末グレードに応じてiOSとAndroidの割合を調整
    if (filters.deviceTypes.includes('ハイエンド')) {
      return [
        { type: 'iOS', percentage: 75 },
        { type: 'Android', percentage: 25 }
      ];
    }
    if (filters.deviceTypes.includes('ミドルレンジ')) {
      return [
        { type: 'iOS', percentage: 60 },
        { type: 'Android', percentage: 40 }
      ];
    }
    if (filters.deviceTypes.includes('ローエンド')) {
      return [
        { type: 'iOS', percentage: 40 },
        { type: 'Android', percentage: 60 }
      ];
    }
  }
  
  // フィルターなし、またはAllが選択されている場合はランダム変動を加えた元データを返す
  const impact = getOverallFilterImpact(filters);
  const adjustedData = originalDeviceDistributionData.map(item => ({
    ...item,
    percentage: Math.round(item.percentage * impact * getRandomVariation(1, VARIATION_FACTOR.MINOR))
  }));
  
  // 合計が100%になるように調整
  const total = adjustedData.reduce((sum, item) => sum + item.percentage, 0);
  return adjustedData.map(item => ({
    ...item,
    percentage: Math.round((item.percentage / total) * 100)
  }));
};

// ヒートマップデータをフィルター適用
export const getFilteredTrafficHeatmapData = (filters: FilterState) => {
  const impact = getOverallFilterImpact(filters);
  
  return originalTrafficHeatmapData.map(item => ({
    ...item,
    value: Math.round(item.value * impact * getRandomVariation(1, VARIATION_FACTOR.MEDIUM))
  }));
};

// KPIサマリーデータをフィルター適用
export const getFilteredKpiSummary = (filters: FilterState) => {
  const impact = getOverallFilterImpact(filters);
  
  return {
    totalVisitors: Math.round(originalKpiSummary.totalVisitors * impact * getRandomVariation(1, VARIATION_FACTOR.MINOR)),
    avgDwellTime: Math.round(originalKpiSummary.avgDwellTime * impact * getRandomVariation(1, VARIATION_FACTOR.MINOR)),
    peakHour: originalKpiSummary.peakHour, // ピーク時間は変えない
    returningVisitors: Math.round(originalKpiSummary.returningVisitors * impact * getRandomVariation(1, VARIATION_FACTOR.MINOR)),
    weekOverWeekChange: parseFloat((originalKpiSummary.weekOverWeekChange * impact * getRandomVariation(1, VARIATION_FACTOR.MEDIUM)).toFixed(1)),
  };
};

// 月間トレンドデータをフィルター適用
export const getFilteredMonthlyTrendData = (filters: FilterState) => {
  const impact = getOverallFilterImpact(filters);
  
  return originalMonthlyTrendData.map(item => ({
    ...item,
    visitors: Math.round(item.visitors * impact * getRandomVariation(1, VARIATION_FACTOR.MINOR)),
    avgDwellTime: Math.round(item.avgDwellTime * impact * getRandomVariation(1, VARIATION_FACTOR.MINOR))
  }));
};

// ユーザー行動データをフィルター適用
export const getFilteredMovementData = (filters: FilterState) => {
  const impact = getOverallFilterImpact(filters);
  
  return originalMovementData.map(item => ({
    ...item,
    value: Math.round(item.value * impact * getRandomVariation(1, VARIATION_FACTOR.MEDIUM))
  }));
};

// 接続種別データをフィルター適用
export const getFilteredConnectivityData = (filters: FilterState) => {
  const impact = getOverallFilterImpact(filters);
  
  return originalConnectivityData.map(item => ({
    ...item,
    '4G': Math.round(item['4G'] * impact * getRandomVariation(1, VARIATION_FACTOR.MINOR)),
    '5G': Math.round(item['5G'] * impact * getRandomVariation(1, VARIATION_FACTOR.MINOR))
  }));
};

// 顧客行動ステージデータをフィルター適用
export const getFilteredJourneyStagesData = (filters: FilterState) => {
  const impact = getOverallFilterImpact(filters);
  
  // 段階ごとの数値を計算
  const adjustedData = originalJourneyStagesData.map(item => {
    let newCount;
    if (item.stage === '認知') {
      // 認知段階は最初なので、基準となる数値
      newCount = Math.round(item.count * impact * getRandomVariation(1, VARIATION_FACTOR.MINOR));
    } else {
      // 他の段階はランダム変動を含む
      newCount = Math.round(item.count * impact * getRandomVariation(1, VARIATION_FACTOR.MEDIUM));
    }
    return {
      ...item,
      count: newCount,
    };
  });
  
  // 認知段階を基準にパーセンテージを再計算
  const baseCount = adjustedData[0].count;
  return adjustedData.map(item => ({
    ...item,
    percentage: parseFloat(((item.count / baseCount) * 100).toFixed(1))
  }));
};

// 訪問頻度データを取得（フィルター適用済み）
export const getFilteredVisitFrequencyData = (filters: any) => {
  const baseData = [
    { name: '初回', value: 38, color: '#42A5F5' },
    { name: '月1回未満', value: 22, color: '#66BB6A' },
    { name: '月1-3回', value: 28, color: '#FFA726' },
    { name: '週1回以上', value: 12, color: '#EF5350' }
  ];
  
  // フィルター適用（簡易的なランダムバリエーション）
  return baseData.map(item => {
    const variation = Math.random() * 0.2 - 0.1; // -10%〜+10%のランダム変動
    return {
      ...item,
      value: Math.round(item.value * (1 + variation))
    };
  });
};

// エリア間移動フローデータを取得（フィルター適用済み）
export interface LocationFlow {
  source: string;
  target: string;
  value: number;
  percentage: number;
}

export const getFilteredLocationFlowData = (filters: FilterState): LocationFlow[] => {
  const impact = getOverallFilterImpact(filters);
  
  // 基本データ
  const baseData: LocationFlow[] = [
    { source: 'エントランス', target: 'フードコート', value: 1250, percentage: 42 },
    { source: 'アパレル', target: 'フードコート', value: 980, percentage: 33 },
    { source: 'エントランス', target: 'アパレル', value: 830, percentage: 28 },
    { source: 'フードコート', target: 'キッズ', value: 650, percentage: 22 },
    { source: 'アパレル', target: 'キッズ', value: 520, percentage: 18 },
    { source: 'エントランス', target: '雑貨', value: 480, percentage: 16 },
    { source: 'フードコート', target: 'アパレル', value: 420, percentage: 14 }
  ];
  
  // フィルターを適用してデータを変動させる
  return baseData.map(flow => {
    const variation = getRandomVariation(1, VARIATION_FACTOR.MEDIUM);
    const newValue = Math.round(flow.value * impact * variation);
    
    return {
      ...flow,
      value: newValue,
      percentage: Math.round(flow.percentage * variation)
    };
  });
}; 