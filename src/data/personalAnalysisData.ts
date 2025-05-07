// 個人顧客分析のためのモックデータ

// 例示用の顧客ID
export const customerIds = [
  'CUST10025489', 'CUST10032175', 'CUST10018734', 'CUST10045693', 'CUST10027845', 
  'CUST28013054', 'CUST20130054', 'CUST30540123', 'CUST12345678', 'CUST87654321'
];

// 個人顧客プロファイルデータ
export const customerProfiles = [
  {
    id: 'CUST10025489',
    nickname: '高橋 花子',
    ltvScore: 92,
    churnRisk: 8,
    loyaltyTier: 'プラチナ',
    firstVisitDate: '2022-05-12',
    lastVisitDate: '2023-09-28',
    visitFrequency: {
      average: '週2.3回',
      trend: 'stable',
      weeklyDistribution: [
        { day: '月', value: 15 },
        { day: '火', value: 10 },
        { day: '水', value: 12 },
        { day: '木', value: 8 },
        { day: '金', value: 20 },
        { day: '土', value: 25 },
        { day: '日', value: 10 }
      ]
    },
    dwellTime: {
      average: '74分',
      trend: 'increasing',
      history: [
        { date: '2023-09-28', minutes: 85 },
        { date: '2023-09-21', minutes: 72 },
        { date: '2023-09-14', minutes: 68 },
        { date: '2023-09-07', minutes: 65 },
        { date: '2023-08-31', minutes: 60 }
      ]
    },
    cardUsage: {
      averageSpend: '15,800円/月',
      trend: 'increasing',
      preferredCategories: [
        { category: 'アパレル', percentage: 45 },
        { category: 'レストラン', percentage: 25 },
        { category: '雑貨', percentage: 15 },
        { category: 'その他', percentage: 15 }
      ],
      recentTransactions: [
        { date: '2023-09-28', merchant: 'AEON STYLE', amount: 4800, category: 'アパレル' },
        { date: '2023-09-28', merchant: 'スターバックス', amount: 550, category: 'カフェ' },
        { date: '2023-09-21', merchant: 'MUJI 無印良品', amount: 3200, category: '雑貨' },
        { date: '2023-09-14', merchant: 'ユニクロ', amount: 5900, category: 'アパレル' },
        { date: '2023-09-07', merchant: 'サイゼリヤ', amount: 2100, category: 'レストラン' }
      ]
    },
    behaviorPatterns: {
      typicalRoutes: [
        'エントランス → スターバックス → アパレルゾーン → フードコート',
        'エントランス → 無印良品 → ユニクロ → カフェ'
      ],
      preferredAreas: [
        { area: 'アパレルゾーン', visitPercentage: 65 },
        { area: 'フードコート', visitPercentage: 45 },
        { area: 'コスメエリア', visitPercentage: 30 },
        { area: '雑貨エリア', visitPercentage: 25 }
      ],
      typicalVisitTimes: ['平日夕方', '週末午後']
    },
    recommendations: {
      products: [
        { name: '秋物アウターコレクション', reason: '過去の購買パターンに基づく' },
        { name: 'ホームスタイリングフェア', reason: '最近の雑貨購入増加に基づく' }
      ],
      stores: [
        { name: 'ZARA', reason: '類似顧客の利用傾向に基づく' },
        { name: 'Afternoon Tea', reason: 'ライフスタイル嗜好に基づく' }
      ],
      offers: [
        { name: '金曜夕方限定クーポン', reason: '来店傾向に基づく' },
        { name: 'アパレル10%オフ', reason: '高い購入確率に基づく' }
      ]
    }
  },
  {
    id: 'CUST10032175',
    nickname: '佐藤 大輔',
    ltvScore: 78,
    churnRisk: 15,
    loyaltyTier: 'ゴールド',
    firstVisitDate: '2021-11-15',
    lastVisitDate: '2023-09-25',
    visitFrequency: {
      average: '週1.5回',
      trend: 'decreasing',
      weeklyDistribution: [
        { day: '月', value: 5 },
        { day: '火', value: 5 },
        { day: '水', value: 5 },
        { day: '木', value: 10 },
        { day: '金', value: 15 },
        { day: '土', value: 35 },
        { day: '日', value: 25 }
      ]
    },
    dwellTime: {
      average: '45分',
      trend: 'stable',
      history: [
        { date: '2023-09-25', minutes: 42 },
        { date: '2023-09-18', minutes: 48 },
        { date: '2023-09-11', minutes: 45 },
        { date: '2023-09-04', minutes: 43 },
        { date: '2023-08-28', minutes: 47 }
      ]
    },
    cardUsage: {
      averageSpend: '22,500円/月',
      trend: 'stable',
      preferredCategories: [
        { category: '家電', percentage: 35 },
        { category: 'スポーツ用品', percentage: 30 },
        { category: 'グルメ', percentage: 20 },
        { category: 'その他', percentage: 15 }
      ],
      recentTransactions: [
        { date: '2023-09-25', merchant: 'ヤマダ電機', amount: 12800, category: '家電' },
        { date: '2023-09-18', merchant: 'スポーツオーソリティ', amount: 5900, category: 'スポーツ用品' },
        { date: '2023-09-11', merchant: '魚民', amount: 4500, category: 'グルメ' },
        { date: '2023-09-04', merchant: 'ビックカメラ', amount: 8400, category: '家電' },
        { date: '2023-08-28', merchant: 'ミズノ', amount: 6500, category: 'スポーツ用品' }
      ]
    },
    behaviorPatterns: {
      typicalRoutes: [
        'エントランス → 家電エリア → スポーツコーナー → フードコート',
        'エントランス → 書籍 → カフェ → 家電'
      ],
      preferredAreas: [
        { area: '家電エリア', visitPercentage: 70 },
        { area: 'スポーツコーナー', visitPercentage: 50 },
        { area: 'フードコート', visitPercentage: 35 },
        { area: '書籍・文具', visitPercentage: 20 }
      ],
      typicalVisitTimes: ['週末午前', '金曜夕方']
    },
    recommendations: {
      products: [
        { name: '最新オーディオ機器フェア', reason: '過去の購買パターンに基づく' },
        { name: 'アウトドアグッズコレクション', reason: '類似顧客の購入傾向に基づく' }
      ],
      stores: [
        { name: 'Apple Store', reason: 'デジタル製品への関心に基づく' },
        { name: 'アウトドアショップ', reason: 'ライフスタイル嗜好に基づく' }
      ],
      offers: [
        { name: '週末午前限定クーポン', reason: '来店傾向に基づく' },
        { name: '電化製品10%オフ', reason: '高い購入確率に基づく' }
      ]
    }
  },
  {
    id: 'CUST10018734',
    nickname: '鈴木 美咲',
    ltvScore: 65,
    churnRisk: 25,
    loyaltyTier: 'シルバー',
    firstVisitDate: '2023-01-20',
    lastVisitDate: '2023-09-23',
    visitFrequency: {
      average: '月3.5回',
      trend: 'increasing',
      weeklyDistribution: [
        { day: '月', value: 5 },
        { day: '火', value: 5 },
        { day: '水', value: 10 },
        { day: '木', value: 10 },
        { day: '金', value: 15 },
        { day: '土', value: 30 },
        { day: '日', value: 25 }
      ]
    },
    dwellTime: {
      average: '95分',
      trend: 'increasing',
      history: [
        { date: '2023-09-23', minutes: 105 },
        { date: '2023-09-16', minutes: 95 },
        { date: '2023-09-09', minutes: 90 },
        { date: '2023-09-02', minutes: 85 },
        { date: '2023-08-26', minutes: 80 }
      ]
    },
    cardUsage: {
      averageSpend: '12,300円/月',
      trend: 'increasing',
      preferredCategories: [
        { category: 'カフェ・飲食', percentage: 40 },
        { category: 'アパレル', percentage: 35 },
        { category: 'コスメ', percentage: 15 },
        { category: 'その他', percentage: 10 }
      ],
      recentTransactions: [
        { date: '2023-09-23', merchant: 'スターバックス', amount: 850, category: 'カフェ' },
        { date: '2023-09-23', merchant: 'H&M', amount: 5400, category: 'アパレル' },
        { date: '2023-09-16', merchant: 'KALDI', amount: 1800, category: '食品' },
        { date: '2023-09-09', merchant: 'ロフト', amount: 2200, category: '雑貨' },
        { date: '2023-09-02', merchant: 'DHC', amount: 3200, category: 'コスメ' }
      ]
    },
    behaviorPatterns: {
      typicalRoutes: [
        'エントランス → スターバックス → H&M → ロフト → カフェ',
        'エントランス → DHC → アパレルエリア → フードコート'
      ],
      preferredAreas: [
        { area: 'カフェ・レストラン', visitPercentage: 75 },
        { area: 'アパレルエリア', visitPercentage: 65 },
        { area: 'コスメエリア', visitPercentage: 45 },
        { area: '雑貨・インテリア', visitPercentage: 35 }
      ],
      typicalVisitTimes: ['週末全日', '平日夕方']
    },
    recommendations: {
      products: [
        { name: '秋の新作コスメコレクション', reason: '過去の購買パターンに基づく' },
        { name: 'カジュアルファッションフェア', reason: '最近の購入傾向に基づく' }
      ],
      stores: [
        { name: 'ZARA', reason: '類似顧客の利用傾向に基づく' },
        { name: 'カフェ併設ブックストア', reason: '長時間滞在傾向に基づく' }
      ],
      offers: [
        { name: 'インスタ投稿特典', reason: '同世代層のエンゲージメント傾向に基づく' },
        { name: 'カフェドリンク割引', reason: '頻繁な利用に基づく' }
      ]
    }
  }
];

