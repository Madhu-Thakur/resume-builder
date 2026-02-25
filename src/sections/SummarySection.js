import { useContext, useRef, useState } from "react";
import { ResumeContext } from "../context/ResumeContext";
import { enhanceSummary } from "../ai/AiEnhancer";

function SummarySection() {
  const { resumeData, updateField } = useContext(ResumeContext);
  const [loading, setLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState('');
  const textareaRef = useRef(null);

  const handleEnhance = async () => {
    if (!resumeData.summary) {
      setAiStatus('Please write a summary first to enhance it with AI');
      return;
    }

    setLoading(true);
    setAiStatus('Enhancing your summary with AI...');

    try {
      const enhanced = await enhanceSummary(resumeData.summary);
      updateField("summary", enhanced);

      // Auto resize after AI update
      setTimeout(() => {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height =
          textareaRef.current.scrollHeight + "px";
      }, 0);

      setAiStatus('Summary enhanced successfully! ✨');
      
      // Clear status after 3 seconds
      setTimeout(() => setAiStatus(''), 3000);
    } catch (error) {
      setAiStatus('AI enhancement failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    updateField("summary", e.target.value);

    // Auto resize
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";
  };

  const summaryText = resumeData.summary || "";
  const charCount = summaryText.length;
  const isOptimalLength = charCount >= 100 && charCount <= 300;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Professional Summary / Objective
        </h2>
        <p className="text-gray-600 text-sm">Craft a compelling summary that highlights your key skills and career goals</p>
      </div>

      <div className="relative">
        <textarea
          ref={textareaRef}
          rows="5"
          value={summaryText}
          onChange={handleChange}
          placeholder="Write a compelling professional summary that highlights your key skills, experience, and career goals..."
          className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none focus:ring-0 transition-all duration-300 resize-none shadow-sm"
        />

        {/* Character Counter */}
        <div className={`absolute bottom-3 right-3 text-sm font-medium transition-colors duration-300 ${
          isOptimalLength ? 'text-green-600' : charCount > 300 ? 'text-red-500' : 'text-gray-500'
        }`}>
          {charCount}/300 characters
          {isOptimalLength && <span className="ml-2 text-green-600">✓ Optimal length</span>}
        </div>
      </div>

      {/* AI Enhancement Section */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">AI Enhancement</h3>
            <p className="text-sm text-gray-600">
              Let our AI help you create a more impactful and ATS-friendly summary
            </p>
          </div>
          
          {/* Status Message */}
          {aiStatus && (
            <div className={`text-sm p-3 rounded-lg ${
              aiStatus.includes('successfully') 
                ? 'bg-green-100 text-green-800' 
                : aiStatus.includes('failed') 
                ? 'bg-red-100 text-red-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {aiStatus}
            </div>
          )}
          
          {/* Button - Responsive Layout */}
          <div className="flex justify-end">
            <button
              onClick={handleEnhance}
              disabled={loading}
              className={`px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 shadow-lg ${
                loading
                  ? "bg-gray-400 cursor-not-allowed hover:scale-100"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 hover:shadow-xl transform transition-all duration-300"
              }`}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Enhancing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>✨</span>
                  <span>Enhance with AI</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Writing Tips */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h4 className="font-medium text-gray-900 mb-2">Writing Tips:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Focus on your key achievements and skills</li>
          <li>• Use strong action verbs and industry keywords</li>
          <li>• Keep it concise and impactful (100-300 characters)</li>
          <li>• Tailor it to the job you're applying for</li>
        </ul>
      </div>
    </div>
  );
}

export default SummarySection;
