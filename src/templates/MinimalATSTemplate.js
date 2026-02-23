import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

function MinimalATSTemplate() {
  const { resumeData } = useContext(ResumeContext);

  const {
    personalInfo,
    summary,
    education,
    experience,
    skills,
    projects
  } = resumeData;

  return (
    <div className="bg-white w-[794px] min-h-[1123px] mx-auto p-10 text-black">

      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-wide">
          {personalInfo?.name}
        </h1>
        <p className="text-sm">
          {personalInfo?.email} | {personalInfo?.phone}
        </p>
      </div>

      {/* Summary */}
      {summary && (
        <section className="mb-5">
          <h2 className="font-bold border-b pb-1 mb-2">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-sm">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <section className="mb-5">
          <h2 className="font-bold border-b pb-1 mb-2">
            EXPERIENCE
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between">
                <span className="font-semibold">
                  {exp.role}
                </span>
                <span className="text-sm">
                  {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                </span>
              </div>
              <p className="text-sm">{exp.company}</p>
              <p className="text-sm">{exp.responsibilities}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <section className="mb-5">
          <h2 className="font-bold border-b pb-1 mb-2">
            EDUCATION
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between">
                <span className="font-semibold">
                  {edu.degree}
                </span>
                <span className="text-sm">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <p className="text-sm">{edu.institution}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <section>
          <h2 className="font-bold border-b pb-1 mb-2">
            SKILLS
          </h2>
          <p className="text-sm">
            {skills.join(", ")}
          </p>
        </section>
      )}

    {/* Projects */}
{projects?.length > 0 && (
  <section className="mt-5">
    <h2 className="font-bold border-b pb-1 mb-2">
      PROJECTS
    </h2>
    {projects.map((project, index) => (
      <div key={index} className="mb-2">
        <span className="font-semibold">
          {project.title}
        </span>
        <p className="text-sm">
          {project.techStack}
        </p>
        <p className="text-sm">
          {project.description}
        </p>
      </div>
    ))}
  </section>
)}

    </div>
  );
}

export default MinimalATSTemplate;