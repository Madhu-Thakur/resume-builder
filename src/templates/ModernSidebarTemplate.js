import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

function ModernSidebarTemplate() {
  const { resumeData } = useContext(ResumeContext);

  const {
    personalInfo,
    summary,
    education,
    experience,
    skills,
    languages
  } = resumeData;

  return (
    <div className="bg-white shadow-xl w-[794px] min-h-[1123px] mx-auto flex">

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

        {/* Skills */}
        {skills?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              Skills
            </h2>
            <ul className="text-sm space-y-1">
              {skills.map((skill, index) => (
                <li key={index}>• {skill}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Languages */}
        {languages?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">
              Languages
            </h2>
            <ul className="text-sm space-y-1">
              {languages.map((lang, index) => (
                <li key={index}>
                  {lang.name} - {lang.level}
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8">

        {/* Summary */}
        {summary && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-indigo-700">
              Professional Summary
            </h2>
            <p className="text-gray-700">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <section className="mb-6">
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
        )}

        {/* Education */}
        {education?.length > 0 && (
          <section>
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
        )}

      </div>

    </div>
  );
}

export default ModernSidebarTemplate;