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
  console.log("cv", cv);
  if (!cv) {
    return <div>No CV data found</div>;
  }

  const opportunityType = cv.opportunityType
  if (!opportunityType) {
    return <div>No opportunity type selected</div>;
  }

  const cvData: CVData = transformCVToDTO(cv);
  return (
    <CreateCVPage
      cv={cvData}
      id={cv.id}
      opportunity={opportunityType}
    />
  )
}