import React, { useState } from "react";
import { Layout , Check } from "lucide-react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const template = [
    {
      id: "classic",
      template: "Classic",
      preview:
        " A traditional & clean resume format with clear sections and professional typography ",
    },
    {
      id: "modern",
      template: "Modern",
      preview:
        "sleek design with strategic use of colors and modern font choices ",
    },
    {
      id: "minimal",
      template: "Minimal",
      preview: "ultra clean design that puts your content front and center",
    },
    {
      id: "minimal-image",
      template: "Minimal Image",
      preview: "minimal design with single image and clean typography ",
    },
  ];

  return (
    <div>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg"
        >
          <Layout size={14} /> <span className="max-sm:hidden text-black">Template</span>
        </button>

        {isOpen && (
          <div className="absolute top-full w-xs p-3 mt-2 space-y-3 z-10 bg-white rounded-md border border-gray-200 shadow-sm">
            {template.map((template) => (
              <div
                key={template.id}
                onClick={() => {
                  onChange(template.id);
                  setIsOpen(false);
                }}
                className={`relative p-3 border rounded-md cursor-pointer transition-all ${
                  selectedTemplate === template.id
                    ? "border-blue-400 bg-blue-100"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"
                }`}
              >
                {selectedTemplate === template.id && (
                  <div className="absolute top-1 right-1 text-blue-500">
                    <Check size={14} />
                  </div>
                )}

                <div className="space-y-1">
                  <p className="text-sm font-medium text-black ">
                    {template.template}
                  </p>
                  <div className="mt-2 p-2 bg-blue rounded text-xs text-black italic">
                    {template.preview}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateSelector;
