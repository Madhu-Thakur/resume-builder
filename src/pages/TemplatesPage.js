import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ResumeContext } from "../context/ResumeContext";
import TemplateThumbnail from "../components/TemplateThumbnail";

import ClassicTemplate from "../templates/ClassicTemplate";
import ModernSidebarTemplate from "../templates/ModernSidebarTemplate";
import MinimalATSTemplate from "../templates/MinimalATSTemplate";
import CompactTemplate from "../templates/CompactTemplate";
import CreativeTemplate from "../templates/CreativeTemplate";
import ExecutiveTemplate from "../templates/ExecutiveTemplate";

function TemplatesPage() {
  const { setTemplate } = useContext(ResumeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [selected, setSelected] = useState("classic");

  // 🆕 Detect if user came from Builder
  const cameFromBuilder = location.state?.fromBuilder;

  const templates = [
    { key: "classic", name: "Classic", component: <ClassicTemplate /> },
    { key: "modern", name: "Modern Sidebar", component: <ModernSidebarTemplate /> },
    { key: "ats", name: "Minimal ATS", component: <MinimalATSTemplate /> },
    { key: "compact", name: "Compact", component: <CompactTemplate /> },
    { key: "creative", name: "Creative", component: <CreativeTemplate /> },
    { key: "executive", name: "Executive", component: <ExecutiveTemplate /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-10">

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

      {/* Header */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <h1 className="text-4xl font-bold">
          Choose Free Templates
        </h1>

        <button
          className="px-4 py-2 text-sm font-semibold rounded-full 
                     bg-gradient-to-r from-purple-600 to-indigo-600 
                     text-white shadow-md hover:scale-105 transition-all duration-300"
        >
          <span>Advanced Templates</span>
          <span className="ml-1">🔒</span>
        </button>
      </div>

      {/* Templates Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8">
        {templates.map((template) => (
          <div
            key={template.key}
            onClick={() => setSelected(template.key)}
            className={`cursor-pointer p-4 rounded-2xl transition-all duration-300 bg-white shadow-lg hover:scale-105
              ${selected === template.key ? "ring-4 ring-indigo-600" : ""}
            `}
          >
            <TemplateThumbnail>
              {template.component}
            </TemplateThumbnail>

            <h3 className="mt-4 text-lg font-semibold text-center">
              {template.name}
            </h3>
          </div>
        ))}
      </div>

      {/* Apply Button */}
      <div className="flex justify-center mt-12">
        <button
          onClick={() => {
            setTemplate(selected);
            navigate("/builder", { state: { fromTemplates: true } });
          }}
          className="px-8 py-3 bg-indigo-600 text-white rounded-xl text-lg font-semibold hover:scale-105 transition"
        >
          Apply Template
        </button>
      </div>

    </div>
  );
}

export default TemplatesPage;