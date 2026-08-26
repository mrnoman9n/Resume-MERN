import React from "react";
import { Plus, Trash2 } from "lucide-react";

const ProjectsForm = ({ data, onChange }) => {
  const addProject = () => {
    const newProject = {
      _id: Date.now().toString(),
      name: "",
      type: "",
      description: "",
    };

    onChange([...(data || []), newProject]);
  };

  const updateProject = (id, field, value) => {
    const updatedProjects = (data || []).map((project) =>
      project._id === id
        ? { ...project, [field]: value }
        : project
    );

    onChange(updatedProjects);
  };

  const removeProject = (id) => {
    const updatedProjects = (data || []).filter(
      (project) => project._id !== id
    );

    onChange(updatedProjects);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Projects
          </h3>

          <p className="text-sm text-gray-500">
            Add your personal or academic projects
          </p>
        </div>

        <button
          type="button"
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      {!data || data.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-gray-300 rounded-lg">
          <p className="text-sm text-gray-400">
            No projects added yet. Click "Add Project" to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((project, index) => (
            <div
              key={project._id || index}
              className="relative p-4 border border-gray-200 rounded-lg space-y-4"
            >
              <button
                type="button"
                onClick={() => removeProject(project._id)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="size-4" />
              </button>

              <div className="grid grid-cols-2 gap-3 pr-6">
                <input
                  type="text"
                  value={project.name || ""}
                  onChange={(e) =>
                    updateProject(
                      project._id,
                      "name",
                      e.target.value
                    )
                  }
                  placeholder="Project name"
                  className="w-full p-2 px-3 border text-sm text-gray-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />

                <input
                  type="text"
                  value={project.type || ""}
                  onChange={(e) =>
                    updateProject(
                      project._id,
                      "type",
                      e.target.value
                    )
                  }
                  placeholder="Project type"
                  className="w-full p-2 px-3 border text-sm text-gray-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <textarea
                value={project.description || ""}
                onChange={(e) =>
                  updateProject(
                    project._id,
                    "description",
                    e.target.value
                  )
                }
                rows={4}
                placeholder="Describe your project..."
                className="w-full p-3 px-4 border text-sm text-gray-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;