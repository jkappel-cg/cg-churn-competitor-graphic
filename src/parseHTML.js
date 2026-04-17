import { parseText } from './parseDealer.js';

/**
 * Extracts visible text from an HTML file using DOMParser,
 * then runs it through the shared dealer parser.
 *
 * @param {File} file
 * @returns {Promise<Array<{name: string, leadCount: string, competitors: string[]}>>}
 */
export async function parseHTML(file) {
  const html = await file.text();

  const doc = new DOMParser().parseFromString(html, 'text/html');

  // Remove script/style noise before extracting text
  doc.querySelectorAll('script, style, noscript').forEach((el) => el.remove());

  const raw = doc.body?.innerText ?? doc.body?.textContent ?? '';

  if (!raw.trim()) {
    throw new Error('No readable text found in the HTML file.');
  }

  return parseText(raw);
}
