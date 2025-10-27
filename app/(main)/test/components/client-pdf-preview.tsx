// app/test/client-pdf-preview.tsx
"use client";

import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { CVData } from "@/types/cv";
import { CvDocument } from "./cv-document";


export function ClientPDFPreview({ cvData }: { cvData: CVData }) {
  return (
    <div className="flex flex-col gap-4">
      {/* ✅ PDF Preview (client-side only) */}
      <div className="border rounded-lg overflow-hidden h-[80vh]">
        <PDFViewer width="100%" height="100%">
          <CvDocument data={cvData} />
        </PDFViewer>
      </div>

      {/* ✅ Download button */}
      <PDFDownloadLink
        document={<CvDocument data={cvData} />}
        fileName={`${cvData.personal?.fullName ?? "cv"}.pdf`}
      >
        {({ loading }) => (
          <Button disabled={loading}>
            {loading ? "Preparing..." : "Download PDF"}
          </Button>
        )}
      </PDFDownloadLink>
    </div>
  );
}
