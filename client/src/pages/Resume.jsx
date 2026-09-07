import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  SaveIcon,
  LoaderCircleIcon,
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

import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const Resume = () => {
  const { resumeId } = useParams();
  const { token } = useSelector((state) => state.auth);

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
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const resumeRef = useRef(null);

  const sections = [
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

  const activeSection = sections[activeSectionIndex];

  // Load resume
  const loadResume = async () => {
    try {
      setIsLoading(true);

      const { data } = await api.get(`/api/resumes/resume/${resumeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!data?.resume) {
        toast.error("Resume not found");
        return;
      }

      setResumeData(data.resume);
      document.title = data.resume.title || "Resume";
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.message || "Failed to load resume"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Save resume
  const saveResumeData = async () => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      const { _id, ...resumeDataWithoutId } = resumeData;

      const formData = new FormData();
      formData.append("Id", resumeId);
      formData.append("resumeData", JSON.stringify(resumeDataWithoutId));
      removeBackground && formData.append("removeBackground", "yes");

      typeof resumeData.personal_info.image === "object" &&
        formData.append("image", resumeData.personal_info.image);

      const { data } = await api.put("/api/resumes/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResumeData(data.resume);
      toast.success(data.message || "Resume saved successfully");
    } catch (error) {
      console.error("Save Resume Error:", error);
      toast.error(
        error?.response?.data?.message || error?.message || "Failed to save resume"
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Previous section
  const handlePrevious = () => {
    setActiveSectionIndex((prev) => Math.max(prev - 1, 0));
  };

  // Next section
  const handleNext = () => {
    setActiveSectionIndex((prev) => Math.min(prev + 1, sections.length - 1));
  };

  // Public / Private
  const togglePublic = () => {
    setResumeData((prev) => ({
      ...prev,
      public: !prev.public,
    }));
  };

  // Share resume
 const handleShare = async () => {
  const resumeUrl = `${window.location.origin}/view/${resumeId}`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: resumeData.title || "My Resume",
        url: resumeUrl,
      });
    } else {
      await navigator.clipboard.writeText(resumeUrl);
      toast.success("Resume link copied!");
    }
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error("Share Error:", error);
      toast.error("Failed to share resume");
    }
  }
};

  // Download PDF
  const handleDownload = async () => {
    if (isDownloading) return;

    if (!resumeRef.current) {
      toast.error("Resume preview is not ready");
      return;
    }

    setIsDownloading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

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

      await html2pdf().set(options).from(element).save();
    } catch (error) {
      console.error("PDF Download Error:", error);

      toast.error("PDF download failed. Please try again.");
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

  useEffect(() => {
    if (token && resumeId) {
      loadResume();
    }
  }, [token, resumeId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center gap-2 text-white">
          <LoaderCircleIcon className="size-5 animate-spin" />
          Loading resume...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back */}

      <div className="pt-6">
        <Link
          to="/app"
          className="
            flex items-center gap-2
            ml-10
            text-white
            transition-all
            duration-200
            hover:scale-[1.01]
          "
        >
          <ArrowLeftIcon className="w-5 h-5" />

          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Title */}

      <h1
        className="
          mt-10
          ml-10
          mb-10
          text-2xl
          font-semibold
          bg-gradient-to-r
          from-white
          to-[#748298]
          text-transparent
          bg-clip-text
        "
      >
        {resumeData.title}
      </h1>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* LEFT SIDE */}

          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div
              className="
                relative
                bg-white
                rounded-lg
                shadow-sm
                border
                border-gray-200
                p-5
                pt-1
              "
            >
              {/* Progress background */}

              <hr
                className="
                  absolute
                  top-0
                  left-0
                  right-0
                  border
                  border-gray-200
                "
              />

              {/* Progress */}

              <hr
                className="
                  absolute
                  top-0
                  left-0
                  border-none
                  h-1
                  bg-gradient-to-r
                  from-white
                  to-green-600
                  transition-all
                  duration-200
                "
                style={{
                  width: `${(activeSectionIndex * 100) / (sections.length - 1)}%`,
                }}
              />

              {/* Controls */}

              <div
                className="
                  flex
                  justify-between
                  items-center
                  mb-6
                  border-b
                  border-gray-300
                  py-2
                "
              >
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
                      className="
                        flex
                        items-center
                        gap-1
                        p-2
                        rounded-lg
                        text-sm
                        font-medium
                        text-gray-600
                        hover:bg-gray-50
                        transition-all
                      "
                    >
                      <ChevronLeft className="size-4" />
                      Previous
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={activeSectionIndex === sections.length - 1}
                    className={`
                      flex
                      items-center
                      gap-1
                      p-2
                      rounded-lg
                      text-sm
                      font-medium
                      text-gray-600
                      hover:bg-gray-50
                      transition-all

                      ${
                        activeSectionIndex === sections.length - 1
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }
                    `}
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
                    setRemoveBackground={setRemoveBackground}
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

          {/* RIGHT SIDE */}

          <div className="lg:col-span-7 max-lg:mt-6">
            {/* Action Buttons */}

            <div
              className="
                flex
                flex-wrap
                items-center
                justify-end
                gap-2
                mb-4
              "
            >
              {/* Save */}

              <button
                type="button"
                onClick={saveResumeData}
                disabled={isSaving}
                className={`
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-white
                  rounded-lg
                  shadow-sm
                  transition

                  ${
                    isSaving
                      ? "bg-green-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }
                `}
              >
                {isSaving ? (
                  <LoaderCircleIcon className="size-4 animate-spin" />
                ) : (
                  <SaveIcon className="size-4" />
                )}

                {isSaving ? "Saving..." : "Save"}
              </button>

              {/* Preview */}

              <button
                type="button"
                onClick={openPreview}
                className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  text-sm
                  font-medium
                  bg-white
                  text-gray-700
                  border
                  border-gray-200
                  rounded-lg
                  shadow-sm
                  hover:bg-gray-50
                  transition
                "
              >
                <EyeIcon className="size-4" />
                Preview
              </button>

              {/* Download */}

              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className={`
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  text-sm
                  font-medium
                  bg-white
                  text-gray-700
                  border
                  border-gray-200
                  rounded-lg
                  shadow-sm
                  transition

                  ${
                    isDownloading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-50"
                  }
                `}
              >
                <DownloadIcon className="size-4" />
                {isDownloading ? "Downloading..." : "Download"}
              </button>

              {/* Share */}

              {resumeData.public && (
                <button
                  type="button"
                  onClick={handleShare}
                  className="
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    text-sm
                    font-medium
                    bg-white
                    text-gray-700
                    border
                    border-gray-200
                    rounded-lg
                    shadow-sm
                    hover:bg-gray-50
                    transition
                  "
                >
                  <Share2Icon className="size-4" />
                  Share
                </button>
              )}

              {/* Public / Private */}

              <button
                type="button"
                onClick={togglePublic}
                className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  text-sm
                  font-medium
                  bg-white
                  text-gray-700
                  border
                  border-gray-200
                  rounded-lg
                  shadow-sm
                  hover:bg-gray-50
                  transition
                "
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

            {/* Resume */}

            <div ref={resumeRef} id="resume-preview" className="bg-white w-full">
              <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
              />
            </div>
          </div>
        </div>
      </div>

      {/* PREVIEW MODAL */}

      {showPreview && (
        <div
          className="
            fixed
            inset-0
            z-[99999]
            bg-black/90
            backdrop-blur-sm
            overflow-y-auto
          "
        >
          <div className="min-h-screen py-6 px-4">
            {/* Header */}

            <div
              className="
                max-w-4xl
                mx-auto
                flex
                items-center
                justify-between
                mb-5
              "
            >
              <h2 className="text-lg font-semibold text-white">Resume Preview</h2>

              <div className="flex items-center gap-2">
                {/* Download */}

                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className={`
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    text-sm
                    bg-white
                    text-gray-700
                    rounded-lg
                    transition

                    ${
                      isDownloading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-100"
                    }
                  `}
                >
                  <DownloadIcon className="size-4" />
                  {isDownloading ? "Downloading..." : "Download"}
                </button>

                {/* Close */}

                <button
                  type="button"
                  onClick={closePreview}
                  className="
                    flex
                    items-center
                    justify-center
                    w-9
                    h-9
                    bg-white
                    text-gray-700
                    rounded-lg
                    hover:bg-gray-100
                    transition
                  "
                  aria-label="Close preview"
                >
                  <XIcon className="size-5" />
                </button>
              </div>
            </div>

            {/* Preview */}

            <div className="max-w-4xl mx-auto">
              <div
                className="
                  bg-white
                  rounded-lg
                  overflow-hidden
                  shadow-2xl
                "
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
      )}
    </div>
  );
};

export default Resume;