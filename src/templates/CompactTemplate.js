import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

function CompactTemplate() {
  const { resumeData } = useContext(ResumeContext);
  const { personalInfo, summary, education, experience, skills } = resumeData;

  return (
    <div className="bg-white p-6 w-[794px] min-h-[1123px] mx-auto text-sm">

      <div className="border-b pb-2 mb-4">
        <h1 className="text-2xl font-bold">
          {personalInfo?.name}
        </h1>
        <p>
          {personalInfo?.email} | {personalInfo?.phone}
        </p>
      </div>

      {summary && (
        <section className="mb-4">
          <h2 className="font-semibold">Summary</h2>
          <p>{summary}</p>
        </section>
      )}

      {experience?.length > 0 && (
        <section className="mb-4">
          <h2 className="font-semibold">Experience</h2>
          {experience.map((exp, index) => (
            <div key={index}>
              <strong>{exp.role}</strong> - {exp.company}
            </div>
          ))}
        </section>
      )}

      {education?.length > 0 && (
        <section className="mb-4">
          <h2 className="font-semibold">Education</h2>
          {education.map((edu, index) => (
            <div key={index}>
              {edu.degree} - {edu.institution}
            </div>
          ))}
        </section>
      )}

      {skills?.length > 0 && (
        <section>
          <h2 className="font-semibold">Skills</h2>
          {skills.join(", ")}
        </section>
      )}
    </div>
  );
}

export default CompactTemplate;