export const getPromptToGetCv = (cvText: string) => {
  return `
You are an **AI academic advisor and CV evaluator**.  
Your task is to extract and structure all relevant information from the CV text provided below.

---

### Input (raw CV text)
${cvText}

---

### Output JSON schema
You must return **only one valid JSON object** following this structure:

{
  "sections": [
    {
      "sectionType": "SUMMARY" | "EXPERIENCE" | "EDUCATION" | "SKILLS" | "PROJECTS" | "CERTIFICATIONS" | "LANGUAGES" | "CONTACT",
      "title": "string | null",
      "contentJson": [
        {
          // Key-value pairs describing each entry in this section
        }
      ]
    }
  ]
}

---

### Detailed extraction rules

1. **sectionType** must match exactly one of the following values:  
   SUMMARY, EXPERIENCE, EDUCATION, SKILLS, PROJECTS, CERTIFICATIONS, LANGUAGES, CONTACT.

2. **title** should be the section’s title as written in the CV (e.g., “Professional Experience”, “Academic Background”, “Skills”).

3. **contentJson** should contain **structured objects** describing the specific details found in each section:
   - EXPERIENCE → [{ company, position, startDate, endDate, description }]
   - EDUCATION → [{ institution, degree, startDate, endDate }]
   - SKILLS → [{ skill, level? }]
   - PROJECTS → [{ name, description, technologies? }]
   - CERTIFICATIONS → [{ name, issuer?, year? }]
   - LANGUAGES → [{ language, proficiency }]
   - CONTACT → [{ name?, email?, phone?, linkedin?, location? }]
   - SUMMARY → [{ text }]

4. Dates must be in ISO format "YYYY-MM" when available.

5. If a section doesn’t exist in the CV, **omit it entirely** (don’t return empty arrays).

6. Ensure that all extracted text is clear, properly capitalized, and concise.

7. Return **ONLY valid JSON** — without markdown, explanations, or comments.

---

### Example output
{
  "sections": [
    {
      "sectionType": "SUMMARY",
      "title": "Professional Summary",
      "contentJson": [
        { "text": "Computer Science graduate with experience in backend development using Go and Kubernetes." }
      ]
    },
    {
      "sectionType": "EXPERIENCE",
      "title": "Experience",
      "contentJson": [
        {
          "company": "TechCorp",
          "position": "Software Engineer",
          "startDate": "2023-01",
          "endDate": "Present",
          "description": "Developed scalable APIs and automated CI/CD pipelines on GCP."
        }
      ]
    }
  ]
}
`;
};
