import React, { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

function LivePreviewControls() {
  const { isLivePreviewEnabled, toggleLivePreview, previewAnimation } = useContext(ResumeContext);

  return (
    <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${isLivePreviewEnabled ? 'bg-green-400 animate-pulse' : 'bg-gray-300'}`}></div>
          <div>
            <h3 className="font-semibold text-gray-900">Live Preview</h3>
            <p className="text-xs text-gray-600">Real-time updates as you type</p>
          </div>
        </div>
        
        <button
          onClick={toggleLivePreview}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            isLivePreviewEnabled ? 'bg-indigo-600' : 'bg-gray-300'
          }`}
        >
          <span 
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isLivePreviewEnabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
      
      {previewAnimation && (
        <div className="mt-3 flex items-center justify-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="ml-2 text-xs text-gray-600">Updating preview...</span>
        </div>
      )}
    </div>
  );
}

export default LivePreviewControls;