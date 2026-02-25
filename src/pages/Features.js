import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

function Features() {
  const navigate = useNavigate();

  const features = [
    {
      title: "AI-Powered Resume Enhancement",
      description: "Leverage advanced AI to optimize your resume content, suggest improvements, and ensure ATS compatibility.",
      icon: "🤖",
      color: "from-blue-500 to-cyan-500",
      highlights: [
        "Smart content suggestions",
        "ATS optimization",
        "Professional language enhancement",
        "Keyword optimization"
      ]
    },
    {
      title: "Live Preview & Synchronization",
      description: "See your resume updates in real-time as you make changes, ensuring perfect formatting and layout.",
      icon: "👁️",
      color: "from-purple-500 to-pink-500",
      highlights: [
        "Real-time preview updates",
        "Instant formatting feedback",
        "Live section reordering",
        "Typography preview"
      ]
    },
    {
      title: "Professional Templates",
      description: "Choose from 6+ professionally designed templates that are modern, clean, and industry-standard.",
      icon: "🎨",
      color: "from-green-500 to-emerald-500",
      highlights: [
        "6+ premium templates",
        "Industry-specific designs",
        "Responsive layouts",
        "Print-ready formats"
      ]
    },
    {
      title: "Smart Section Management",
      description: "Easily add, remove, and reorder resume sections with intuitive drag-and-drop functionality.",
      icon: "🔧",
      color: "from-orange-500 to-red-500",
      highlights: [
        "Drag-and-drop reordering",
        "Customizable sections",
        "Smart section suggestions",
        "Flexible layout options"
      ]
    },
    {
      title: "Color & Typography Control",
      description: "Personalize your resume with extensive color palette options and typography settings.",
      icon: "🌈",
      color: "from-indigo-500 to-purple-500",
      highlights: [
        "10+ color palettes",
        "Multiple font options",
        "Customizable spacing",
        "Professional styling"
      ]
    },
    {
      title: "Resume Scoring System",
      description: "Get instant feedback on your resume quality with our comprehensive scoring algorithm.",
      icon: "📊",
      color: "from-yellow-500 to-orange-500",
      highlights: [
        "Content quality scoring",
        "Formatting analysis",
        "ATS compatibility check",
        "Professional recommendations"
      ]
    },
    {
      title: "Export & Sharing",
      description: "Download your resume in multiple formats and share it easily with employers and recruiters.",
      icon: "📤",
      color: "from-teal-500 to-blue-500",
      highlights: [
        "PDF export",
        "High-quality formatting",
        "Print-ready output",
        "Easy sharing options"
      ]
    },
    {
      title: "Progress Tracking",
      description: "Monitor your resume completion progress with visual indicators and helpful guidance.",
      icon: "📈",
      color: "from-pink-500 to-purple-500",
      highlights: [
        "Completion percentage",
        "Section progress tracking",
        "Guided completion flow",
        "Motivational feedback"
      ]
    }
  ];

  const benefits = [
    {
      title: "Save Time",
      description: "Create a professional resume in minutes, not hours.",
      icon: "⏱️"
    },
    {
      title: "Increase Chances",
      description: "ATS-optimized resumes that pass automated screening.",
      icon: "🎯"
    },
    {
      title: "Professional Quality",
      description: "Templates designed by professional resume experts.",
      icon: "⭐"
    },
    {
      title: "Easy to Use",
      description: "Intuitive interface that anyone can master quickly.",
      icon: "😊"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Logo size="medium" />
            <div className="flex space-x-4">
              <button 
                onClick={() => navigate("/")}
                className="px-4 py-2 text-gray-600 hover:text-indigo-600 transition-colors duration-300"
              >
                Home
              </button>
              <button 
                onClick={() => navigate("/templates")}
                className="px-4 py-2 text-gray-600 hover:text-indigo-600 transition-colors duration-300"
              >
                Templates
              </button>
              <button 
                onClick={() => navigate("/help")}
                className="px-4 py-2 text-gray-600 hover:text-indigo-600 transition-colors duration-300"
              >
                Help
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Powerful Features for
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Your Perfect Resume
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Everything you need to create a standout resume that gets noticed by employers and passes automated screening systems.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/mode")}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:scale-105 transition-all duration-300 font-semibold text-lg shadow-lg"
            >
              Get Started Now
            </button>
            <button
              onClick={() => navigate("/templates")}
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-indigo-400 hover:text-indigo-600 transition-all duration-300 font-semibold text-lg"
            >
              View Templates
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {feature.highlights.map((highlight, hIndex) => (
                        <div key={hIndex} className="flex items-center space-x-2 text-sm text-gray-700">
                          <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose ElevateCV?</h2>
            <p className="text-gray-600 text-lg">Experience the difference with our comprehensive resume building platform.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Elevate Your Resume?</h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have already created their perfect resume with our powerful tools and templates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/mode")}
              className="px-8 py-4 bg-white text-indigo-600 rounded-xl hover:scale-105 transition-all duration-300 font-semibold text-lg shadow-lg"
            >
              Start Building Now
            </button>
            <button
              onClick={() => navigate("/templates")}
              className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-indigo-600 transition-all duration-300 font-semibold text-lg"
            >
              Browse Templates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;