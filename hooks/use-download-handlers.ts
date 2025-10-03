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
        font-size: 10pt !important;
      }
      
      .header h1 {
        font-size: 24pt !important;
      }
      
      .section-title {
        font-size: 11pt !important;
      }
      
      .item-title {
        font-size: 10pt !important;
      }
      
      .summary, .item-description, .contact-info, .skills-section {
        font-size: 9pt !important;
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
      font-size: 11pt;
    }
    
    .header {
      margin-bottom: 30px;
    }
    
    .header h1 {
      font-size: 32pt;
      font-weight: bold;
      color: #000;
      margin-bottom: 20px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    
    .summary {
      font-size: 11pt;
      line-height: 1.5;
      color: #000;
      margin-bottom: 30px;
      text-align: justify;
    }
    
    .section {
      margin-bottom: 35px;
    }
    
    .section-title {
      font-size: 14pt;
      font-weight: bold;
      color: #000;
      margin-bottom: 15px;
      text-transform: uppercase;
      border-bottom: 1px solid #000;
      padding-bottom: 5px;
    }
    
    .contact-info {
      font-size: 11pt;
      color: #000;
      margin-bottom: 30px;
    }
    
    .experience-item, .education-item, .project-item, .achievement-item, .certification-item {
      margin-bottom: 25px;
      position: relative;
    }
    
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;
    }
    
    .item-title {
      font-weight: bold;
      font-size: 12pt;
      color: #000;
    }
    
    .item-subtitle {
      font-size: 11pt;
      color: #000;
      font-style: italic;
      margin-bottom: 5px;
    }
    
    .item-date {
      font-size: 11pt;
      color: #000;
      font-weight: normal;
      white-space: nowrap;
    }
    
    .item-description {
      font-size: 11pt;
      color: #000;
      line-height: 1.5;
      text-align: justify;
      margin-bottom: 8px;
    }
    
    .item-details {
      margin-left: 20px;
      margin-top: 8px;
    }
    
    .item-details li {
      font-size: 11pt;
      color: #000;
      margin-bottom: 3px;
      list-style-type: disc;
    }
    
    .skills-section {
      font-size: 11pt;
      color: #000;
      line-height: 1.6;
    }
    
    .skills-category {
      margin-bottom: 10px;
    }
    
    .skills-category strong {
      font-weight: bold;
    }
    
    .section-divider {
      border-bottom: 1px solid #000;
      margin: 30px 0;
    }
  `
}
