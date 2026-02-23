import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ResumeContext } from "../context/ResumeContext";
import WizardContainer from "../components/WizardContainer";
import ResumePreview from "../preview/ResumePreview";
import SectionManager from "../components/SectionManager";
import html2pdf from "html2pdf.js";

function Builder() {
  const {
    template,
    setCurrentStep,
    steps,
  } = useContext(ResumeContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState("wizard");
  const [isEditing, setIsEditing] = useState(false);
  const [showReorder, setShowReorder] = useState(false);
  const [showEditDropdown, setShowEditDropdown] = useState(false);

  // ✅ If coming from templates → open preview
  useEffect(() => {
    if (location.state?.fromTemplates) {
      setMode("preview");
    }
  }, [location.state]);

  const downloadPDF = () => {
    const element = document.getElementById("resume-preview");
    html2pdf().from(element).save("resume.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">

      {/* ================= WIZARD MODE ================= */}
      {mode === "wizard" && (
        <div className="max-w-3xl mx-auto">
          <WizardContainer
            setMode={setMode}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </div>
      )}

      {/* ================= PREVIEW MODE ================= */}
      {mode === "preview" && (
        <div className="max-w-6xl mx-auto">

          <div className="flex justify-between items-center mb-6">

            {/* LEFT SIDE */}
            <div className="flex gap-4">

              {/* Edit Section */}
              <div className="relative">
                <button
                  onClick={() => setShowEditDropdown(!showEditDropdown)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg"
                >
                  Edit Section ▼
                </button>

                {showEditDropdown && (
                  <div className="absolute left-0 mt-2 w-64 bg-white shadow-xl rounded-xl p-2 z-50">
                    {steps.map((step, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentStep(index);
                          setMode("wizard");
                          setIsEditing(true);
                          setShowEditDropdown(false);
                        }}
                        className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
                      >
                        {step.charAt(0).toUpperCase() + step.slice(1)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Templates */}
              <button
                onClick={() => navigate("/templates")}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg"
              >
                Change Templates
              </button>

            </div>

            {/* RIGHT SIDE */}
            <div className="flex gap-4">

              <div className="relative">
                <button
                  onClick={() => setShowReorder(!showReorder)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  Reorder ▼
                </button>

                {showReorder && (
                  <div className="absolute right-0 mt-2 w-72 bg-white shadow-xl rounded-xl p-4 z-50">
                    <SectionManager />
                  </div>
                )}
              </div>

              <button
                onClick={downloadPDF}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Download PDF
              </button>

            </div>
          </div>

          <div id="resume-preview">
            <ResumePreview />
          </div>

        </div>
      )}
    </div>
  );
}

export default Builder;