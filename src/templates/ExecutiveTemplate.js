import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

function ExecutiveTemplate() {
  const { resumeData } = useContext(ResumeContext);
  const { personalInfo, summary, education, experience, skills } = resumeData;

  return (
    <div className="bg-white p-10 w-full max-w-[794px] mx-auto text-gray-800">

      {/* Header */}
      <div className="text-center border-b pb-6 mb-8">
        <h1 className="text-4xl font-bold tracking-wide">
          {personalInfo?.name}
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          {personalInfo?.email} | {personalInfo?.phone}
        </p>
      </div>

      {/* Summary */}
      {summary && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold uppercase tracking-widest mb-2">
            Professional Summary
          </h2>
          <p className="leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold uppercase tracking-widest mb-4">
            Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">
                {exp.role} — {exp.company}
              </h3>
              <p className="text-sm text-gray-500">
                {exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}
              </p>
              <p className="mt-1">{exp.responsibilities}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold uppercase tracking-widest mb-4">
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index}>
              <h3 className="font-semibold">{edu.degree}</h3>
              <p className="text-gray-600 text-sm">{edu.institution}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold uppercase tracking-widest mb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 border rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ExecutiveTemplate;