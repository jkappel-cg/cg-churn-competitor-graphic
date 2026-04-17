/**
 * Shared dealer text parser used by both parsePDF.js and parseHTML.js.
 *
 * Handles two ID formats:
 *   - "Dealer Name  ID: 284384"  (original spec format)
 *   - "Dealer Name #284384"      (CarGurus HTML/PDF report format)
 *
 * Handles two competitor rank formats:
 *   - "1  Competitor Name"   (original spec, space-separated)
 *   - "1. Competitor Name"   (report format, dot-separated)
 *
 * @param {string} raw
 * @returns {Array<{name: string, leadCount: string, competitors: string[]}>}
 */
export function parseText(raw) {
  // Normalise whitespace, then insert newline breaks before each dealer ID marker
  // Supports both "ID: 123456" and "#123456" patterns
  const normalized = raw
    .replace(/\s+/g, ' ')
    .replace(/\s*(ID:\s*\d+)/g, '\n$1')
    .replace(/\s*(#\d{4,})/g, '\n$1')       // e.g. #284384
    .replace(/\s*(Rank\s+Competitor)/gi, '\nRank Competitor');

  // Split into blocks — each block starts at a dealer name followed by an ID marker
  // Matches both "ID: XXXXX" and "#XXXXX" (4+ digits to avoid false positives)
  const blocks = normalized.split(/(?=\n?[\w#][^\n]+(?:ID:\s*\d+|#\d{4,}))/);

  const dealers = [];

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    // Match dealer name — supports both ID formats
    const nameMatch =
      trimmed.match(/^([^\n]+?)\s*\n?ID:\s*\d+/) ||
      trimmed.match(/^([^\n]+?)\s*\n?#\d{4,}/);

    if (!nameMatch) continue;

    const name = nameMatch[1].trim();
    if (!name || /^(Files processed|Dealerships|Competitors mapped)/i.test(name)) continue;

    // Match competitor lines — supports "1  Name" and "1. Name" formats
    // Also allows names that start with non-uppercase (e.g. "#1 Cochran", "A&R Auto")
    const compMatches = [
      ...trimmed.matchAll(/(?:^|\n)\s*(\d+)[.\s]\s*([^\n\d][^\n]+)/g),
    ];

    const competitors = compMatches
      .map((m) => ({ rank: parseInt(m[1], 10), name: cleanCompetitorName(m[2]) }))
      .filter((c) => c.rank >= 1 && c.rank <= 5 && c.name.length > 0)
      .sort((a, b) => a.rank - b.rank)
      .map((c) => c.name);

    if (competitors.length === 0) continue;

    dealers.push({
      name,
      leadCount: '109',
      competitors: competitors.slice(0, 5),
    });
  }

  return dealers;
}

/**
 * Strips trailing noise from a competitor name extracted from plain text.
 * Removes distance annotations like "14.6 mi", "1,063.3 mi", page numbers, etc.
 */
function cleanCompetitorName(raw) {
  return raw
    .replace(/\s+[\d,]+\.?\d*\s*mi\b.*/i, '') // strip "14.6 mi" and anything after
    .replace(/\s+\d+(\.\d+)?\s*$/, '')          // strip trailing numbers
    .trim();
}
