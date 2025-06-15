import React, { useState } from 'react';
import { Send, Link, FileText, Sparkles, Loader } from 'lucide-react';

export const InputPanel = ({ onSubmit, isProcessing, error }) => {
  const [inputType, setInputType] = useState('text');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() && !isProcessing) {
      onSubmit(content.trim(), inputType);
    }
  };

  const exampleTexts = {
    text: "Artificial Intelligence is transforming industries by automating complex tasks, improving decision-making processes, and creating new opportunities for innovation. Machine learning algorithms can analyze vast datasets to identify patterns and make predictions. Deep learning networks mimic human neural processes to solve complex problems. Natural language processing enables computers to understand and generate human language. Computer vision allows machines to interpret visual information from the world around them.",
    url: "https://example.com/article-about-ai"
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center p-8">
      <div className="w-full max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-2xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-emerald-400 to-orange-400 bg-clip-text text-transparent">
              Transform Content into Mind Maps
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Paste any article or URL and watch AI turn it into an interactive, 
            hierarchical mind map with clickable nodes and smart organization.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center">
            {error}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Type Selector */}
          <div className="flex justify-center">
            <div className="flex space-x-1 bg-slate-700/30 backdrop-blur-xl rounded-xl p-1">
              <button
                type="button"
                onClick={() => setInputType('text')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                  inputType === 'text'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-slate-600/50'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Raw Text</span>
              </button>
              <button
                type="button"
                onClick={() => setInputType('url')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                  inputType === 'url'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-slate-600/50'
                }`}
              >
                <Link className="w-4 h-4" />
                <span>URL</span>
              </button>
            </div>
          </div>

          {/* Input Field */}
          <div className="relative">
            {inputType === 'text' ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste your text content here..."
                className="w-full h-64 bg-slate-800/50 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 resize-none text-sm leading-relaxed"
                disabled={isProcessing}
              />
            ) : (
              <input
                type="url"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter URL to extract content..."
                className="w-full bg-slate-800/50 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                disabled={isProcessing}
              />
            )}
            
            {/* Example Button */}
            <button
              type="button"
              onClick={() => setContent(exampleTexts[inputType])}
              className="absolute top-4 right-4 px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 text-xs rounded-lg transition-colors"
              disabled={isProcessing}
            >
              Use Example
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!content.trim() || isProcessing}
              className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-medium transition-all transform ${
                !content.trim() || isProcessing
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white shadow-xl hover:shadow-2xl hover:scale-105'
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Processing with AI...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Generate Mind Map</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Processing Status */}
        {isProcessing && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-slate-800/50 backdrop-blur-xl rounded-xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <span className="text-slate-300 text-sm">AI is analyzing your content...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 