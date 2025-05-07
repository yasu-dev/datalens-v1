// 大規模顧客データを扱うデータサービス層

// 型定義
export interface FilterCriteria {
  ageGroups?: string[];
  genders?: string[];
  maritalStatus?: string[];
  occupations?: string[];
  incomeRange?: [number, number];
  visitFrequency?: [number, number];
  spendingRange?: [number, number];
  locationAreas?: string[];
  purchaseCategories?: string[];
  page?: number;
  pageSize?: number;
}

export interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  totalCustomers: number;
  attributes: {
    avgVisitFrequency: number;
    avgSpending: number;
    topCategories: string[];
    dominantAgeGroup: string;
    dominantGender: string;
  };
}

export interface SegmentDetails extends CustomerSegment {
  demographicBreakdown: {
    ageGroups: { name: string; value: number }[];
    genders: { name: string; value: number }[];
    maritalStatus: { name: string; value: number }[];
    occupations: { name: string; value: number }[];
    incomeRanges: { name: string; value: number }[];
  };
  behavioralPatterns: {
    visitFrequency: { name: string; value: number }[];
    visitTimes: { name: string; value: number }[];
    preferredAreas: { name: string; value: number }[];
    purchaseCategories: { name: string; value: number }[];
  };
}

export interface SegmentMetrics {
  totalCustomers: number;
  avgLTV: number;
  churnRate: number;
  growthRate: number;
  avgVisitFrequency: number;
  avgOrderValue: number;
  visitTrend: { period: string; value: number }[];
  spendingTrend: { period: string; value: number }[];
}

export interface CustomerProfileSummary {
  id: string;
  name: string;
  ltvScore: number;
  churnRisk: number;
  visitFrequency: string;
  lastVisit: string;
  avgSpending: string;
  mainCategories: string[];
  loyaltyTier: string;
}

// 大規模データをページング形式で返却
export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 日本人の姓名リスト - 実名生成用
const japaneseLastNames = [
  '佐藤', '鈴木', '高橋', '田中', '伊藤', '渡辺', '山本', '中村', '小林', '加藤',
  '吉田', '山田', '佐々木', '山口', '松本', '井上', '木村', '林', '斎藤', '清水',
  '山崎', '阿部', '森', '池田', '橋本', '石川', '前田', '後藤', '宮崎', '中島'
];

const japaneseFirstNamesMale = [
  '大翔', '蓮', '陽翔', '樹', '悠真', '悠人', '陸', '颯真', '悠斗', '翔',
  '大和', '大輝', '陽太', '健太', '隼人', '和也', '拓海', '直樹', '翔太', '健'
];

const japaneseFirstNamesFemale = [
  '陽菜', '凛', '葵', '結菜', '結衣', '杏', '莉子', '美咲', '楓', '美月',
  '彩花', '遥', '桜', '愛', '美優', '真央', '奈々', '千尋', '菜々子', '優花'
];

