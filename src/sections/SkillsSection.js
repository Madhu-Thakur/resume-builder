import { useContext, useState } from "react";
import { ResumeContext } from "../context/ResumeContext";

function SkillsSection() {
  const { resumeData, updateField } = useContext(ResumeContext);
  const skills = resumeData.skills || [];

  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      updateField("skills", [...skills, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeSkill = (index) => {
    const updated = skills.filter((_, i) => i !== index);
    updateField("skills", updated);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Skills</h2>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Type a skill and press Enter..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full p-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Skill Tags */}
      <div className="flex flex-wrap gap-3 mt-6">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="px-4 py-2 bg-indigo-600 text-white rounded-full flex items-center gap-2 shadow-lg transition-all duration-300 hover:scale-105"
          >
            <span>{skill}</span>
            <button
              onClick={() => removeSkill(index)}
              className="text-sm hover:text-red-300"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsSection;