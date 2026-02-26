import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

function CompactTemplate() {
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
          <section key="summary" className="mb-4">
            <h2 className="font-semibold">Summary</h2>
            <p>{summary}</p>
          </section>
        );

      case "education":
        return education?.length > 0 && (
          <section key="education" className="mb-4">
            <h2 className="font-semibold">Education</h2>
            {education.map((edu, index) => (
              <div key={index}>
                {edu.degree} - {edu.institution}
              </div>
            ))}
          </section>
        );

      case "experience":
        return experience?.length > 0 && (
          <section key="experience" className="mb-4">
            <h2 className="font-semibold">Experience</h2>
            {experience.map((exp, index) => (
              <div key={index}>
                <strong>{exp.role}</strong> - {exp.company}
              </div>
            ))}
          </section>
        );

      case "skills":
        return skills?.length > 0 && (
          <section key="skills" className="mb-4">
            <h2 className="font-semibold">Skills</h2>
            {skills.join(", ")}
          </section>
        );

      case "projects":
        return projects?.length > 0 && (
          <section key="projects" className="mb-4">
            <h2 className="font-semibold">Projects</h2>
            {projects.map((project, index) => (
              <div key={index}>
                <strong>{project.title}</strong> - {project.techStack}
                <p>{project.description}</p>
              </div>
            ))}
          </section>
        );

      case "certifications":
        return certifications?.length > 0 && (
          <section key="certifications" className="mb-4">
            <h2 className="font-semibold">Certifications</h2>
            {certifications.map((cert, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between">
                  <strong>{cert.name}</strong>
                  {cert.validity && (
                    <span className="text-xs text-gray-500">({cert.validity})</span>
                  )}
                </div>
                <div className="text-xs text-gray-600">{cert.provider}</div>
                {cert.completionId && (
                  <div className="text-xs text-gray-600">ID: {cert.completionId}</div>
                )}
                {cert.url && (
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                    Verify Certificate
                  </a>
                )}
              </div>
            ))}
          </section>
        );

      case "achievements":
        return achievements?.length > 0 && (
          <section key="achievements" className="mb-4">
            <h2 className="font-semibold">Achievements</h2>
            <ul className="list-disc list-inside">
              {achievements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        );

      case "languages":
        return languages?.length > 0 && (
          <section key="languages" className="mb-4">
            <h2 className="font-semibold">Languages</h2>
            {languages.map((lang, index) => (
              <div key={index}>
                {typeof lang === "string" ? lang : `${lang.name} - ${lang.level}`}
              </div>
            )).join(", ")}
          </section>
        );

      case "interests":
        return interests?.length > 0 && (
          <section key="interests" className="mb-4">
            <h2 className="font-semibold">Interests</h2>
            {interests.join(", ")}
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 w-full max-w-[794px] mx-auto text-sm">

      <div className="border-b pb-2 mb-4">
        <h1 className="text-2xl font-bold">
          {personalInfo?.name}
        </h1>
        <p>
          {personalInfo?.email} | {personalInfo?.phone}
        </p>
      </div>

      {/* Dynamic Section Rendering */}
      {sectionOrder.map((section) => renderSection(section))}

    </div>
  );
}

export default CompactTemplate;
