import React from "react";

function QuickActionsFooter() {
  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-100 p-3 rounded-t-xl shadow-lg">
      <h4 className="text-xs font-semibold text-gray-900 mb-2">Quick Actions</h4>
      <div className="grid grid-cols-3 gap-2">
        <button className="px-2 py-1.5 text-xs bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium">
          Reset All
        </button>
        <button className="px-2 py-1.5 text-xs bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors text-indigo-700 font-medium">
          Save Template
        </button>
        <button className="px-2 py-1.5 text-xs bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors text-purple-700 font-medium">
          Share Resume
        </button>
      </div>
      
      {/* Divider */}
      <div className="mt-2 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      {/* Additional Actions */}
      <div className="grid grid-cols-2 gap-2 mt-2">
        <button className="px-2 py-1.5 text-xs bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-green-700 font-medium">
          Export PDF
        </button>
        <button className="px-2 py-1.5 text-xs bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors text-orange-700 font-medium">
          Preview ATS
        </button>
      </div>
    </div>
  );
}

export default QuickActionsFooter;