/**
 * Shared dealer text parser used by both parsePDF.js and parseHTML.js.
 * Accepts raw extracted text and returns an array of dealer objects.
 *
 * @param {string} raw
 * @returns {Array<{name: string, leadCount: string, competitors: string[]}>}
 */
export function parseText(raw) {
  // Collapse whitespace, then re-insert newlines before ID: markers and Rank headers
  const normalized = raw
    .replace(/\s+/g, ' ')
    .replace(/\s*(ID:\s*\d+)/g, '\n$1')
    .replace(/\s*(Rank\s+Competitor)/gi, '\nRank Competitor');

  // Each block starts at a dealer name line followed by ID:
  const blocks = normalized.split(/(?=\n?[A-Z][^\n]+ID:\s*\d+)/);

  const dealers = [];

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    const nameMatch = trimmed.match(/^([^\n]+?)\s*\n?ID:\s*\d+/);
    if (!nameMatch) continue;

    const name = nameMatch[1].trim();
    if (!name || /^(Files processed|Dealerships|Competitors mapped)/i.test(name)) continue;

    const compMatches = [...trimmed.matchAll(/(?:^|\n)\s*(\d+)\s+([A-Z][^\n]+)/g)];
    const competitors = compMatches
      .map((m) => ({ rank: parseInt(m[1], 10), name: m[2].trim() }))
      .filter((c) => c.rank >= 1 && c.rank <= 5)
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
