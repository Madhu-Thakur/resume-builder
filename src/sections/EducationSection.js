import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

function EducationSection() {
  const { resumeData, addItem, removeItem, updateField } =
    useContext(ResumeContext);

  const education = resumeData.education || [];

  const handleChange = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;
    updateField("education", updated);
  };

  const handleAddEducation = () => {
    addItem("education", {
      degree: "",
      institution: "",
      startDate: "",
      endDate: "",
      description: ""
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Education</h2>

      {education.map((edu, index) => (
        <div
          key={index}
          className="bg-white/60 backdrop-blur-lg p-6 rounded-2xl shadow-lg mb-6 transition-all duration-300"
        >
          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) =>
                handleChange(index, "degree", e.target.value)
              }
              className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="text"
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) =>
                handleChange(index, "institution", e.target.value)
              }
              className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="date"
              value={edu.startDate}
              onChange={(e) =>
                handleChange(index, "startDate", e.target.value)
              }
              className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="date"
              value={edu.endDate}
              onChange={(e) =>
                handleChange(index, "endDate", e.target.value)
              }
              className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

          </div>

          <textarea
            placeholder="Description"
            value={edu.description}
            onChange={(e) =>
              handleChange(index, "description", e.target.value)
            }
            className="w-full mt-4 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />

          <div className="flex justify-end mt-4">
            <button
              onClick={() => removeItem("education", index)}
              className="text-red-500 hover:text-red-700 transition-all"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={handleAddEducation}
        className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:scale-105 transition-all"
      >
        + Add Education
      </button>
    </div>
  );
}

export default EducationSection;