import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface PathItem {
  label: string;
  url: string;
}

interface AnalysisPathBreadcrumbProps {
  path: PathItem[];
}

const AnalysisPathBreadcrumb: React.FC<AnalysisPathBreadcrumbProps> = ({ 
  path 
}) => {
  return (
    <div className="flex flex-wrap items-center space-x-1 text-sm mb-4">
      {/* ホームリンク */}
      <Link 
        to="/" 
        className="text-neutral-500 hover:text-neutral-800 transition"
      >
        トップ
      </Link>
      
      {/* 区切り */}
      <ChevronRight size={14} className="text-neutral-400" />
      
      {/* パス項目 - インデックスとURLを組み合わせた一意のキーを使用 */}
      {path.map((item, index) => (
        <React.Fragment key={`${index}-${item.url}`}>
          {index === path.length - 1 ? (
            <span className="font-medium text-neutral-800 bg-primary-50 px-2 py-0.5 rounded-md">{item.label}</span>
          ) : (
            <>
              <Link 
                to={item.url} 
                className="text-neutral-500 hover:text-neutral-800 transition"
              >
                {item.label}
              </Link>
              <ChevronRight size={14} className="text-neutral-400" />
            </>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default AnalysisPathBreadcrumb; 