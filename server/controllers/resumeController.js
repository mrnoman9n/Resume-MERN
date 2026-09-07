// controller for creating, deleting, getting and updating resumes
// post : /api/resumes/create

import imagekit from "../configs/imagekit.js";
import Resume from "../models/resume.js";
import fs from "fs";

export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newResume = await Resume.create({ userId, title });

    return res.status(201).json({
      message: "resume created successfully",
      resume: newResume,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// delete
// delete : /api/resumes/:id

export const deletedResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const deletedDoc = await Resume.findOneAndDelete({ _id: id, userId });

    if (!deletedDoc) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({
      message: "resume deleted successfully",
      resume: deletedDoc,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// get resume by id
// get: /api/resumes/getResumeById/:id

export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const resume = await Resume.findOne({ _id: id, userId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({
      resume,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// get resume by public id
// get : /api/resumes/getResumeByPublicId/:Id

export const getResumeByPublicId = async (req, res) => {
  try {
    const { Id } = req.params;
    const resume = await Resume.findOne({ public: true, _id: Id });

    if (!resume) {
      return res.status(404).json({
        message: "resume not found",
      });
    }

    return res.status(200).json({
      resume,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// update resume
// put/patch : /api/resumes/update

export const UpdateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { Id, resumeData, removeBackground } = req.body;
    const image = req.file;

    if (!Id || !resumeData) {
      return res.status(400).json({ message: "Id and resumeData are required" });
    }

    let resumeDataCopy;
    if(typeof resumeData === 'string'){
      resumeDataCopy = await JSON.parse(resumeData)
    }else{
      resumeDataCopy = structuredClone(resumeData)
    }





    delete resumeDataCopy._id;

    let uploadedImageUrl;

    if (image) {
      const imageBufferData = fs.createReadStream(image.path);

      const response = await imagekit.files.upload({
        file: imageBufferData,
        fileName: "resume.png",
        folder: "user-resumes",
        transformation: {
          pre:
            "w-300,h-300,fo-face,z-0.75" +
            (removeBackground === "yes" ? ",e-bgremove" : ""),
        },
      });

      uploadedImageUrl = response.url;

      fs.unlink(image.path, (err) => {
        if (err) console.error("Temp file cleanup failed:", err.message);
      });
    }

    if (uploadedImageUrl) {
      resumeDataCopy.personal_info.image = uploadedImageUrl;
    }

    const updatedResume = await Resume.findOneAndUpdate(
      { _id: Id, userId },
      { $set: resumeDataCopy },
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({
      message: "saved successfully",
      resume: updatedResume,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// get all resumes
// GET: /api/resumes/all

export const getAllResumes = async (req, res) => {
  try {
    const userId = req.userId;

    const resumes = await Resume.find({ userId }).sort({
      updatedAt: -1,
    });

    return res.status(200).json({
      resumes,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};