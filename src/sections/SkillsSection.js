import { useContext, useState } from "react";
import { ResumeContext } from "../context/ResumeContext";

function SkillsSection() {
  const { resumeData, updateField } = useContext(ResumeContext);
  const skills = resumeData.skills || [];

  const [inputValue, setInputValue] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      addSkill(inputValue.trim());
    } else if (e.key === "Backspace" && inputValue === "" && skills.length > 0) {
      // Remove last skill on backspace when input is empty
      const updated = skills.slice(0, -1);
      updateField("skills", updated);
    }
  };

  const addSkill = (skill) => {
    if (skills.includes(skill)) {
      // Visual feedback for duplicate
      setIsAdding(true);
      setTimeout(() => setIsAdding(false), 200);
      return;
    }

    updateField("skills", [...skills, skill]);
    setInputValue("");
  };

  const removeSkill = (index) => {
    const updated = skills.filter((_, i) => i !== index);
    updateField("skills", updated);
  };

  const addPresetSkill = (skill) => {
    if (!skills.includes(skill)) {
      addSkill(skill);
    }
  };

  // Suggested skills based on common tech stacks
  const suggestedSkills = [
    "JavaScript", "React", "Node.js", "Python", "Java", "TypeScript",
    "HTML", "CSS", "SQL", "Git", "AWS", "Docker", "MongoDB", "PostgreSQL"
  ].filter(skill => !skills.includes(skill)).slice(0, 6);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills</h2>
        <p className="text-gray-600 text-sm">Add your technical and soft skills. Press Enter to add, Backspace to remove the last skill</p>
      </div>

      {/* Main Input Area */}
      <div className="space-y-4">
        <div className={`relative transition-all duration-300 ${
          isAdding ? 'ring-2 ring-red-300 bg-red-50' : ''
        }`}>
          <input
            type="text"
            placeholder="Type a skill (e.g., JavaScript, Communication) and press Enter..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none focus:ring-0 transition-all duration-300 shadow-sm"
          />
          {inputValue && (
            <button
              onClick={() => setInputValue("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Character Counter */}
        <div className="text-sm text-gray-500">
          {skills.length} skills added
        </div>
      </div>

      {/* Suggested Skills */}
      {suggestedSkills.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="font-medium text-gray-900 mb-3">Suggested Skills</h3>
          <div className="flex flex-wrap gap-2">
            {suggestedSkills.map((skill, index) => (
              <button
                key={index}
                onClick={() => addPresetSkill(skill)}
                className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300 hover:scale-105"
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Skill Tags */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Your Skills</h3>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center gap-3 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              <span className="font-medium">{skill}</span>
              <button
                onClick={() => removeSkill(index)}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 hover:bg-white/30 rounded-full p-1"
                title="Remove skill"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
          
          {skills.length === 0 && (
            <div className="text-gray-500 italic text-center w-full py-8 border-2 border-dashed border-gray-200 rounded-xl">
              No skills added yet. Start typing to add your first skill!
            </div>
          )}
        </div>
      </div>

      {/* Skill Categories Helper */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
        <h3 className="font-semibold text-gray-900 mb-3">Skill Categories</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Technical:</span> Programming languages, frameworks, tools
          </div>
          <div>
            <span className="font-medium">Soft Skills:</span> Communication, leadership, problem-solving
          </div>
          <div>
            <span className="font-medium">Languages:</span> English, Spanish, Mandarin, etc.
          </div>
          <div>
            <span className="font-medium">Certifications:</span> AWS, Google, Microsoft certifications
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillsSection;
