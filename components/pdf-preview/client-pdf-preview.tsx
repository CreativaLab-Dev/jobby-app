"use client";

import { PDFViewer } from "@react-pdf/renderer";
import { CVData } from "@/types/cv";
import { CvDocument } from "./cv-document";
import { OpportunityType } from "@prisma/client";


export function ClientPDFPreview({ cvData, opportunityType }: { cvData: CVData; opportunityType: OpportunityType }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="border rounded-lg overflow-hidden h-[90vh]">
        <PDFViewer width="100%" height="100%">
          <CvDocument data={cvData} type={opportunityType} />
        </PDFViewer>
      </div>
    </div>
  );
}