// 個人の時系列イベントデータ
export const customerTimelineData = {
  'CUST10025489': [
    {
      date: '2023-09-28',
      events: [
        { time: '15:32', type: 'entry', detail: 'イオンモール入館（北口）' },
        { time: '15:38', type: 'area', detail: 'スターバックスに立ち寄り' },
        { time: '15:52', type: 'area', detail: 'アパレルゾーンに移動' },
        { time: '16:15', type: 'transaction', detail: 'AEON STYLE で 4,800円の決済' },
        { time: '16:30', type: 'area', detail: '雑貨エリアに移動' },
        { time: '16:55', type: 'area', detail: 'フードコートに移動' },
        { time: '17:25', type: 'exit', detail: 'イオンモール退館（南口）' }
      ]
    },
    {
      date: '2023-09-21',
      events: [
        { time: '17:05', type: 'entry', detail: 'イオンモール入館（東口）' },
        { time: '17:12', type: 'area', detail: '無印良品に立ち寄り' },
        { time: '17:35', type: 'transaction', detail: 'MUJI 無印良品で 3,200円の決済' },
        { time: '17:48', type: 'area', detail: 'コスメエリアに移動' },
        { time: '18:10', type: 'exit', detail: 'イオンモール退館（東口）' }
      ]
    }
  ],
  'CUST10032175': [
    {
      date: '2023-09-25',
      events: [
        { time: '10:15', type: 'entry', detail: 'イオンモール入館（東口）' },
        { time: '10:22', type: 'area', detail: '家電エリアに移動' },
        { time: '10:45', type: 'transaction', detail: 'ヤマダ電機で 12,800円の決済' },
        { time: '11:05', type: 'area', detail: 'スポーツコーナーに移動' },
        { time: '11:35', type: 'area', detail: 'フードコートに移動' },
        { time: '12:00', type: 'exit', detail: 'イオンモール退館（南口）' }
      ]
    },
    {
      date: '2023-09-18',
      events: [
        { time: '16:30', type: 'entry', detail: 'イオンモール入館（南口）' },
        { time: '16:38', type: 'area', detail: 'スポーツコーナーに移動' },
        { time: '17:05', type: 'transaction', detail: 'スポーツオーソリティで 5,900円の決済' },
        { time: '17:20', type: 'area', detail: 'フードコートに移動' },
        { time: '17:45', type: 'exit', detail: 'イオンモール退館（南口）' }
      ]
    }
  ],
  'CUST10018734': [
    {
      date: '2023-09-23',
      events: [
        { time: '13:10', type: 'entry', detail: 'イオンモール入館（西口）' },
        { time: '13:18', type: 'area', detail: 'スターバックスに立ち寄り' },
        { time: '13:30', type: 'transaction', detail: 'スターバックスで 850円の決済' },
        { time: '13:45', type: 'area', detail: 'アパレルエリアに移動' },
        { time: '14:20', type: 'transaction', detail: 'H&Mで 5,400円の決済' },
        { time: '14:35', type: 'area', detail: 'コスメエリアに移動' },
        { time: '15:10', type: 'area', detail: '書店に移動' },
        { time: '15:40', type: 'area', detail: 'カフェエリアに移動' },
        { time: '16:05', type: 'exit', detail: 'イオンモール退館（北口）' }
      ]
    },
    {
      date: '2023-09-16',
      events: [
        { time: '14:25', type: 'entry', detail: 'イオンモール入館（北口）' },
        { time: '14:35', type: 'area', detail: 'カルディに立ち寄り' },
        { time: '14:50', type: 'transaction', detail: 'KALDIで 1,800円の決済' },
        { time: '15:05', type: 'area', detail: 'アパレルエリアに移動' },
        { time: '15:45', type: 'area', detail: 'カフェエリアに移動' },
        { time: '16:10', type: 'exit', detail: 'イオンモール退館（北口）' }
      ]
    }
  ],
  // ワイルドカードキー - すべての未知のIDに対してこのデータを返す
  '*': [
    {
      date: '2023-09-30',
      events: [
        { time: '14:10', type: 'entry', detail: 'イオンモール入館（西口）' },
        { time: '14:15', type: 'area', detail: 'フードコートに移動' },
        { time: '14:30', type: 'transaction', detail: 'レストランで 1,500円の決済' },
        { time: '15:00', type: 'area', detail: 'アパレルゾーンに移動' },
        { time: '15:20', type: 'transaction', detail: 'ユニクロで 3,800円の決済' },
        { time: '15:40', type: 'area', detail: '書籍エリアに移動' },
        { time: '16:05', type: 'exit', detail: 'イオンモール退館（東口）' }
      ]
    },
    {
      date: '2023-09-25',
      events: [
        { time: '10:30', type: 'entry', detail: 'イオンモール入館（北口）' },
        { time: '10:40', type: 'area', detail: 'カフェに立ち寄り' },
        { time: '10:55', type: 'transaction', detail: 'カフェで 650円の決済' },
        { time: '11:15', type: 'area', detail: '家電エリアに移動' },
        { time: '11:45', type: 'area', detail: 'スポーツコーナーに移動' },
        { time: '12:10', type: 'exit', detail: 'イオンモール退館（西口）' }
      ]
    }
  ]
};

