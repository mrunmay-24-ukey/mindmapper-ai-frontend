import React, { useState } from 'react';
import { FileText, Link, Upload, Layers, Eye, Download, ChevronRight, ChevronDown } from 'lucide-react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const Sidebar = ({ mindMapData }) => {
  const [activeTab, setActiveTab] = useState('inputs');
  const [expandedNodes, setExpandedNodes] = useState(new Set());

  const toggleNode = (nodeId) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const exportOptions = [
    { icon: Download, label: 'Export as PNG', type: 'png' },
    { icon: Download, label: 'Export as PDF', type: 'pdf' },
    { icon: Download, label: 'Export as JSON', type: 'json' },
  ];

  const renderNodeStructure = (node, depth = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id);
    
    return (
      <div key={node.id} className="select-none">
        <div 
          className={`flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-slate-700/50 cursor-pointer transition-colors ${
            depth > 0 ? 'ml-' + (depth * 4) : ''
          }`}
          onClick={() => hasChildren && toggleNode(node.id)}
        >
          {hasChildren && (
            isExpanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />
          )}
          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${
            depth === 0 ? 'from-blue-500 to-emerald-500' :
            depth === 1 ? 'from-emerald-500 to-orange-500' :
            'from-orange-500 to-red-500'
          }`} />
          <span className="text-sm text-slate-200 truncate flex-1">{node.data.label}</span>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="ml-4">
            {node.children.map((child) => renderNodeStructure(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  // Export as PNG
  const handleExportPng = async () => {
    const flow = document.querySelector('.react-flow');
    if (!flow) return;
    const canvas = await html2canvas(flow, { backgroundColor: "#0f172a" });
    const link = document.createElement('a');
    link.download = 'mindmap.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  // Export as PDF
  const handleExportPdf = async () => {
    const flow = document.querySelector('.react-flow');
    if (!flow) return;
    const canvas = await html2canvas(flow, { backgroundColor: "#0f172a" });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height]
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('mindmap.pdf');
  };

  // Export as JSON
  const handleExportJson = () => {
    if (!mindMapData) return;
    const json = JSON.stringify(mindMapData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const link = document.createElement('a');
    link.download = 'mindmap.json';
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  return (
    <div className="w-80 bg-slate-800/30 backdrop-blur-xl border-r border-slate-700/50 flex flex-col">
      {/* Tab Navigation */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex space-x-1 bg-slate-700/30 rounded-lg p-1">
          {[
            { id: 'inputs', label: 'Inputs', icon: FileText },
            { id: 'structure', label: 'Structure', icon: Layers },
            { id: 'export', label: 'Export', icon: Download }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'inputs' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-slate-700/30 rounded-xl">
              <FileText className="w-6 h-6 text-blue-400" />
              <div>
                <h3 className="font-medium text-slate-200">Raw Text</h3>
                <p className="text-sm text-slate-400">Paste any text content</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-slate-700/30 rounded-xl">
              <Link className="w-6 h-6 text-emerald-400" />
              <div>
                <h3 className="font-medium text-slate-200">URL</h3>
                <p className="text-sm text-slate-400">Extract from web pages</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-slate-700/30 rounded-xl opacity-50">
              <Upload className="w-6 h-6 text-orange-400" />
              <div>
                <h3 className="font-medium text-slate-200">Upload File</h3>
                <p className="text-sm text-slate-400">PDF, DOC support (coming soon)</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'structure' && (
          <div className="space-y-2">
            {mindMapData ? (
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Eye className="w-5 h-5 text-blue-400" />
                  <span className="font-medium text-slate-200">Map Structure</span>
                </div>
                {renderNodeStructure(mindMapData.nodes[0])}
              </div>
            ) : (
              <div className="text-center py-8">
                <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">No mind map generated yet</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'export' && (
          <div className="space-y-3">
            <button
              className="w-full flex items-center space-x-3 p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-xl transition-colors group"
              disabled={!mindMapData}
              onClick={handleExportPng}
            >
              <Download className={`w-5 h-5 ${mindMapData ? 'text-emerald-400' : 'text-slate-600'}`} />
              <span className={`font-medium ${mindMapData ? 'text-slate-200' : 'text-slate-500'}`}>
                Export as PNG
              </span>
            </button>
            <button
              className="w-full flex items-center space-x-3 p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-xl transition-colors group"
              disabled={!mindMapData}
              onClick={handleExportPdf}
            >
              <Download className={`w-5 h-5 ${mindMapData ? 'text-emerald-400' : 'text-slate-600'}`} />
              <span className={`font-medium ${mindMapData ? 'text-slate-200' : 'text-slate-500'}`}>
                Export as PDF
              </span>
            </button>
            <button
              className="w-full flex items-center space-x-3 p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-xl transition-colors group"
              disabled={!mindMapData}
              onClick={handleExportJson}
            >
              <Download className={`w-5 h-5 ${mindMapData ? 'text-emerald-400' : 'text-slate-600'}`} />
              <span className={`font-medium ${mindMapData ? 'text-slate-200' : 'text-slate-500'}`}>
                Export as JSON
              </span>
            </button>
            {!mindMapData && (
              <p className="text-sm text-slate-500 text-center mt-4">
                Generate a mind map to enable export options
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}; 