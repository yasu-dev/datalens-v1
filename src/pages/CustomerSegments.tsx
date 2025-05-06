import React, { useMemo } from 'react';
import PieChart from '../components/charts/PieChart';
import BarChart from '../components/charts/BarChart';
import { useFilters } from '../contexts/FilterContext';
import { getFilteredCustomerSegmentsData } from '../data/filteredMockData';
import { Map, UserCheck, Store, Clock, ShoppingBag } from 'lucide-react';

const CustomerSegments: React.FC = () => {
  const { filters } = useFilters();
  
  // フィルター適用済みのセグメントデータを取得
  const customerSegmentsData = useMemo(() => getFilteredCustomerSegmentsData(filters), [filters]);
  
  // セグメント詳細データ（サンプル）
  const segmentsDetails = [
    {
      id: 'loyal_shoppers',
      name: 'ロイヤル顧客',
      percent: 28,
      description: '月に複数回来店し、長時間滞在する顧客層',
      characteristics: [
        { name: '平均来店頻度', value: '月4.2回' },
        { name: '平均滞在時間', value: '92分' },
        { name: '平均移動範囲', value: '6.3エリア' },
        { name: '主要年代層', value: '30-40代' }
      ],
      behaviorDetails: {
        visitTimes: [
          { name: '平日昼', value: 30 },
          { name: '平日夕方', value: 45 },
          { name: '週末', value: 85 }
        ],
        visitAreas: [
          { name: 'フードコート', value: 85 },
          { name: 'アパレル', value: 70 },
          { name: 'エンタメ', value: 55 },
          { name: '雑貨', value: 40 }
        ]
      },
      locationData: {
        homeArea: {
          name: '自宅エリア',
          distribution: [
            { name: '3km圏内', value: 45 },
            { name: '5km圏内', value: 30 },
            { name: '10km圏内', value: 15 },
            { name: '10km以上', value: 10 }
          ]
        }
      }
    },
    {
      id: 'weekend_families',
      name: '週末ファミリー',
      percent: 32,
      description: '週末を中心に家族で来店し、多様なエリアを回遊する顧客層',
      characteristics: [
        { name: '平均来店頻度', value: '月2.3回' },
        { name: '平均滞在時間', value: '120分' },
        { name: '平均移動範囲', value: '7.5エリア' },
        { name: '主要年代層', value: '30-40代' }
      ],
      behaviorDetails: {
        visitTimes: [
          { name: '平日昼', value: 15 },
          { name: '平日夕方', value: 25 },
          { name: '週末', value: 95 }
        ],
        visitAreas: [
          { name: 'フードコート', value: 90 },
          { name: 'キッズ', value: 85 },
          { name: 'エンタメ', value: 70 },
          { name: 'アパレル', value: 50 }
        ]
      },
      locationData: {
        homeArea: {
          name: '自宅エリア',
          distribution: [
            { name: '3km圏内', value: 25 },
            { name: '5km圏内', value: 35 },
            { name: '10km圏内', value: 30 },
            { name: '10km以上', value: 10 }
          ]
        }
      }
    },
    {
      id: 'quick_shoppers',
      name: '短時間買い物客',
      percent: 25,
      description: '特定の目的で来店し、短時間で買い物を済ませる顧客層',
      characteristics: [
        { name: '平均来店頻度', value: '月3.1回' },
        { name: '平均滞在時間', value: '32分' },
        { name: '平均移動範囲', value: '2.1エリア' },
        { name: '主要年代層', value: '20-50代' }
      ],
      behaviorDetails: {
        visitTimes: [
          { name: '平日昼', value: 40 },
          { name: '平日夕方', value: 65 },
          { name: '週末', value: 35 }
        ],
        visitAreas: [
          { name: 'スーパー', value: 80 },
          { name: '雑貨', value: 45 },
          { name: 'アパレル', value: 30 },
          { name: 'フードコート', value: 25 }
        ]
      },
      locationData: {
        homeArea: {
          name: '自宅エリア',
          distribution: [
            { name: '3km圏内', value: 65 },
            { name: '5km圏内', value: 25 },
            { name: '10km圏内', value: 8 },
            { name: '10km以上', value: 2 }
          ]
        }
      }
    },
    {
      id: 'occasional_visitors',
      name: '不定期訪問者',
      percent: 15,
      description: '不定期に来店し、複数店舗を訪問するが頻度は低い顧客層',
      characteristics: [
        { name: '平均来店頻度', value: '月0.8回' },
        { name: '平均滞在時間', value: '85分' },
        { name: '平均移動範囲', value: '5.2エリア' },
        { name: '主要年代層', value: '20-30代' }
      ],
      behaviorDetails: {
        visitTimes: [
          { name: '平日昼', value: 20 },
          { name: '平日夕方', value: 30 },
          { name: '週末', value: 65 }
        ],
        visitAreas: [
          { name: 'アパレル', value: 75 },
          { name: 'エンタメ', value: 60 },
          { name: 'フードコート', value: 65 },
          { name: '雑貨', value: 55 }
        ]
      },
      locationData: {
        homeArea: {
          name: '自宅エリア',
          distribution: [
            { name: '3km圏内', value: 10 },
            { name: '5km圏内', value: 15 },
            { name: '10km圏内', value: 30 },
            { name: '10km以上', value: 45 }
          ]
        }
      }
    }
  ];
  
  // 選択されたセグメント
  const [selectedSegment, setSelectedSegment] = React.useState(segmentsDetails[0]);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-neutral-800">顧客セグメント分析</h1>
      
      {/* 位置情報プライバシー通知 */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex items-start">
        <div className="text-blue-500 mr-3 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="text-sm text-blue-700">
          <p className="font-medium">顧客セグメントはeSIM位置情報データに基づいています</p>
          <p>訪問頻度、滞在時間、移動パターンなどから生成されたセグメントです。個人を特定せず統計的に処理しています。</p>
        </div>
      </div>
      
      {/* セグメント概要と選択UI */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* 左側: セグメント円グラフ */}
        <div className="dashboard-card lg:col-span-2">
          <div className="mb-2">
            <h2 className="card-title">セグメント構成比</h2>
            <p className="text-sm text-neutral-500">セグメントをクリックして詳細を表示</p>
          </div>
          <div className="flex justify-center">
            <PieChart 
              data={customerSegmentsData}
              innerRadius={60}
              outerRadius={110}
              height={280}
              formatter={(value) => `${value}%`}
              onSliceClick={(entry) => {
                const segment = segmentsDetails.find(s => s.name === entry.name);
                if (segment) setSelectedSegment(segment);
              }}
            />
          </div>
        </div>
        
        {/* 右側: 選択したセグメントの概要 */}
        <div className="dashboard-card lg:col-span-3">
          <div className="mb-2 flex justify-between">
            <h2 className="card-title">{selectedSegment.name}</h2>
            <span className="text-lg font-bold text-primary-600">{selectedSegment.percent}%</span>
          </div>
          <p className="text-neutral-600 mb-4">{selectedSegment.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {selectedSegment.characteristics.map((char, index) => (
              <div key={index} className="bg-neutral-50 p-3 rounded-lg">
                <p className="text-xs text-neutral-500">{char.name}</p>
                <p className="text-lg font-medium text-neutral-800">{char.value}</p>
              </div>
            ))}
          </div>
          
          <div className="border-t border-neutral-200 pt-4 mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-full bg-primary-50">
                <UserCheck className="text-primary-500" size={20} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-neutral-800">行動特性</h3>
                <p className="text-xs text-neutral-500">来店頻度・時間帯・ルートに基づく特性</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-full bg-emerald-50">
                <Map className="text-emerald-500" size={20} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-neutral-800">エリア情報</h3>
                <p className="text-xs text-neutral-500">居住エリア（推定）・通勤経路情報</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 選択セグメントの詳細データ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 来店時間帯分布 */}
        <div className="dashboard-card">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="card-title">来店時間帯分布</h2>
            <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded">時間帯傾向</span>
          </div>
          <BarChart 
            data={selectedSegment.behaviorDetails.visitTimes}
            dataKey="value"
            nameKey="name"
            color="#0066CC"
            height={200}
            formatter={(value) => `${value}%`}
          />
        </div>
        
        {/* 訪問エリア */}
        <div className="dashboard-card">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="card-title">訪問エリア傾向</h2>
            <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded">エリア傾向</span>
          </div>
          <BarChart 
            data={selectedSegment.behaviorDetails.visitAreas}
            dataKey="value"
            nameKey="name"
            color="#00BF80"
            height={200}
            formatter={(value) => `${value}%`}
          />
        </div>
      </div>
      
      {/* 自宅エリア分布とエリア間移動 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 自宅エリア分布 */}
        <div className="dashboard-card">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="card-title">居住エリア分布</h2>
            <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded">推定エリア</span>
          </div>
          <PieChart 
            data={selectedSegment.locationData.homeArea.distribution.map(item => ({
              name: item.name,
              value: item.value,
              color: item.name === '3km圏内' ? '#0066CC' : 
                     item.name === '5km圏内' ? '#42A5F5' : 
                     item.name === '10km圏内' ? '#90CAF9' : '#BBDEFB'
            }))}
            innerRadius={50}
            outerRadius={100}
            height={220}
            formatter={(value) => `${value}%`}
          />
          <p className="text-xs text-neutral-500 mt-3 text-center">※ 夜間滞在傾向からの統計的推定（個人特定不可）</p>
        </div>
        
        {/* セグメント特性の詳細説明 */}
        <div className="dashboard-card">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="card-title">セグメント行動分析</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-full bg-primary-50 mt-1">
                <Clock className="text-primary-500" size={18} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-neutral-800">滞在パターン</h3>
                <p className="text-sm text-neutral-600">
                  {selectedSegment.id === 'loyal_shoppers' && '複数エリアを長時間かけて回遊する傾向。フードコートでの滞在が長く、複数店舗を訪問。'}
                  {selectedSegment.id === 'weekend_families' && '週末は家族で長時間滞在し、キッズエリアとフードコートを中心に回遊。エンターテイメントエリアにも頻繁に訪問。'}
                  {selectedSegment.id === 'quick_shoppers' && '短時間で目的の買い物を済ませる傾向。特定エリアのみを訪問し、フードコートの利用率は低い。'}
                  {selectedSegment.id === 'occasional_visitors' && '不定期ながら来店時は複数エリアを訪問。アパレルとエンターテイメント領域に強い関心を示す。'}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-full bg-emerald-50 mt-1">
                <Store className="text-emerald-500" size={18} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-neutral-800">店舗訪問</h3>
                <p className="text-sm text-neutral-600">
                  {selectedSegment.id === 'loyal_shoppers' && '訪問店舗数が多く、リピート率も高い。新規店舗への訪問意欲も高く、モール全体を幅広く利用。'}
                  {selectedSegment.id === 'weekend_families' && '子供向け店舗を中心に、家族で楽しめる店舗を多く訪問。休日の昼食時にはフードコートを必ず利用。'}
                  {selectedSegment.id === 'quick_shoppers' && '特定の目的店舗のみを訪問する傾向が強く、同じ店舗への再訪率が高い。新規店舗への訪問率は低い。'}
                  {selectedSegment.id === 'occasional_visitors' && 'トレンド性の高い店舗やシーズン商品を扱う店舗への訪問が目立つ。特定テーマの店舗を集中的に訪問。'}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-full bg-amber-50 mt-1">
                <ShoppingBag className="text-amber-500" size={18} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-neutral-800">購買モデル<span className="text-xs text-neutral-500 ml-1">（推定）</span></h3>
                <p className="text-sm text-neutral-600">
                  {selectedSegment.id === 'loyal_shoppers' && '計画的な買い物と衝動買いの両方の傾向あり。滞在時間の長さから複数カテゴリーでの購入確率が高い。'}
                  {selectedSegment.id === 'weekend_families' && '家族での買い物は計画性が高く、子供関連商品の購入率が高い。同時に、フードやエンターテイメントへの支出も多い。'}
                  {selectedSegment.id === 'quick_shoppers' && '目的が明確で効率的な買い物志向。日用品や食料品など、計画的な購入が中心で衝動買いは少ない。'}
                  {selectedSegment.id === 'occasional_visitors' && 'トレンド商品やシーズン商品への関心が高く、アパレルやエンターテイメント分野での支出が中心。'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* プライバシーとデータ活用の補足説明 */}
      <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-100 text-sm">
        <h3 className="font-medium text-neutral-800 mb-2">セグメントデータの収集・活用について</h3>
        <ul className="list-disc list-inside space-y-1 text-neutral-700">
          <li>セグメント分析は匿名化・統計処理されたデータに基づいており、個人を特定する情報は含まれていません</li>
          <li>位置情報データは大まかなエリア単位で集計されており、詳細な店舗単位の特定は技術的制約から限定的です</li>
          <li>自宅エリア推定は統計的手法により、地域レベルでの分布として表示しています</li>
          <li>データの取得・分析はユーザーからの明示的な同意に基づいて実施しています</li>
        </ul>
      </div>
    </div>
  );
};

export default CustomerSegments;