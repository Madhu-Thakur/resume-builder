import { useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";

function InterestsSection() {
  const { resumeData, addItem, removeItem, updateField } =
    useContext(ResumeContext);

  const interests = resumeData.interests || [];

  const handleChange = (index, value) => {
    const updated = [...interests];
    updated[index] = value;
    updateField("interests", updated);
  };

  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4">
        Interests
      </h3>

      {interests.map((item, index) => (
        <div key={index} className="flex gap-4 mb-3">
          <input
            type="text"
            value={item}
            onChange={(e) =>
              handleChange(index, e.target.value)
            }
            placeholder="Interest"
            className="flex-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={() => removeItem("interests", index)}
            className="text-red-500 hover:text-red-700"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        onClick={() => addItem("interests", "")}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:scale-105 transition-all"
      >
        + Add Interest
      </button>
    </div>
  );
}

export default InterestsSection;