import React, { useState } from 'react';
import { AlertTriangle, Shield, Info } from 'lucide-react';

interface DataAccessWarningProps {
  level: 'segment' | 'anonymized' | 'personal';
  onConfirm?: (reason: string) => void;
  onCancel?: () => void;
}

const DataAccessWarning: React.FC<DataAccessWarningProps> = ({ 
  level, 
  onConfirm, 
  onCancel 
}) => {
  const [accessReason, setAccessReason] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(accessReason);
    }
    setConfirmed(true);
  };
  
  if (level === 'segment') {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
        <div className="flex items-start">
          <Shield size={20} className="text-blue-500 mr-3 mt-0.5" />
          <div>
            <p className="text-sm text-blue-700">
              <span className="font-medium">セグメント集計データ</span> - 集計データのみを表示しています。個人を特定できる情報は含まれていません。
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  if (level === 'anonymized') {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
        <div className="flex items-start">
          <Info size={20} className="text-amber-500 mr-3 mt-0.5" />
          <div>
            <p className="text-sm text-amber-700">
              <span className="font-medium">匿名化顧客データ</span> - 匿名化された顧客データを表示しています。このデータへのアクセスは記録されます。
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  // 個人データアクセスの場合、確認フォームを表示
  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4">
      <div className="flex items-start">
        <AlertTriangle size={20} className="text-red-500 mr-3 mt-0.5" />
        <div className="flex-1">
          <p className="font-medium text-red-700">個人レベルのデータアクセス</p>
          <p className="text-sm text-red-600 mt-1">
            これから表示する情報には個人レベルの詳細データが含まれています。
            このデータへのアクセスは記録・監査され、不適切なアクセスは調査の対象となります。
            明示的な同意を得た顧客の情報のみであることを確認してください。
          </p>
          
          {!confirmed && (
            <>
              <div className="mt-3">
                <label htmlFor="access-reason" className="block text-sm font-medium text-red-700">
                  アクセス理由 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="access-reason"
                  placeholder="業務上の理由を具体的に入力してください"
                  value={accessReason}
                  onChange={(e) => setAccessReason(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-red-300 rounded-md text-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  rows={3}
                  required
                />
              </div>
              
              <div className="mt-4 flex justify-end space-x-3">
                {onCancel && (
                  <button
                    onClick={onCancel}
                    className="px-4 py-2 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500"
                  >
                    キャンセル
                  </button>
                )}
                <button
                  onClick={handleConfirm}
                  disabled={!accessReason.trim()}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  理由を記録してアクセス
                </button>
              </div>
            </>
          )}
          
          {confirmed && (
            <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-700">
                アクセス理由が記録されました。このアクセスは監査ログに保存されます。
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataAccessWarning; 