import { useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";

function CertificationsSection() {
  const { resumeData, addItem, removeItem, updateField } =
    useContext(ResumeContext);

  const certifications = resumeData.certifications || [];

  const handleChange = (index, value) => {
    const updated = [...certifications];
    updated[index] = value;
    updateField("certifications", updated);
  };

  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4">Certifications</h3>

      {certifications.map((item, index) => (
        <div key={index} className="flex gap-4 mb-3">
          <input
            type="text"
            value={item}
            onChange={(e) =>
              handleChange(index, e.target.value)
            }
            placeholder="Certification name"
            className="flex-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={() => removeItem("certifications", index)}
            className="text-red-500 hover:text-red-700"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        onClick={() => addItem("certifications", "")}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:scale-105 transition-all"
      >
        + Add Certification
      </button>
    </div>
  );
}

export default CertificationsSection;