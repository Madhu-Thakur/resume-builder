import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ResumeContext } from "../context/ResumeContext";
import TemplateThumbnail from "../components/TemplateThumbnail";
import Logo from "../components/Logo";

import ClassicTemplate from "../templates/ClassicTemplate";
import ModernSidebarTemplate from "../templates/ModernSidebarTemplate";
import MinimalATSTemplate from "../templates/MinimalATSTemplate";
import CompactTemplate from "../templates/CompactTemplate";
import CreativeTemplate from "../templates/CreativeTemplate";
import ExecutiveTemplate from "../templates/ExecutiveTemplate";
import GridLayoutTemplate from "../templates/GridLayoutTemplate";
import CardLayoutTemplate from "../templates/CardLayoutTemplate";

function TemplatesPage() {
  const { setTemplate } = useContext(ResumeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [selected, setSelected] = useState("classic");
  const [isApplying, setIsApplying] = useState(false);

  // 🆕 Detect if user came from Builder
  const cameFromBuilder = location.state?.fromBuilder;

  const templates = [
    { 
      key: "classic", 
      name: "Classic Professional", 
      description: "Timeless design perfect for corporate roles",
      color: "from-blue-500 to-indigo-600",
      component: <ClassicTemplate /> 
    },
    { 
      key: "modern", 
      name: "Modern Sidebar", 
      description: "Contemporary layout with sidebar emphasis",
      color: "from-purple-500 to-pink-600",
      component: <ModernSidebarTemplate /> 
    },
    { 
      key: "ats", 
      name: "Minimal ATS", 
      description: "ATS-friendly format for automated screening",
      color: "from-gray-500 to-gray-700",
      component: <MinimalATSTemplate /> 
    },
    { 
      key: "compact", 
      name: "Compact", 
      description: "Space-efficient design for dense content",
      color: "from-green-500 to-emerald-600",
      component: <CompactTemplate /> 
    },
    { 
      key: "creative", 
      name: "Creative", 
      description: "Bold design for creative industries",
      color: "from-orange-500 to-red-600",
      component: <CreativeTemplate /> 
    },
    { 
      key: "executive", 
      name: "Executive", 
      description: "Premium layout for senior professionals",
      color: "from-indigo-600 to-purple-700",
      component: <ExecutiveTemplate /> 
    },
    { 
      key: "grid", 
      name: "Grid Layout", 
      description: "Modern 4-column layout with organized sections",
      color: "from-teal-500 to-cyan-600",
      component: <GridLayoutTemplate /> 
    },
    { 
      key: "card", 
      name: "Card Layout", 
      description: "3-row card-based design with modern aesthetics",
      color: "from-rose-500 to-orange-600",
      component: <CardLayoutTemplate /> 
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 -left-4 w-96 h-96 bg-indigo-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 right-1/3 w-64 h-64 bg-pink-300 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">

      {/* 🆕 Back Button */}
      {cameFromBuilder && (
        <div className="mb-6">
          <button
            onClick={() => navigate("/builder", { state: { fromTemplates: true } })}
            className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-gray-700 transition"
          >
            ← Back to Preview
          </button>
        </div>
      )}

      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-white/50 shadow-lg mb-6">
          <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700">6 Professional Templates</span>
        </div>
        
        <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent mb-4">
          Choose Your Template
        </h1>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Select a template that matches your industry and style preferences. 
          Each template is optimized for different career paths and hiring systems.
        </p>
      </div>

      {/* Templates Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template, index) => (
          <div
            key={template.key}
            onClick={() => setSelected(template.key)}
            className={`group cursor-pointer bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50 ${
              selected === template.key 
                ? "ring-4 ring-indigo-500 shadow-2xl scale-105" 
                : "hover:scale-102"
            }`}
          >
            {/* Template Header */}
            <div className={`flex items-center justify-between mb-4`}>
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors duration-300">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{template.description}</p>
              </div>
              <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${template.color} opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-2 group-hover:translate-x-0`}></div>
            </div>

            {/* Template Preview */}
            <div className="relative overflow-hidden rounded-xl border border-gray-200 group-hover:border-indigo-300 transition-colors duration-300">
              <TemplateThumbnail>
                {template.component}
              </TemplateThumbnail>
              
              {/* Selection Overlay */}
              {selected === template.key && (
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent rounded-xl"></div>
              )}
              
              {/* Selection Indicator */}
              <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 transition-all duration-500 ${
                selected === template.key 
                  ? "bg-indigo-500 border-white shadow-lg" 
                  : "border-gray-300 group-hover:border-indigo-400"
              }`}>
                {selected === template.key && (
                  <svg className="w-4 h-4 text-white mx-auto mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>

            {/* Features Badge */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex space-x-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Professional</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Printable</span>
              </div>
              <span className="text-xs text-gray-500">Click to select</span>
            </div>
          </div>
        ))}
      </div>

      {/* Apply Button */}
      <div className="text-center">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to Apply Your Template?</h2>
          <p className="text-gray-600 mb-6">
            Selected: <span className="font-semibold text-indigo-600">{templates.find(t => t.key === selected)?.name}</span>
          </p>
          
          <button
            onClick={async () => {
              setIsApplying(true);
              
              // Simulate loading for better UX
              await new Promise(resolve => setTimeout(resolve, 1000));
              
              setTemplate(selected);
              navigate("/builder", { state: { fromTemplates: true } });
            }}
            disabled={isApplying}
            className={`px-10 py-4 rounded-xl text-lg font-bold text-white transition-all duration-300 transform ${
              isApplying
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 hover:shadow-2xl shadow-lg"
            }`}
          >
            {isApplying ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Applying Template...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-3">
                <span>Apply Template</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            )}
          </button>
          
          <p className="text-xs text-gray-500 mt-4">
            Your resume content will be preserved and reformatted to match the selected template style.
          </p>
        </div>
      </div>

    </div>
  </div>
  );
}

export default TemplatesPage;