// イオンカード決済データ（より詳細なトランザクション履歴）
export const cardTransactionData = {
  'CUST10025489': [
    { date: '2023-09-28', time: '16:15', merchant: 'AEON STYLE', amount: 4800, category: 'アパレル', items: ['カジュアルブラウス', 'スカート'], location: 'イオンモール内', paymentMethod: 'イオンカード' },
    { date: '2023-09-28', time: '15:40', merchant: 'スターバックス', amount: 550, category: 'カフェ', items: ['キャラメルマキアート', 'マフィン'], location: 'イオンモール内', paymentMethod: 'イオンカード' },
    { date: '2023-09-21', time: '17:35', merchant: 'MUJI 無印良品', amount: 3200, category: '雑貨', items: ['収納ケース', 'ルームフレグランス'], location: 'イオンモール内', paymentMethod: 'イオンカード' },
    { date: '2023-09-14', time: '12:30', merchant: 'ユニクロ', amount: 5900, category: 'アパレル', items: ['ヒートテックインナー', 'セーター', 'パンツ'], location: 'イオンモール以外', paymentMethod: 'イオンカード' },
    { date: '2023-09-07', time: '19:15', merchant: 'サイゼリヤ', amount: 2100, category: 'レストラン', items: ['パスタセット', 'サラダ', 'ドリンク'], location: 'イオンモール内', paymentMethod: 'イオンカード' }
  ],
  'CUST10032175': [
    { date: '2023-09-25', time: '10:45', merchant: 'ヤマダ電機', amount: 12800, category: '家電', items: ['ポータブルスピーカー', 'イヤホン'], location: 'イオンモール内', paymentMethod: 'イオンカード' },
    { date: '2023-09-18', time: '17:05', merchant: 'スポーツオーソリティ', amount: 5900, category: 'スポーツ用品', items: ['ランニングシューズ', 'スポーツウェア'], location: 'イオンモール内', paymentMethod: 'イオンカード' },
    { date: '2023-09-11', time: '18:30', merchant: '魚民', amount: 4500, category: 'グルメ', items: ['居酒屋コース料理', '飲み物'], location: 'イオンモール以外', paymentMethod: 'イオンカード' },
    { date: '2023-09-04', time: '15:20', merchant: 'ビックカメラ', amount: 8400, category: '家電', items: ['ワイヤレスヘッドホン', 'SDカード'], location: 'イオンモール以外', paymentMethod: 'イオンカード' },
    { date: '2023-08-28', time: '13:45', merchant: 'ミズノ', amount: 6500, category: 'スポーツ用品', items: ['ゴルフグローブ', 'スポーツバッグ'], location: 'イオンモール内', paymentMethod: 'イオンカード' }
  ],
  'CUST10018734': [
    { date: '2023-09-23', time: '13:30', merchant: 'スターバックス', amount: 850, category: 'カフェ', items: ['フラペチーノ', 'チョコレートケーキ'], location: 'イオンモール内', paymentMethod: 'イオンカード' },
    { date: '2023-09-23', time: '14:20', merchant: 'H&M', amount: 5400, category: 'アパレル', items: ['ワンピース', 'カーディガン', 'アクセサリー'], location: 'イオンモール内', paymentMethod: 'イオンカード' },
    { date: '2023-09-16', time: '14:50', merchant: 'KALDI', amount: 1800, category: '食品', items: ['コーヒー豆', '輸入菓子'], location: 'イオンモール内', paymentMethod: 'イオンカード' },
    { date: '2023-09-09', time: '16:40', merchant: 'ロフト', amount: 2200, category: '雑貨', items: ['文房具', 'キッチン用品'], location: 'イオンモール内', paymentMethod: 'イオンカード' },
    { date: '2023-09-02', time: '15:25', merchant: 'DHC', amount: 3200, category: 'コスメ', items: ['化粧品セット', 'サプリメント'], location: 'イオンモール内', paymentMethod: 'イオンカード' }
  ],
  // ワイルドカードキー - すべての未知のIDに対してこのデータを返す
  '*': [
    { date: '2023-09-30', time: '15:20', merchant: 'ユニクロ', amount: 3800, category: 'アパレル', items: ['カジュアルシャツ', 'ジーンズ'], location: 'イオンモール内', paymentMethod: 'イオンカード' },
    { date: '2023-09-30', time: '14:30', merchant: 'フードコート', amount: 1500, category: 'フード', items: ['ランチセット', 'ドリンク'], location: 'イオンモール内', paymentMethod: 'イオンカード' },
    { date: '2023-09-25', time: '10:55', merchant: 'カフェ', amount: 650, category: 'カフェ', items: ['コーヒー', 'サンドイッチ'], location: 'イオンモール内', paymentMethod: 'イオンカード' },
    { date: '2023-09-15', time: '17:30', merchant: 'AEON STYLE', amount: 5600, category: 'アパレル', items: ['ジャケット', 'アクセサリー'], location: 'イオンモール内', paymentMethod: 'イオンカード' },
    { date: '2023-09-10', time: '14:15', merchant: '書店', amount: 3200, category: '書籍', items: ['雑誌', '参考書'], location: 'イオンモール内', paymentMethod: 'イオンカード' }
  ]
};

