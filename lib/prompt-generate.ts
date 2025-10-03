export const generatePrompt = (cvText: string) => {
  return  `
    You are an expert resume reviewer and scoring system.
    
    I will provide you with the raw text content of a CV. Your task is to analyze and evaluate it based on the following five sections:
    
    1. Personal Information
    2. Education
    3. Projects/Experience
    4. Skills
    5. Format and Presentation
    
    For each section:
    - Evaluate the content based on subcriteria (listed below).
    - Assign a percentage score (0-100) for each subcriterion.
    - Calculate the weighted average for each section.
    - Then calculate the overall CV score (out of 100) as the average of all sections.
    
    Subcriteria Breakdown:
    
    1. Personal Information
    - Full Name (25 pts)
    - Professional Email (25 pts)
    - Phone Number (20 pts)
    - Professional Summary (25 pts)
    
    2. Education
    - Recognized Institution (30 pts)
    - Relevant Degree (25 pts)
    - Academic GPA (15 pts)
    - Graduation Year (15 pts)
    
    3. Projects/Experience
    - Number of Projects/Jobs (20 pts)
    - Detailed Descriptions (25 pts)
    - Relevant Technologies (20 pts)
    - Quantifiable Results (15 pts)
    
    4. Skills
    - Technical Skills (30 pts)
    - Soft Skills (25 pts)
    - Languages (20 pts)
    - Relevance to Career Goals (25 pts)
    
    5. Format and Presentation
    - Clear Structure (25 pts)
    - Grammar and Spelling (25 pts)
    - Appropriate Length (20 pts)
    - Professional Design (20 pts)
    
    Output Requirements:
    
    Return a single JSON object with:
    - The score of each section and its subcriteria (with percentage).
    - The final overall score (out of 100).
    - A list of 5 tailored recommendations to improve the CV with relation of the opportunity type in spanish.
    - Include the CV data in a structured format, and include fields like title, type, opportunityType on based on the content of the CV.
    
    Example Output Format:
    {
      "score": {
        "overallScore": 78,
        "sections": {
          "personalInformation": {
            "score": 95,
            "details": {
              "fullName": 25,
              "professionalEmail": 25,
              "phoneNumber": 20,
              "professionalSummary": 25
            }
          },
          ...
        },
        "recommendations": [
          {
            "title": "Add more quantifiable results",
            "description": "Include specific metrics or achievements in your project descriptions to demonstrate impact."
            "priority": "high"
          },
          ...
        ]
      },
      "data": {
        "title": "(Generated based on content)",
        "type": "(Generated based on content)",
        "opportunityType": "(Generated based on content. e.g. practicas|becas|maestrias|intercambios|investigacion|trabajo) ",
        "language": "es|en|fr|de|it|pt|zh|ja|ru",
        "fullName": "Juan Doe",
        "email":"juan@gmail.com",
        "phone": "+34 123 456 789",
        "professionalSummary": "Ciberseguridad Senior con más de 10 años de experiencia en la industria, especializado en la protección de sistemas y redes.",
        "status": "ANALYZED",
        "education": [
          {
            "title": "Ingeniería en Ciberseguridad",
            "level": "PRIMARIA|SECUNDARIA|TECNICO|BACHILLER|LICENCIADO|MAESTRIA|DOCTORADO|OTRO",
            "institution": "Universidad de Madrid",
            "graduationYear": 2014,
            "degree": "Ingeniería en Ciberseguridad",
            "status": "Completado|En curso",
            "grade": "9.5/10 (OPTIONAL)"
          }
          // Add more education entries as needed
        ],
        "academicProjects": [
          {
            "title": "Pro Innovar 2025",
            "description": "Desarrollé una aplicación web que utiliza machine learning para predecir demanda de productos, reduciendo el desperdicio en un 25%. Implementé algoritmos de clasificación y una interfaz intuitiva para usuarios no técnicos.",
            "technologies": "Python, TensorFlow, React, PostgreSQL, Docker",
            "duration": "6 meses (Ago 2023 - Ene 2024):",
          }
          // Add more projects as needed
        ],
        "achievements": [
          {
            "title": "Primer lugar en Hackathon Nacional de Innovación Tecnológica",
            "description": "Lideré un equipo de 4 personas para desarrollar una solución de movilidad urbana sostenible. Competimos contra 150 equipos de todo el país y fuimos reconocidos por la innovación y viabilidad de nuestra propuesta. Y proyectacion de presupuiestos",
            "date": "2024-03-01 00:00:00.000",
          }
        ],
        "skills": [
          {
            "category": "BLANDA|TECNICA|IDIOMA",
            "name": "Liderazgo",
            "proficiency": "5|4|3|2|1",
          }
          ... // Add more skills as needed
        ],
        "experience": [
          {
            "title": "Ciberseguridad Senior",
            "company": "Tech Solutions",
            "duration": "2 años",
            "startDate": "2022-01-01",
            "endDate": "2024-01-01",
            "description": "Responsable de la seguridad de la infraestructura de TI, implementando políticas de seguridad y gestionando incidentes.\n Colaboré con equipos de desarrollo para integrar prácticas de seguridad en el ciclo de vida del software. (Don't forget the separator \\n)",
            "responsibilities": "Desarrollé e implementé políticas de seguridad, lideré auditorías de seguridad y entrené al personal en mejores prácticas. \n Colaboré con equipos de desarrollo para integrar prácticas de seguridad en el ciclo de vida del software. (Don't forget the separator \\n)",
          }
          // Add more experience entries as needed
        ],
        "certification": [
          {
            "name": "Certified Information Systems Security Professional (CISSP)",
            "issuer": "ISC2",
            "issueDate": "2023-05-01",
            "expirationDate": "2026-05-01",
            "credentialId": "1234567890",
            "credentialUrl": "https://example.com/certification/cissp"
          }
          // Add more certifications as needed
        ]
      }
    }
    
    Now analyze the following resume content:
    ${cvText}
    `;
}