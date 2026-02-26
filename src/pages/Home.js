import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../components/Logo";

function Home() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Features", path: "/features", icon: "✨" },
    { name: "Templates", path: "/templates", icon: "🎨" },
    { name: "Help", path: "/help", icon: "❓" }
  ];

  const handleNavigation = (path) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="min-h-screen">
      
      {/* Content */}
      <div className="min-h-screen bg-gradient-to-br from-white/80 via-transparent to-white/80 backdrop-blur-[2px]">
        
        {/* Header Section */}
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Logo size="large" />
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-4">
              <button 
                onClick={() => navigate("/features")}
                className="px-4 py-2 text-gray-600 hover:text-indigo-600 transition-colors duration-300 font-medium"
              >
                Features
              </button>
              <button 
                onClick={() => navigate("/templates")}
                className="px-4 py-2 text-gray-600 hover:text-indigo-600 transition-colors duration-300 font-medium"
              >
                Templates
              </button>
              <button 
                onClick={() => navigate("/help")}
                className="px-4 py-2 text-gray-600 hover:text-indigo-600 transition-colors duration-300 font-medium"
              >
                Help
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

        {/* Mobile Drawer */}
        <div className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className={`fixed top-0 right-0 w-64 h-full bg-white shadow-xl transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} border-l border-gray-200`}>
            <div className="p-6">
              {/* Drawer Header */}
              <div className="flex justify-between items-center mb-8">
                <Logo size="small" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Items */}
              <div className="space-y-2">
                {navigationItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavigation(item.path)}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all duration-300 group"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                    <svg className="w-4 h-4 ml-auto text-gray-400 group-hover:text-indigo-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="my-6 border-t border-gray-200"></div>

              {/* CTA Button */}
              <button
                onClick={() => handleNavigation("/mode")}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
              >
                Get Started
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

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
          
          {/* Main Heading */}
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 leading-tight">
              Build Your
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Professional Resume
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Create stunning, ATS-friendly resumes in minutes. Choose from beautiful templates, 
              customize with ease, and download your perfect resume today.
            </p>
          </div>

          {/* CTA Button */}
          <div className="space-y-4 md:space-y-0 md:space-x-6 flex flex-col md:flex-row items-center">
            <button
              onClick={() => navigate("/mode")}
              className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 font-semibold text-lg"
            >
              <div className="flex items-center space-x-3">
                <span>Get Started</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </button>
            
            <button
              onClick={() => navigate("/templates")}
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:border-indigo-400 hover:text-indigo-600 transition-all duration-300 font-semibold text-lg"
            >
              View Templates
            </button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">6+</div>
              <div className="text-gray-600">Professional Templates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">100%</div>
              <div className="text-gray-600">ATS Compatible</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">5 Min</div>
              <div className="text-gray-600">Resume Creation</div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="py-12 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Elevate Your Career?</h2>
            <p className="text-gray-600 mb-8">Join thousands of professionals who've already created their perfect resume</p>
            <button
              onClick={() => navigate("/mode")}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:scale-105 transition-all duration-300 font-semibold"
            >
              Start Building Your Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
