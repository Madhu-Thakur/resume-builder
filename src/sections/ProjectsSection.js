import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

function ProjectsSection() {
  const { resumeData, addItem, removeItem, updateField } =
    useContext(ResumeContext);

  const projects = resumeData.projects || [];

  const handleChange = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    updateField("projects", updated);
  };

  const handleAddProject = () => {
    addItem("projects", {
      title: "",
      techStack: "",
      description: "",
      github: "",
      live: ""
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Projects</h2>

      {projects.map((project, index) => (
        <div
          key={index}
          className="bg-white/60 backdrop-blur-lg p-6 rounded-2xl shadow-lg mb-6 transition-all duration-300"
        >
          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Project Title"
              value={project.title}
              onChange={(e) =>
                handleChange(index, "title", e.target.value)
              }
              className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="text"
              placeholder="Tech Stack (e.g. React, Node, MongoDB)"
              value={project.techStack}
              onChange={(e) =>
                handleChange(index, "techStack", e.target.value)
              }
              className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="text"
              placeholder="GitHub Link"
              value={project.github}
              onChange={(e) =>
                handleChange(index, "github", e.target.value)
              }
              className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="text"
              placeholder="Live Project Link"
              value={project.live}
              onChange={(e) =>
                handleChange(index, "live", e.target.value)
              }
              className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

          </div>

          <textarea
            placeholder="Project Description"
            value={project.description}
            onChange={(e) =>
              handleChange(index, "description", e.target.value)
            }
            className="w-full mt-4 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />

          <div className="flex justify-end mt-4">
            <button
              onClick={() => removeItem("projects", index)}
              className="text-red-500 hover:text-red-700 transition-all"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={handleAddProject}
        className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:scale-105 transition-all"
      >
        + Add Project
      </button>
    </div>
  );
}

export default ProjectsSection;