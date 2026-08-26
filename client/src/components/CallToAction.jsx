import React from 'react'

const CallToAction = () => {
  return (
   
      <div className="border-y mt-20 border-dashed border-slate-200 w-full max-w-5xl mx-auto px-16">
            <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-3 md:px-10 border-x border-dashed border-slate-200 py-20 -mt-10 -mb-10 w-full">
                <p className="text-xl font-medium max-w-sm">Join and build an outstanding resume with AI</p>
                <button className="flex items-center gap-2 rounded-md py-3 px-5 bg-green-700 hover:bg-green-900 transition text-white">
                    
                    <span>LOGIN</span>
                </button>
            </div>
        </div>

  )
}

export default CallToAction