import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

function Help() {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "How do I create a resume?",
      answer: "Start by clicking 'Get Started' on the homepage, then choose between 'Wizard Mode' for guided creation or 'Manual Mode' for full control. Fill in your information section by section, and your resume will update in real-time.",
      category: "Getting Started"
    },
    {
      question: "What is ATS compatibility?",
      answer: "ATS (Applicant Tracking System) compatibility means your resume is formatted to pass through automated screening software used by employers. Our templates and AI suggestions ensure your resume gets seen by human eyes.",
      category: "Technical"
    },
    {
      question: "How do I change templates?",
      answer: "Click 'View Templates' from any page to browse our template gallery. Select a template to apply it to your current resume, or start fresh with a new template from the homepage.",
      category: "Customization"
    },
    {
      question: "Can I reorder sections in my resume?",
      answer: "Yes! In the Builder view, click 'Customize Layout' in the left sidebar, then drag and drop sections to reorder them. Your changes will be reflected immediately in the preview.",
      category: "Customization"
    },
    {
      question: "How do I download my resume?",
      answer: "Once your resume is complete, click the 'Download PDF' button in the left sidebar. Your resume will be generated as a high-quality PDF file ready for printing or sharing.",
      category: "Export"
    },
    {
      question: "What makes a good resume summary?",
      answer: "A strong summary should be 2-3 sentences highlighting your key skills, years of experience, and career goals. Focus on what you can offer employers rather than what you want from a job.",
      category: "Content Tips"
    },
    {
      question: "How many skills should I include?",
      answer: "Aim for 6-10 relevant skills that match the job description. Include a mix of technical skills (software, tools) and soft skills (communication, leadership). Prioritize quality over quantity.",
      category: "Content Tips"
    },
    {
      question: "Can I add custom sections?",
      answer: "Yes! In the Builder view, you can add additional sections like Certifications, Languages, Interests, and Achievements. These help showcase your unique qualifications and personality.",
      category: "Customization"
    }
  ];

  const tips = [
    {
      title: "Resume Length",
      description: "Keep your resume to 1-2 pages maximum. Focus on the most relevant experience and skills for the position you're applying for.",
      icon: "📄"
    },
    {
      title: "Keywords",
      description: "Use keywords from the job description throughout your resume. This helps both ATS systems and hiring managers see your qualifications.",
      icon: "🔑"
    },
    {
      title: "Action Verbs",
      description: "Start bullet points with strong action verbs like 'Managed', 'Created', 'Improved', or 'Led' to make your accomplishments stand out.",
      icon: "💪"
    },
    {
      title: "Quantify Achievements",
      description: "Use numbers and metrics whenever possible. Instead of 'Improved sales', say 'Increased sales by 25% in 6 months'.",
      icon: "📊"
    },
    {
      title: "Proofread Carefully",
      description: "Always review your resume for spelling and grammar errors. Consider asking a friend to review it as well.",
      icon: "👀"
    },
    {
      title: "Tailor for Each Job",
      description: "Customize your resume for each position by emphasizing the most relevant skills and experiences.",
      icon: "🎯"
    }
  ];

  const supportLinks = [
    {
      title: "Video Tutorials",
      description: "Watch step-by-step video guides on creating the perfect resume.",
      icon: "🎥",
      action: "Watch Videos"
    },
    {
      title: "Template Gallery",
      description: "Explore all available resume templates and see examples.",
      icon: "🖼️",
      action: "Browse Templates"
    },
    {
      title: "Contact Support",
      description: "Get help from our support team for any questions or issues.",
      icon: "📧",
      action: "Contact Us"
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
                onClick={() => navigate("/features")}
                className="px-4 py-2 text-gray-600 hover:text-indigo-600 transition-colors duration-300"
              >
                Features
              </button>
              <button 
                onClick={() => navigate("/templates")}
                className="px-4 py-2 text-gray-600 hover:text-indigo-600 transition-colors duration-300"
              >
                Templates
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Need Help?
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              We've Got You Covered
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Find answers to common questions, get resume writing tips, and learn how to make the most of ElevateCV.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/mode")}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:scale-105 transition-all duration-300 font-semibold text-lg shadow-lg"
            >
              Start Building Resume
            </button>
            <button
              onClick={() => navigate("/templates")}
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-indigo-400 hover:text-indigo-600 transition-all duration-300 font-semibold text-lg"
            >
              Browse Templates
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="py-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Help Articles</h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Type your question here..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-300 font-medium">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-lg">Find answers to the most common questions about using ElevateCV.</p>
          </div>
          
          <div className="grid gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full mb-3">
                      {faq.category}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resume Tips Section */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Resume Writing Tips</h2>
            <p className="text-gray-600 text-lg">Expert advice to help you create a standout resume.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tips.map((tip, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {tip.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{tip.title}</h3>
                <p className="text-gray-600 leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support Links */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Additional Support</h2>
            <p className="text-gray-600 text-lg">Explore more resources to help you succeed.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {supportLinks.map((link, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 text-center group cursor-pointer">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {link.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{link.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{link.description}</p>
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:scale-105 transition-all duration-300 font-medium">
                  {link.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Still Need Help?</h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
            Our team is here to help you create the perfect resume. Whether you have questions about features, need template recommendations, or want resume writing advice, we're just a message away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/mode")}
              className="px-8 py-4 bg-white text-indigo-600 rounded-xl hover:scale-105 transition-all duration-300 font-semibold text-lg shadow-lg"
            >
              Start Building Now
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-indigo-600 transition-all duration-300 font-semibold text-lg">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;