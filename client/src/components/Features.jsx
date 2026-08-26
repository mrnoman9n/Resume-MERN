import React from "react";
import Title from "./Title";

const Features = () => {
  return (
    <>
      <style>
        {`
                    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
                    *{
                        font-family: "Geist", sans-serif;
                    }
                `}
      </style>

      <section className="bg-black py-16 px-16">
        <div className="flex justify-center py-9">
          <div className="inline-flex  items-center gap-2 text-sm text-green-800 bg-blue-400/10 border border-green-600 rounded-full px-3  py-3">
            <svg
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.4 1H13v3.6"
                stroke="#1E4BAF"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13 1 7.9 6.1l-3-3L1 7"
                stroke="#1E4BAF"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Simple process</span>
          </div>
        </div>

        <Title
          title={"Build your Resume"}
          descreption={
            "our outlined process helps you to create professional resume in minutes"
          }
        />

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-9 bg-green-700/15 rounded-full py-2.5 px-6">
            <span className="text-xs text-white inline-block bg-green-600 hover:scale-120 transition-transform duration-200 rounded-full px-6 py-2">
              FEATURES
            </span>
            <h1
              className="text-4xl md:text-[40px] font-medium bg-gradient-to-r
            from-white
            to-[#748298]
            text-transparent
            bg-clip-text mt-6"
            >
              All You Need to Build Fast
            </h1>
            <p className="text-base text-[#748298] max-w-sm mx-auto mt-3">
              Carefully crafted components and patterns designed to scale with
              your product.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {/* Row 1 */}
            <div className="flex flex-col md:flex-row gap-5">
              <div className="md:w-[60%] md:h-60 bg-[#626568] rounded-xl hover:scale-102 transition-all duration-300 p-5 flex flex-col md:flex-row gap-5">
                <img
                  src="https://assets.prebuiltui.com/components/feature-sections/feature-workspace-img.png"
                  alt="Feature workspace"
                  className="w-full h-48 md:h-full md:w-[45%] object-cover rounded-2xl"
                />
                <div className="flex flex-col mt-2">
                  <div className="size-11 bg-zinc-900 rounded-lg flex items-center justify-center mb-5">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 3H4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1m11 0h-5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1m0 11h-5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1M9 14H4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1"
                        stroke="#fafafa"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3
                    className="text-sm font-medium bg-gradient-to-r
            from-white
            to-[#748298]
            text-transparent
            bg-clip-text"
                  >
                    Smart Resume Builder
                  </h3>
                  <p
                    className="text-sm/6 bg-gradient-to-r
            from-white
            to-[#748298]
            text-transparent
            bg-clip-text mt-2.5"
                  >
                    Create a professional resume quickly with our simple and
                    intuitive resume builder. Customize every section to match
                    your career goals.
                  </p>
                </div>
              </div>

              <div className="md:w-[40%] bg-[#626568] rounded-xl hover:scale-102 transition-all duration-300 px-6 py-6 md:pt-7">
                <div className="size-11 bg-zinc-900 rounded-lg flex items-center justify-center mb-5">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
                      stroke="#fafafa"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="m9 12 2 2 4-4"
                      stroke="#fafafa"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3
                  className="text-sm font-medium bg-gradient-to-r
            from-white
            to-[#748298]
            text-transparent
            bg-clip-text"
                >
                  Professional Templates
                </h3>
                <p
                  className="text-sm bg-gradient-to-r
            from-white
            to-[#748298]
            text-transparent
            bg-clip-text mt-2.5"
                >
                  Choose from clean and modern resume templates designed to help
                  you present your skills and experience professionally.
                </p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-col md:flex-row gap-5">
              <div className="md:w-[40%] bg-[#626568] rounded-xl hover:scale-102 transition-all duration-300 px-6 py-6 md:pt-7">
                <div className="size-11 bg-zinc-900 rounded-lg flex items-center justify-center mb-5">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.671 4.134a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.83A2.34 2.34 0 0 1 6.35 6.048a2.34 2.34 0 0 0 3.319-1.915"
                      stroke="#f4f4f5"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
                      stroke="#f4f4f5"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <h3
                  className="text-sm font-medium bg-gradient-to-r
            from-white
            to-[#748298]
            text-transparent
            bg-clip-text"
                >
                  Easy Customization
                </h3>
                <p
                  className="text-sm bg-gradient-to-r
            from-white
            to-[#748298]
            text-transparent
            bg-clip-text mt-2.5"
                >
                  Easily edit your personal information, skills, education and
                  experience. Make changes anytime without rebuilding your
                  resume.
                </p>
              </div>

              <div className="md:w-[60%] md:h-60 bg-[#626568] rounded-xl hover:scale-102 transition-all duration-300 p-5 flex flex-col md:flex-row gap-5">
                <img
                  src="https://assets.prebuiltui.com/components/feature-sections/feature-minimal-office-img.png"
                  alt="Feature office"
                  className="w-full h-48 md:h-full md:w-[45%] object-cover rounded-2xl"
                />
                <div className="flex flex-col mt-2">
                  <div className="size-11 bg-zinc-900 rounded-lg flex items-center justify-center mb-5">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 3H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-2 8v4a2 2 0 0 0 2 2h4m6-4h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2"
                        stroke="#fafafa"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3
                    className="text-sm font-medium bg-gradient-to-r
            from-white
            to-[#748298]
            text-transparent
            bg-clip-text"
                  >
                    Built for Job Seekers
                  </h3>
                  <p
                    className="text-sm/6 bg-gradient-to-r
            from-white
            to-[#748298]
            text-transparent
            bg-clip-text mt-2.5"
                  >
              Create ATS-friendly resumes that highlight your strengths and help you make a strong impression on recruiters and employers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
