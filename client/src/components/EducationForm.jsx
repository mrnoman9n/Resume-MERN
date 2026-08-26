import { Plus, Trash2 } from 'lucide-react'
import React from 'react'

const EducationForm = ({ data, onChange }) => {

  const addEducation = () => {
    const newEducation = {
      id: Date.now(),
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      description: ""
    }
    onChange([...(data || []), newEducation])
  }

  const updateEducation = (id, field, value) => {
    const updated = (data || []).map((edu) =>
      edu.id === id ? { ...edu, [field]: value } : edu
    )
    onChange(updated)
  }

  const removeEducation = (id) => {
    onChange((data || []).filter((edu) => edu.id !== id))
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'> Education </h3>
          <p className='text-sm text-gray-500'>Add your educational background</p>
        </div>
        <button
          onClick={addEducation}
          className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors'
        >
          <Plus className="size-4"/>
          Add Education
        </button>
      </div>

      {(!data || data.length === 0) ? (
        <div className='text-center py-10 border border-dashed border-gray-300 rounded-lg'>
          <p className='text-sm text-gray-400'>No education added yet. Click "Add Education" to get started.</p>
        </div>
      ) : (
        <div className='space-y-4'>
          {data.map((edu) => (
            <div key={edu.id} className='p-4 border border-gray-200 rounded-lg space-y-3 relative'>
              <button
                onClick={() => removeEducation(edu.id)}
                className='absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors'
              >
                <Trash2 className="size-4"/>
              </button>

              <div className='grid grid-cols-2 gap-3'>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                  placeholder="Institution name"
                  className='w-full p-2 px-3 border text-sm text-gray-900 border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors'
                />
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                  placeholder="Degree / field of study"
                  className='w-full p-2 px-3 border text-sm text-gray-900 border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors'
                />
              </div>

              <div className='grid grid-cols-2 gap-3'>
                <input
                  type="text"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                  placeholder="Start date (e.g. Jan 2018)"
                  className='w-full p-2 px-3 border text-sm text-gray-900 border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors'
                />
                <input
                  type="text"
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                  placeholder="End date (or Present)"
                  className='w-full p-2 px-3 border text-sm text-gray-900 border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors'
                />
              </div>

              <textarea
                value={edu.description}
                onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                rows={3}
                placeholder="Relevant coursework, achievements, GPA, etc..."
                className='w-full p-3 px-4 border text-sm text-gray-900 border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none'
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EducationForm