// 個人向けおすすめ商品
export const personalRecommendations = {
  'CUST10025489': [
    { type: 'product', name: '秋物アウターコレクション', confidence: 92, reason: '過去の購買パターンと季節トレンドに基づく' },
    { type: 'store', name: 'ZARA', confidence: 85, reason: '類似顧客の行動傾向と購買履歴に基づく' },
    { type: 'event', name: 'ホームスタイリングフェア', confidence: 78, reason: '最近の雑貨購入増加と来店パターンに基づく' },
    { type: 'offer', name: '金曜夕方限定クーポン', confidence: 95, reason: '来店傾向と実際の購買確率に基づく' }
  ],
  'CUST10032175': [
    { type: 'product', name: '最新オーディオ機器フェア', confidence: 88, reason: '過去の購買パターンと興味領域に基づく' },
    { type: 'store', name: 'Apple Store', confidence: 82, reason: 'デジタル製品への関心と類似顧客の行動に基づく' },
    { type: 'event', name: 'アウトドアグッズコレクション', confidence: 75, reason: 'スポーツ用品購入履歴とライフスタイルに基づく' },
    { type: 'offer', name: '週末午前限定クーポン', confidence: 90, reason: '来店時間帯と購買意欲に基づく' }
  ],
  'CUST10018734': [
    { type: 'product', name: '秋の新作コスメコレクション', confidence: 90, reason: '過去の購買パターンと最近のブランド興味に基づく' },
    { type: 'store', name: 'カフェ併設ブックストア', confidence: 80, reason: '長時間滞在傾向と関連購入に基づく' },
    { type: 'event', name: 'カジュアルファッションフェア', confidence: 85, reason: '購入履歴とトレンド親和性に基づく' },
    { type: 'offer', name: 'SNS投稿特典クーポン', confidence: 88, reason: '同世代層のエンゲージメント傾向に基づく' }
  ],
  // ワイルドカードキー
  '*': [
    { type: 'product', name: '秋の新作ファッションコレクション', confidence: 88, reason: '季節トレンドとユーザー属性に基づく' },
    { type: 'store', name: 'ユニクロ', confidence: 82, reason: '人気店舗と購買傾向に基づく' },
    { type: 'event', name: 'ホームライフスタイルフェア', confidence: 75, reason: '類似顧客の関心傾向に基づく' },
    { type: 'offer', name: '週末限定10%オフクーポン', confidence: 90, reason: '来店頻度と購買履歴に基づく' }
  ]
};

