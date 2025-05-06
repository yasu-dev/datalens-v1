import React from 'react';
import { Menu, SlidersHorizontal, Bell, User, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { useFilters } from '../../contexts/FilterContext';

interface HeaderProps {
  toggleSidebar: () => void;
  toggleFilterPanel: () => void;
  filterPanelOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, toggleFilterPanel, filterPanelOpen }) => {
  const { filters } = useFilters();
  
  const formatDateRange = () => {
    const start = new Date(filters.dateRange.start);
    const end = new Date(filters.dateRange.end);
    return `${format(start, 'yyyy/MM/dd')} - ${format(end, 'yyyy/MM/dd')}`;
  };

  // クリックイベントの伝播を止める（親要素のハンドラーが発火しないようにする）
  const handleFilterButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFilterPanel();
  };

  return (
    <header className="z-10 py-3 px-4 bg-white shadow-sm flex items-center justify-between lg:px-6">
      <div className="flex items-center">
        <button
          className="mr-2 p-2 rounded-full text-neutral-600 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 lg:hidden"
          onClick={toggleSidebar}
        >
          <Menu size={20} />
        </button>
        
        <div className="hidden md:block">
          <h1 className="text-xl font-medium text-neutral-800">行動データ分析</h1>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="bg-neutral-100 px-3 py-1.5 rounded-md text-sm text-neutral-700 hidden md:block">
          <span className="font-medium">期間:</span> {formatDateRange()}
        </div>
        
        <button 
          className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            filterPanelOpen 
              ? 'bg-primary-500 text-white hover:bg-primary-600' 
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
          onClick={handleFilterButtonClick}
          title="フィルターパネル"
        >
          <SlidersHorizontal size={20} />
        </button>
        
        <button 
          className="p-2 rounded-full text-neutral-600 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          title="通知"
        >
          <Bell size={20} />
        </button>
        
        <div className="hidden md:flex items-center ml-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center mr-2">
            <User size={18} className="text-neutral-600" />
          </div>
          <span className="text-sm font-medium text-neutral-700 mr-1">分析者</span>
          <ChevronDown size={16} className="text-neutral-400" />
        </div>
      </div>
    </header>
  );
};

export default Header;