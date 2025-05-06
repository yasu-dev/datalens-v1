import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import FilterPanel from '../filters/FilterPanel';
import { X } from 'lucide-react';
import { useFilters } from '../../contexts/FilterContext';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { isPanelOpen, togglePanel, closePanel } = useFilters();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // 画面のどこかをクリックした時に、サイドメニュー外であればクローズ
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (isPanelOpen) {
      // パネル自体とヘッダーのフィルターボタンは除外（ここではクリックイベントの伝播を止めている）
      closePanel();
    }
  };

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-neutral-900 bg-opacity-50 transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden" onClick={handleOutsideClick}>
        <Header 
          toggleSidebar={toggleSidebar} 
          toggleFilterPanel={togglePanel}
          filterPanelOpen={isPanelOpen}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-50 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>

      {/* Filter Panel Overlay - パネル外のクリックでパネルを閉じる */}
      {isPanelOpen && (
        <div 
          className="fixed inset-0 z-20 bg-neutral-900 bg-opacity-30 transition-opacity lg:hidden"
          onClick={closePanel}
        />
      )}

      {/* Filter Panel */}
      <div 
        className={`fixed inset-y-0 right-0 z-30 w-80 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isPanelOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()} // パネル内のクリックイベントが親に伝播するのを防ぐ
      >
        <div className="flex justify-between items-center p-4 border-b border-neutral-200">
          <h2 className="text-lg font-medium text-neutral-800">フィルター設定</h2>
          <button 
            onClick={togglePanel}
            className="p-2 rounded-full hover:bg-neutral-100"
          >
            <X size={20} className="text-neutral-600" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
          <FilterPanel />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;