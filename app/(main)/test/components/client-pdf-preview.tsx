"use client";

import { PDFViewer } from "@react-pdf/renderer";
import { CVData } from "@/types/cv";
import { CvDocument } from "./cv-document";


export function ClientPDFPreview({ cvData }: { cvData: CVData }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="border rounded-lg overflow-hidden h-[90vh]">
        <PDFViewer width="100%" height="100%">
          <CvDocument data={cvData} />
        </PDFViewer>
      </div>
    </div>
  );
}
