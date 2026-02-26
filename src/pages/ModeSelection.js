import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

function ModeSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      
      {/* Content */}
      <div className="min-h-screen bg-white/30 backdrop-blur-sm">
        
        {/* Header */}
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-center">
            <Logo size="large" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex items-center justify-center px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Choose Your Resume Type
            </h1>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Select the resume style that best fits your experience level and career goals. 
              Both options include all the features you need to create a professional resume.
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              
              <div
                onClick={() => navigate("/builder")}
                className="group cursor-pointer bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50 hover:scale-105"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                    Fresher Resume
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Perfect for students, recent graduates, and professionals with limited work experience. 
                    Focus on education, skills, and potential.
                  </p>
                  <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    <span>Student-Friendly</span>
                  </div>
                </div>
              </div>

              <div
                onClick={() => navigate("/builder")}
                className="group cursor-pointer bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50 hover:scale-105"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                    Professional Resume
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Designed for experienced professionals. Emphasize work experience, 
                    achievements, and career progression.
                  </p>
                  <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    <span>Experience-Focused</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Features Grid */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/50">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-center">ATS Compatible</h3>
                <p className="text-sm text-gray-600 text-center">All templates pass through Applicant Tracking Systems</p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/50">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-center">Quick Setup</h3>
                <p className="text-sm text-gray-600 text-center">Create your resume in under 5 minutes</p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/50">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-center">Professional Design</h3>
                <p className="text-sm text-gray-600 text-center">Beautiful, modern templates that impress</p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12">
              <button
                onClick={() => navigate("/builder")}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:scale-105 transition-all duration-300 font-semibold text-lg shadow-lg"
              >
                Get Started - It's Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModeSelection;
