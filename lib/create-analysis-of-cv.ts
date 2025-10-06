"use server";

import { prisma } from "@/lib/prisma";
import {
  $Enums,
  CVAnalysis,
  CVAnalysisStatus,
  SectionScore as PrismaSectionScore,
} from "@prisma/client";
import { getGeminiScore, GeminiCVAnalysisResponse } from "@/lib/get-gemini-score";
import CVStatus = $Enums.CVStatus;

export const createAnalysisOfCv = async (
  cvId: string,
  text: string
) => {
  let cvAnalysis: CVAnalysis | null = null;

  try {
    // 1. Fetch the CV to ensure it exists
    const existingCv = await prisma.cV.findUnique({
      where: { id: cvId },
      include: {
        education: true,
        experience: true,
        skills: true,
      },
    });

    if (!existingCv) {
      console.error("[ANALYSIS] CV not found for ID:", cvId);
      return null;
    }

    // 2. Create a CVAnalysis record in PROCESSING state
    cvAnalysis = await prisma.cVAnalysis.create({
      data: {
        cv: { connect: { id: cvId } },
        status: CVAnalysisStatus.PROCESSING,
        overallScore: 0,              // temp placeholder
      },
    });

    // 3. Call Gemini
    const geminiResult = await getGeminiScore(text);

    if (!geminiResult.success) {
      console.error("[ANALYSIS] Gemini error:", geminiResult.success);
      // Mark as FAILED
      await prisma.cVAnalysis.update({
        where: { id: cvAnalysis.id },
        data: { status: CVAnalysisStatus.FAILED },
      });
      return null;
    }

    const parsed: GeminiCVAnalysisResponse = geminiResult.response;
    const { score, data: meta } = parsed;

    // 4. Prepare nested create data for SectionScores
    const sectionScoresData = Object.entries(score.sections).map(
      ([sectionName, sectionObj]) => ({
        sectionName: sectionName as PrismaSectionScore["sectionName"],
        score: sectionObj.score,
        fieldScores: {
          create: Object.entries(sectionObj.details).map(
            ([fieldName, fieldScore]) => ({
              fieldName,
              score: fieldScore,
            })
          ),
        },
      })
    );

    // 5. Prepare recommendations
    const recommendationsData = score.recommendations.map((rec) => ({
      title: rec.title,
      description: rec.description,
      priority: rec.priority,
    }));

    const educationMapped = meta?.education?.map((edu) => ({
      title: edu.title,
      level: edu.level,
      institution: edu.institution,
      graduationYear: edu.graduationYear,
      status: edu.status,
      grade: undefined, // if you want GPA, add it
    })) || [];

    const academicProjectsMapped = meta?.academicProjects?.map((proj) => ({
      title: proj.title,
      description: proj.description,
      technologies: proj.technologies,
      duration: proj.duration,
    })) || [];

    const achievementsMapped = meta?.achievements?.map((ach) => ({
      title: ach.title,
      description: ach.description,
      date: new Date(ach.date), // ensure date is a Date object
    })) || [];

    const skillsMapped = meta?.skills?.map((sk) => ({
      category: sk.category,
      name: sk.name,
      proficiency: parseInt(sk.proficiency, 10), // convert to number
    })) || [];

    const experienceMapped = meta?.experience.map((exp) => ({
      title: exp.title,
      company: exp.company,
      duration: exp.duration,
      startDate: new Date(exp.startDate) || undefined,
      endDate: new Date(exp.endDate) || undefined,
      description: exp.description,
      responsibilities: exp.description || exp.responsibilities,
    })) || [];

    // 6. Perform updates in parallel
    if (meta && Object.keys(meta).length > 0) {
      await prisma.cV.update({
        where: { id: cvId },
        data: {
          title: meta.title || existingCv.title,
          opportunityType: meta.opportunityType,
          type: meta.type,
          fullName: meta.fullName,
          email: meta.email,
          phone: meta.phone,
          professionalSummary: meta.professionalSummary,
          status: CVStatus.ANALYZED,
          education: {
            deleteMany: {}, // remove existing to avoid duplicates
            create: educationMapped,
          },
          academicProjects: {
            deleteMany: {},
            create: academicProjectsMapped,
          },
          achievements: {
            deleteMany: {},
            create: achievementsMapped,
          },
          skills: {
            deleteMany: {},
            create: skillsMapped,
          },
          experience: {
            deleteMany: {},
            create: experienceMapped,
          }
        },
      })
    }
    await prisma.cVAnalysis.update({
      where: { id: cvAnalysis.id },
      data: {
        status: CVAnalysisStatus.DONE,
        overallScore: score.overallScore,
        sectionScores: {
          create: sectionScoresData,
        },
        recommendations: {
          create: recommendationsData,
        },
      },
      include: {
        sectionScores: true,
        recommendations: true,
      },
    })

    const updatedAnalysis = await prisma.cVAnalysis.findUnique({
      where: { id: cvAnalysis.id },
      include: {
        sectionScores: {
          include: {
            fieldScores: true,
          },
        },
        recommendations: true,
      },
    })
    if (!updatedAnalysis) {
      console.error("[ANALYSIS] Updated CVAnalysis not found after creation:", cvAnalysis.id);
      return null;
    }

    return updatedAnalysis.id;
  } catch (error) {
    console.error("[ANALYSIS] Unexpected error:", error);
    // If cvAnalysis was created, mark it as FAILED
    if (cvAnalysis) {
      await prisma.cVAnalysis.update({
        where: { id: cvAnalysis.id },
        data: { status: CVAnalysisStatus.FAILED },
      });
    }
    return null;
  }
};