// セグメンテーション画面のためのセグメント一覧を取得
export const fetchInitialSegments = async (filters: FilterCriteria): Promise<CustomerSegment[]> => {
  // 実環境ではAPIから取得
  // モックデータを返却
  console.log('Fetching segments with filters:', filters);
  
  // APIレスポンスをシミュレート
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: 'seg_regular_visitors',
      name: '常連来店客',
      description: '月に4回以上来店する顧客層',
      totalCustomers: 1250000,
      attributes: {
        avgVisitFrequency: 5.2,
        avgSpending: 12800,
        topCategories: ['食品', 'アパレル', '日用品'],
        dominantAgeGroup: '30-40代',
        dominantGender: '女性'
      }
    },
    {
      id: 'seg_high_spenders',
      name: '高額支出層',
      description: '1回の来店で平均15,000円以上使う顧客層',
      totalCustomers: 850000,
      attributes: {
        avgVisitFrequency: 2.8,
        avgSpending: 24500,
        topCategories: ['家電', 'ラグジュアリー', '家具'],
        dominantAgeGroup: '40-50代',
        dominantGender: '男性'
      }
    },
    {
      id: 'seg_family_shoppers',
      name: 'ファミリー層',
      description: '子供関連商品を定期的に購入する顧客層',
      totalCustomers: 1650000,
      attributes: {
        avgVisitFrequency: 3.5,
        avgSpending: 18200,
        topCategories: ['子供服', '食品', 'おもちゃ'],
        dominantAgeGroup: '30-40代',
        dominantGender: '女性'
      }
    },
    {
      id: 'seg_weekend_visitors',
      name: '週末来店層',
      description: '主に週末に買い物をする顧客層',
      totalCustomers: 2300000,
      attributes: {
        avgVisitFrequency: 1.5,
        avgSpending: 14300,
        topCategories: ['アパレル', 'レストラン', 'エンタメ'],
        dominantAgeGroup: '20-30代',
        dominantGender: '混合'
      }
    },
    {
      id: 'seg_online_offline',
      name: 'オンライン・オフライン併用層',
      description: 'ECと実店舗の両方を利用する顧客層',
      totalCustomers: 980000,
      attributes: {
        avgVisitFrequency: 2.2,
        avgSpending: 16700,
        topCategories: ['家電', 'アパレル', '書籍'],
        dominantAgeGroup: '20-40代',
        dominantGender: '混合'
      }
    },
    {
      id: 'seg_senior_shoppers',
      name: 'シニア層',
      description: '60歳以上の顧客層',
      totalCustomers: 1450000,
      attributes: {
        avgVisitFrequency: 3.8,
        avgSpending: 9500,
        topCategories: ['食品', '健康', '日用品'],
        dominantAgeGroup: '60代以上',
        dominantGender: '混合'
      }
    }
  ].filter(segment => {
    // フィルターロジックを適用
    let match = true;
    
    // 例: 来店頻度によるフィルタリング
    if (filters.visitFrequency) {
      const [min, max] = filters.visitFrequency;
      if (segment.attributes.avgVisitFrequency < min || 
          segment.attributes.avgVisitFrequency > max) {
        match = false;
      }
    }
    
    // 例: 支出範囲によるフィルタリング
    if (filters.spendingRange) {
      const [min, max] = filters.spendingRange;
      if (segment.attributes.avgSpending < min || 
          segment.attributes.avgSpending > max) {
        match = false;
      }
    }
    
    return match;
  });
};

// セグメント詳細情報を取得
export const fetchSegmentDetails = async (segmentId: string): Promise<SegmentDetails> => {
  console.log('Fetching segment details for:', segmentId);
  
  // APIレスポンスをシミュレート
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // 基本データを取得
  const basicSegments = await fetchInitialSegments({});
  const baseSegment = basicSegments.find(s => s.id === segmentId);
  
  if (!baseSegment) {
    throw new Error(`Segment with ID ${segmentId} not found`);
  }
  
  // 詳細データを追加
  return {
    ...baseSegment,
    demographicBreakdown: {
      ageGroups: [
        { name: '~19歳', value: 5 },
        { name: '20-29歳', value: 15 },
        { name: '30-39歳', value: 25 },
        { name: '40-49歳', value: 30 },
        { name: '50-59歳', value: 15 },
        { name: '60歳~', value: 10 }
      ],
      genders: [
        { name: '男性', value: 35 },
        { name: '女性', value: 65 }
      ],
      maritalStatus: [
        { name: '未婚', value: 30 },
        { name: '既婚', value: 60 },
        { name: 'その他', value: 10 }
      ],
      occupations: [
        { name: '会社員', value: 45 },
        { name: '公務員', value: 10 },
        { name: '自営業', value: 15 },
        { name: '主婦/主夫', value: 20 },
        { name: 'その他', value: 10 }
      ],
      incomeRanges: [
        { name: '~300万円', value: 10 },
        { name: '300-500万円', value: 25 },
        { name: '500-700万円', value: 30 },
        { name: '700-1000万円', value: 25 },
        { name: '1000万円~', value: 10 }
      ]
    },
    behavioralPatterns: {
      visitFrequency: [
        { name: '週1回未満', value: 20 },
        { name: '週1-2回', value: 40 },
        { name: '週3-4回', value: 30 },
        { name: '週5回以上', value: 10 }
      ],
      visitTimes: [
        { name: '平日午前', value: 15 },
        { name: '平日午後', value: 25 },
        { name: '平日夕方/夜', value: 30 },
        { name: '週末午前', value: 10 },
        { name: '週末午後', value: 20 }
      ],
      preferredAreas: [
        { name: '食品', value: 30 },
        { name: 'アパレル', value: 25 },
        { name: '家電', value: 15 },
        { name: 'レストラン', value: 15 },
        { name: 'その他', value: 15 }
      ],
      purchaseCategories: [
        { name: '食品', value: 35 },
        { name: 'アパレル', value: 20 },
        { name: '日用品', value: 15 },
        { name: '家電', value: 10 },
        { name: 'その他', value: 20 }
      ]
    }
  };
};

