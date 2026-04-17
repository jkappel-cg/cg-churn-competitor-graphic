import * as pdfjsLib from 'pdfjs-dist';
import { parseText } from './parseDealer.js';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

async function extractText(buffer) {
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  const pages = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    pages.push(content.items.map((item) => item.str).join(' '));
  }
  return pages.join('\n');
}

/**
 * @param {File} file
 * @returns {Promise<Array<{name: string, leadCount: string, competitors: string[]}>>}
 */
export async function parsePDF(file) {
  const buffer = await file.arrayBuffer();
  const raw = await extractText(buffer);
  return parseText(raw);
}
