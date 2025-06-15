import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { InputPanel } from './components/InputPanel';
import { MindMapCanvas } from './components/MindMapCanvas';
import { Home } from './pages/Home';

const API_URL = 'https://mindmapper-ai-backend.onrender.com/api';

function App() {
  const [showInputPanel, setShowInputPanel] = useState(true);
  const [mindMapData, setMindMapData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleNewMindMap = () => {
    setShowInputPanel(true);
    setMindMapData(null);
    setError(null);
  };

  const handleContentSubmit = async (content, type) => {
    setIsProcessing(true);
    setError(null);
    try {
      console.log('Sending request to backend...');
      const response = await fetch(`${API_URL}/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, type }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to process content');
      }

      console.log('Received response from backend:', data);
      setMindMapData(data);
      setShowInputPanel(false);
    } catch (err) {
      console.error('Error processing content:', err);
      setError(err.message || 'Failed to process content. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/app"
          element={
            <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
              <SignedOut>
                <Navigate to="/" replace />
              </SignedOut>
              <SignedIn>
                <Header onNewMindMap={handleNewMindMap}>
                  <UserButton afterSignOutUrl="/" />
                </Header>
                
                <div className="flex h-[calc(100vh-4rem)]">
                  <Sidebar mindMapData={mindMapData} />
                  
                  <main className="flex-1 relative">
                    {showInputPanel && (
                      <InputPanel 
                        onSubmit={handleContentSubmit}
                        isProcessing={isProcessing}
                        error={error}
                      />
                    )}
                    
                    {mindMapData && !showInputPanel && (
                      <MindMapCanvas data={mindMapData} />
                    )}
                  </main>
                </div>
              </SignedIn>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App; 