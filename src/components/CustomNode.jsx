import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Eye } from 'lucide-react';

export const CustomNode = memo(({ data, selected }) => {
  const [showPreview, setShowPreview] = useState(false);
  
  const getNodeStyle = (level) => {
    switch (level) {
      case 0:
        return {
          background: 'linear-gradient(135deg, #3b82f6, #10b981)',
          color: 'white',
          fontSize: '16px',
          padding: '16px 24px',
          minWidth: '200px',
        };
      case 1:
        return {
          background: 'linear-gradient(135deg, #10b981, #f97316)',
          color: 'white',
          fontSize: '14px',
          padding: '12px 20px',
          minWidth: '160px',
        };
      default:
        return {
          background: 'linear-gradient(135deg, #f97316, #ef4444)',
          color: 'white',
          fontSize: '12px',
          padding: '10px 16px',
          minWidth: '120px',
        };
    }
  };

  const nodeStyle = getNodeStyle(data.level);

  return (
    <div className="relative">
      <div
        className={`rounded-xl shadow-lg border-2 backdrop-blur-sm transition-all duration-200 hover:shadow-xl transform hover:scale-105 ${
          selected ? 'border-white' : 'border-transparent'
        }`}
        style={nodeStyle}
        onMouseEnter={() => setShowPreview(true)}
        onMouseLeave={() => setShowPreview(false)}
      >
        <div className="flex items-center justify-between">
          <span className="font-medium leading-tight">{data.label}</span>
          {data.content && (
            <Eye className="w-4 h-4 ml-2 opacity-70" />
          )}
        </div>
        
        {/* Preview Tooltip */}
        {showPreview && data.content && (
          <div className="absolute z-50 top-full left-0 mt-2 p-3 bg-slate-800 text-slate-200 text-sm rounded-lg shadow-xl max-w-xs border border-slate-600">
            <div className="absolute -top-2 left-4 w-4 h-4 bg-slate-800 border-l border-t border-slate-600 transform rotate-45"></div>
            {data.content}
          </div>
        )}
      </div>

      {/* Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-slate-400 border-2 border-white"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-slate-400 border-2 border-white"
      />
    </div>
  );
});

CustomNode.displayName = 'CustomNode'; 