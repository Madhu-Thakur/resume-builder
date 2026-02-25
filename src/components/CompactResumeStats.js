import React, { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

function CompactResumeStats() {
  const { resumeData } = useContext(ResumeContext);

  // Calculate stats
  const totalSections = 9; // personal, summary, education, experience, skills, projects, certifications, achievements, languages, interests
  const completedSections = Object.keys(resumeData).filter(key => 
    key !== 'personalInfo' && key !== 'template' && key !== 'currentStep' && key !== 'sectionOrder'
  ).length;

  const stats = {
    sections: completedSections,
    skills: resumeData.skills?.length || 0,
    experience: resumeData.experience?.length || 0,
    education: resumeData.education?.length || 0,
    projects: resumeData.projects?.length || 0,
    certifications: resumeData.certifications?.length || 0
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-3">
      <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
        <span className="mr-2">📊</span>
        Resume Stats
      </h4>
      
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-white rounded-lg p-2">
          <div className="text-gray-600">Sections</div>
          <div className="font-bold text-indigo-600">{stats.sections}/9</div>
        </div>
        <div className="bg-white rounded-lg p-2">
          <div className="text-gray-600">Skills</div>
          <div className="font-bold text-indigo-600">{stats.skills}</div>
        </div>
        <div className="bg-white rounded-lg p-2">
          <div className="text-gray-600">Experience</div>
          <div className="font-bold text-indigo-600">{stats.experience}</div>
        </div>
        <div className="bg-white rounded-lg p-2">
          <div className="text-gray-600">Education</div>
          <div className="font-bold text-indigo-600">{stats.education}</div>
        </div>
        <div className="bg-white rounded-lg p-2">
          <div className="text-gray-600">Projects</div>
          <div className="font-bold text-indigo-600">{stats.projects}</div>
        </div>
        <div className="bg-white rounded-lg p-2">
          <div className="text-gray-600">Certifications</div>
          <div className="font-bold text-indigo-600">{stats.certifications}</div>
        </div>
      </div>

      {/* Progress Ring */}
      <div className="mt-3 flex items-center justify-center">
        <div className="relative">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
            {/* Background circle */}
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="2"
            />
            {/* Progress circle */}
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${(completedSections / 9) * 100} 100`}
              className="transition-all duration-500 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#A78BFA" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-xs font-semibold text-gray-900">
              {Math.round((completedSections / 9) * 100)}%
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 text-xs text-center text-gray-600">
        {completedSections === 9 ? "Excellent! All sections complete." : "Keep going!"}
      </div>
    </div>
  );
}

export default CompactResumeStats;