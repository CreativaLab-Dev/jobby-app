import axios from "axios";

export const URL_GET_TEXT_FROM_PDF_API = process.env.NEXT_PUBLIC_GET_TEXT_FROM_PDF_API!;

export const getTextFromPdfApi = async (pdfUrl: string): Promise<string> => {
  if (!URL_GET_TEXT_FROM_PDF_API) {
    console.error("[ERROR_GET_TEXT_FROM_PDF_API] API URL is not defined.");
    return "";
  }
  
  try {
    const response = await axios.post(
      URL_GET_TEXT_FROM_PDF_API,
      { url: pdfUrl },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    return response.data.text;
  } catch (error) {
    console.error("[ERROR_GET_TEXT_FROM_PDF_API]", error);
    return "";
  }
};
