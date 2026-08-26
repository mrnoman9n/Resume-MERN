import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

const SkillsForm = ({ data, onChange }) => {
  const [skill, setSkill] = useState("");

  const addSkill = () => {
    const value = skill.trim();

    if (!value) return;

    if (data?.includes(value)) {
      setSkill("");
      return;
    }

    onChange([...(data || []), value]);
    setSkill("");
  };

  const removeSkill = (skillToRemove) => {
    onChange((data || []).filter((item) => item !== skillToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Skills
        </h3>

        <p className="text-sm text-gray-500">
          Add the skills you want to highlight on your resume
        </p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. React, Node.js, MongoDB"
          className="flex-1 p-2 px-3 border text-sm text-gray-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />

        <button
          type="button"
          onClick={addSkill}
          className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
        >
          <Plus className="size-4" />
          Add
        </button>
      </div>

      {!data || data.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-gray-300 rounded-lg">
          <p className="text-sm text-gray-400">
            No skills added yet. Add your first skill above.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {data.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg"
            >
              <span className="text-sm text-gray-700">
                {item}
              </span>

              <button
                type="button"
                onClick={() => removeSkill(item)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsForm;