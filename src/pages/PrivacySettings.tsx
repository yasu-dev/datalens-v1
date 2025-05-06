import React, { useState } from 'react';
import { ShieldCheck, AlertCircle, ToggleLeft, ToggleRight, Check, RefreshCw, MapPin, Clock, Smartphone, Users } from 'lucide-react';

// プライバシー設定のタイプ定義
interface PrivacySettings {
  locationTracking: boolean;
  homeAreaDetection: boolean;
  deviceInfo: boolean;
  demographicAnalysis: boolean;
  dataRetention: '30days' | '90days' | '180days' | '365days';
  anonymizationLevel: 'high' | 'medium' | 'low';
}

const PrivacySettings: React.FC = () => {
  // 初期設定値
  const [settings, setSettings] = useState<PrivacySettings>({
    locationTracking: true,
    homeAreaDetection: false,
    deviceInfo: true,
    demographicAnalysis: false,
    dataRetention: '90days',
    anonymizationLevel: 'high'
  });
  
  // 設定変更ハンドラ
  const handleToggle = (setting: keyof PrivacySettings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };
  
  // データ保持期間の変更ハンドラ
  const handleRetentionChange = (value: PrivacySettings['dataRetention']) => {
    setSettings(prev => ({
      ...prev,
      dataRetention: value
    }));
  };
  
  // 匿名化レベルの変更ハンドラ
  const handleAnonymizationChange = (value: PrivacySettings['anonymizationLevel']) => {
    setSettings(prev => ({
      ...prev,
      anonymizationLevel: value
    }));
  };
  
  // 設定保存ハンドラ
  const handleSave = () => {
    alert('設定が保存されました。実際の実装では、ここでAPIを呼び出して設定を保存します。');
  };
  
  // 収集データの説明
  const dataItems = [
    {
      id: 'locationTracking',
      title: '位置情報データ',
      description: 'モール内外での位置情報データを匿名化して収集します。トラフィックの分析や人流の把握に利用します。',
      icon: <MapPin className="text-primary-500" />,
      enabled: settings.locationTracking
    },
    {
      id: 'homeAreaDetection',
      title: '滞在エリア推定',
      description: '夜間の滞在場所から大まかな居住エリアを統計的に推定します。個人宅の特定は行いません。',
      icon: <MapPin className="text-warning-500" />,
      enabled: settings.homeAreaDetection
    },
    {
      id: 'deviceInfo',
      title: 'デバイス情報',
      description: 'ご利用のデバイスタイプ（iOS/Android）やモデル情報を収集します。利用状況の分析に用います。',
      icon: <Smartphone className="text-accent-500" />,
      enabled: settings.deviceInfo
    },
    {
      id: 'demographicAnalysis',
      title: '属性情報推定',
      description: '行動パターンから大まかな年代・性別などの属性を統計的に推定します。個人特定は行いません。',
      icon: <Users className="text-secondary-500" />,
      enabled: settings.demographicAnalysis
    }
  ];
  
  // 匿名化レベルの説明
  const anonymizationLevels = {
    high: {
      title: '高 (推奨)',
      description: '位置情報は大きなエリア単位で集計。最小5ユーザー以上の集計単位。個人の行動パターン特定は不可能。',
    },
    medium: {
      title: '中',
      description: 'ゾーン単位での集計。滞在時間や移動パターンをより詳細に分析。ただし最小3ユーザー以上の集計単位。',
    },
    low: {
      title: '低',
      description: '詳細な位置情報を収集し、より精度の高い分析に利用。ただし個人を特定する処理は行いません。',
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-neutral-800">プライバシー設定</h1>
      
      {/* 注意事項 */}
      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex items-start">
        <div className="text-amber-500 mr-3 mt-0.5">
          <AlertCircle size={24} />
        </div>
        <div>
          <h2 className="font-medium text-amber-800">データ収集についての重要なお知らせ</h2>
          <p className="text-sm text-amber-700 mt-1">
            本設定画面では、eSIMを通じた位置情報データの収集と利用に関する設定を行えます。
            データはすべて統計的に処理され、個人を特定する形での利用は行いません。
            設定変更はいつでも可能です。
          </p>
        </div>
      </div>
      
      {/* 収集データ設定 */}
      <div className="dashboard-card">
        <div className="mb-4">
          <h2 className="card-title flex items-center">
            <ShieldCheck className="mr-2 text-primary-500" size={20} />
            データ収集設定
          </h2>
          <p className="text-sm text-neutral-500">
            収集を許可するデータの種類を選択できます。設定はいつでも変更可能です。
          </p>
        </div>
        
        <div className="space-y-4">
          {dataItems.map(item => (
            <div key={item.id} className="flex items-start justify-between p-3 border-b border-neutral-100">
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-neutral-100 mr-3">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-medium text-neutral-800">{item.title}</h3>
                  <p className="text-sm text-neutral-600 mt-1">{item.description}</p>
                </div>
              </div>
              <button 
                className="p-1 focus:outline-none"
                onClick={() => handleToggle(item.id as keyof PrivacySettings)}
              >
                {item.enabled ? (
                  <ToggleRight size={32} className="text-primary-500" />
                ) : (
                  <ToggleLeft size={32} className="text-neutral-400" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* データ保持期間 */}
      <div className="dashboard-card">
        <div className="mb-4">
          <h2 className="card-title flex items-center">
            <Clock className="mr-2 text-primary-500" size={20} />
            データ保持期間
          </h2>
          <p className="text-sm text-neutral-500">
            収集したデータを保持する期間を選択できます。期間を過ぎたデータは自動的に削除されます。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {(['30days', '90days', '180days', '365days'] as const).map(period => (
            <button
              key={period}
              className={`p-3 rounded-md border ${
                settings.dataRetention === period 
                  ? 'bg-primary-50 border-primary-200 text-primary-700' 
                  : 'border-neutral-200 hover:bg-neutral-50'
              }`}
              onClick={() => handleRetentionChange(period)}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">
                  {period === '30days' ? '30日間' : 
                   period === '90days' ? '90日間' : 
                   period === '180days' ? '180日間' : '365日間'}
                </span>
                {settings.dataRetention === period && (
                  <Check size={16} className="text-primary-500" />
                )}
              </div>
              <p className="text-xs text-left">
                {period === '30days' ? '最小限の保持期間' : 
                 period === '90days' ? '標準の保持期間' : 
                 period === '180days' ? '長期の分析に最適' : '年間傾向の分析に最適'}
              </p>
            </button>
          ))}
        </div>
      </div>
      
      {/* 匿名化レベル */}
      <div className="dashboard-card">
        <div className="mb-4">
          <h2 className="card-title flex items-center">
            <RefreshCw className="mr-2 text-primary-500" size={20} />
            匿名化レベル
          </h2>
          <p className="text-sm text-neutral-500">
            データがどの程度詳細に収集・分析されるかを設定できます。高いレベルほどプライバシー保護が強化されます。
          </p>
        </div>
        
        <div className="space-y-3">
          {(Object.entries(anonymizationLevels) as [PrivacySettings['anonymizationLevel'], typeof anonymizationLevels.high][]).map(([level, info]) => (
            <div 
              key={level}
              className={`p-3 rounded-md border flex items-start ${
                settings.anonymizationLevel === level 
                  ? 'bg-primary-50 border-primary-200' 
                  : 'border-neutral-200 hover:bg-neutral-50'
              }`}
              onClick={() => handleAnonymizationChange(level)}
            >
              <div className={`w-6 h-6 rounded-full flex-shrink-0 mr-3 flex items-center justify-center ${
                settings.anonymizationLevel === level 
                  ? 'bg-primary-500 text-white' 
                  : 'border border-neutral-300'
              }`}>
                {settings.anonymizationLevel === level && <Check size={14} />}
              </div>
              <div>
                <h3 className="font-medium text-neutral-800">{info.title}</h3>
                <p className="text-sm text-neutral-600 mt-1">{info.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 保存ボタン */}
      <div className="flex justify-end space-x-3">
        <button 
          className="px-6 py-2 bg-neutral-100 rounded-md text-neutral-700 hover:bg-neutral-200"
        >
          キャンセル
        </button>
        <button 
          className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
          onClick={handleSave}
        >
          設定を保存
        </button>
      </div>
      
      {/* プライバシーポリシーリンク */}
      <div className="text-center text-sm text-neutral-500 pt-4 border-t border-neutral-200">
        <p>
          詳細な個人情報の取り扱いについては、
          <a href="#" className="text-primary-500 hover:underline">プライバシーポリシー</a>
          をご覧ください。
        </p>
      </div>
    </div>
  );
};

export default PrivacySettings; 