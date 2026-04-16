import * as pdfjsLib from 'pdfjs-dist';

// Point the worker at the bundled worker file served from node_modules
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

/**
 * Extracts raw text from all pages of a PDF ArrayBuffer.
 * @param {ArrayBuffer} buffer
 * @returns {Promise<string>}
 */
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
 * Normalizes extracted text and splits it into dealer blocks.
 * @param {string} raw
 * @returns {Array<{name: string, leadCount: string, competitors: string[]}>}
 */
function parseText(raw) {
  // Collapse multiple spaces/newlines, then insert newline before each "ID:" marker
  const normalized = raw
    .replace(/\s+/g, ' ')
    .replace(/\s*(ID:\s*\d+)/g, '\n$1')
    .replace(/\s*(Rank\s+Competitor)/gi, '\nRank Competitor');

  // Split into blocks — each block starts at a dealer name followed by ID:
  const blocks = normalized.split(/(?=\n?[A-Z][^\n]+ID:\s*\d+)/);

  const dealers = [];

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    const nameMatch = trimmed.match(/^([^\n]+?)\s*\n?ID:\s*\d+/);
    if (!nameMatch) continue;

    const name = nameMatch[1].trim();
    // Skip header/summary lines
    if (!name || /^(Files processed|Dealerships|Competitors mapped)/i.test(name)) continue;

    // Extract numbered competitor lines (1–7), keep only first 5
    const compMatches = [...trimmed.matchAll(/(?:^|\n)\s*(\d+)\s+([A-Z][^\n]+)/g)];
    const competitors = compMatches
      .map((m) => ({ rank: parseInt(m[1], 10), name: m[2].trim() }))
      .filter((c) => c.rank >= 1 && c.rank <= 5)
      .sort((a, b) => a.rank - b.rank)
      .map((c) => c.name);

    if (competitors.length === 0) continue;

    dealers.push({
      name,
      leadCount: '109', // hardcoded per spec — make dynamic when CRM data is available
      competitors: competitors.slice(0, 5),
    });
  }

  return dealers;
}

/**
 * Parses a PDF File object and returns an array of dealer objects.
 * @param {File} file
 * @returns {Promise<Array<{name: string, leadCount: string, competitors: string[]}>>}
 */
export async function parsePDF(file) {
  const buffer = await file.arrayBuffer();
  const raw = await extractText(buffer);
  return parseText(raw);
}
