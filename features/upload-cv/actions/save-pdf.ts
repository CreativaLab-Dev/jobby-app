import { put } from "@vercel/blob";

interface SavePdfParams {
  buffer: Buffer;
  fileName: string;
}
interface SavePdfResult {
  url: string | null;
  error: string | null;
}

export const savePdf = async (file: File, { buffer, fileName }: SavePdfParams): Promise<SavePdfResult> => {
  try {

    // 📦 Optional: limit file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return { url: null, error: "File too large. Max allowed is 5MB." }
    }

    const { url } = await put(fileName, buffer, {
      access: "public",
    });

    return {
      url: url.toString(),
      error: null,
    }
  } catch (error) {
    console.error("[ERROR_SAVE_PDF]", error);
    return { url: null, error: error instanceof Error ? error.message : "Unknown error occurred while saving PDF." }
  }
};
