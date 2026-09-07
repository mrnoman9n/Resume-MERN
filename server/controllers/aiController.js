import Resume from "../models/resume.js";
import ai from "../configs/ai.js";

// POST: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({
        message: "Missing required field",
      });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume writer. Enhance the professional summary of a resume. Keep it to 1-2 sentences, highlighting key skills, experience, and career objectives. Make it compelling, professional, and ATS-friendly. Return only the improved summary text, with no options or additional commentary.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent = response.choices[0]?.message?.content?.trim();

    return res.status(200).json({
      enhancedContent,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// POST: /api/ai/enhance-pro-desc
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({
        message: "Missing required field",
      });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume writer. Enhance the provided job description for a resume. Make it professional, compelling, clear, and ATS-friendly. Highlight responsibilities, achievements, and relevant skills when possible. Return only the improved job description text, with no options or additional commentary.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent = response.choices[0]?.message?.content?.trim();

    return res.status(200).json({
      enhancedContent,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText) {
      return res.status(400).json({
        message: "Resume text is required",
      });
    }

    const systemPrompt = `
You are an expert AI agent specialized in extracting structured information from resumes.

Return valid JSON only.
Do not include markdown or any additional text.
`;

    const userPrompt = `
Extract structured data from this resume:

${resumeText}

Return the data in exactly this JSON structure:

{
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "is_current": false
    }
  ],
  "project": [
    {
      "name": "",
      "type": "",
      "description": ""
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "graduation_date": "",
      "gpa": ""
    }
  ]
}

If any information is missing from the resume, use an empty string or false where appropriate.
`;

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      response_format: {
        type: "json_object",
      },
    });

    const extractedData = response.choices[0]?.message?.content;

    if (!extractedData) {
      return res.status(500).json({
        message: "Failed to extract resume data",
      });
    }

    const parsedData = JSON.parse(extractedData);

    const newResume = await Resume.create({
      userId,
      title,
      ...parsedData,
    });

   return res.status(201).json({
  message: "Resume uploaded successfully",
  resume: newResume,
});
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};