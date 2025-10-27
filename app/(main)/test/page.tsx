// app/test/page.tsx
import { getCvById } from "@/features/cv/actions/get-cv-by-id";
import { redirect } from "next/navigation";
import { transformCVToDTO } from "@/features/cv/dto/transform-cv.dto";
import { CVData } from "@/types/cv";
import dynamic from "next/dynamic";
import { PdfPreviewWrapper } from "./components/pdf-preview-wrapper";

export default async function TestPage() {
  const cv = await getCvById("b1ccd379-853a-48e1-ac6f-50abbbb0c57e");
  if (!cv) return redirect("/404");

  const cvData: CVData = transformCVToDTO(cv);

  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-xl font-semibold">CV Preview</h1>
      <PdfPreviewWrapper cvData={cvData} />
    </div>
  );
}
