// Mock data for eSIM metadata analysis dashboard

// Traffic by time of day
export const trafficByTimeData = [
  { time: '06:00', volume: 1200 },
  { time: '07:00', volume: 1800 },
  { time: '08:00', volume: 2400 },
  { time: '09:00', volume: 2800 },
  { time: '10:00', volume: 3200 },
  { time: '11:00', volume: 3600 },
  { time: '12:00', volume: 3800 },
  { time: '13:00', volume: 3500 },
  { time: '14:00', volume: 3300 },
  { time: '15:00', volume: 3400 },
  { time: '16:00', volume: 3700 },
  { time: '17:00', volume: 4200 },
  { time: '18:00', volume: 4500 },
  { time: '19:00', volume: 4100 },
  { time: '20:00', volume: 3700 },
  { time: '21:00', volume: 3200 },
  { time: '22:00', volume: 2500 },
  { time: '23:00', volume: 1800 },
];

// Weekly traffic patterns
export const weeklyTrafficData = [
  { day: '月', volume: 8500 },
  { day: '火', volume: 8200 },
  { day: '水', volume: 8600 },
  { day: '木', volume: 8700 },
  { day: '金', volume: 9500 },
  { day: '土', volume: 12000 },
  { day: '日', volume: 11200 },
];

// Customer segments distribution
export const customerSegmentsData = [
  { name: '週末来店層', value: 28, color: '#0066CC' },
  { name: '平日夜間層', value: 22, color: '#00BF80' },
  { name: '高頻度来店層', value: 16, color: '#E53935' },
  { name: 'モバイルヘビーユーザー', value: 14, color: '#F59E0B' },
  { name: 'シニア層', value: 10, color: '#8B5CF6' },
  { name: 'ファミリー層', value: 10, color: '#10B981' },
];

// Average dwell time by area
export const dwellTimeData = [
  { area: 'モールエントランス', time: 12 },
  { area: 'フードコート', time: 45 },
  { area: 'スーパーマーケット', time: 30 },
  { area: 'アパレルゾーン', time: 35 },
  { area: '家電エリア', time: 28 },
  { area: 'レストランエリア', time: 60 },
];

// Device distribution
export const deviceDistributionData = [
  { type: 'iOS', percentage: 65 },
  { type: 'Android', percentage: 35 },
];

// Device tier distribution
export const deviceTierData = [
  { tier: 'ハイエンド', percentage: 38 },
  { tier: 'ミドルレンジ', percentage: 42 },
  { tier: 'ローエンド', percentage: 20 },
];

// Monthly trend data
export const monthlyTrendData = [
  { year: 2023, month: '1月', displayMonth: '2023年1月', visitors: 62000, avgDwellTime: 42 },
  { year: 2023, month: '2月', displayMonth: '2023年2月', visitors: 58000, avgDwellTime: 40 },
  { year: 2023, month: '3月', displayMonth: '2023年3月', visitors: 65000, avgDwellTime: 45 },
  { year: 2023, month: '4月', displayMonth: '2023年4月', visitors: 68000, avgDwellTime: 44 },
  { year: 2023, month: '5月', displayMonth: '2023年5月', visitors: 75000, avgDwellTime: 46 },
  { year: 2023, month: '6月', displayMonth: '2023年6月', visitors: 70000, avgDwellTime: 43 },
  { year: 2023, month: '7月', displayMonth: '2023年7月', visitors: 78000, avgDwellTime: 48 },
  { year: 2023, month: '8月', displayMonth: '2023年8月', visitors: 82000, avgDwellTime: 50 },
  { year: 2023, month: '9月', displayMonth: '2023年9月', visitors: 76000, avgDwellTime: 47 },
  { year: 2023, month: '10月', displayMonth: '2023年10月', visitors: 73000, avgDwellTime: 46 },
  { year: 2023, month: '11月', displayMonth: '2023年11月', visitors: 80000, avgDwellTime: 49 },
  { year: 2023, month: '12月', displayMonth: '2023年12月', visitors: 88000, avgDwellTime: 52 },
];

