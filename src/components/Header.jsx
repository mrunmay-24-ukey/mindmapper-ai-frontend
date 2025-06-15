import React from 'react';
import { Brain, Plus, Download, Settings } from 'lucide-react';

export const Header = ({ onNewMindMap, children }) => {
  return (
    <header className="h-16 bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-xl">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            MindMapper AI
          </h1>
          <p className="text-sm text-slate-400">Intelligent Visual Notes</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={onNewMindMap}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center space-x-2 text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          <span>New Map</span>
        </button>
        
        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
          <Download className="w-5 h-5" />
        </button>
        
        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        {children}
      </div>
    </header>
  );
}; 