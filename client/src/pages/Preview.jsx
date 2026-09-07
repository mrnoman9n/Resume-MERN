import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import api from "../configs/api";
import ResumePreview from "./ResumePreview";

const Preview = () => {
  const { resumeId } = useParams();

  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadResume = async () => {
    try {
      setIsLoading(true);

      const { data } = await api.get(
        "/api/resumes/public/" + resumeId
      );

      setResume(data.resume);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );

      setResume(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadResume();
  }, [resumeId]);

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  // Resume not found
  if (!resume) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-white mb-3">
          Resume Not Found
        </h1>

        <p className="text-gray-400 mb-6">
          No resume found with this ID.
        </p>

        <Link
          to="/"
          className="px-5 py-2.5 bg-white text-black rounded-lg font-medium"
        >
          Go Home
        </Link>
      </div>
    );
  }

  // Private resume
  if (!resume.public) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold text-white mb-3">
          Private Resume
        </h1>

        <p className="text-gray-400 text-center mb-6">
          This resume is currently private.
        </p>

        <Link
          to="/"
          className="px-5 py-2.5 bg-white text-black rounded-lg font-medium"
        >
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-white hover:text-gray-300"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back
          </Link>

          <h1 className="text-white font-medium">
            {resume.title}
          </h1>

          <div className="w-12" />
        </div>
      </header>

      {/* Resume */}
      <main className="py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl">
          <ResumePreview
            data={resume}
            template={resume.template}
            accentColor={resume.accent_color}
          />
        </div>
      </main>
    </div>
  );
};

export default Preview;