import React, { useState } from 'react';
import { CustomerProfileSummary } from '../../data/customerDataService';
import { ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';

interface VirtualizedCustomerTableProps {
  customers: CustomerProfileSummary[];
  isLoading: boolean;
  totalCount: number;
  page: number;
  onPageChange: (page: number) => void;
  onCustomerSelect: (customerId: string) => void;
  pageSize?: number;
}

const VirtualizedCustomerTable: React.FC<VirtualizedCustomerTableProps> = ({
  customers,
  isLoading,
  totalCount,
  page,
  onPageChange,
  onCustomerSelect,
  pageSize = 20
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // 総ページ数を計算
  const totalPages = Math.ceil(totalCount / pageSize);
  
  // 表示するページ番号の範囲を計算
  const getPageRange = () => {
    const range = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }
    
    return range;
  };
  
  // ソート処理
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // ページ変更ハンドラー
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };
  
  // 検索フィルター処理
  const filteredCustomers = searchTerm
    ? customers.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.mainCategories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase())) ||
        customer.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : customers;
  
  // LTVスコアに基づく色を決定
  const getLtvColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-neutral-600';
  };
  
  // 解約リスクに基づく色を決定
  const getChurnColor = (risk: number) => {
    if (risk <= 10) return 'text-emerald-600';
    if (risk <= 25) return 'text-amber-600';
    return 'text-red-600';
  };
  
  return (
    <div className="bg-white border border-neutral-200 rounded-lg shadow-sm">
      {/* テーブルヘッダーとコントロール */}
      <div className="p-4 border-b border-neutral-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-neutral-800">顧客リスト</h3>
          <div className="text-sm text-neutral-500">
            全{totalCount.toLocaleString()}人中 {((page - 1) * pageSize + 1).toLocaleString()}-
            {Math.min(page * pageSize, totalCount).toLocaleString()}人を表示
          </div>
        </div>
        
        <div className="flex space-x-2">
          {/* 検索フィールド */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-neutral-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="顧客名、特性などで検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* フィルターボタン */}
          <button className="px-4 py-2 bg-white border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            <div className="flex items-center">
              <Filter size={16} className="mr-1" />
              <span>フィルター</span>
            </div>
          </button>
        </div>
      </div>
      
      {/* テーブル本体 */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th 
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:bg-neutral-100"
                onClick={() => handleSort('name')}
              >
                顧客名 / ID
              </th>
              <th 
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:bg-neutral-100"
                onClick={() => handleSort('ltvScore')}
              >
                LTV / 解約リスク
              </th>
              <th 
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:bg-neutral-100"
                onClick={() => handleSort('visitFrequency')}
              >
                来店状況
              </th>
              <th 
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:bg-neutral-100"
                onClick={() => handleSort('avgSpending')}
              >
                支出 / カテゴリ
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">詳細</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-neutral-500">
                  データを読み込み中...
                </td>
              </tr>
            ) : filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-neutral-500">
                  条件に一致する顧客が見つかりません
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => (
                <tr 
                  key={customer.id}
                  className="hover:bg-neutral-50 cursor-pointer transition"
                  onClick={() => onCustomerSelect(customer.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-neutral-800">{customer.name}</div>
                    <div className="text-xs text-neutral-500">ID: {customer.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`text-sm font-medium ${getLtvColor(customer.ltvScore)}`}>
                        {customer.ltvScore}
                      </div>
                      <span className="text-xs text-neutral-500 ml-1">/100</span>
                    </div>
                    <div className={`text-xs ${getChurnColor(customer.churnRisk)}`}>
                      解約リスク: {customer.churnRisk}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-700">{customer.visitFrequency}</div>
                    <div className="text-xs text-neutral-500">最終来店: {customer.lastVisit}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-700">{customer.avgSpending}</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {customer.mainCategories.map((category, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-100 text-neutral-800"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-primary-600 hover:text-primary-800"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCustomerSelect(customer.id);
                      }}
                    >
                      詳細
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* ページネーション */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-neutral-200 sm:px-6">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-neutral-700">
              <span className="font-medium">{totalCount.toLocaleString()}</span> 人中 
              <span className="font-medium"> {((page - 1) * pageSize + 1).toLocaleString()} </span>
              から
              <span className="font-medium"> {Math.min(page * pageSize, totalCount).toLocaleString()} </span>
              人を表示
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              {/* 前のページ */}
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 ${
                  page === 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span className="sr-only">前のページ</span>
                <ChevronLeft size={16} />
              </button>
              
              {/* ページ番号 */}
              {getPageRange().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    page === pageNum
                      ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                      : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
              
              {/* 次のページ */}
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 ${
                  page === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span className="sr-only">次のページ</span>
                <ChevronRight size={16} />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualizedCustomerTable; 