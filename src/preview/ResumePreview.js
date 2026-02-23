import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";
import ClassicTemplate from "../templates/ClassicTemplate";
import ModernSidebarTemplate from "../templates/ModernSidebarTemplate";
import MinimalATSTemplate from "../templates/MinimalATSTemplate";

function ResumePreview() {
  const { template } = useContext(ResumeContext);

const renderTemplate = () => {
  switch (template) {
    case "classic":
      return <ClassicTemplate />;
    case "modern":
      return <ModernSidebarTemplate />;
    case "ats":
      return <MinimalATSTemplate />;
    default:
      return <ClassicTemplate />;
  }
};

  return <div id="resume-preview">{renderTemplate()}</div>;
}

export default ResumePreview;