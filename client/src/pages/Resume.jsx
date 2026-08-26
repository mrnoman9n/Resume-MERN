import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets 4/assets";

import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderIcon,
  GraduationCap,
  Sparkle,
  User,
  Share2Icon,
  EyeIcon,
  EyeOffIcon,
  DownloadIcon,
  XIcon,
} from "lucide-react";

import html2pdf from "html2pdf.js";

import Personalinfo from "../components/Personalinfo";
import ResumePreview from "./ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/Experience";
import EducationForm from "../components/EducationForm";
import ProjectsForm from "./ProjectForm";
import SkillsForm from "../components/Skills";

const Resume = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const resumeRef = useRef(null);

  const section = [
    {
      id: "personal",
      name: "Personal info",
      Icon: User,
    },
    {
      id: "summary",
      name: "Summary",
      Icon: FileText,
    },
    {
      id: "experience",
      name: "Experience",
      Icon: Briefcase,
    },
    {
      id: "education",
      name: "Education",
      Icon: GraduationCap,
    },
    {
      id: "skills",
      name: "Skills",
      Icon: Sparkle,
    },
    {
      id: "projects",
      name: "Projects",
      Icon: FolderIcon,
    },
  ];

  const activeSection = section[activeSectionIndex];

  // Load resume
  useEffect(() => {
    const resume = dummyResumeData.find(
      (resume) => resume._id === resumeId
    );

    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  }, [resumeId]);

  // Previous
  const handlePrevious = () => {
    setActiveSectionIndex((prev) => Math.max(prev - 1, 0));
  };

  // Next
  const handleNext = () => {
    setActiveSectionIndex((prev) =>
      Math.min(prev + 1, section.length - 1)
    );
  };

  // Public / Private
  const togglePublic = () => {
    setResumeData((prev) => ({
      ...prev,
      public: !prev.public,
    }));
  };

  // Share
