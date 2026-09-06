import * as pdfjsLib from "pdfjs-dist"; /* Import the worker as a URL so Vite bundles it locally ΓÇö avoids CDN fetch failures on Vercel */
import PdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = PdfWorker;
export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      useSystemFonts: true,
      stopAtErrors: false,
    });
    const pdf = await loadingTask.promise;
    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      let lastY = -1;
      let pageText = "";
      for (const item of content.items as any[]) {
        if (lastY !== -1 && Math.abs(item.transform[5] - lastY) > 5) {
          pageText += "\n";
        } else if (pageText.length > 0 && !pageText.endsWith("\n")) {
          pageText += " ";
        }
        pageText += item.str;
        lastY = item.transform[5];
      }
      fullText += pageText + "\n";
    }
    const result = fullText.trim();
    if (!result) {
      throw new Error(
        "No readable text found in this PDF. It might be a scanned image.",
      );
    }
    return result;
  } catch (error: any) {
    console.error("PDF Extraction Error:", error);
    throw new Error(error.message || "Failed to parse PDF file");
  }
}
