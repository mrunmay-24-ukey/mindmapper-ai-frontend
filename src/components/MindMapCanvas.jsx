import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  MiniMap,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { CustomNode } from './CustomNode';
import { Download, Maximize } from 'lucide-react';
import html2canvas from 'html2canvas';

const nodeTypes = {
  custom: CustomNode,
};

export const MindMapCanvas = ({ data }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(data.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(data.edges);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

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

  const handleExport = async (format) => {
    if (format === 'png') {
      await handleExportPng();
    }
    // Export functionality for other formats can be added here
    console.log(`Exporting as ${format}`);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'w-full h-full'} bg-slate-900`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-slate-900"
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
          style: {
            stroke: '#64748b',
            strokeWidth: 2,
          },
        }}
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1} 
          color="#475569"
        />
        
        <Controls 
          className="bg-slate-800/90 backdrop-blur-xl border border-slate-600/50 rounded-xl"
          showZoom={true}
          showFitView={true}
          showInteractive={true}
        />
        
        <MiniMap 
          className="bg-slate-800/90 backdrop-blur-xl border border-slate-600/50 rounded-xl"
          nodeColor="#3b82f6"
          maskColor="rgba(30, 41, 59, 0.8)"
        />

        <Panel position="top-right" className="flex space-x-2">
          <div className="flex space-x-2 bg-slate-800/90 backdrop-blur-xl border border-slate-600/50 rounded-xl p-2">
            <button
              onClick={() => handleExport('png')}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              title="Export as PNG"
            >
              <Download className="w-4 h-4" />
            </button>
            
            <button
              onClick={toggleFullscreen}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              title="Toggle Fullscreen"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </Panel>

        {isFullscreen && (
          <Panel position="top-left">
            <button
              onClick={toggleFullscreen}
              className="px-4 py-2 bg-slate-800/90 backdrop-blur-xl border border-slate-600/50 rounded-xl text-slate-300 hover:text-white transition-colors"
            >
              Exit Fullscreen
            </button>
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
}; 