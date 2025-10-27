// app/(main)/test/pdf-preview-wrapper.tsx
"use client";

import dynamic from "next/dynamic";
import { CVData } from "@/types/cv";

// ✅ Dynamically import the PDF preview, client-only
const ClientPDFPreview = dynamic(
  () => import("../components/client-pdf-preview").then((mod) => mod.ClientPDFPreview),
  { ssr: false }
);

export function PdfPreviewWrapper({ cvData }: { cvData: CVData }) {
  return <ClientPDFPreview cvData={cvData} />;
}
