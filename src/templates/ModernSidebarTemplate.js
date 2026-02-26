import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

function ModernSidebarTemplate() {
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
          <section key="summary" className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-indigo-700">
              Professional Summary
            </h2>
            <p className="text-gray-700">{summary}</p>
          </section>
        );

      case "education":
        return education?.length > 0 && (
          <section key="education">
            <h2 className="text-xl font-semibold mb-2 text-indigo-700">
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-semibold">
                  {edu.degree}
                </h3>
                <p className="text-gray-600">
                  {edu.institution}
                </p>
              </div>
            ))}
          </section>
        );

      case "experience":
        return experience?.length > 0 && (
          <section key="experience" className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-indigo-700">
              Experience
            </h2>
            {experience.map((exp, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-semibold">
                  {exp.role} - {exp.company}
                </h3>
                <p className="text-sm text-gray-500">
                  {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                </p>
                <p className="text-gray-700">
                  {exp.responsibilities}
                </p>
              </div>
            ))}
          </section>
        );

      case "skills":
        return skills?.length > 0 && (
          <div key="skills" className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              Skills
            </h2>
            <ul className="text-sm space-y-1">
              {skills.map((skill, index) => (
                <li key={index}>• {skill}</li>
              ))}
            </ul>
          </div>
        );

      case "projects":
        return projects?.length > 0 && (
          <section key="projects" className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-indigo-700">
              Projects
            </h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm text-gray-500">{project.techStack}</p>
                <p className="text-gray-700">{project.description}</p>
              </div>
            ))}
          </section>
        );

      case "certifications":
        return certifications?.length > 0 && (
          <section key="certifications" className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-indigo-700">
              Certifications
            </h2>
            {certifications.map((cert, index) => (
              <div key={index} className="mb-3 border-l-4 border-indigo-500 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-indigo-700">{cert.name}</h3>
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
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
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
          <section key="achievements" className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-indigo-700">
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
          <div key="languages">
            <h2 className="text-lg font-semibold mb-2">
              Languages
            </h2>
            <ul className="text-sm space-y-1">
              {languages.map((lang, index) => (
                <li key={index}>
                  {typeof lang === "string" ? lang : `${lang.name} - ${lang.level}`}
                </li>
              ))}
            </ul>
          </div>
        );

      case "interests":
        return interests?.length > 0 && (
          <section key="interests" className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-indigo-700">
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
    <div className="bg-white shadow-xl w-full max-w-[794px] mx-auto flex">

      {/* Sidebar */}
      <div className="w-1/3 bg-indigo-700 text-white p-6">

        <h1 className="text-2xl font-bold mb-2">
          {personalInfo?.name}
        </h1>

        <p className="text-sm mb-4">
          {personalInfo?.email}
          <br />
          {personalInfo?.phone}
        </p>

        {/* Render sidebar sections */}
        {sectionOrder.map((section) => {
          if (section === "skills" || section === "languages") {
            return renderSection(section);
          }
          return null;
        })}

      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8">

        {/* Render main sections */}
        {sectionOrder.map((section) => {
          if (section !== "skills" && section !== "languages") {
            return renderSection(section);
          }
          return null;
        })}

      </div>

    </div>
  );
}

export default ModernSidebarTemplate;
