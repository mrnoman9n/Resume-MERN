// controller for creating e new
// post : /api/users/create

import imagekit from "../configs/imagekit.js";
import Resume from "../models/resume.js";
import fs from "fs";

export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;
    const newResume = await Resume.create({ userId, title });

    return res.status(201).json({
      message: "resume create successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// delete

export const deletedResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const newResume = await Resume.findOneAndDelete({ _id: id, userId });

    if (!deletedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(201).json({
      message: "resume deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// get resume by id
// get: api/users/getResumeById

export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const getResumeById = await Resume.findOne({ _id: id, userId });

    if (!getResumeById) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(201).json({
      getResumeById,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// get resume by public id
// get : api/users/getResumeByPublicId

export const getResumeByPublicId = async (req, res) => {
  try {
    const { Id } = req.params;
    const getResumeByPublicId = await Resume.findOne({ public: true, _id: Id });

    if (!getResumeByPublicId) {
      return res.status(404).json({
        message: "resume not found",
      });
    }

    return res.status(200).json({
      getResumeByPublicId,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// update resume

export const UpdateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { Id, resumeData, removeBackground } = req.body;
    const image = req.file;

    let resumeDataCopy = JSON.parse(resumeData);

    if (image) {
      const imageBufferData = fs.createReadStream(image.path);

      const response = await imagekit.files.upload({
        file: imageBufferData,
        fileName: "resume.png",
        folder: "user-resumes",
        transformation: {
          pre:
            "w-300, h-300 , fo-face , z-0.75" +
            (removeBackground ? ",e-bgremove" : ""),
        },
      });
    }

    resumeDataCopy.personal_info.image = response.url

    const UpdateResume = await Resume.findByIdAndUpdate(
      {
        _Id: Id,
        userId,
      },
      resumeDataCopy,
      { new: true },
    );

    return res.status(200).json({
      message: "saved successful",
      UpdateResume,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
