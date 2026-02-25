import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

function CreativeTemplate() {
  const { resumeData } = useContext(ResumeContext);
  const { personalInfo, summary, education, experience, skills } = resumeData;

  return (
    <div className="flex w-full max-w-[794px] mx-auto bg-white shadow-lg">

      {/* Sidebar */}
      <div className="w-1/3 bg-indigo-700 text-white p-6">
        <h1 className="text-2xl font-bold">{personalInfo?.name}</h1>
        <p className="text-sm mt-2">{personalInfo?.email}</p>
        <p className="text-sm">{personalInfo?.phone}</p>

        {skills?.length > 0 && (
          <div className="mt-6">
            <h2 className="uppercase text-sm font-semibold mb-2">
              Skills
            </h2>
            {skills.map((skill, index) => (
              <p key={index} className="text-sm">
                {skill}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Main */}
      <div className="w-2/3 p-8">

        {summary && (
          <section className="mb-6">
            <h2 className="font-semibold text-lg mb-2">
              Summary
            </h2>
            <p>{summary}</p>
          </section>
        )}

        {experience?.length > 0 && (
          <section className="mb-6">
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
        )}

        {education?.length > 0 && (
          <section>
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
        )}

      </div>
    </div>
  );
}

export default CreativeTemplate;