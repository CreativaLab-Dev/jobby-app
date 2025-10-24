import { CVData } from "@/types/cv";
import { transformCVToDTO } from "@/features/cv/dto/transform-cv.dto";
import CreateCVPage from "@/features/cv/components/create-cv-page";
import { redirect } from "next/navigation";
import { getCvById } from "@/features/cv/actions/get-cv-by-id";

interface EditCVPageProps {
  params: Promise<{
    cvId: string;
  }>;
}

export default async function EditCVPage({ params }: EditCVPageProps) {
  const { cvId } = await params;
  if (!cvId) {
    return redirect('/cv')
  }
  const cv = await getCvById(cvId);
  if (!cv) {
    return <div>No CV data found</div>;
  }

  console.log("[CV_DATA]", cv);

  const cvData: CVData = transformCVToDTO(cv);
  const cvSection = CVSection = transformCVToDTO(cv);
  return (
    <CreateCVPage
      cv={cvData}
      section={cvSection}
      id={cv.id}
      opportunity={'beca'}
    />
  )
}