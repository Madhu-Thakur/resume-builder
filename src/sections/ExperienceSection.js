import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

function ExperienceSection() {
  const { resumeData, addItem, removeItem, updateField } =
    useContext(ResumeContext);

  const experience = resumeData.experience || [];

  const handleChange = (index, field, value) => {
    const updated = [...experience];
    updated[index][field] = value;
    updateField("experience", updated);
  };

  const handleAddExperience = () => {
    addItem("experience", {
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      responsibilities: ""
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Work Experience</h2>

      {experience.map((exp, index) => (
        <div
          key={index}
          className="bg-white/60 backdrop-blur-lg p-6 rounded-2xl shadow-lg mb-6 transition-all duration-300"
        >
          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Company Name"
              value={exp.company}
              onChange={(e) =>
                handleChange(index, "company", e.target.value)
              }
              className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="text"
              placeholder="Role / Designation"
              value={exp.role}
              onChange={(e) =>
                handleChange(index, "role", e.target.value)
              }
              className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="date"
              value={exp.startDate}
              onChange={(e) =>
                handleChange(index, "startDate", e.target.value)
              }
              className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="date"
              value={exp.endDate}
              disabled={exp.currentlyWorking}
              onChange={(e) =>
                handleChange(index, "endDate", e.target.value)
              }
              className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            />
          </div>

          {/* Currently Working Checkbox */}
          <div className="mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              checked={exp.currentlyWorking}
              onChange={(e) =>
                handleChange(index, "currentlyWorking", e.target.checked)
              }
            />
            <label>Currently Working Here</label>
          </div>

          {/* Responsibilities */}
          <textarea
            placeholder="Responsibilities / Achievements"
            value={exp.responsibilities}
            onChange={(e) =>
              handleChange(index, "responsibilities", e.target.value)
            }
            className="w-full mt-4 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />

          <div className="flex justify-end mt-4">
            <button
              onClick={() => removeItem("experience", index)}
              className="text-red-500 hover:text-red-700 transition-all"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={handleAddExperience}
        className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:scale-105 transition-all"
      >
        + Add Experience
      </button>
    </div>
  );
}

export default ExperienceSection;