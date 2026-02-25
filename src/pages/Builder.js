 import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ResumeContext } from "../context/ResumeContext";
import WizardContainer from "../components/WizardContainer";
import ResumePreview from "../preview/ResumePreview";
import SectionManager from "../components/SectionManager";
import html2pdf from "html2pdf.js";

function Builder() {
  const { setCurrentStep, steps } = useContext(ResumeContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState("wizard");
  const [isEditing, setIsEditing] = useState(false);
  const [showReorder, setShowReorder] = useState(false);
  const [showEditDropdown, setShowEditDropdown] = useState(false);

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
    <div className="min-h-screen bg-gray-200">

      {/* ================= WIZARD MODE ================= */}
      {mode === "wizard" && (
        <div className="max-w-3xl mx-auto py-10">
          <WizardContainer
            setMode={setMode}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </div>
      )}

      {/* ================= PREVIEW MODE ================= */}
      {mode === "preview" && (
        <div className="flex flex-col min-h-screen">

          {/* ================= TOP NAVBAR ================= */}
          <div className="h-16 bg-gray shadow-md flex items-center px-8">
            <h1 className="text-2xl font-bold text-indigo-600 tracking-wide">
              ElevateCV
            </h1>
          </div>

          {/* ================= BODY ================= */}
          <div className="flex flex-1">

            {/* ================= LEFT SIDEBAR ================= */}
            <div className="w-72 bg-gary shadow-md p-6 space-y-6 overflow-y-auto">

              {/* Edit Section */}
              <div className="relative">
                <button
                  onClick={() => setShowEditDropdown(!showEditDropdown)}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg"
                >
                  Edit Section ▼
                </button>

                {showEditDropdown && (
                  <div className="mt-2 w-full bg-gray-50 shadow rounded-lg p-2">
                    {steps.map((step, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentStep(index);
                          setMode("wizard");
                          setIsEditing(true);
                          setShowEditDropdown(false);
                        }}
                        className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-200"
                      >
                        {step.charAt(0).toUpperCase() + step.slice(1)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Change Template */}
            <button
  onClick={() =>
    navigate("/templates", { state: { fromBuilder: true } })
  }
  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg"
>
  Change Template
</button>

              {/* Reorder */}
              <div className="relative">
                <button
                  onClick={() => setShowReorder(!showReorder)}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  Reorder Sections ▼
                </button>

                {showReorder && (
                  <div className="mt-2 w-full bg-gray-50 shadow rounded-lg p-3">
                    <SectionManager />
                  </div>
                )}
              </div>

              {/* Download */}
              <button
                onClick={downloadPDF}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Download PDF
              </button>

            </div>

            {/* ================= RIGHT PREVIEW ================= */}
            <div className="flex-1 bg-gray-300 overflow-auto p-10">

              <div className="flex justify-center items-start">

                {/* Single A4 Page */}
                <div
                  id="resume-preview"
                  className="bg-white shadow-2xl w-[794px] min-h-[1123px]"
                >
                  <ResumePreview />
                </div>

              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default Builder;