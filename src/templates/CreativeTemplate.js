import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

function CreativeTemplate() {
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
            <h2 className="font-semibold text-lg mb-2">
              Summary
            </h2>
            <p>{summary}</p>
          </section>
        );

      case "education":
        return education?.length > 0 && (
          <section key="education">
            <h2 className="font-semibold text-lg mb-2">
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={index}>
                <h3 className="font-semibold">{edu.degree}</h3>
                <p className="text-sm text-gray-500">
                  {edu.institution}
                </p>
              </div>
            ))}
          </section>
        );

      case "experience":
        return experience?.length > 0 && (
          <section key="experience" className="mb-6">
            <h2 className="font-semibold text-lg mb-2">
              Experience
            </h2>
            {experience.map((exp, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-semibold">
                  {exp.role}
                </h3>
                <p className="text-sm text-gray-500">
                  {exp.company}
                </p>
              </div>
            ))}
          </section>
        );

      case "skills":
        return skills?.length > 0 && (
          <div key="skills" className="mt-6">
            <h2 className="uppercase text-sm font-semibold mb-2">
              Skills
            </h2>
            {skills.map((skill, index) => (
              <p key={index} className="text-sm">
                {skill}
              </p>
            ))}
          </div>
        );

      case "projects":
        return projects?.length > 0 && (
          <section key="projects" className="mb-6">
            <h2 className="font-semibold text-lg mb-2">
              Projects
            </h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm text-gray-500">{project.techStack}</p>
                <p className="text-sm">{project.description}</p>
              </div>
            ))}
          </section>
        );

      case "certifications":
        return certifications?.length > 0 && (
          <section key="certifications" className="mb-6">
            <h2 className="font-semibold text-lg mb-2">
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
            <h2 className="font-semibold text-lg mb-2">
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
          <div key="languages" className="mt-6">
            <h2 className="uppercase text-sm font-semibold mb-2">
              Languages
            </h2>
            {languages.map((lang, index) => (
              <p key={index} className="text-sm">
                {typeof lang === "string" ? lang : `${lang.name} - ${lang.level}`}
              </p>
            ))}
          </div>
        );

      case "interests":
        return interests?.length > 0 && (
          <section key="interests" className="mb-6">
            <h2 className="font-semibold text-lg mb-2">
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
    <div className="flex w-full max-w-[794px] mx-auto bg-white shadow-lg">

      {/* Sidebar */}
      <div className="w-1/3 bg-indigo-700 text-white p-6">
        <h1 className="text-2xl font-bold">{personalInfo?.name}</h1>
        <p className="text-sm mt-2">{personalInfo?.email}</p>
        <p className="text-sm">{personalInfo?.phone}</p>

        {/* Render sidebar sections */}
        {sectionOrder.map((section) => {
          if (section === "skills" || section === "languages") {
            return renderSection(section);
          }
          return null;
        })}
      </div>

      {/* Main */}
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

export default CreativeTemplate;
