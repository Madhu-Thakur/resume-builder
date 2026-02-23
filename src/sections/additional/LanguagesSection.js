import { useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";

function LanguagesSection() {
  const { resumeData, addItem, removeItem, updateField } =
    useContext(ResumeContext);

  const languages = resumeData.languages || [];

  const handleChange = (index, field, value) => {
    const updated = [...languages];
    updated[index][field] = value;
    updateField("languages", updated);
  };

  const handleAddLanguage = () => {
    addItem("languages", {
      name: "",
      level: "Beginner"
    });
  };

  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4">
        Languages
      </h3>

      {languages.map((lang, index) => (
        <div key={index} className="flex gap-4 mb-3">

          <input
            type="text"
            placeholder="Language"
            value={lang.name}
            onChange={(e) =>
              handleChange(index, "name", e.target.value)
            }
            className="flex-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            value={lang.level}
            onChange={(e) =>
              handleChange(index, "level", e.target.value)
            }
            className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Fluent</option>
          </select>

          <button
            onClick={() => removeItem("languages", index)}
            className="text-red-500 hover:text-red-700"
          >
            ✕
          </button>

        </div>
      ))}

      <button
        onClick={handleAddLanguage}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:scale-105 transition-all"
      >
        + Add Language
      </button>
    </div>
  );
}

export default LanguagesSection;