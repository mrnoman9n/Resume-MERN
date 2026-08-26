import React from 'react'

import ClassicTemplate from '../assets/assets 4/templates/ClassicTemplate';
import MinimalTemplate from '../assets/assets 4/templates/MinimalTemplate';
import MinimalImageTemplate from '../assets/assets 4/templates/MinimalImageTemplate';
import ModernTemplate from '../assets/assets 4/templates/ModernTemplate';

const ResumePreview = ({data ,template , accentColor , classes =""}) => {
const renderTemplate = ()=>{
    switch (template) {
        case "modern":
            return <ModernTemplate data={data} accentColor={accentColor} /> 
                 case "minimal":
            return <MinimalImageTemplate data={data} accentColor={accentColor} /> 
                 case "minimal-template":
            return <MinimalTemplate data={data} accentColor={accentColor} /> 
    
        default:   return <ClassicTemplate data={data} accentColor={accentColor} /> 
            break;
    }
}


  return (
     <div className='w-full bg-gray-100'>
    <div id="resume-preview" className={"border border-gray-200 print:shadow-none print:border-none " + classes}>
      {renderTemplate()}
    </div>

    <style >
      {`
      @page {
        size: letter;
        margin: 0;
      }

      @media print {
        html, body {
          width: 8.5in;
          height: 11in;
          overflow: hidden;
        }

        body * {
          visibility: hidden;
        }

        #resume-preview, #resume-preview * {
          visibility: visible;
        }

        #resume-preview {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: auto;
          margin: 0;
          padding: 0;
          box-shadow: none !important;
          border: none !important;
        }
      }
      `}
    </style>
  </div>
  )
}

export default ResumePreview 