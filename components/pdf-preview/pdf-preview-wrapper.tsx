// app/(main)/test/pdf-preview-wrapper.tsx
"use client";

import dynamic from "next/dynamic";
import { CVData } from "@/types/cv";
import { OpportunityType } from "@prisma/client";

// ✅ Dynamically import the PDF preview, client-only
const ClientPDFPreview = dynamic(
  () => import("./client-pdf-preview").then((mod) => mod.ClientPDFPreview),
  { ssr: false }
);

export function PdfPreviewWrapper({ cvData, opportunityType }: { cvData: CVData; opportunityType: OpportunityType }) {
  return (
    <ClientPDFPreview
      cvData={cvData}
      opportunityType={opportunityType}
    />
  );
}
