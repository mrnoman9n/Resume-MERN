import { Plus, Trash2 } from 'lucide-react'
import React from 'react'

const ExperienceForm = ({ data, onChange }) => {

  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: ""
    }
    onChange([...(data || []), newExperience])
  }

  const updateExperience = (id, field, value) => {
    const updated = (data || []).map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    )
    onChange(updated)
  }

  const removeExperience = (id) => {
    onChange((data || []).filter((exp) => exp.id !== id))
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'> Professional Experience </h3>
          <p className='text-sm text-gray-500'>Add your job experience</p>
        </div>
        <button
          onClick={addExperience}
          className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors'
        >
          <Plus className="size-4"/>
          Add Experience
        </button>
      </div>

      {(!data || data.length === 0) ? (
        <div className='text-center py-10 border border-dashed border-gray-300 rounded-lg'>
          <p className='text-sm text-gray-400'>No experience added yet. Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <div className='space-y-4'>
          {data.map((exp, index) => (
  <div key={exp.id ?? index} className='p-4 border border-gray-200 rounded-lg space-y-3 relative'>
              <button
                onClick={() => removeExperience(exp.id)}
                className='absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors'
              >
                <Trash2 className="size-4"/>
              </button>

              <div className='grid grid-cols-2 gap-3'>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                  placeholder="Company name"
                  className='w-full p-2 px-3 border text-sm text-gray-900 border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors'
                />
                <input
                  type="text"
                  value={exp.role}
                  onChange={(e) => updateExperience(exp.id, "role", e.target.value)}
                  placeholder="Job title / role"
                  className='w-full p-2 px-3 border text-sm text-gray-900 border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors'
                />
              </div>

              <div className='grid grid-cols-2 gap-3'>
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                  placeholder="Start date (e.g. Jan 2022)"
                  className='w-full p-2 px-3 border text-sm text-gray-900 border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors'
                />
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                  placeholder="End date (or Present)"
                  className='w-full p-2 px-3 border text-sm text-gray-900 border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors'
                />
              </div>

              <textarea
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                rows={4}
                placeholder="Describe your responsibilities and achievements..."
                className='w-full p-3 px-4 border text-sm text-gray-900 border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none'
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ExperienceForm