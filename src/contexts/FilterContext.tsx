import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for our filter state
interface DateRange {
  start: string;
  end: string;
}

export interface AreaFilter {
  prefectures: string[];
  cities: string[];
  stores: string[];
}

export interface FilterState {
  dateRange: DateRange;
  areas: AreaFilter;
  segments: string[];
  deviceTypes: string[];
}

// Define context interface
interface FilterContextType {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  updateDateRange: (range: DateRange) => void;
  updateAreas: (areas: AreaFilter) => void;
  updatePrefectures: (prefectures: string[]) => void;
  updateCities: (cities: string[]) => void;
  updateStores: (stores: string[]) => void;
  updateSegments: (segments: string[]) => void;
  updateDeviceTypes: (deviceTypes: string[]) => void;
  resetFilters: () => void;
  isPanelOpen: boolean;
  togglePanel: () => void;
  closePanel: () => void;
}

// Calculate default date range (last 30 days)
const today = new Date();
const thirtyDaysAgo = new Date(today);
thirtyDaysAgo.setDate(today.getDate() - 30);

const defaultFilters: FilterState = {
  dateRange: {
    start: thirtyDaysAgo.toISOString().split('T')[0],
    end: today.toISOString().split('T')[0],
  },
  areas: {
    prefectures: ['東京都', '千葉県', '神奈川県'],
    cities: [],
    stores: [],
  },
  segments: ['All'],
  deviceTypes: ['All'],
};

// Create the context
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Provider component
interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const updateDateRange = (range: DateRange) => {
    setFilters(prev => ({
      ...prev,
      dateRange: range,
    }));
  };

  const updateAreas = (areas: AreaFilter) => {
    setFilters(prev => ({
      ...prev,
      areas,
    }));
  };

  const updatePrefectures = (prefectures: string[]) => {
    setFilters(prev => ({
      ...prev,
      areas: {
        ...prev.areas,
        prefectures,
        // クリアする条件：都道府県が変更された場合は市区町村と店舗の選択をクリア
        cities: [],
        stores: [],
      },
    }));
  };

  const updateCities = (cities: string[]) => {
    setFilters(prev => ({
      ...prev,
      areas: {
        ...prev.areas,
        cities,
        // クリアする条件：市区町村が変更された場合は店舗の選択をクリア
        stores: [],
      },
    }));
  };

  const updateStores = (stores: string[]) => {
    setFilters(prev => ({
      ...prev,
      areas: {
        ...prev.areas,
        stores,
      },
    }));
  };

  const updateSegments = (segments: string[]) => {
    setFilters(prev => ({
      ...prev,
      segments,
    }));
  };

  const updateDeviceTypes = (deviceTypes: string[]) => {
    setFilters(prev => ({
      ...prev,
      deviceTypes,
    }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
        updateDateRange,
        updateAreas,
        updatePrefectures,
        updateCities,
        updateStores,
        updateSegments,
        updateDeviceTypes,
        resetFilters,
        isPanelOpen,
        togglePanel,
        closePanel,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook to use the filter context
export const useFilters = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};