// セグメントメトリクスを取得
export const fetchSegmentMetrics = async (segmentId: string): Promise<SegmentMetrics> => {
  console.log('Fetching metrics for segment:', segmentId);
  
  // APIレスポンスをシミュレート
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // 基本データを取得
  const basicSegments = await fetchInitialSegments({});
  const baseSegment = basicSegments.find(s => s.id === segmentId);
  
  if (!baseSegment) {
    throw new Error(`Segment with ID ${segmentId} not found`);
  }
  
  return {
    totalCustomers: baseSegment.totalCustomers,
    avgLTV: Math.round(baseSegment.attributes.avgSpending * 12 * 3.5), // 仮のLTV計算
    churnRate: Math.round(Math.random() * 10 + 5), // 5-15%
    growthRate: Math.round(Math.random() * 10 - 2), // -2-8%
    avgVisitFrequency: baseSegment.attributes.avgVisitFrequency,
    avgOrderValue: baseSegment.attributes.avgSpending,
    
    // 過去6ヶ月のトレンド
    visitTrend: [
      { period: '2023-04', value: 95 },
      { period: '2023-05', value: 97 },
      { period: '2023-06', value: 100 },
      { period: '2023-07', value: 102 },
      { period: '2023-08', value: 105 },
      { period: '2023-09', value: 108 }
    ],
    spendingTrend: [
      { period: '2023-04', value: 94 },
      { period: '2023-05', value: 98 },
      { period: '2023-06', value: 100 },
      { period: '2023-07', value: 103 },
      { period: '2023-08', value: 107 },
      { period: '2023-09', value: 110 }
    ]
  };
};

