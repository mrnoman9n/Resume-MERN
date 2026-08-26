// summary enhancer
// post : /api/ai/enhance-pro-sum

export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({
        message: "missing field required",
      });

    const response =  await openai.chat.completions.create({
        model: ProcessingInstruction.env.OPENAI_MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1–2 sentences, highlighting key skills, experience, and career objectives. Make it compelling, ATS-friendly, and professional. Return only the improved summary text, with no options or additional commentary.",
          },
          {
            role: "user",
            content: userContent,
          },
        ],
      });
    }

    const enhancedContent = response.choices[0].message.content;
return res.status(200).json({enhancedContent})

  } catch (error) {
return res.status(400).json({message : error.message})
  }
};


// job descreption
// post : /api/ai/enhance-pro-desc

export const enhanceJobDescreption = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({
        message: "missing field required",
      });

    const response =  await openai.chat.completions.create({
        model: ProcessingInstruction.env.OPENAI_MODEL,
        messages: [
          {
            role: "system",
            content:"You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. and only return text no options or anything else."
             
          },
          {
            role: "user",
            content: userContent,
          },
        ],
      });
    }

    const enhancedContent = response.choices[0].message.content;
return res.status(200).json({enhancedContent})

  } catch (error) {
return res.status(400).json({message : error.message})
  }
};




