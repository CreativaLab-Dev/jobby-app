import saveAs from "file-saver"
import { generatePDFContent } from "@/utils/pdf-generator"
import { generateWordDocument } from "@/utils/word-generator"
import { Packer } from "docx"

export function useDownloadHandlers(cvData: any, opportunityType: string) {
  const handleDownloadPDF = () => {
    const pdfContent = generatePDFContent(cvData, opportunityType)
    const printWindow = window.open("", "_blank")

    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>CV - ${cvData.personal?.fullName || "Usuario"}</title>
            <style>
              ${getPDFStyles()}
            </style>
          </head>
          <body>
            ${pdfContent}
          </body>
        </html>
      `)
      printWindow.document.close()

      setTimeout(() => {
        printWindow.print()
        printWindow.close()
      }, 500)
    }
  }

  const handleDownloadWord = async () => {
    const doc = generateWordDocument(cvData, opportunityType)
    const blob = await Packer.toBlob(doc)
    saveAs(blob, `CV_${cvData.personal?.fullName || "Usuario"}.docx`)
  }

  return { handleDownloadPDF, handleDownloadWord }
}

function getPDFStyles() {
  return `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    @page {
      margin: 0.5in;
      size: A4;
    }
    
    @media print {
      @page {
        margin: 0.5in;
        size: A4;
      }
      
      html, body {
        width: 210mm;
        height: 297mm;
        margin: 0;
        padding: 0;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      
      body {
        font-size: 11pt !important;
      }
      
      .header h1 {
        font-size: 24pt !important;
      }
      
      .section-title {
        font-size: 12pt !important;
      }
      
      .item-title {
        font-size: 11pt !important;
      }
      
      .summary, .item-description, .contact-info, .skills-section {
        font-size: 10.5pt !important;
      }
      
      .section {
        page-break-inside: avoid;
        margin-bottom: 20px !important;
      }
    }
    
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.4;
      color: #000;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px;
      background: white;
      font-size: 12px;
      text-align: center;
    }
    
    .header {
      margin-bottom: 8px;
      text-align: center;
    }
    
    .header h1 {
      font-size: 24px;
      font-weight: bold;
      color: #000;
      margin-bottom: 8px;
      letter-spacing: 1px;
    }
    
    .contact-section {
      margin-bottom: 8px;
      text-align: center;
    }
    
    .contact-info {
      font-size: 12px;
      color: #000;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .contact-info a {
      color: #2563eb;
      text-decoration: none;
    }
    
    .divider {
      border: none;
      border-top: 1px solid #000;
      margin: 8px 0;
    }
    
    .summary-section {
      margin-bottom: 8px;
      text-align: left;
    }
    
    .summary {
      font-size: 12px;
      font-style: italic;
      line-height: 1.5;
      color: #000;
      text-align: justify;
    }
    
    .section {
      margin-bottom: 8px;
      text-align: left;
    }
    
    .section-title {
      font-size: 13px;
      font-weight: bold;
      color: #000;
      margin-bottom: 8px;
      text-transform: uppercase;
      border-bottom: 1px solid #000;
      padding-bottom: 2px;
      text-align: left;
    }
    
    .experience-item, .education-item, .project-item {
      margin-bottom: 10px;
    }
    
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0;
    }
    
    .item-subheader {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2px;
    }
    
    .item-title-bold {
      font-weight: bold;
      font-size: 12px;
      color: #000;
    }
    
    .item-location-bold {
      font-size: 12px;
      font-weight: bold;
      color: #000;
      white-space: nowrap;
      margin-left: 8px;
    }
    
    .item-location {
      font-size: 12px;
      color: #000;
      white-space: nowrap;
      margin-left: 8px;
    }
    
    .item-position {
      font-size: 12px;
      color: #000;
    }
    
    .item-degree {
      font-size: 12px;
      color: #000;
    }
    
    .item-date-italic {
      font-size: 12px;
      color: #000;
      font-style: italic;
      white-space: nowrap;
      margin-left: 8px;
    }
    
    .responsibilities-list {
      margin-left: 24px;
      list-style-type: disc;
      text-align: justify;
    }
    
    .responsibilities-list li {
      font-size: 12px;
      color: #000;
      line-height: 1.5;
      margin-bottom: 2px;
    }
    
    .item-description {
      font-size: 12px;
      color: #000;
      line-height: 1.5;
      text-align: justify;
      margin-bottom: 4px;
    }
    
    .item-details {
      text-align: left;
      margin-top: 0;
    }
    
    .item-details li {
      font-size: 12px;
      color: #000;
      margin-bottom: 0;
      list-style-type: none;
    }
    
    .skills-section {
      font-size: 12px;
      color: #000;
      line-height: 1.6;
      text-align: left;
    }
    
    .skills-category {
      margin-bottom: 0;
      text-align: left;
    }
    
    .skills-category strong {
      font-weight: bold;
    }
  `
}
