import React from 'react';
import { NavLink } from 'react-router-dom';
import { Store, Map, Users, TrendingUp, BarChart4 } from 'lucide-react';

interface SidebarProps {
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ closeSidebar }) => {
  // Navigation items
  const navItems = [
    {
      label: 'ダッシュボード',
      path: '/',
      icon: <BarChart4 size={20} />,
      exact: true,
    },
    {
      label: 'エリア分析',
      path: '/area-analysis',
      icon: <Map size={20} />,
    },
    {
      label: '顧客セグメント',
      path: '/customer-segments',
      icon: <Users size={20} />,
    },
    {
      label: 'トレンド分析',
      path: '/trends',
      icon: <TrendingUp size={20} />,
    },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b border-neutral-200">
        <div className="flex items-center space-x-3">
          <Store className="text-primary-500" size={28} />
          <div>
            <h2 className="font-bold text-primary-500 text-lg leading-tight">DataLens</h2>
            <p className="text-xs text-neutral-500">データで見る行動インサイト</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <ul>
          {navItems.map((item) => (
            <li key={item.path} className="px-2 mb-1">
              <NavLink
                to={item.path}
                end={item.exact}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 rounded-md transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;