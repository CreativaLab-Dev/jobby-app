import {CVData} from "@/types/cv";

export const convertFromJsonToText = (cv: CVData)=> {
  let text = "";

  if (cv.personal) {
    text += `Full Name: ${cv.personal.fullName || ""}\n`;
    text += `Email: ${cv.personal.email || ""}\n`;
    text += `Phone: ${cv.personal.phone || ""}\n`;
    text += `Summary: ${cv.personal.summary || ""}\n\n`;
  }

  if (cv.education?.items) {
    text += "Education:\n";
    cv.education.items.forEach(item => {
      text += `- Level: ${item.level || ""}, Title: ${item.title || ""}, Institution: ${item.institution || ""}, Year: ${item.year || ""}, GPA: ${item.honors || ""}, Status: ${item.level || ""}\n`;
      
    });
    text += "\n";
  }

  if (cv.experience?.items) {
    text += "Experience:\n";
    cv.experience.items.forEach(item => {
      text += `- Position: ${item.position || ""}, Company: ${item.company || ""}, Duration: ${item.duration || ""}, Responsibilities: ${item.responsibilities || ""}\n`;
    });
    text += "\n";
  }

  if (cv.projects?.items) {
    text += "Projects:\n";
    cv.projects.items.forEach(item => {
      text += `- Title: ${item.title || ""}, Description: ${item.description || ""}, Technologies: ${item.technologies || ""}, Duration: ${item.duration || ""}\n`;
    });
    text += "\n";
  }

  if (cv.achievements?.items) {
    text += "Achievements:\n";
    cv.achievements.items.forEach(item => {
      text += `- Title: ${item.title || ""}, Description: ${item.description || ""}, Date: ${item.date || ""}\n`;
    });
    text += "\n";
  }

  if (cv.certifications?.items) {
    text += "Certifications:\n";
    cv.certifications.items.forEach(item => {
      text += `- Name: ${item.name || ""}, Issuer: ${item.issuer || ""}, Date: ${item.date || ""}\n`;
    });
    text += "\n";
  }

  if (cv.skills) {
    if (cv.skills.technical) {
      text += "Technical Skills:\n" + cv.skills.technical.join(", ") + "\n\n";
    }
    if (cv.skills.soft) {
      text += "Soft Skills:\n" + cv.skills.soft.join(", ") + "\n\n";
    }
    if (cv.skills.languages) {
      text += "Languages:\n" + cv.skills.languages.join(", ") + "\n\n";
    }
  }
  
  return text.trim();
}