// 個人の行動・購買パターン予測データ
export const behaviorPredictions = {
  'CUST10025489': {
    nextVisit: {
      predictedDate: '2023-10-05',
      confidence: 85,
      likelyAreas: ['アパレルエリア', 'コスメエリア', 'フードコート']
    },
    nextPurchase: {
      predictedCategory: 'アウター・ジャケット',
      confidence: 78,
      predictedAmount: '12,000円 - 15,000円',
      likelyStores: ['AEON STYLE', 'ZARA', 'ユニクロ']
    },
    churnPrediction: {
      risk: '低',
      factors: ['安定した来店頻度', '増加傾向の滞在時間', '直近の決済増加']
    }
  },
  'CUST10032175': {
    nextVisit: {
      predictedDate: '2023-10-07',
      confidence: 65,
      likelyAreas: ['家電エリア', 'スポーツコーナー', 'フードコート']
    },
    nextPurchase: {
      predictedCategory: '家電製品',
      confidence: 70,
      predictedAmount: '10,000円 - 18,000円',
      likelyStores: ['ヤマダ電機', 'ビックカメラ']
    },
    churnPrediction: {
      risk: '中',
      factors: ['来店頻度の微減', 'モール外店舗での決済増加', '競合施設での決済記録']
    }
  },
  'CUST10018734': {
    nextVisit: {
      predictedDate: '2023-10-01',
      confidence: 90,
      likelyAreas: ['カフェエリア', 'アパレルエリア', 'コスメエリア']
    },
    nextPurchase: {
      predictedCategory: 'コスメ・美容',
      confidence: 85,
      predictedAmount: '3,000円 - 5,000円',
      likelyStores: ['DHC', 'ロフト', 'PLAZA']
    },
    churnPrediction: {
      risk: '低',
      factors: ['増加傾向の来店頻度', '長い滞在時間', 'SNSでのイオンモール関連投稿']
    }
  },
  // ワイルドカードキー
  '*': {
    nextVisit: {
      predictedDate: '2023-10-10',
      confidence: 75,
      likelyAreas: ['アパレルエリア', 'フードコート', '書籍エリア']
    },
    nextPurchase: {
      predictedCategory: 'カジュアルウェア',
      confidence: 70,
      predictedAmount: '8,000円 - 12,000円',
      likelyStores: ['ユニクロ', 'GU', 'AEON STYLE']
    },
    churnPrediction: {
      risk: '中',
      factors: ['不定期な来店パターン', '競合店舗での購入履歴', '直近の来店頻度の低下']
    }
  }
}; 