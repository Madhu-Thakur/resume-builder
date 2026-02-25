import { useContext, memo } from "react";
import { ResumeContext } from "../context/ResumeContext";
import ClassicTemplate from "../templates/ClassicTemplate";
import ModernSidebarTemplate from "../templates/ModernSidebarTemplate";
import MinimalATSTemplate from "../templates/MinimalATSTemplate";

const ResumePreview = memo(function ResumePreview() {
  const { template, resumeData, previewAnimation } = useContext(ResumeContext);

  const renderTemplate = () => {
    switch (template) {
      case "classic":
        return <ClassicTemplate data={resumeData} />;
      case "modern":
        return <ModernSidebarTemplate data={resumeData} />;
      case "ats":
        return <MinimalATSTemplate data={resumeData} />;
      default:
        return <ClassicTemplate data={resumeData} />;
    }
  };

  return (
    <div 
      id="resume-preview"
      className={`transition-all duration-300 ${
        previewAnimation ? 'scale-102 opacity-95 shadow-2xl' : 'scale-100 opacity-100 shadow-xl'
      }`}
    >
      {renderTemplate()}
    </div>
  );
});

export default ResumePreview;