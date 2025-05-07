import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFilters } from '../contexts/FilterContext';
import { customerIds, customerProfiles, customerTimelineData, cardTransactionData, personalRecommendations, behaviorPredictions } from '../data/personalAnalysisData';
import { User, CreditCard, Clock, MapPin, Calendar, ShoppingCart, TrendingUp, AlertTriangle } from 'lucide-react';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import PieChart from '../components/charts/PieChart';
import AnalysisPathBreadcrumb from '../components/navigation/AnalysisPathBreadcrumb';
import { fetchCustomerDetail } from '../data/customerDataService';

// 型定義を追加
type CustomerIdKey = keyof typeof customerTimelineData;
type RecommendationsKey = keyof typeof personalRecommendations;
type PredictionsKey = keyof typeof behaviorPredictions;
type TransactionKey = keyof typeof cardTransactionData;

// CSS修正用のカスタムスタイル
const cardStyle = "bg-white p-6 rounded-lg shadow-sm border border-neutral-200";
const titleStyle = "text-lg font-medium text-neutral-800 mb-4";

const PersonalAnalysis: React.FC = () => {
  const { customerId: urlCustomerId } = useParams<{ customerId: string }>();
  const { filters } = useFilters();
  const navigate = useNavigate();
  
  // 選択された顧客ID - URLパラメータから取得するのみ
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(urlCustomerId || customerIds[0]);
  
  // URLパラメータから顧客IDが変更された場合に選択IDを更新
  useEffect(() => {
    if (urlCustomerId) {
      setSelectedCustomerId(urlCustomerId);
    }
  }, [urlCustomerId]);
  
  // 選択された顧客のデータを取得
  const selectedCustomer = useMemo(() => {
    return customerProfiles.find(customer => customer.id === selectedCustomerId) || customerProfiles[0];
  }, [selectedCustomerId]);
  
  // 選択された顧客のタイムラインデータを取得
  const timelineData = useMemo(() => {
    const data = customerTimelineData[selectedCustomerId as CustomerIdKey] || customerTimelineData['*'] || [];
    console.log(`タイムラインデータ取得: ID=${selectedCustomerId}, データあり=${data.length > 0}, ワイルドカード使用=${!customerTimelineData[selectedCustomerId as CustomerIdKey] && data.length > 0}`);
    return data;
  }, [selectedCustomerId]);
  
  // 選択された顧客の決済データを取得
  const transactionData = useMemo(() => {
    const data = cardTransactionData[selectedCustomerId as TransactionKey] || cardTransactionData['*'] || [];
    console.log(`決済データ取得: ID=${selectedCustomerId}, データあり=${data.length > 0}, ワイルドカード使用=${!cardTransactionData[selectedCustomerId as TransactionKey] && data.length > 0}`);
    return data;
  }, [selectedCustomerId]);
  
  // 選択された顧客のレコメンデーションを取得
  const recommendations = useMemo(() => {
    const data = personalRecommendations[selectedCustomerId as RecommendationsKey] || personalRecommendations['*'] || [];
    console.log(`レコメンデーションデータ取得: ID=${selectedCustomerId}, データあり=${data.length > 0}, ワイルドカード使用=${!personalRecommendations[selectedCustomerId as RecommendationsKey] && data.length > 0}`);
    return data;
  }, [selectedCustomerId]);
  
  // 選択された顧客の行動予測を取得
  const predictions = useMemo(() => {
    const data = behaviorPredictions[selectedCustomerId as PredictionsKey] || behaviorPredictions['*'] || null;
    console.log(`予測データ取得: ID=${selectedCustomerId}, データあり=${!!data}, ワイルドカード使用=${!behaviorPredictions[selectedCustomerId as PredictionsKey] && !!data}`);
    return data;
  }, [selectedCustomerId]);
  
  // 滞在時間の履歴データを変換（LineChart用）
  const dwellTimeChartData = useMemo(() => {
    return selectedCustomer.dwellTime.history.map(item => ({
      date: item.date,
      minutes: item.minutes
    })).reverse();
  }, [selectedCustomer]);
  
  // debugging
  console.log('Timeline Data:', timelineData);
  console.log('Recommendations:', recommendations);
  console.log('Predictions:', predictions);
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* パンくずリスト - 各パスアイテムに一意のキーを設定 */}
      <AnalysisPathBreadcrumb 
        path={[
          { label: 'セグメント選択', url: '/customer-segmentation' },
          // 顧客リストのパスを条件によって変更し、一意のURLを使用
          { label: '顧客リスト', url: urlCustomerId ? `/customer-list/${urlCustomerId.split('-')[0]}` : '/customer-segmentation' },
          { label: selectedCustomer.nickname, url: '#' }
        ]}
      />
      
      <h1 className="text-2xl font-bold text-neutral-800">個人詳細分析</h1>
      
      {/* 顧客プロファイル概要 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左側: 基本プロファイル */}
        <div className={cardStyle}>
          <h2 className={titleStyle}>基本プロファイル</h2>
          
          <div className="flex items-center mb-5">
            <div className="p-3 bg-primary-100 rounded-full">
              <User className="text-primary-600" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-neutral-800">{selectedCustomer.nickname}</h3>
              <p className="text-sm text-neutral-500">会員ランク: {selectedCustomer.loyaltyTier}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <TrendingUp size={16} className="text-neutral-500 mr-2" />
                <span className="text-sm text-neutral-600">顧客生涯価値スコア</span>
              </div>
              <div className="text-right">
                <span className={`text-lg font-medium ${
                  selectedCustomer.ltvScore > 80 ? 'text-emerald-600' : 
                  selectedCustomer.ltvScore > 60 ? 'text-amber-600' : 'text-neutral-600'
                }`}>{selectedCustomer.ltvScore}</span>
                <span className="text-xs text-neutral-500 ml-1">/100</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <AlertTriangle size={16} className="text-neutral-500 mr-2" />
                <span className="text-sm text-neutral-600">解約リスク</span>
              </div>
              <div className="text-right">
                <span className={`text-lg font-medium ${
                  selectedCustomer.churnRisk < 10 ? 'text-emerald-600' : 
                  selectedCustomer.churnRisk < 20 ? 'text-amber-600' : 'text-red-600'
                }`}>{selectedCustomer.churnRisk}%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Calendar size={16} className="text-neutral-500 mr-2" />
                <span className="text-sm text-neutral-600">初回来店日</span>
              </div>
              <span className="text-sm text-neutral-700">{selectedCustomer.firstVisitDate}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Calendar size={16} className="text-neutral-500 mr-2" />
                <span className="text-sm text-neutral-600">最終来店日</span>
              </div>
              <span className="text-sm text-neutral-700">{selectedCustomer.lastVisitDate}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Clock size={16} className="text-neutral-500 mr-2" />
                <span className="text-sm text-neutral-600">平均来店頻度</span>
              </div>
              <span className="text-sm text-neutral-700">{selectedCustomer.visitFrequency.average}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Clock size={16} className="text-neutral-500 mr-2" />
                <span className="text-sm text-neutral-600">平均滞在時間</span>
              </div>
              <span className="text-sm text-neutral-700">{selectedCustomer.dwellTime.average}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <CreditCard size={16} className="text-neutral-500 mr-2" />
                <span className="text-sm text-neutral-600">平均月間支出</span>
              </div>
              <span className="text-sm text-neutral-700">{selectedCustomer.cardUsage.averageSpend}</span>
            </div>
          </div>
        </div>
        
        {/* 中央: 行動パターン */}
        <div className={cardStyle}>
          <h2 className={titleStyle}>行動パターン分析</h2>
          
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-medium text-neutral-700 mb-2">来店曜日傾向</h3>
              <BarChart 
                data={selectedCustomer.visitFrequency.weeklyDistribution}
                dataKey="value"
                nameKey="day"
                color="#0066CC"
                height={150}
                formatter={(value) => `${value}%`}
              />
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-neutral-700 mb-2">よく訪れるエリア</h3>
              <div className="space-y-2">
                {selectedCustomer.behaviorPatterns.preferredAreas.map((area, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-24 text-sm text-neutral-600">{area.area}</div>
                    <div className="flex-grow">
                      <div className="h-4 bg-neutral-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary-500 rounded-full" 
                          style={{ width: `${area.visitPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-10 text-right text-sm text-neutral-700">{area.visitPercentage}%</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-neutral-700 mb-2">典型的な来店時間帯</h3>
              <div className="flex flex-wrap gap-2">
                {selectedCustomer.behaviorPatterns.typicalVisitTimes.map((time, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-md"
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-neutral-700 mb-2">典型的な移動経路</h3>
              <div className="space-y-2">
                {selectedCustomer.behaviorPatterns.typicalRoutes.map((route, index) => (
                  <div key={index} className="relative">
                    <div className="bg-neutral-50 p-2 rounded-md text-xs text-neutral-600">
                      {route}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* 右側: 購買パターン */}
        <div className={cardStyle}>
          <h2 className={titleStyle}>購買パターン分析</h2>
          
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-medium text-neutral-700 mb-2">購入カテゴリー分布</h3>
              <div className="h-[150px] flex justify-center">
                <PieChart 
                  data={selectedCustomer.cardUsage.preferredCategories.map(cat => ({
                    name: cat.category,
                    value: cat.percentage,
                    color: cat.category === 'アパレル' ? '#0066CC' : 
                           cat.category === 'レストラン' || cat.category === 'グルメ' || cat.category === 'カフェ・飲食' ? '#00BF80' : 
                           cat.category === '雑貨' ? '#F59E0B' : 
                           cat.category === '家電' ? '#8B5CF6' : 
                           cat.category === 'スポーツ用品' ? '#EC4899' : 
                           cat.category === 'コスメ' ? '#F43F5E' : '#94A3B8'
                  }))}
                  innerRadius={40}
                  outerRadius={70}
                  height={150}
                  formatter={(value) => `${value}%`}
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-neutral-700 mb-2">最近の購入履歴</h3>
              <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
                {selectedCustomer.cardUsage.recentTransactions.map((transaction, index) => (
                  <div key={index} className="border-b border-neutral-100 pb-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500">{transaction.date}</span>
                      <span className="font-medium text-neutral-700">{transaction.amount.toLocaleString()}円</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm text-neutral-700">{transaction.merchant}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                        {transaction.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-neutral-700 mb-2">消費トレンド</h3>
              <div className="flex items-center text-sm">
                <TrendingUp size={16} className={`mr-2 ${
                  selectedCustomer.cardUsage.trend === 'increasing' ? 'text-emerald-500' : 
                  selectedCustomer.cardUsage.trend === 'decreasing' ? 'text-red-500' : 'text-amber-500'
                }`} />
                <span className="text-neutral-600">
                  {selectedCustomer.cardUsage.trend === 'increasing' ? '増加傾向' : 
                   selectedCustomer.cardUsage.trend === 'decreasing' ? '減少傾向' : '安定傾向'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 詳細データセクション */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左側: 顧客行動タイムライン */}
        <div className={`${cardStyle} max-h-[600px] overflow-auto`}>
          <h2 className={titleStyle}>行動タイムライン</h2>
          <p className="text-sm text-neutral-500 mb-4">来店・移動・購買の時系列データ</p>
          
          {timelineData && timelineData.length > 0 ? (
            <div className="max-h-[500px] overflow-y-auto pr-2">
              {timelineData.map((dayData, dayIndex) => (
                <div key={dayIndex} className="mb-8">
                  <div className="flex items-center mb-3">
                    <Calendar size={18} className="text-primary-500 mr-2" />
                    <h3 className="text-base font-medium text-neutral-800">{dayData.date}</h3>
                  </div>
                  
                  <div className="ml-2 pl-6 border-l-2 border-primary-100 space-y-4">
                    {dayData.events.map((event, eventIndex) => (
                      <div key={eventIndex} className="relative">
                        <div className="absolute -left-[25px] top-0 w-4 h-4 rounded-full border-2 border-white bg-primary-100"></div>
                        <div className="flex items-start">
                          <div className="w-12 text-xs text-neutral-500 pt-0.5">{event.time}</div>
                          <div className="flex-grow">
                            <div className={`px-3 py-2 rounded-md ${
                              event.type === 'entry' ? 'bg-blue-50 text-blue-700' :
                              event.type === 'exit' ? 'bg-neutral-50 text-neutral-700' :
                              event.type === 'transaction' ? 'bg-green-50 text-green-700' :
                              'bg-neutral-50 text-neutral-700'
                            }`}>
                              <p className="text-sm">{event.detail}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-neutral-500">タイムラインデータがありません</p>
          )}
        </div>
        
        {/* 右側: 滞在時間・予測・レコメンデーション */}
        <div className="space-y-6">
          {/* 滞在時間トレンド */}
          <div className={cardStyle}>
            <h2 className={titleStyle}>滞在時間トレンド</h2>
            <LineChart 
              data={dwellTimeChartData}
              lines={[{ dataKey: 'minutes', color: '#0066CC', name: '滞在時間' }]}
              xAxisDataKey="date"
              height={200}
              formatter={(value) => `${value}分`}
              yAxisUnit="分"
            />
          </div>
          
          {/* 将来予測 */}
          <div className={`${cardStyle} max-h-[600px] overflow-auto`}>
            <h2 className={titleStyle}>行動予測</h2>
            <p className="text-sm text-neutral-500 mb-4">過去のパターンに基づく来店・購買予測</p>
            
            {predictions ? (
              <div className="space-y-4">
                <div className="bg-neutral-50 p-3 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Calendar size={18} className="text-primary-500 mr-2" />
                    <h3 className="text-sm font-medium text-neutral-800">次回来店予測</h3>
                  </div>
                  <div className="ml-7">
                    <p className="text-sm text-neutral-700">予測日: <span className="font-medium">{predictions.nextVisit.predictedDate}</span></p>
                    <p className="text-xs text-neutral-500 mt-1">信頼度: {predictions.nextVisit.confidence}%</p>
                    <div className="mt-2">
                      <p className="text-xs text-neutral-500">予想訪問エリア:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {predictions.nextVisit.likelyAreas.map((area, index) => (
                          <span key={index} className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-neutral-50 p-3 rounded-lg">
                  <div className="flex items-center mb-2">
                    <ShoppingCart size={18} className="text-emerald-500 mr-2" />
                    <h3 className="text-sm font-medium text-neutral-800">次回購入予測</h3>
                  </div>
                  <div className="ml-7">
                    <p className="text-sm text-neutral-700">予測カテゴリー: <span className="font-medium">{predictions.nextPurchase.predictedCategory}</span></p>
                    <p className="text-xs text-neutral-500 mt-1">予測金額: {predictions.nextPurchase.predictedAmount}</p>
                    <p className="text-xs text-neutral-500 mt-1">信頼度: {predictions.nextPurchase.confidence}%</p>
                    <div className="mt-2">
                      <p className="text-xs text-neutral-500">予想店舗:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {predictions.nextPurchase.likelyStores.map((store, index) => (
                          <span key={index} className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full">
                            {store}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-neutral-50 p-3 rounded-lg">
                  <div className="flex items-center mb-2">
                    <AlertTriangle size={18} className={`mr-2 ${
                      predictions.churnPrediction.risk === '低' ? 'text-emerald-500' :
                      predictions.churnPrediction.risk === '中' ? 'text-amber-500' : 'text-red-500'
                    }`} />
                    <h3 className="text-sm font-medium text-neutral-800">解約リスク予測</h3>
                  </div>
                  <div className="ml-7">
                    <p className={`text-sm font-medium ${
                      predictions.churnPrediction.risk === '低' ? 'text-emerald-600' :
                      predictions.churnPrediction.risk === '中' ? 'text-amber-600' : 'text-red-600'
                    }`}>
                      リスク: {predictions.churnPrediction.risk}
                    </p>
                    <div className="mt-2">
                      <p className="text-xs text-neutral-500">主要因:</p>
                      <ul className="list-disc list-inside text-xs text-neutral-600 mt-1">
                        {predictions.churnPrediction.factors.map((factor, index) => (
                          <li key={index}>{factor}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-neutral-500">予測データがありません</p>
            )}
          </div>
        </div>
      </div>
      
      {/* パーソナライズド・レコメンデーション */}
      <div className={`${cardStyle} max-h-[600px] overflow-auto`}>
        <h2 className={titleStyle}>パーソナライズド・レコメンデーション</h2>
        <p className="text-sm text-neutral-500 mb-4">この顧客に最適化されたおすすめ情報</p>
        
        {recommendations && recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="border border-neutral-200 rounded-lg p-4 hover:border-primary-300 hover:bg-primary-50 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    rec.type === 'product' ? 'bg-blue-100 text-blue-700' :
                    rec.type === 'store' ? 'bg-emerald-100 text-emerald-700' :
                    rec.type === 'event' ? 'bg-amber-100 text-amber-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {rec.type === 'product' ? '商品' :
                     rec.type === 'store' ? '店舗' :
                     rec.type === 'event' ? 'イベント' : 'オファー'}
                  </span>
                  <span className="text-xs font-medium text-primary-600">{rec.confidence}%</span>
                </div>
                <h3 className="text-sm font-medium text-neutral-800 mb-2">{rec.name}</h3>
                <p className="text-xs text-neutral-500">{rec.reason}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neutral-500">レコメンデーションデータがありません</p>
        )}
      </div>
      
      {/* プライバシー・データ利用の注意事項 */}
      <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-100 text-sm">
        <h3 className="font-medium text-neutral-800 mb-2">個人顧客データの取り扱いについて</h3>
        <ul className="list-disc list-inside space-y-1 text-neutral-700">
          <li>表示されている顧客データは、明示的な同意を得た上で収集・分析されています</li>
          <li>データは仮名化処理され、分析目的以外での利用は制限されています</li>
          <li>予測値やレコメンデーションは統計的モデルに基づくもので、100%の精度を保証するものではありません</li>
          <li>個人データへのアクセスは記録され、定期的な監査の対象となります</li>
          <li>顧客はいつでもデータ利用の同意を撤回し、削除を要求する権利を有します</li>
        </ul>
      </div>
    </div>
  );
};

export default PersonalAnalysis; 