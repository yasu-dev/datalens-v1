import React, { useState } from 'react';
import { FilterCriteria } from '../../data/customerDataService';
import { ChevronDown, ChevronUp, Filter, Save, RotateCcw } from 'lucide-react';

interface SegmentFilterPanelProps {
  filters: FilterCriteria;
  onChange: (filters: FilterCriteria) => void;
}

const SegmentFilterPanel: React.FC<SegmentFilterPanelProps> = ({ filters, onChange }) => {
  const [expanded, setExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterCriteria>(filters);
  
  // フィルター変更ハンドラー
  const handleFilterChange = (key: keyof FilterCriteria, value: any) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // 適用ボタンハンドラー
  const handleApply = () => {
    onChange(localFilters);
  };
  
  // リセットボタンハンドラー
  const handleReset = () => {
    const resetFilters: FilterCriteria = {};
    setLocalFilters(resetFilters);
    onChange(resetFilters);
  };
  
  // 年齢グループオプション
  const ageGroupOptions = [
    { value: 'under20', label: '20歳未満' },
    { value: '20s', label: '20代' },
    { value: '30s', label: '30代' },
    { value: '40s', label: '40代' },
    { value: '50s', label: '50代' },
    { value: '60plus', label: '60歳以上' }
  ];
  
  // 性別オプション
  const genderOptions = [
    { value: 'male', label: '男性' },
    { value: 'female', label: '女性' },
    { value: 'mixed', label: '混合' }
  ];
  
  // 婚姻状況オプション
  const maritalStatusOptions = [
    { value: 'single', label: '未婚' },
    { value: 'married', label: '既婚' },
    { value: 'other', label: 'その他' }
  ];
  
  // 来店頻度範囲
  const visitFrequencyRanges = [
    { value: '0-1', label: '月1回未満' },
    { value: '1-4', label: '月1-4回' },
    { value: '5-10', label: '月5-10回' },
    { value: '10plus', label: '月10回以上' }
  ];
  
  // 支出範囲
  const spendingRanges = [
    { value: '0-5000', label: '~5,000円' },
    { value: '5000-10000', label: '5,000-10,000円' },
    { value: '10000-20000', label: '10,000-20,000円' },
    { value: '20000plus', label: '20,000円~' }
  ];
  
  return (
    <div className="bg-white border border-neutral-200 rounded-lg shadow-sm">
      {/* ヘッダー */}
      <div 
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center">
          <Filter size={18} className="text-neutral-500 mr-2" />
          <h3 className="font-medium text-neutral-800">セグメントフィルター</h3>
        </div>
        <button className="text-neutral-500">
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>
      
      {/* フィルターコンテンツ */}
      {expanded && (
        <div className="p-4 border-t border-neutral-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 年齢グループフィルター */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">年齢層</label>
              <div className="flex flex-wrap gap-2">
                {ageGroupOptions.map(option => (
                  <label 
                    key={option.value}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input 
                      type="checkbox"
                      className="rounded text-primary-600 focus:ring-primary-500"
                      checked={localFilters.ageGroups?.includes(option.value) || false}
                      onChange={e => {
                        const currentValues = localFilters.ageGroups || [];
                        if (e.target.checked) {
                          handleFilterChange('ageGroups', [...currentValues, option.value]);
                        } else {
                          handleFilterChange('ageGroups', currentValues.filter(v => v !== option.value));
                        }
                      }}
                    />
                    <span className="text-sm text-neutral-600">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* 性別フィルター */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">性別</label>
              <div className="flex flex-wrap gap-2">
                {genderOptions.map(option => (
                  <label 
                    key={option.value}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input 
                      type="checkbox"
                      className="rounded text-primary-600 focus:ring-primary-500"
                      checked={localFilters.genders?.includes(option.value) || false}
                      onChange={e => {
                        const currentValues = localFilters.genders || [];
                        if (e.target.checked) {
                          handleFilterChange('genders', [...currentValues, option.value]);
                        } else {
                          handleFilterChange('genders', currentValues.filter(v => v !== option.value));
                        }
                      }}
                    />
                    <span className="text-sm text-neutral-600">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* 婚姻状況フィルター */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">婚姻状況</label>
              <div className="flex flex-wrap gap-2">
                {maritalStatusOptions.map(option => (
                  <label 
                    key={option.value}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input 
                      type="checkbox"
                      className="rounded text-primary-600 focus:ring-primary-500"
                      checked={localFilters.maritalStatus?.includes(option.value) || false}
                      onChange={e => {
                        const currentValues = localFilters.maritalStatus || [];
                        if (e.target.checked) {
                          handleFilterChange('maritalStatus', [...currentValues, option.value]);
                        } else {
                          handleFilterChange('maritalStatus', currentValues.filter(v => v !== option.value));
                        }
                      }}
                    />
                    <span className="text-sm text-neutral-600">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* 来店頻度フィルター */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">来店頻度</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-neutral-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                value={localFilters.visitFrequency ? `${localFilters.visitFrequency[0]}-${localFilters.visitFrequency[1]}` : ''}
                onChange={e => {
                  const [min, max] = e.target.value.split('-').map(Number);
                  handleFilterChange('visitFrequency', [min, max]);
                }}
              >
                <option value="">全て</option>
                {visitFrequencyRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* 支出範囲フィルター */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">平均支出額</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-neutral-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                value={localFilters.spendingRange ? `${localFilters.spendingRange[0]}-${localFilters.spendingRange[1]}` : ''}
                onChange={e => {
                  const [min, max] = e.target.value.split('-').map(Number);
                  handleFilterChange('spendingRange', [min, max]);
                }}
              >
                <option value="">全て</option>
                {spendingRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* アクションボタン */}
          <div className="flex justify-end mt-6 space-x-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500"
            >
              <div className="flex items-center">
                <RotateCcw size={16} className="mr-1" />
                <span>リセット</span>
              </div>
            </button>
            
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-primary-600 border border-transparent rounded-md text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <div className="flex items-center">
                <Filter size={16} className="mr-1" />
                <span>適用</span>
              </div>
            </button>
            
            <button
              className="px-4 py-2 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500"
            >
              <div className="flex items-center">
                <Save size={16} className="mr-1" />
                <span>保存</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SegmentFilterPanel; 