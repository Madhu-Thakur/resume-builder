import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

function MinimalATSTemplate() {
  const { resumeData, sectionOrder } = useContext(ResumeContext);

  const {
    personalInfo,
    summary,
    education,
    experience,
    skills,
    projects,
    certifications,
    achievements,
    languages,
    interests
  } = resumeData;

  const renderSection = (section) => {
    switch (section) {

      case "summary":
        return summary && (
          <section key="summary" className="mb-5">
            <h2 className="font-bold border-b pb-1 mb-2">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-sm">{summary}</p>
          </section>
        );

      case "education":
        return education?.length > 0 && (
          <section key="education" className="mb-5">
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
        );

      case "experience":
        return experience?.length > 0 && (
          <section key="experience" className="mb-5">
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
        );

      case "skills":
        return skills?.length > 0 && (
          <section key="skills">
            <h2 className="font-bold border-b pb-1 mb-2">
              SKILLS
            </h2>
            <p className="text-sm">
              {skills.join(", ")}
            </p>
          </section>
        );

      case "projects":
        return projects?.length > 0 && (
          <section key="projects" className="mt-5">
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
        );

      case "certifications":
        return certifications?.length > 0 && (
          <section key="certifications" className="mt-5">
            <h2 className="font-bold border-b pb-1 mb-2">
              CERTIFICATIONS
            </h2>
            {certifications.map((cert, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between">
                  <span className="font-semibold">
                    {cert.name}
                  </span>
                  {cert.validity && (
                    <span className="text-sm">
                      {cert.validity}
                    </span>
                  )}
                </div>
                <p className="text-sm">{cert.provider}</p>
                {cert.completionId && (
                  <p className="text-sm">ID: {cert.completionId}</p>
                )}
                {cert.url && (
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                    Verify Certificate
                  </a>
                )}
              </div>
            ))}
          </section>
        );

      case "achievements":
        return achievements?.length > 0 && (
          <section key="achievements" className="mt-5">
            <h2 className="font-bold border-b pb-1 mb-2">
              ACHIEVEMENTS
            </h2>
            <ul className="list-disc list-inside">
              {achievements.map((item, index) => (
                <li key={index} className="text-sm">{item}</li>
              ))}
            </ul>
          </section>
        );

      case "languages":
        return languages?.length > 0 && (
          <section key="languages" className="mt-5">
            <h2 className="font-bold border-b pb-1 mb-2">
              LANGUAGES
            </h2>
            <p className="text-sm">
              {languages.map((lang, index) => (
                typeof lang === "string" ? lang : `${lang.name} - ${lang.level}`
              )).join(", ")}
            </p>
          </section>
        );

      case "interests":
        return interests?.length > 0 && (
          <section key="interests" className="mt-5">
            <h2 className="font-bold border-b pb-1 mb-2">
              INTERESTS
            </h2>
            <p className="text-sm">{interests.join(", ")}</p>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white w-full max-w-[794px] mx-auto p-10 text-black">

      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-wide">
          {personalInfo?.name}
        </h1>
        <p className="text-sm">
          {personalInfo?.email} | {personalInfo?.phone}
        </p>
      </div>

      {/* Dynamic Section Rendering */}
      {sectionOrder.map((section) => renderSection(section))}

    </div>
  );
}

export default MinimalATSTemplate;
