import React, { useEffect, useState } from "react";
import {
  FilePenLineIcon,
  PlusIcon,
  UploadCloudIcon,
  TrashIcon,
  PencilIcon,
  FileTextIcon,
  XIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { dummyResumeData } from "../assets/assets 4/assets";

const user = { name: "John Doe" };

const Dashboard = () => {
  const colors = ["#6366f1", "#ec4899", "#22c55e", "#f97316"];

  const [allResumes, setAllResumes] = useState([]);

  const [showCreateResumes, setShowCreateResumes] = useState(false);
  const [showUploadResumes, setShowUploadResumes] = useState(false);
  const [showEditResume, setShowEditResume] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResume, setEditResume] = useState(null);
  const [deleteResume, setDeleteResume] = useState(null);

  const navigate = useNavigate();

  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData);
  };

  const createResume = async (event) => {
    event.preventDefault();

    console.log("Resume title:", title);

    setShowCreateResumes(false);
    setTitle("");

    navigate("/app/builder/res123");
  };

  const uploadResume = async (event) => {
    event.preventDefault();

    if (!resume) {
      alert("Please select a resume file");
      return;
    }

    console.log("Resume title:", title);
    console.log("Resume file:", resume);

    setShowUploadResumes(false);
    setTitle("");
    setResume(null);

    navigate("/app/builder/res123");
  };

  // Edit resume
  const handleEdit = (resume) => {
    setEditResume(resume);
    setTitle(resume.title);
    setShowEditResume(true);
  };

  const updateResume = (event) => {
    event.preventDefault();

    if (!editResume) return;

    setAllResumes((prev) =>
      prev.map((item) =>
        item._id === editResume._id
          ? {
              ...item,
              title: title,
              updatedAt: new Date().toISOString(),
            }
          : item,
      ),
    );

    setShowEditResume(false);
    setEditResume(null);
    setTitle("");
  };

  // Open delete modal
  const handleDelete = (resume) => {
    setDeleteResume(resume);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDeleteResume = () => {
    if (!deleteResume) return;

    setAllResumes((prev) =>
      prev.filter((item) => item._id !== deleteResume._id),
    );

    setShowDeleteModal(false);
    setDeleteResume(null);
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Header */}

        <div className="mb-10">
          <p
            className="
              font-semibold
              bg-gradient-to-r
              from-white
              to-[#748298]
              bg-clip-text
              text-transparent
              text-3xl
            "
          >
            Welcome back, {user.name}
          </p>

          <p className="text-slate-400 text-sm mt-1">
            Manage and create your resumes below
          </p>
        </div>

        {/* Create and Upload Buttons */}

        <div className="flex flex-wrap gap-4 mb-10">
          <button
            onClick={() => setShowCreateResumes(true)}
            className="
              w-full sm:w-36 h-48
              flex flex-col items-center justify-center
              rounded-xl gap-2
              bg-white text-slate-600
              border border-dashed border-slate-300
              group
              hover:border-green-500
              hover:shadow-lg
              hover:-translate-y-0.5
              transition-all duration-300
            "
          >
            <PlusIcon
              className="
                size-11 p-2.5 rounded-full text-white
                bg-gradient-to-br from-green-300 to-green-500
                group-hover:scale-110
                transition-all duration-300
              "
            />

            <p className="text-sm font-medium group-hover:text-green-600">
              Create Resume
            </p>
          </button>

          <button
            onClick={() => setShowUploadResumes(true)}
            className="
              w-full sm:w-36 h-48
              flex flex-col items-center justify-center
              rounded-xl gap-2
              bg-white text-slate-600
              border border-dashed border-purple-300
              group
              hover:border-purple-500
              hover:shadow-lg
              hover:-translate-y-0.5
              transition-all duration-300
            "
          >
            <UploadCloudIcon
              className="
                size-11 p-2.5 rounded-full text-white
                bg-gradient-to-br from-purple-300 to-purple-500
                group-hover:scale-110
                transition-all duration-300
              "
            />

            <p className="text-sm font-medium group-hover:text-purple-600">
              Upload Existing
            </p>
          </button>
        </div>

        {/* Resume Heading */}

        <div className="flex items-center gap-3 mb-6">
          <FileTextIcon className="size-4 text-slate-400" />

          <p className="text-slate-300 text-sm font-medium">Your Resumes</p>

          <hr className="flex-1 border-slate-700" />
        </div>

        {/* Resume Cards */}

        {allResumes.length === 0 ? (
          <p className="text-slate-500 text-sm">
            You haven't created any resumes yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
            {allResumes.map((resume, index) => {
              const baseColor = colors[index % colors.length];

              return (
                <div
                  key={resume._id}
                  onClick={() => navigate(`/app/builder/${resume._id}`)}
                  className="
                    relative
                    w-full sm:w-36 h-48
                    flex flex-col items-center justify-center
                    rounded-xl gap-2
                    border group
                    hover:shadow-lg
                    hover:-translate-y-0.5
                    transition-all duration-300
                    cursor-pointer
                  "
                  style={{
                    background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                    borderColor: baseColor + "40",
                  }}
                >
                  <FilePenLineIcon
                    className="size-8 group-hover:scale-110 transition-all"
                    style={{ color: baseColor }}
                  />

                  <p
                    className="
                      text-sm font-medium
                      px-3 text-center line-clamp-2
                    "
                    style={{ color: baseColor }}
                  >
                    {resume.title}
                  </p>

                  <div
                    className="px-2.5 py-1 rounded-full text-[10px] font-medium max-w-[90%] truncate"
                    style={{
                      color: baseColor,
                      backgroundColor: baseColor + "15",
                      border: `1px solid ${baseColor}25`,
                    }}
                  >
                    {resume.personal_info?.profession}
                  </div>

                  <p
                    className="absolute bottom-2 text-[11px]"
                    style={{ color: baseColor + "90" }}
                  >
                    Updated {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>

                  {/* Edit & Delete Buttons */}

                  <div
                    className="
                      absolute top-2 right-2
                      gap-1 hidden group-hover:flex
                    "
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(resume);
                      }}
                      className="
                        size-7 p-1.5 rounded
                        hover:bg-white/60
                        text-slate-700
                      "
                    >
                      <PencilIcon className="size-4" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(resume);
                      }}
                      className="
                        size-7 p-1.5 rounded
                        hover:bg-white/60
                        text-slate-700
                      "
                    >
                      <TrashIcon className="size-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Modal */}

      {showCreateResumes && (
        <form
          onSubmit={createResume}
          onClick={() => {
            setShowCreateResumes(false);
            setTitle("");
          }}
          className="
            fixed inset-0
            bg-black/70 backdrop-blur
            z-10
            flex items-center justify-center px-4
          "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              relative bg-slate-50
              border shadow-md rounded-lg
              w-full max-w-sm p-6
            "
          >
            <h2 className="text-xl font-bold mb-4">Create a Resume</h2>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter resume title"
              className="
                w-full px-4 py-2 mb-4
                border rounded-2xl
                border-slate-300
                outline-none
                focus:border-green-600
              "
              required
            />

            <button
              type="submit"
              className="
                w-full py-2
                bg-green-600 text-white
                rounded hover:bg-green-700
              "
            >
              Create Resume
            </button>

            <button
              type="button"
              onClick={() => {
                setShowCreateResumes(false);
                setTitle("");
              }}
              className="
                absolute top-4 right-4
                text-slate-400
                hover:text-slate-700
              "
            >
              <XIcon className="size-5" />
            </button>
          </div>
        </form>
      )}

      {/* Upload Modal */}

      {showUploadResumes && (
        <form
          onSubmit={uploadResume}
          onClick={() => {
            setShowUploadResumes(false);
            setTitle("");
            setResume(null);
          }}
          className="
            fixed inset-0
            bg-black/70 backdrop-blur
            z-10
            flex items-center justify-center px-4
          "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              relative bg-slate-50
              border shadow-md rounded-lg
              w-full max-w-sm p-6
            "
          >
            <h2 className="text-xl font-bold mb-4">Upload Resume</h2>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter resume title"
              className="
                w-full px-4 py-2 mb-4
                border rounded-2xl
                border-slate-300
                outline-none
                focus:border-purple-600
              "
              required
            />

            <label
              htmlFor="resume-input"
              className="block text-sm text-slate-700"
            >
              Select resume file
              <div
                className="
                  flex flex-col items-center justify-center
                  gap-2 border border-dashed
                  rounded-md p-4 py-10 my-4
                  text-slate-400
                  hover:border-purple-600
                  hover:text-purple-600
                  cursor-pointer
                "
              >
                {resume ? (
                  <>
                    <FileTextIcon className="size-8" />

                    <p className="text-sm text-center break-all">
                      {resume.name}
                    </p>
                  </>
                ) : (
                  <>
                    <UploadCloudIcon className="size-8" />

                    <p>Upload resume</p>

                    <p className="text-xs">PDF files only</p>
                  </>
                )}
              </div>
            </label>

            <input
              id="resume-input"
              type="file"
              accept=".pdf"
              hidden
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];

                if (selectedFile) {
                  setResume(selectedFile);
                }
              }}
            />

            <button
              type="submit"
              className="
                w-full py-2
                bg-green-600 text-white
                rounded hover:bg-green-700
              "
            >
              Upload Resume
            </button>

            <button
              type="button"
              onClick={() => {
                setShowUploadResumes(false);
                setTitle("");
                setResume(null);
              }}
              className="
                absolute top-4 right-4
                text-slate-400
                hover:text-slate-700
              "
            >
              <XIcon className="size-5" />
            </button>
          </div>
        </form>
      )}

      {/* Edit Modal */}

      {showEditResume && (
        <form
          onSubmit={updateResume}
          onClick={() => {
            setShowEditResume(false);
            setEditResume(null);
            setTitle("");
          }}
          className="
            fixed inset-0
            bg-black/70 backdrop-blur
            z-10
            flex items-center justify-center px-4
          "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              relative bg-slate-50
              border shadow-md rounded-lg
              w-full max-w-sm p-6
            "
          >
            <h2 className="text-xl font-bold mb-4">Edit Resume</h2>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter resume title"
              className="
                w-full px-4 py-2 mb-4
                border rounded-2xl
                border-slate-300
                outline-none
                focus:border-blue-600
              "
              required
            />

            <button
              type="submit"
              className="
                w-full py-2
                bg-blue-600 text-white
                rounded hover:bg-blue-700
              "
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => {
                setShowEditResume(false);
                setEditResume(null);
                setTitle("");
              }}
              className="
                absolute top-4 right-4
                text-slate-400
                hover:text-slate-700
              "
            >
              <XIcon className="size-5" />
            </button>
          </div>
        </form>
      )}

      {/* Delete Confirmation Modal */}

      {showDeleteModal && (
        <div
          onClick={() => {
            setShowDeleteModal(false);
            setDeleteResume(null);
          }}
          className="
            fixed inset-0
            bg-black/70 backdrop-blur-sm
            z-20
            flex items-center justify-center px-4
          "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              w-full max-w-sm
              bg-slate-50
              rounded-xl
              shadow-xl
              p-6
              relative
            "
          >
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setDeleteResume(null);
              }}
              className="
                absolute top-4 right-4
                text-slate-400
                hover:text-slate-700
              "
            >
              <XIcon className="size-5" />
            </button>

            <div className="flex items-center justify-center mb-4">
              <div
                className="
                  size-12
                  rounded-full
                  bg-red-100
                  flex items-center justify-center
                "
              >
                <TrashIcon className="size-6 text-red-500" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-center text-slate-800">
              Delete Resume?
            </h2>

            <p className="text-sm text-slate-500 text-center mt-2">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-700">
                "{deleteResume?.title}"
              </span>
              ?
            </p>

            <p className="text-xs text-slate-400 text-center mt-1">
              This action cannot be undone.
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteResume(null);
                }}
                className="
                  flex-1 py-2.5
                  rounded-lg
                  border border-slate-300
                  text-slate-600
                  hover:bg-slate-100
                  transition
                "
              >
                Cancel
              </button>

              <button
                onClick={confirmDeleteResume}
                className="
                  flex-1 py-2.5
                  rounded-lg
                  bg-red-500
                  text-white
                  hover:bg-red-600
                  transition
                "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