// Traffic heatmap data by day and hour
export const trafficHeatmapData = Array(7)
  .fill(0)
  .map((_, dayIndex) => {
    const day = ['月', '火', '水', '木', '金', '土', '日'][dayIndex];
    return Array(24)
      .fill(0)
      .map((_, hourIndex) => {
        // Base traffic patterns
        let baseValue;
        if (dayIndex >= 5) {
          // Weekend pattern
          if (hourIndex >= 10 && hourIndex <= 19) {
            baseValue = 60 + Math.floor(Math.random() * 40); // Higher daytime weekend traffic
          } else {
            baseValue = 10 + Math.floor(Math.random() * 30);
          }
        } else {
          // Weekday pattern
          if (hourIndex >= 17 && hourIndex <= 21) {
            baseValue = 50 + Math.floor(Math.random() * 40); // Higher evening weekday traffic
          } else if (hourIndex >= 9 && hourIndex <= 16) {
            baseValue = 30 + Math.floor(Math.random() * 30); // Moderate daytime weekday traffic
          } else {
            baseValue = 5 + Math.floor(Math.random() * 15);
          }
        }
        
        return {
          day,
          hour: hourIndex,
          value: baseValue,
        };
      });
  }).flat();

// Movement patterns between areas
export const movementData = [
  { source: 'エントランス', target: 'フードコート', value: 250 },
  { source: 'エントランス', target: 'スーパーマーケット', value: 500 },
  { source: 'エントランス', target: 'アパレルゾーン', value: 350 },
  { source: 'フードコート', target: 'スーパーマーケット', value: 200 },
  { source: 'フードコート', target: 'アパレルゾーン', value: 150 },
  { source: 'フードコート', target: '家電エリア', value: 100 },
  { source: 'スーパーマーケット', target: 'フードコート', value: 180 },
  { source: 'スーパーマーケット', target: 'アパレルゾーン', value: 120 },
  { source: 'スーパーマーケット', target: '家電エリア', value: 90 },
  { source: 'アパレルゾーン', target: 'フードコート', value: 220 },
  { source: 'アパレルゾーン', target: '家電エリア', value: 140 },
  { source: '家電エリア', target: 'フードコート', value: 110 },
  { source: '家電エリア', target: 'スーパーマーケット', value: 80 },
];

// User activity by connectivity type
export const connectivityData = [
  { time: '06:00', '4G': 950, '5G': 250 },
  { time: '07:00', '4G': 1400, '5G': 400 },
  { time: '08:00', '4G': 1800, '5G': 600 },
  { time: '09:00', '4G': 2000, '5G': 800 },
  { time: '10:00', '4G': 2200, '5G': 1000 },
  { time: '11:00', '4G': 2400, '5G': 1200 },
  { time: '12:00', '4G': 2500, '5G': 1300 },
  { time: '13:00', '4G': 2300, '5G': 1200 },
  { time: '14:00', '4G': 2200, '5G': 1100 },
  { time: '15:00', '4G': 2300, '5G': 1100 },
  { time: '16:00', '4G': 2500, '5G': 1200 },
  { time: '17:00', '4G': 2800, '5G': 1400 },
  { time: '18:00', '4G': 3000, '5G': 1500 },
  { time: '19:00', '4G': 2800, '5G': 1300 },
  { time: '20:00', '4G': 2500, '5G': 1200 },
  { time: '21:00', '4G': 2200, '5G': 1000 },
  { time: '22:00', '4G': 1800, '5G': 700 },
  { time: '23:00', '4G': 1300, '5G': 500 },
];

// KPI summary data
export const kpiSummary = {
  totalVisitors: 78342,
  avgDwellTime: 45,
  peakHour: '18:00',
  returningVisitors: 42,
  weekOverWeekChange: 8.5,
};

// Customer journey stages
export const journeyStagesData = [
  { stage: '認知', count: 100000, percentage: 100 },
  { stage: '来店', count: 78342, percentage: 78.3 },
  { stage: '商品閲覧', count: 62500, percentage: 62.5 },
  { stage: '購入', count: 28900, percentage: 28.9 },
  { stage: '再来店', count: 18700, percentage: 18.7 },
];