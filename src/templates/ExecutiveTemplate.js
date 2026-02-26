import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

function ExecutiveTemplate() {
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
          <section key="summary" className="mb-8">
            <h2 className="text-lg font-semibold uppercase tracking-widest mb-2">
              Professional Summary
            </h2>
            <p className="leading-relaxed">{summary}</p>
          </section>
        );

      case "education":
        return education?.length > 0 && (
          <section key="education" className="mb-8">
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
        );

      case "experience":
        return experience?.length > 0 && (
          <section key="experience" className="mb-8">
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
        );

      case "skills":
        return skills?.length > 0 && (
          <section key="skills" className="mb-8">
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
        );

      case "projects":
        return projects?.length > 0 && (
          <section key="projects" className="mb-8">
            <h2 className="text-lg font-semibold uppercase tracking-widest mb-4">
              Projects
            </h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm text-gray-500">{project.techStack}</p>
                <p className="mt-1">{project.description}</p>
              </div>
            ))}
          </section>
        );

      case "certifications":
        return certifications?.length > 0 && (
          <section key="certifications" className="mb-8">
            <h2 className="text-lg font-semibold uppercase tracking-widest mb-4">
              Certifications
            </h2>
            {certifications.map((cert, index) => (
              <div key={index} className="mb-4 border-l-4 border-gray-300 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                    <p className="text-sm text-gray-600">{cert.provider}</p>
                  </div>
                  {cert.validity && (
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {cert.validity}
                    </span>
                  )}
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  {cert.completionId && <span className="mr-4">ID: {cert.completionId}</span>}
                  {cert.url && (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Verify Certificate
                    </a>
                  )}
                </div>
              </div>
            ))}
          </section>
        );

      case "achievements":
        return achievements?.length > 0 && (
          <section key="achievements" className="mb-8">
            <h2 className="text-lg font-semibold uppercase tracking-widest mb-4">
              Achievements
            </h2>
            <ul className="list-disc list-inside">
              {achievements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        );

      case "languages":
        return languages?.length > 0 && (
          <section key="languages" className="mb-8">
            <h2 className="text-lg font-semibold uppercase tracking-widest mb-4">
              Languages
            </h2>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang, index) => (
                <span key={index} className="px-3 py-1 border rounded-full text-sm">
                  {typeof lang === "string" ? lang : `${lang.name} - ${lang.level}`}
                </span>
              ))}
            </div>
          </section>
        );

      case "interests":
        return interests?.length > 0 && (
          <section key="interests" className="mb-8">
            <h2 className="text-lg font-semibold uppercase tracking-widest mb-4">
              Interests
            </h2>
            <p>{interests.join(", ")}</p>
          </section>
        );

      default:
        return null;
    }
  };

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

      {/* Dynamic Section Rendering */}
      {sectionOrder.map((section) => renderSection(section))}

    </div>
  );
}

export default ExecutiveTemplate;
