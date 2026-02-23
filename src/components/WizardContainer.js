import { useContext } from "react";
import PersonalSection from "../sections/PersonalSection";
import SummarySection from "../sections/SummarySection";
import EducationSection from "../sections/EducationSection";
import ExperienceSection from "../sections/ExperienceSection";
import SkillsSection from "../sections/SkillsSection";
import ProjectsSection from "../sections/ProjectsSection";
import AdditionalSection from "../sections/additional/AdditionalSection";
import { ResumeContext } from "../context/ResumeContext";

function WizardContainer({ setMode, isEditing, setIsEditing }) {
  const { currentStep, steps, nextStep, prevStep } =
    useContext(ResumeContext);

  const isLastStep = currentStep === steps.length - 1;

  const renderStep = () => {
    switch (steps[currentStep]) {
      case "personal":
        return <PersonalSection />;
      case "summary":
        return <SummarySection />;
      case "education":
        return <EducationSection />;
      case "experience":
        return <ExperienceSection />;
      case "skills":
        return <SkillsSection />;
      case "projects":
        return <ProjectsSection />;
      case "additional":
        return <AdditionalSection />;
      case "review":
        return <div className="text-xl">Review Section</div>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8">

      {/* Progress */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">
          Step {currentStep + 1} of {steps.length}
        </p>

        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentStep + 1) / steps.length) * 100}%`
            }}
          />
        </div>
      </div>

      <div className="mb-8">{renderStep()}</div>

      {/* Buttons */}
      <div className="flex justify-between items-center">

        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="px-6 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        <div className="flex gap-4">

          {/* Show ONLY if editing */}
          {isEditing && (
            <button
              onClick={() => {
                setMode("preview");
                setIsEditing(false);
              }}
              className="px-6 py-2 bg-green-600 text-white rounded-lg"
            >
              Back to Preview
            </button>
          )}

          {!isLastStep ? (
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => setMode("preview")}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Preview Resume
            </button>
          )}

        </div>
      </div>
    </div>
  );
}

export default WizardContainer;