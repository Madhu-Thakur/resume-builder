 import { useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";

function AchievementsSection() {
  const { resumeData, addItem, removeItem, updateField } =
    useContext(ResumeContext);

  const achievements = resumeData.achievements || [];

  const handleChange = (index, value) => {
    const updated = [...achievements];
    updated[index] = value;
    updateField("achievements", updated);
  };

  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4">
        Achievements
      </h3>

      {achievements.map((item, index) => (
        <div key={index} className="flex gap-4 mb-3">
          <input
            type="text"
            value={item}
            onChange={(e) =>
              handleChange(index, e.target.value)
            }
            placeholder="Achievement"
            className="flex-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={() => removeItem("achievements", index)}
            className="text-red-500 hover:text-red-700"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        onClick={() => addItem("achievements", "")}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:scale-105 transition-all"
      >
        + Add Achievement
      </button>
    </div>
  );
}

export default AchievementsSection;