import { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ResumeContext } from "../context/ResumeContext";
import WizardContainer from "../components/WizardContainer";
import ResumePreview from "../preview/ResumePreview";
import SectionManager from "../components/SectionManager";
import Logo from "../components/Logo";
import LivePreviewControls from "../components/LivePreviewControls";
import ColorPalettePicker from "../components/ColorPalettePicker";
import TypographyControls from "../components/TypographyControls";
import ResumeScoreSystem from "../components/ResumeScoreSystem";
import CompactResumeStats from "../components/CompactResumeStats";
import html2pdf from "html2pdf.js";

function Builder() {
  const { setCurrentStep, steps, resumeData } = useContext(ResumeContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState("wizard");
  const [isEditing, setIsEditing] = useState(false);
  const [showReorder, setShowReorder] = useState(false);
  const [showEditDropdown, setShowEditDropdown] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (location.state?.fromTemplates) {
      setMode("preview");
    }
  }, [location.state]);

  const downloadPDF = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      const element = document.getElementById("resume-preview");
      
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      const opt = {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(element).save();
      
      // Complete progress
      setTimeout(() => {
        setDownloadProgress(100);
        setTimeout(() => {
          setIsDownloading(false);
          setDownloadProgress(0);
        }, 500);
      }, 1000);

      } catch (error) {
      console.error("PDF generation failed:", error);
      setIsDownloading(false);
      setDownloadProgress(0);
      // You could add a toast notification here for better UX
      alert("PDF generation failed. Please try again or check your browser settings.");
    }
  };

  // Calculate completion percentage
  const calculateCompletion = () => {
    const totalSections = 9; // personal, summary, education, experience, skills, projects, certifications, achievements, languages, interests
    let completed = 0;

    // Personal info (required fields)
    if (resumeData.personalInfo?.name && resumeData.personalInfo?.email) completed++;
    
    // Summary
    if (resumeData.summary?.trim()) completed++;
    
    // Education
    if (resumeData.education?.length > 0) completed++;
    
    // Experience
    if (resumeData.experience?.length > 0) completed++;
    
    // Skills
    if (resumeData.skills?.length > 0) completed++;
    
    // Projects
    if (resumeData.projects?.length > 0) completed++;
    
    // Additional sections
    if (resumeData.certifications?.length > 0 || 
        resumeData.achievements?.length > 0 || 
        resumeData.languages?.length > 0 || 
        resumeData.interests?.length > 0) completed++;

    return Math.round((completed / totalSections) * 100);
  };

  const completionPercentage = calculateCompletion();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      {/* ================= WIZARD MODE ================= */}
      {mode === "wizard" && (
        <div className="max-w-4xl mx-auto py-8 px-4">
          {/* Progress Bar */}
          <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-900">Resume Progress</h2>
              <span className="text-sm text-gray-600 font-medium">{completionPercentage}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Fill in all sections for the best results</p>
          </div>

          <WizardContainer
            setMode={setMode}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </div>
      )}

      {/* ================= PREVIEW MODE ================= */}
      {mode === "preview" && (
        <div className="flex flex-col min-h-screen">

          {/* ================= TOP NAVBAR ================= */}
          <div className="bg-white shadow-lg border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    ElevateCV
                  </h1>
                  
                  {/* Completion Badge */}
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-full px-3 py-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-700">{completionPercentage}% Complete</span>
                  </div>
                </div>

                {/* Desktop Quick Actions */}
                <div className="hidden md:flex items-center space-x-3">
                  <button
                    onClick={() => setMode("wizard")}
                    className="px-4 py-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-300"
                  >
                    Edit Resume
                  </button>
                  
                  <button
                    onClick={() =>
                      navigate("/templates", { state: { fromBuilder: true } })
                    }
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    Change Template
                  </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-200 hover:bg-white transition-all duration-300"
                  >
                    <svg 
                      className={`w-6 h-6 text-gray-700 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      {isMobileMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Drawer */}
          <div className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className={`fixed top-0 right-0 w-72 h-full bg-white shadow-xl transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} border-l border-gray-200`}>
              <div className="p-6">
                {/* Drawer Header */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-3">
                    <Logo size="small" />
                    <span className="text-lg font-bold text-gray-900">ElevateCV</span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Resume Stats */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-4 border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Resume Stats</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Completion</span>
                    <span className="text-sm font-medium text-green-600">{completionPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Navigation Sections */}
                <div className="space-y-6">

                  {/* Quick Actions */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setMode("wizard");
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all duration-300 group"
                      >
                        <span className="text-lg">✏️</span>
                        <span className="font-medium">Edit Resume</span>
                        <svg className="w-4 h-4 ml-auto text-gray-400 group-hover:text-indigo-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigate("/templates", { state: { fromBuilder: true } });
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-all duration-300 group"
                      >
                        <span className="text-lg">🎨</span>
                        <span className="font-medium">Change Template</span>
                        <svg className="w-4 h-4 ml-auto text-gray-400 group-hover:text-purple-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Edit Sections */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Edit Sections</h3>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {steps.map((step, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setCurrentStep(index);
                            setMode("wizard");
                            setIsEditing(true);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-all duration-300"
                        >
                          {step.charAt(0).toUpperCase() + step.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Customize Layout */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Customize Layout</h3>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setShowReorder(true);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all duration-300 group"
                    >
                      <span className="text-lg">🔄</span>
                      <span className="font-medium">Reorder Sections</span>
                      <svg className="w-4 h-4 ml-auto text-gray-400 group-hover:text-indigo-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Export Options */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Export Options</h3>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        downloadPDF();
                      }}
                      disabled={isDownloading}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                        isDownloading
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105"
                      }`}
                    >
                      <span className="text-lg">📄</span>
                      <span>{isDownloading ? `Generating... ${downloadProgress}%` : 'Download PDF'}</span>
                    </button>
                    
                    {/* Download Progress Bar */}
                    {isDownloading && (
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${downloadProgress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>

                  {/* Live Preview Controls */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Live Preview</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          // Toggle live preview
                        }}
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300"
                      >
                        Toggle Live Preview
                      </button>
                    </div>
                  </div>

                  {/* Color & Typography */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Design</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          // Open color picker
                        }}
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300"
                      >
                        Color Palette
                      </button>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          // Open typography controls
                        }}
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300"
                      >
                        Typography
                      </button>
                    </div>
                  </div>

                  {/* Resume Score */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Resume Score</h3>
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-3 border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Overall Score</span>
                        <span className="text-sm font-bold text-purple-600">85/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full w-5/6"></div>
                      </div>
                    </div>
                  </div>

                  {/* AI Recommendations */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">AI Recommendations</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          // Open AI recommendations
                        }}
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300"
                      >
                        View Suggestions
                      </button>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          // Apply all suggestions
                        }}
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300"
                      >
                        Apply All Suggestions
                      </button>
                    </div>
                  </div>

                  {/* Live Preview Controls */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Live Preview</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          // Toggle live preview
                        }}
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300"
                      >
                        Toggle Live Preview
                      </button>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          // Sync preview
                        }}
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300"
                      >
                        Sync Preview
                      </button>
                    </div>
                  </div>

                  {/* Color & Typography */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Design</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          // Open color picker
                        }}
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300"
                      >
                        Color Palette
                      </button>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          // Open typography controls
                        }}
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300"
                      >
                        Typography
                      </button>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          // Open font size controls
                        }}
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300"
                      >
                        Font Size
                      </button>
                    </div>
                  </div>

                  {/* Additional Features */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Additional Tools</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          // Toggle section visibility
                        }}
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300"
                      >
                        Toggle Sections
                      </button>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          // Reset to defaults
                        }}
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300"
                      >
                        Reset to Defaults
                      </button>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          // Save progress
                        }}
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300"
                      >
                        Save Progress
                      </button>
                    </div>
                  </div>

                </div>

                {/* Divider */}
                <div className="my-6 border-t border-gray-200"></div>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setMode("wizard");
                  }}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
                >
                  Continue Editing
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full mt-4 py-2 text-gray-500 hover:text-gray-700 transition-colors duration-300 text-center"
                >
                  Close Menu
                </button>
              </div>
            </div>
          </div>

          {/* ================= BODY ================= */}
          <div className="flex flex-1">

            {/* ================= LEFT SIDEBAR ================= */}
            <div className="w-64 bg-white shadow-xl border-r border-gray-100 p-6 space-y-6 overflow-y-auto hidden lg:block">
              
              {/* Resume Stats */}
              <CompactResumeStats />

              {/* Edit Section */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 mb-2">Quick Navigation</h3>
                <div className="relative">
                  <button
                    onClick={() => setShowEditDropdown(!showEditDropdown)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-between"
                  >
                    <span className="font-medium">Edit Sections</span>
                    <svg className={`w-4 h-4 transition-transform duration-300 ${showEditDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showEditDropdown && (
                    <div className="mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-2 animate-in slide-in-from-top-2 duration-200">
                      {steps.map((step, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setCurrentStep(index);
                            setMode("wizard");
                            setIsEditing(true);
                            setShowEditDropdown(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-300 text-sm"
                        >
                          {step.charAt(0).toUpperCase() + step.slice(1)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Reorder Sections */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 mb-2">Customize Layout</h3>
                <div className="relative">
                  <button
                    onClick={() => setShowReorder(!showReorder)}
                    className="w-full px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 flex items-center justify-between"
                  >
                    <span className="font-medium">Reorder Sections</span>
                    <svg className={`w-4 h-4 transition-transform duration-300 ${showReorder ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>

                  {showReorder && (
                    <div className="mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-3 animate-in slide-in-from-top-2 duration-200">
                      <SectionManager />
                    </div>
                  )}
                </div>
              </div>

              {/* Download Section */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 mb-2">Export Options</h3>
                
                <button
                  onClick={downloadPDF}
                  disabled={isDownloading}
                  className={`w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg ${
                    isDownloading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 hover:shadow-xl"
                  }`}
                >
                  {isDownloading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating PDF... {downloadProgress}%</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Download PDF</span>
                    </div>
                  )}
                </button>

                {/* Download Progress Bar */}
                {isDownloading && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${downloadProgress}%` }}
                    ></div>
                  </div>
                )}
              </div>

              {/* Live Preview Controls */}
              <LivePreviewControls />

              {/* Color Palette Picker */}
              <ColorPalettePicker />
            </div>

            {/* ================= CENTER PREVIEW ================= */}
            <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 overflow-auto p-4 md:p-8">
              <div className="flex justify-center items-start">
                {/* Single A4 Page with Enhanced Shadow */}
                <div
                  id="resume-preview"
                  className="bg-white shadow-2xl border border-gray-200 w-full max-w-[794px] min-h-[1123px] mx-auto"
                >
                  <ResumePreview />
                </div>
              </div>
            </div>

            {/* ================= RIGHT SIDEBAR ================= */}
            <div className="w-80 bg-white shadow-xl border-l border-gray-100 p-6 space-y-6 overflow-y-auto hidden xl:block">
              
              {/* Resume Score System */}
              <ResumeScoreSystem />

              {/* Typography Controls */}
              <TypographyControls />
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default Builder;
