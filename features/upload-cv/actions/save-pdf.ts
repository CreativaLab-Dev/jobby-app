import { put } from "@vercel/blob";
import { getCandidate } from "@/features/share/actions/get-candidate";
import { CVFileType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

export const savePdf = async (file: File) => {
  try {
    // 🧑‍💼 Get the authenticated candidate
    const candidate = await getCandidate();
    if (!candidate) {
      console.error("[ERROR_SAVE_PDF] No authenticated candidate found.");
      return { data: null, error: "No authenticated candidate found."}
    }
    
    // 📦 Optional: limit file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      console.error("[ERROR_SAVE_PDF] File too large. Max allowed is 5MB.");
      return { data: null, error: "File too large. Max allowed is 5MB." }
    }
    
    // Generate a unique file name and upload the file
    const fileName = `CV.${randomUUID()}.${file.name}`;
    const { url } = await put(fileName, file, {
      access: "public",
    });
    
    // 🔄 Start DB transaction: create CV and associated CVFile record
    const result = await prisma.$transaction(async (tx) => {
      // 🧾 Create new CV record
      const newCV = await tx.cV.create({
        data: {
          candidateId: candidate.id,
          createdWithBuilder: false,
        },
      });
      
      // 🔠 Get file extension and validate it as a supported CVFileType
      const extension = file.name.split(".").pop()?.toUpperCase() || "PDF";
      const supportedType = Object.values(CVFileType).includes(extension as CVFileType)
        ? (extension as CVFileType)
        : CVFileType.PDF;
      
      // 📁 Create new CVFile record with metadata
      const newCVFile = await tx.cVFile.create({
        data: {
          url,
          cvId: newCV.id,
          size: file.size,
          format: file.type,
          type: supportedType,
        },
      });
      
      return { newCV, newCVFile };
    });
    
    if (!result) {
      console.error("[ERROR_SAVE_PDF] Transaction failed, no records created.");
      return { data: null, error: "Transaction failed, no records created." }
    }
    
    // ✅ Successfully saved PDF and created CVFile
    return { data: result.newCVFile, error: null };
    
  } catch (error) {
    // ❌ Catch and log unexpected errors
    console.error("[ERROR_SAVE_PDF]", error);
    return  { data: null, error: "An unexpected error occurred while saving the PDF." }
  }
};
