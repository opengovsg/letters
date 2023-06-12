import { jsPDF } from 'jspdf'

// Pixel ratios of width to height of A4 letters
export const WIDTH_A4 = 794
export const HEIGHT_A4 = 1122

// Additional wrapper div to resize contents of letters
const resizeToA4Dimensions = (
  htmlString: string,
  width = WIDTH_A4,
  height = HEIGHT_A4,
): string => `<div style="width: ${width}px; height: ${height}px;"> 
  ${htmlString}</div>
`

// Convert HTML to PDF
export const convertHtmlToPdf = (
  htmlContent: string,
  pdfPath: string,
): Promise<void> => {
  // Create a new jsPDF instance
  const pdf = new jsPDF({ format: 'A4', compress: true })
  const htmlString = resizeToA4Dimensions(htmlContent)
  return new Promise((resolve) => {
    void pdf.html(htmlString, {
      callback: function () {
        // Save the PDF document
        pdf.save(pdfPath)
        resolve()
      },
      width: pdf.internal.pageSize.getWidth(), // A4 page width
      windowWidth: WIDTH_A4, // element width
    })
  })
}
