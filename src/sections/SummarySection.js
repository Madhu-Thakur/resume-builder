import { useContext, useRef, useState } from "react";
import { ResumeContext } from "../context/ResumeContext";
import { enhanceSummary } from "../ai/AiEnhancer";

function SummarySection() {
  const { resumeData, updateField } = useContext(ResumeContext);
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);

  const handleEnhance = async () => {
    if (!resumeData.summary) return;

    setLoading(true);

    const enhanced = await enhanceSummary(resumeData.summary);

    updateField("summary", enhanced);

    setLoading(false);

    // Auto resize after AI update
    setTimeout(() => {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }, 0);
  };

  const handleChange = (e) => {
    updateField("summary", e.target.value);

    // Auto resize
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";
  };

  const summaryText = resumeData.summary || "";

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Professional Summary / Objective
      </h2>

      <div className="relative">
        <textarea
          ref={textareaRef}
          rows="4"
          value={summaryText}
          onChange={handleChange}
          placeholder="Write a short professional summary..."
          className="w-full p-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition-all duration-300"
        />

        <div className="absolute bottom-2 right-3 text-sm text-gray-500">
          {summaryText.length} characters
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-3">
        Tip: Keep it concise (3–5 lines highlighting your skills and goals).
      </p>

      {/* 🔥 AI Enhance Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleEnhance}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white transition-all duration-300
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:scale-105"
            }`}
        >
          {loading ? "Enhancing..." : "✨ Enhance with AI"}
        </button>
      </div>
    </div>
  );
}

export default SummarySection;