const handleShare = async () => {
  const resumeUrl = `${window.location.origin}/view/${resumeId}`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: resumeData.title,
        text: "Check out my resume",
        url: resumeUrl,
      });
    } else {
      await navigator.clipboard.writeText(resumeUrl);
      alert("Resume link copied!");
    }
  } catch (error) {
    console.log("Share cancelled");
  }
};

  // Download PDF
  const handleDownload = async () => {
    if (isDownloading) return;

    if (!resumeRef.current) {
      alert("Resume preview is not ready.");
      return;
    }

    setIsDownloading(true);

    try {
      // Give browser time to finish rendering
      await new Promise((resolve) =>
        setTimeout(resolve, 300)
      );

      const element = resumeRef.current;

      const options = {
        margin: 0,

        filename: `${resumeData.title || "resume"}.pdf`,

        image: {
          type: "jpeg",
          quality: 0.98,
        },

        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          logging: false,
          scrollX: 0,
          scrollY: 0,
          windowWidth: element.scrollWidth,
          windowHeight: element.scrollHeight,
        },

        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },

        pagebreak: {
          mode: ["css", "legacy"],
        },
      };

      await html2pdf()
        .set(options)
        .from(element)
        .save();

    } catch (error) {
      console.error("PDF Download Error:", error);

      alert(
        "PDF download failed. Please try again."
      );
    } finally {
      setIsDownloading(false);
    }
  };

  // Open preview
  const openPreview = () => {
    setShowPreview(true);
  };

  // Close preview
  const closePreview = () => {
    setShowPreview(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Back */}
      <div className="pt-6">
        <Link
          to="/app"
          className="flex items-center gap-2 ml-10 text-white transition-all duration-200 hover:scale-[1.01]"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Title */}
      <h1 className="mt-10 ml-10 mb-10 text-2xl font-semibold bg-gradient-to-r from-white to-[#748298] text-transparent bg-clip-text">
        {resumeData.title}
      </h1>

      <div className="max-w-7xl mx-auto px-4 pb-8">

        <div className="grid lg:grid-cols-12 gap-8">

          {/*  LEFT  */}

          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">

            <div className="relative bg-white rounded-lg shadow-sm border border-gray-200 p-5 pt-1">

              {/* Progress background */}
              <hr className="absolute top-0 left-0 right-0 border border-gray-200" />

              {/* Progress */}
              <hr
                className="absolute top-0 left-0 border-none h-1 bg-gradient-to-r from-white to-green-600 transition-all duration-200"
                style={{
                  width: `${
                    (activeSectionIndex * 100) /
                    (section.length - 1)
                  }%`,
                }}
              />

              {/* Controls */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-2">

                {/* Template / Color */}
                <div className="flex items-center gap-2">

                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({
                        ...prev,
                        template,
                      }))
                    }
                  />

                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setResumeData((prev) => ({
                        ...prev,
                        accent_color: color,
                      }))
                    }
                  />

                </div>

                {/* Navigation */}
                <div className="flex items-center gap-1">

                  {activeSectionIndex !== 0 && (
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="flex items-center gap-1 p-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                    >
                      <ChevronLeft className="size-4" />
                      Previous
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={
                      activeSectionIndex ===
                      section.length - 1
                    }
                    className={`flex items-center gap-1 p-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${
                      activeSectionIndex ===
                      section.length - 1
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </button>

                </div>
              </div>

              {/* Forms */}
              <div className="space-y-6">

                {activeSection.id === "personal" && (
                  <Personalinfo
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={
                      setRemoveBackground
                    }
                  />
                )}

                {activeSection.id === "summary" && (
                  <ProfessionalSummaryForm
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}

                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        experience: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "education" && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        education: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "skills" && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        skills: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "projects" && (
                  <ProjectsForm
                    data={resumeData.project}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        project: data,
                      }))
                    }
                  />
                )}

              </div>
            </div>
          </div>

          {/*  RIGHT  */}

          <div className="lg:col-span-7 max-lg:mt-6">

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 mb-4">

              {/* Preview */}
              <button
                type="button"
                onClick={openPreview}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white text-gray-700 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition"
              >
                <EyeIcon className="size-4" />
                Preview
              </button>

              {/* Download */}
              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white text-gray-700 border border-gray-200 rounded-lg shadow-sm transition ${
                  isDownloading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-50"
                }`}
              >
                <DownloadIcon className="size-4" />

                {isDownloading
                  ? "Downloading..."
                  : "Download"}
              </button>

              {/* Share */}
              {resumeData.public && (
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white text-gray-700 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition"
                >
                  <Share2Icon className="size-4" />
                  Share
                </button>
              )}

              {/* Public */}
              <button
                type="button"
                onClick={togglePublic}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white text-gray-700 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition"
              >
                {resumeData.public ? (
                  <>
                    <EyeIcon className="size-4" />
                    Public
                  </>
                ) : (
                  <>
                    <EyeOffIcon className="size-4" />
                    Private
                  </>
                )}
              </button>

            </div>

            {/*  RESUME  */}

            <div
              ref={resumeRef}
              id="resume-preview"
              className="bg-white w-full"
            >
              <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
              />
            </div>

          </div>
        </div>
      </div>

      {/*  PREVIEW MODAL  */}

      {showPreview && (
        <div className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-sm overflow-y-auto">

          <div className="min-h-screen py-6 px-4">

            {/* Header */}
            <div className="max-w-4xl mx-auto flex items-center justify-between mb-5">

              <h2 className="text-lg font-semibold text-white">
                Resume Preview
              </h2>

              <div className="flex items-center gap-2">

                {/* Download */}
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className={`flex items-center gap-2 px-4 py-2 text-sm bg-white text-gray-700 rounded-lg transition ${
                    isDownloading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <DownloadIcon className="size-4" />

                  {isDownloading
                    ? "Downloading..."
                    : "Download"}
                </button>

                {/* Close */}
                <button
                  type="button"
                  onClick={closePreview}
                  className="flex items-center justify-center w-9 h-9 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition"
                  aria-label="Close preview"
                >
                  <XIcon className="size-5" />
                </button>

              </div>
            </div>

            {/* Preview */}
            <div className="max-w-4xl mx-auto">

              <div className="bg-white rounded-lg overflow-hidden shadow-2xl">

                <ResumePreview
                  data={resumeData}
                  template={resumeData.template}
                  accentColor={resumeData.accent_color}
                />

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Resume;