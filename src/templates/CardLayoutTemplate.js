import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

function CardLayoutTemplate() {
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
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </section>
        );

      case "education":
        return education?.length > 0 && (
          <section key="education" className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold text-gray-900 mb-1">{edu.degree}</h3>
                <p className="text-sm text-gray-600 mb-2">{edu.institution}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{edu.startDate} - {edu.endDate}</span>
                </div>
              </div>
            ))}
          </section>
        );

      case "experience":
        return experience?.length > 0 && (
          <section key="experience" className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Experience
            </h2>
            {experience.map((exp, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{exp.responsibilities}</p>
              </div>
            ))}
          </section>
        );

      case "skills":
        return skills?.length > 0 && (
          <section key="skills" className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {skills.map((skill, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-800">{skill}</span>
                    <div className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case "projects":
        return projects?.length > 0 && (
          <section key="projects" className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Projects
            </h2>
            {projects.map((project, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{project.title}</h3>
                    <p className="text-sm text-gray-600">{project.techStack}</p>
                  </div>
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Live Demo →
                    </a>
                  )}
                </div>
                <p className="text-sm text-gray-700">{project.description}</p>
              </div>
            ))}
          </section>
        );

      case "certifications":
        return certifications?.length > 0 && (
          <section key="certifications" className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Certifications
            </h2>
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-between items-start mb-2">
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
                <div className="flex flex-wrap gap-2">
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
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Achievements
            </h2>
            <div className="space-y-3">
              {achievements.map((item, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case "languages":
        return languages?.length > 0 && (
          <section key="languages" className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Languages
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {languages.map((lang, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-800">
                      {typeof lang === "string" ? lang : lang.name}
                    </span>
                    {typeof lang === "object" && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {lang.level}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case "interests":
        return interests?.length > 0 && (
          <section key="interests" className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-lg text-sm font-medium border border-indigo-100"
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
      
      {/* Row 1: Header + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Header Card */}
        <div className="lg:col-span-1 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-6 shadow-sm">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {personalInfo?.name}
            </h1>
            <div className="space-y-2 text-sm text-gray-600">
              {personalInfo?.email && <div>{personalInfo.email}</div>}
              {personalInfo?.phone && <div>{personalInfo.phone}</div>}
              {personalInfo?.location && <div>{personalInfo.location}</div>}
            </div>
            <div className="mt-4 flex justify-center space-x-4">
              {personalInfo?.linkedin && (
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  LinkedIn
                </a>
              )}
              {personalInfo?.github && (
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-700 hover:text-gray-900 font-medium"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          {renderSection("summary")}
        </div>
      </div>

      {/* Row 2: Main Content Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left Column: Education, Certifications, Languages */}
        <div className="lg:col-span-1 space-y-6">
          {renderSection("education")}
          {renderSection("certifications")}
          {renderSection("languages")}
        </div>

        {/* Middle Column: Experience, Projects */}
        <div className="lg:col-span-1 space-y-6">
          {renderSection("experience")}
          {renderSection("projects")}
        </div>

        {/* Right Column: Skills, Achievements, Interests */}
        <div className="lg:col-span-1 space-y-6">
          {renderSection("skills")}
          {renderSection("achievements")}
          {renderSection("interests")}
        </div>
      </div>

      {/* Row 3: Footer */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-6">
        <div className="text-center text-sm text-gray-600">
          <p>Thank you for reviewing my resume. I look forward to discussing how my skills and experiences can contribute to your team.</p>
        </div>
      </div>
    </div>
  );
}

export default CardLayoutTemplate;