// セグメント内の顧客プロファイルを取得（ページング対応）
export const fetchCustomerProfiles = async (
  segmentId: string, 
  options: { page?: number; pageSize?: number; } & FilterCriteria
): Promise<PaginatedResult<CustomerProfileSummary>> => {
  console.log('Fetching customer profiles for segment:', segmentId, 'with options:', options);
  
  // APIレスポンスをシミュレート
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const page = options.page || 1;
  const pageSize = options.pageSize || 20;
  
  // 基本セグメントデータを取得して総顧客数を確認
  const basicSegments = await fetchInitialSegments({});
  const baseSegment = basicSegments.find(s => s.id === segmentId);
  
  if (!baseSegment) {
    throw new Error(`Segment with ID ${segmentId} not found`);
  }
  
  // モックデータ生成（実際のAPIでは不要）
  const totalCustomers = baseSegment.totalCustomers;
  const totalPossibleItems = Math.min(totalCustomers, 1000); // デモ用に上限
  
  // ランダムなプロファイルを生成
  const generateProfiles = (count: number): CustomerProfileSummary[] => {
    const profiles: CustomerProfileSummary[] = [];
    
    for (let i = 0; i < count; i++) {
      // 顧客IDを生成
      const customerId = `CUST${Math.floor(10000000 + Math.random() * 90000000)}`;
      
      // 性別をランダムに選択
      const genders = ['男性', '女性'];
      const gender = genders[Math.floor(Math.random() * genders.length)];
      
      // 年代をランダムに選択
      const ageGroups = ['20代', '30代', '40代', '50代', '60代以上'];
      const ageGroup = ageGroups[Math.floor(Math.random() * ageGroups.length)];
      
      // 実名を生成
      const lastName = japaneseLastNames[Math.floor(Math.random() * japaneseLastNames.length)];
      let firstName;
      if (gender === '男性') {
        firstName = japaneseFirstNamesMale[Math.floor(Math.random() * japaneseFirstNamesMale.length)];
      } else {
        firstName = japaneseFirstNamesFemale[Math.floor(Math.random() * japaneseFirstNamesFemale.length)];
      }
      const name = `${lastName} ${firstName}`;
      
      // LTVスコアと解約リスク
      const ltvScore = Math.floor(Math.random() * 60) + 40; // 40-99
      const churnRisk = Math.floor(Math.random() * 40) + 1; // 1-40
      
      // 来店頻度
      const frequencyOptions = ['月1-2回', '週1回', '週2-3回', '週4回以上'];
      const visitFrequency = frequencyOptions[Math.floor(Math.random() * frequencyOptions.length)];
      
      // 最終来店日を過去1カ月でランダム生成
      const lastVisitDate = new Date();
      lastVisitDate.setDate(lastVisitDate.getDate() - Math.floor(Math.random() * 30));
      const lastVisit = lastVisitDate.toISOString().split('T')[0];
      
      // 平均支出額
      const avgSpending = `${Math.floor(Math.random() * 20) * 1000 + 5000}円`;
      
      // メインカテゴリ
      const allCategories = ['食品', 'アパレル', '家電', '日用品', '化粧品', '書籍', '家具', 'レストラン', '医薬品', 'スポーツ用品'];
      const categoryCount = Math.floor(Math.random() * 3) + 1; // 1-3個のカテゴリ
      const mainCategories: string[] = [];
      
      for (let j = 0; j < categoryCount; j++) {
        const category = allCategories[Math.floor(Math.random() * allCategories.length)];
        if (!mainCategories.includes(category)) {
          mainCategories.push(category);
        }
      }
      
      // ロイヤルティ階層
      const loyaltyTiers = ['一般', 'シルバー', 'ゴールド', 'プラチナ'];
      const loyaltyTier = loyaltyTiers[Math.floor(Math.random() * loyaltyTiers.length)];
      
      profiles.push({
        id: customerId,
        name,
        ltvScore,
        churnRisk,
        visitFrequency,
        lastVisit,
        avgSpending,
        mainCategories,
        loyaltyTier
      });
    }
    
    return profiles;
  };
  
  // フィルターを適用したプロファイル生成
  const start = (page - 1) * pageSize;
  const count = Math.min(pageSize, totalPossibleItems - start);
  const profiles = generateProfiles(count);
  
  return {
    items: profiles,
    totalCount: totalPossibleItems,
    page,
    pageSize,
    totalPages: Math.ceil(totalPossibleItems / pageSize)
  };
};

// 顧客個人の詳細情報取得（すでに実装されているものと統合）
export const fetchCustomerDetail = async (customerId: string) => {
  console.log('Fetching detailed customer data for:', customerId);
  
  // APIレスポンスをシミュレート
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 既存の詳細データサービスを呼び出す
  // ここでは既存のモックデータから取得する想定
  const existingCustomerData = (await import('./personalAnalysisData')).customerProfiles.find(
    c => c.id === customerId
  );
  
  // 存在しない場合は暫定的にデータを返す
  if (!existingCustomerData) {
    const defaultCustomerId = (await import('./personalAnalysisData')).customerIds[0];
    return (await import('./personalAnalysisData')).customerProfiles.find(
      c => c.id === defaultCustomerId
    );
  }
  
  return existingCustomerData;
};

// アクセスログを記録
export const logPersonalDataAccess = async (
  customerId: string, 
  accessInfo: { 
    userId: string; 
    accessReason: string; 
    timestamp: string;
  }
) => {
  console.log('Logging personal data access:', {
    customerId,
    ...accessInfo
  });
  
  // 実際の環境では監査ログをAPI経由で記録する
  // ここではコンソールに出力のみ
  
  return true;
}; 