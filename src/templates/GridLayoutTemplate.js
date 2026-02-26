import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

function GridLayoutTemplate() {
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
            <h2 className="text-lg font-semibold mb-2 text-gray-800 border-b-2 border-indigo-500 pb-1">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </section>
        );

      case "education":
        return education?.length > 0 && (
          <section key="education" className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 border-b-2 border-indigo-500 pb-1">
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-sm text-gray-600">{edu.institution}</p>
                <p className="text-xs text-gray-500">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            ))}
          </section>
        );

      case "experience":
        return experience?.length > 0 && (
          <section key="experience" className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 border-b-2 border-indigo-500 pb-1">
              Experience
            </h2>
            {experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mt-2">{exp.responsibilities}</p>
              </div>
            ))}
          </section>
        );

      case "skills":
        return skills?.length > 0 && (
          <section key="skills" className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 border-b-2 border-indigo-500 pb-1">
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">{skill}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case "projects":
        return projects?.length > 0 && (
          <section key="projects" className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 border-b-2 border-indigo-500 pb-1">
              Projects
            </h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{project.title}</h3>
                    <p className="text-sm text-gray-600">{project.techStack}</p>
                  </div>
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-600 hover:text-indigo-800"
                    >
                      Live Demo →
                    </a>
                  )}
                </div>
                <p className="text-sm text-gray-700 mt-2">{project.description}</p>
              </div>
            ))}
          </section>
        );

      case "certifications":
        return certifications?.length > 0 && (
          <section key="certifications" className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 border-b-2 border-indigo-500 pb-1">
              Certifications
            </h2>
            {certifications.map((cert, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                    <p className="text-sm text-gray-600">{cert.provider}</p>
                  </div>
                  {cert.validity && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {cert.validity}
                    </span>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {cert.completionId && (
                    <span className="text-xs text-gray-500">ID: {cert.completionId}</span>
                  )}
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-600 hover:text-indigo-800"
                    >
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
            <h2 className="text-lg font-semibold mb-3 text-gray-800 border-b-2 border-indigo-500 pb-1">
              Achievements
            </h2>
            <ul className="list-disc list-inside space-y-1">
              {achievements.map((item, index) => (
                <li key={index} className="text-sm text-gray-700">{item}</li>
              ))}
            </ul>
          </section>
        );

      case "languages":
        return languages?.length > 0 && (
          <section key="languages" className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 border-b-2 border-indigo-500 pb-1">
              Languages
            </h2>
            <div className="space-y-2">
              {languages.map((lang, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">
                    {typeof lang === "string" ? lang : lang.name}
                  </span>
                  {typeof lang === "object" && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {lang.level}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        );

      case "interests":
        return interests?.length > 0 && (
          <section key="interests" className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 border-b-2 border-indigo-500 pb-1">
              Interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow-xl p-8 w-full max-w-[794px] min-h-[1123px] mx-auto">
      
      {/* Header */}
      <div className="border-b-2 border-indigo-100 pb-6 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {personalInfo?.name}
        </h1>
        <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo?.location && <span>• {personalInfo.location}</span>}
        </div>
        <div className="flex flex-wrap gap-4 mt-2">
          {personalInfo?.linkedin && (
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              LinkedIn Profile
            </a>
          )}
          {personalInfo?.github && (
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              GitHub Profile
            </a>
          )}
        </div>
      </div>

      {/* 4-Column Grid Layout */}
      <div className="grid grid-cols-4 gap-6">
        
        {/* Column 1: Personal Info, Skills, Languages */}
        <div className="col-span-1 space-y-6">
          {/* Personal Info Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3">Contact</h3>
            <div className="space-y-2 text-sm text-gray-700">
              {personalInfo?.email && (
                <div className="flex items-center space-x-2">
                  <span className="text-indigo-500">✉</span>
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo?.phone && (
                <div className="flex items-center space-x-2">
                  <span className="text-indigo-500">📱</span>
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo?.location && (
                <div className="flex items-center space-x-2">
                  <span className="text-indigo-500">📍</span>
                  <span>{personalInfo.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills Section */}
          {skills?.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Core Skills</h3>
              <div className="space-y-2">
                {skills.slice(0, 8).map((skill, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{skill}</span>
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages Section */}
          {languages?.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Languages</h3>
              <div className="space-y-2">
                {languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">
                      {typeof lang === "string" ? lang : lang.name}
                    </span>
                    {typeof lang === "object" && (
                      <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                        {lang.level}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Column 2: Summary, Education, Certifications */}
        <div className="col-span-1 space-y-6">
          {renderSection("summary")}
          {renderSection("education")}
          {renderSection("certifications")}
        </div>

        {/* Column 3: Experience */}
        <div className="col-span-1">
          {renderSection("experience")}
        </div>

        {/* Column 4: Projects, Achievements, Interests */}
        <div className="col-span-1 space-y-6">
          {renderSection("projects")}
          {renderSection("achievements")}
          {renderSection("interests")}
        </div>

      </div>
    </div>
  );
}

export default GridLayoutTemplate;