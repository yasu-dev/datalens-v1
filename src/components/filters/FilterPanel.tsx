import React, { useState } from 'react';
import { useFilters } from '../../contexts/FilterContext';
import { Calendar, MapPin, Users, Smartphone, RefreshCw, Check } from 'lucide-react';
import { prefectureData } from '../../data/storeData';

const FilterPanel: React.FC = () => {
  const { 
    filters, 
    updateDateRange, 
    updatePrefectures, 
    updateCities, 
    updateStores, 
    updateSegments, 
    updateDeviceTypes, 
    resetFilters 
  } = useFilters();

  // ドリルダウン表示用の状態
  const [areaTab, setAreaTab] = useState<'prefecture' | 'city' | 'store'>('prefecture');
  const [selectedPrefecture, setSelectedPrefecture] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const availableSegments = [
    'All',
    '週末来店層',
    '平日夜間層',
    '高頻度来店層',
    'モバイルヘビーユーザー',
    'シニア層',
    'ファミリー層',
  ];

  const availableDeviceTypes = [
    'All',
    'ハイエンド',
    'ミドルレンジ',
    'ローエンド',
    'iOS',
    'Android',
  ];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateDateRange({
      ...filters.dateRange,
      [name]: value,
    });
  };

  // 都道府県選択
  const handlePrefectureSelect = (prefName: string) => {
    const isSelected = filters.areas.prefectures.includes(prefName);
    const newPrefectures = isSelected
      ? filters.areas.prefectures.filter(p => p !== prefName)
      : [...filters.areas.prefectures, prefName];
    
    updatePrefectures(newPrefectures);
  };

  // 市区町村選択
  const handleCitySelect = (cityName: string) => {
    const isSelected = filters.areas.cities.includes(cityName);
    const newCities = isSelected
      ? filters.areas.cities.filter(c => c !== cityName)
      : [...filters.areas.cities, cityName];
    
    updateCities(newCities);
  };

  // 店舗選択
  const handleStoreSelect = (storeName: string) => {
    const isSelected = filters.areas.stores.includes(storeName);
    const newStores = isSelected
      ? filters.areas.stores.filter(s => s !== storeName)
      : [...filters.areas.stores, storeName];
    
    updateStores(newStores);
  };

  // ドリルダウン選択用の表示切替
  const handlePrefectureClick = (prefId: string, prefName: string) => {
    setSelectedPrefecture(prefId);
    setAreaTab('city');
  };

  const handleCityClick = (cityId: string, cityName: string) => {
    setSelectedCity(cityId);
    setAreaTab('store');
  };

  const handleBackToPrefectures = () => {
    setAreaTab('prefecture');
    setSelectedPrefecture(null);
  };

  const handleBackToCities = () => {
    setAreaTab('city');
    setSelectedCity(null);
  };

  const toggleSegment = (segment: string) => {
    const newSegments = segment === 'All'
      ? ['All']
      : filters.segments.includes(segment)
        ? filters.segments.filter(s => s !== segment)
        : filters.segments.includes('All')
          ? [segment]
          : [...filters.segments, segment];
    updateSegments(newSegments.length === 0 ? ['All'] : newSegments);
  };

  const toggleDeviceType = (deviceType: string) => {
    const newDeviceTypes = deviceType === 'All'
      ? ['All']
      : filters.deviceTypes.includes(deviceType)
        ? filters.deviceTypes.filter(d => d !== deviceType)
        : filters.deviceTypes.includes('All')
          ? [deviceType]
          : [...filters.deviceTypes, deviceType];
    updateDeviceTypes(newDeviceTypes.length === 0 ? ['All'] : newDeviceTypes);
  };

  const renderPrefectureList = () => {
    return (
      <div className="space-y-2">
        <h5 className="text-xs font-medium text-neutral-500 mb-2">都道府県を選択</h5>
        <div className="grid grid-cols-2 gap-2">
          {prefectureData.map((pref) => (
            <div key={pref.id} className="flex items-center">
              <button
                onClick={() => handlePrefectureSelect(pref.name)}
                className="mr-2 w-5 h-5 rounded border border-neutral-300 flex items-center justify-center bg-white"
              >
                {filters.areas.prefectures.includes(pref.name) && (
                  <Check size={14} className="text-primary-500" />
                )}
              </button>
              <button
                onClick={() => handlePrefectureClick(pref.id, pref.name)}
                className="flex-1 text-left text-sm hover:text-primary-600"
              >
                {pref.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCityList = () => {
    if (!selectedPrefecture) return null;
    
    const prefecture = prefectureData.find(p => p.id === selectedPrefecture);
    if (!prefecture) return null;

    return (
      <div className="space-y-2">
        <div className="flex items-center">
          <button 
            onClick={handleBackToPrefectures}
            className="text-xs text-primary-500 hover:text-primary-600 flex items-center"
          >
            ← 都道府県に戻る
          </button>
        </div>
        <h5 className="text-xs font-medium text-neutral-500 mb-2">{prefecture.name}の市区町村を選択</h5>
        <div className="grid grid-cols-2 gap-2">
          {prefecture.cities.map((city) => (
            <div key={city.id} className="flex items-center">
              <button
                onClick={() => handleCitySelect(city.name)}
                className="mr-2 w-5 h-5 rounded border border-neutral-300 flex items-center justify-center bg-white"
              >
                {filters.areas.cities.includes(city.name) && (
                  <Check size={14} className="text-primary-500" />
                )}
              </button>
              <button
                onClick={() => handleCityClick(city.id, city.name)}
                className="flex-1 text-left text-sm hover:text-primary-600"
              >
                {city.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderStoreList = () => {
    if (!selectedPrefecture || !selectedCity) return null;
    
    const prefecture = prefectureData.find(p => p.id === selectedPrefecture);
    if (!prefecture) return null;
    
    const city = prefecture.cities.find(c => c.id === selectedCity);
    if (!city) return null;

    return (
      <div className="space-y-2">
        <div className="flex items-center">
          <button 
            onClick={handleBackToCities}
            className="text-xs text-primary-500 hover:text-primary-600 flex items-center"
          >
            ← 市区町村に戻る
          </button>
        </div>
        <h5 className="text-xs font-medium text-neutral-500 mb-2">{prefecture.name} {city.name}の店舗を選択</h5>
        <div className="space-y-1">
          {city.stores.map((store) => (
            <div key={store.id} className="flex items-center">
              <button
                onClick={() => handleStoreSelect(store.name)}
                className="mr-2 w-5 h-5 rounded border border-neutral-300 flex items-center justify-center bg-white"
              >
                {filters.areas.stores.includes(store.name) && (
                  <Check size={14} className="text-primary-500" />
                )}
              </button>
              <span className="text-sm">{store.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAreaSelector = () => {
    switch (areaTab) {
      case 'prefecture':
        return renderPrefectureList();
      case 'city':
        return renderCityList();
      case 'store':
        return renderStoreList();
      default:
        return renderPrefectureList();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">フィルター</h3>
        <button
          onClick={resetFilters}
          className="text-sm text-primary-500 hover:text-primary-600 flex items-center"
        >
          <RefreshCw size={14} className="mr-1" />
          リセット
        </button>
      </div>

      {/* Date Range */}
      <div className="space-y-3">
        <div className="flex items-center">
          <Calendar size={16} className="text-neutral-500 mr-2" />
          <h4 className="text-sm font-medium text-neutral-700">期間</h4>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="start" className="block text-xs text-neutral-500 mb-1">開始日</label>
            <input
              type="date"
              id="start"
              name="start"
              value={filters.dateRange.start}
              onChange={handleDateChange}
              className="input w-full text-sm"
            />
          </div>
          <div>
            <label htmlFor="end" className="block text-xs text-neutral-500 mb-1">終了日</label>
            <input
              type="date"
              id="end"
              name="end"
              value={filters.dateRange.end}
              onChange={handleDateChange}
              className="input w-full text-sm"
            />
          </div>
        </div>
      </div>

      {/* Areas */}
      <div className="space-y-3">
        <div className="flex items-center">
          <MapPin size={16} className="text-neutral-500 mr-2" />
          <h4 className="text-sm font-medium text-neutral-700">エリア</h4>
        </div>
        <div className="bg-neutral-50 p-3 rounded-md border border-neutral-200">
          {renderAreaSelector()}
        </div>
        {/* 選択済みエリアの表示 */}
        {(filters.areas.prefectures.length > 0 || filters.areas.cities.length > 0 || filters.areas.stores.length > 0) && (
          <div className="mt-2">
            <h5 className="text-xs font-medium text-neutral-500 mb-1">選択中のエリア:</h5>
            <div className="flex flex-wrap gap-1">
              {filters.areas.prefectures.map(pref => (
                <span key={pref} className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
                  {pref}
                </span>
              ))}
              {filters.areas.cities.map(city => (
                <span key={city} className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
                  {city}
                </span>
              ))}
              {filters.areas.stores.map(store => (
                <span key={store} className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
                  {store}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Customer Segments */}
      <div className="space-y-3">
        <div className="flex items-center">
          <Users size={16} className="text-neutral-500 mr-2" />
          <h4 className="text-sm font-medium text-neutral-700">顧客セグメント</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {availableSegments.map(segment => (
            <button
              key={segment}
              onClick={() => toggleSegment(segment)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                filters.segments.includes(segment)
                  ? 'bg-secondary-100 text-secondary-700 border border-secondary-200'
                  : 'bg-neutral-100 text-neutral-600 border border-neutral-200 hover:bg-neutral-200'
              }`}
            >
              {segment}
            </button>
          ))}
        </div>
      </div>

      {/* Device Types */}
      <div className="space-y-3">
        <div className="flex items-center">
          <Smartphone size={16} className="text-neutral-500 mr-2" />
          <h4 className="text-sm font-medium text-neutral-700">デバイスタイプ</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {availableDeviceTypes.map(deviceType => (
            <button
              key={deviceType}
              onClick={() => toggleDeviceType(deviceType)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                filters.deviceTypes.includes(deviceType)
                  ? 'bg-accent-100 text-accent-700 border border-accent-200'
                  : 'bg-neutral-100 text-neutral-600 border border-neutral-200 hover:bg-neutral-200'
              }`}
            >
              {deviceType}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;