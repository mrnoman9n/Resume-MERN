import React, { useEffect, useState } from 'react';
import { User, Mail, Phone, MapPin, BriefcaseBusiness, Link2, Globe } from "lucide-react";


const Personalinfo = ({ data, onChange, removeBackground, setRemoveBackground }) => {
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (data.image && typeof data.image === 'object') {
      const url = URL.createObjectURL(data.image);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setImagePreview(null);
  }, [data.image]);

  function handleChange(field, value) {
    onChange({ ...data, [field]: value });
  }

  const fields = [
    { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
    { key: "linkedin", label: "LinkedIn Profile", icon: Link2, type: "url" },
    { key: "website", label: "Personal Website", icon: Globe, type: "url" }
  ];

  return (
    <div>
      <h3 className='text-lg font-semibold text-gray-900'>Personal information</h3>
      <p className='text-sm text-gray-500'>Get started with personal information</p>

      <div className='flex items-center gap-2'>
        <label>
          {data.image ? (
            <img
              src={typeof data.image === 'string' ? data.image : imagePreview}
              alt="user-image"
              className='w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80'
            />
          ) : (
            <div className='inline-flex items-center gap-2 mt-5 text-slate-500 hover:text-slate-700 cursor-pointer'>
              <User className='size-10 p-2.5 border rounded-full'/>
              upload user image
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={(e) => handleChange('image', e.target.files[0])}
          />
        </label>

        {typeof data.image === 'object' && data.image !== null && (
          <div className='flex flex-col gap-1 pl-4 text-sm'>
            <p className='text-black'>Remove Background</p>
            <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={() => setRemoveBackground(prev => !prev)}
                checked={removeBackground}
              />
              <div className='w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200'></div>
              <span className='dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4'></span>
            </label>
          </div>
        )}
      </div>

      {fields.map((field) => {
        const Icon = field.icon;
        return (
          <div key={field.key} className='space-y-1 mt-5'>
            <label htmlFor={field.key} className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Icon className="size-4"/>
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              id={field.key}
              type={field.type}
              required={field.required}
              value={data[field.key] || ''}
              onChange={(e) => onChange({ ...data, [field.key]: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>
        );
      })}
    </div>
  );
};

export default Personalinfo;