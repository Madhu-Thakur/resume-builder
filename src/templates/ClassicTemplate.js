import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

function ClassicTemplate() {
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
            <h2 className="text-xl font-semibold mb-2">
              Professional Summary
            </h2>
            <p>{summary}</p>
          </section>
        );

      case "education":
        return education?.length > 0 && (
          <section key="education" className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-2">
                <h3 className="font-semibold">{edu.degree}</h3>
                <p className="text-gray-600">{edu.institution}</p>
              </div>
            ))}
          </section>
        );

      case "experience":
        return experience?.length > 0 && (
          <section key="experience" className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
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
                <p>{exp.responsibilities}</p>
              </div>
            ))}
          </section>
        );

      case "skills":
        return skills?.length > 0 && (
          <section key="skills" className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        );

      // case "projects":
        return projects?.length > 0 && (
          <section key="projects" className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Projects
            </h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm text-gray-500">
                  {project.techStack}
                </p>
                <p>{project.description}</p>
              </div>
            ))}
          </section>
        );

        // ============================================
 case "projects":
  return projects?.length > 0 && (
    <section key="projects" className="mb-6">
      <h2 className="text-xl font-semibold mb-2">
        Projects
      </h2>

      {projects.map((project, index) => (
        <div key={index} className="mb-4">

          {/* Title + Live Demo on same line */}
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">
              {project.title}
            </h3>

            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm hover:underline"
              >
                Live Demo
              </a>
            )}
          </div>

          {project.techStack && (
            <p className="text-sm text-gray-500">
              {project.techStack}
            </p>
          )}

          {project.description && (
            <p className="mt-1">
              {project.description}
            </p>
          )}

        </div>
      ))}
    </section>
  );


      // case "certifications":
        return certifications?.length > 0 && (
          <section key="certifications" className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Certifications
            </h2>
            <ul className="list-disc list-inside">
              {certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </section>
        );

        // ============================================
case "certifications":
  return certifications?.length > 0 && (
    <section key="certifications" className="mb-6">
      <h2 className="text-xl font-semibold mb-2">
        Certifications
      </h2>

      <ul className="list-disc list-inside">
        {certifications.map((cert, index) => (
          <li key={index}>
            {typeof cert === "string" ? (
              cert
            ) : (
              <>
                {cert.title}
                {cert.link && (
                  <>
                    {" "}
                    —{" "}
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Certificate
                    </a>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );


      case "achievements":
        return achievements?.length > 0 && (
          <section key="achievements" className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Achievements
            </h2>
            <ul className="list-disc list-inside">
              {achievements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        );

      // case "languages":
      //   return languages?.length > 0 && (
      //     <section key="languages" className="mb-6">
      //       <h2 className="text-xl font-semibold mb-2">
      //         Languages
      //       </h2>
      //       <p>{languages.join(", ")}</p>
      //     </section>
      //   );

      // =====================
      case "languages":
  return languages?.length > 0 && (
    <section key="languages" className="mb-6">
      <h2 className="text-xl font-semibold mb-2">
        Languages
      </h2>

      <ul className="list-disc list-inside">
        {languages.map((lang, index) => (
          <li key={index}>
            {typeof lang === "string"
              ? lang
              : `${lang.name} - ${lang.level}`}
          </li>
        ))}
      </ul>
    </section>
  );

      case "interests":
        return interests?.length > 0 && (
          <section key="interests" className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
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
    <div className="bg-white shadow-xl p-8 w-[794px] min-h-[1123px] mx-auto">

      {/* Header */}
      {/* <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold">
          {personalInfo?.name}
        </h1>

        <p className="text-gray-600">
          {personalInfo?.email} | {personalInfo?.phone}
        </p>

        {personalInfo?.linkedin && (
          <p className="text-sm text-gray-600">
            LinkedIn: {personalInfo.linkedin}
          </p>
        )}

        {personalInfo?.github && (
          <p className="text-sm text-gray-600">
            GitHub: {personalInfo.github}
          </p>
        )}

        {personalInfo?.location && (
          <p className="text-sm text-gray-600">
            {personalInfo.location}
          </p>
        )}
      </div> */}


      {/* Professional Header */}
<div className="border-b pb-6 mb-8 text-center">

  <h1 className="text-4xl font-bold tracking-wide text-gray-900">
    {personalInfo?.name}
  </h1>

  <div className="mt-3 text-gray-600 text-sm flex flex-wrap justify-center gap-x-3 gap-y-1">

    {personalInfo?.email && (
      <span>{personalInfo.email}</span>
    )}

    {personalInfo?.phone && (
      <>
        <span>•</span>
        <span>{personalInfo.phone}</span>
      </>
    )}

    {personalInfo?.location && (
      <>
        <span>•</span>
        <span>{personalInfo.location}</span>
      </>
    )}

  </div>

  <div className="mt-2 text-sm flex flex-wrap justify-center gap-x-4">

    {personalInfo?.linkedin && (
      <a
        href={personalInfo.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        LinkedIn
      </a>
    )}

    {personalInfo?.github && (
      <a
        href={personalInfo.github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-800 hover:underline"
      >
        GitHub
      </a>
    )}

  </div>

</div>

      {/* Dynamic Section Rendering */}
      {sectionOrder.map((section) => renderSection(section))}

    </div>
  );
}

export default ClassicTemplate;