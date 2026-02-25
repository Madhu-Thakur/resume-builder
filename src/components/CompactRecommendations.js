import React, { useState } from "react";

function CompactRecommendations({ recommendations }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
        <p className="text-xs text-green-700 font-medium">Excellent work! No improvements needed.</p>
      </div>
    );
  }

  // Count priorities
  const highCount = recommendations.filter(r => r.priority === 'high').length;
  const mediumCount = recommendations.filter(r => r.priority === 'medium').length;
  const lowCount = recommendations.filter(r => r.priority === 'low').length;

  return (
    <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-3">
      {/* Collapsed Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left group"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-semibold text-gray-900">Improvement Suggestions</span>
            <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded-full">
              {recommendations.length} suggestions
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {/* Priority Indicators */}
            {highCount > 0 && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-xs text-red-600 font-medium">{highCount}</span>
              </div>
            )}
            {mediumCount > 0 && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-xs text-yellow-600 font-medium">{mediumCount}</span>
              </div>
            )}
            {lowCount > 0 && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600 font-medium">{lowCount}</span>
              </div>
            )}
            <svg 
              className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {/* Preview of first few suggestions */}
        {!isExpanded && (
          <div className="space-y-1">
            {recommendations.slice(0, 3).map((rec, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <span className="text-gray-700">{rec.message}</span>
                <span className={`px-1 py-0.5 rounded text-xs font-medium ${
                  rec.priority === 'high' ? 'bg-red-100 text-red-700' : 
                  rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                  'bg-green-100 text-green-700'
                }`}>
                  {rec.priority}
                </span>
              </div>
            ))}
            {recommendations.length > 3 && (
              <div className="text-xs text-gray-500 text-right">
                +{recommendations.length - 3} more
              </div>
            )}
          </div>
        )}
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-3 space-y-2 animate-in slide-in-from-top-2 duration-200">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-white rounded-lg p-2 border border-gray-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-900">{rec.category}</span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  rec.priority === 'high' ? 'bg-red-100 text-red-700' : 
                  rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                  'bg-green-100 text-green-700'
                }`}>
                  {rec.priority.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-gray-700 mb-1">{rec.message}</p>
              <p className="text-xs text-gray-600 italic">{rec.action}</p>
            </div>
          ))}
          
          {/* Collapse Button */}
          <button
            onClick={() => setIsExpanded(false)}
            className="w-full text-xs text-gray-600 hover:text-gray-800 font-medium py-1"
          >
            Collapse suggestions
          </button>
        </div>
      )}
    </div>
  );
}

export default CompactRecommendations;