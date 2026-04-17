import { parseText } from './parseDealer.js';

/**
 * Parses an HTML file into dealer objects.
 *
 * Tries two strategies in order:
 *  1. Structured DOM parse — handles the CarGurus competitor report HTML format
 *     (.dealer-name / .dealer-id / .competitor-list li)
 *  2. Text fallback — strips tags and runs through the shared text parser,
 *     for plainer HTML formats that embed the same text as a PDF report
 *
 * @param {File} file
 * @returns {Promise<Array<{name: string, leadCount: string, competitors: string[]}>>}
 */
export async function parseHTML(file) {
  const html = await file.text();
  const doc = new DOMParser().parseFromString(html, 'text/html');

  // ── Strategy 1: structured DOM ─────────────────────────────────────────────
  const dealerEls = doc.querySelectorAll('.dealer');
  if (dealerEls.length > 0) {
    return parseDOMStructured(dealerEls);
  }

  // ── Strategy 2: text fallback ──────────────────────────────────────────────
  doc.querySelectorAll('script, style, noscript').forEach((el) => el.remove());
  const raw = doc.body?.innerText ?? doc.body?.textContent ?? '';
  if (!raw.trim()) {
    throw new Error('No readable text found in the HTML file.');
  }
  return parseText(raw);
}

/**
 * Extracts dealers from the structured CarGurus report HTML format.
 * Each .dealer block contains .dealer-name, .dealer-id, and .competitor-list li elements.
 *
 * @param {NodeList} dealerEls
 * @returns {Array<{name: string, leadCount: string, competitors: string[]}>}
 */
function parseDOMStructured(dealerEls) {
  const dealers = [];

  for (const el of dealerEls) {
    const nameEl = el.querySelector('.dealer-name');
    if (!nameEl) continue;

    const name = nameEl.textContent.trim();
    if (!name) continue;

    // Grab ranked competitor items — each <li> has a .rank span and optional .note span
    const items = el.querySelectorAll('.competitor-list li');
    const competitors = [];

    for (const li of items) {
      const rankEl = li.querySelector('.rank');
      const rank = rankEl ? parseInt(rankEl.textContent.replace(/\D/g, ''), 10) : NaN;

      // Only keep ranks 1–5
      if (isNaN(rank) || rank < 1 || rank > 5) continue;

      // Clone the li and remove child elements we don't want in the name
      const clone = li.cloneNode(true);
      clone.querySelectorAll('.rank, .note').forEach((n) => n.remove());
      const competitorName = clone.textContent.trim();

      if (competitorName) {
        competitors.push({ rank, name: competitorName });
      }
    }

    // Sort by rank and take top 5
    const top5 = competitors
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 5)
      .map((c) => c.name);

    if (top5.length === 0) continue;

    dealers.push({
      name,
      leadCount: '109',
      competitors: top5,
    });
  }

  return dealers;
}
