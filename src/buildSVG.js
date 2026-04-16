// Design tokens
const BG = '#ECF0F6';
const GRAD_START = '#0763D3';
const GRAD_END = '#0499FD';
const ARROW_COLOR = '#D93025';
const CARD_BG = '#FFFFFF';
const CARD_BORDER = '#DDE3EC';
const BADGE_COLOR = '#C0392B';
const TITLE_COLOR = '#111827';
const TEXT_COLOR = '#111827';

const CIRCLE_R = 108;
const CARD_BASE_H = 48;
const CARD_LINE_H = 18;
const CARD_RX = 12;
const LEFT_PAD = 16;
const CARD_GAP = 10;
const TITLE_PAD_TOP = 22;
const TITLE_FONT_SIZE = 24;
const TITLE_PAD_BOT = 9;
const TITLE_ROW_H = TITLE_PAD_TOP + TITLE_FONT_SIZE + TITLE_PAD_BOT; // 55

// Approximate character widths for auto-sizing
const CHAR_WIDTH_RATIO = 0.58;

/**
 * Word-wrap text into lines not exceeding maxChars.
 * @param {string} text
 * @param {number} maxChars
 * @returns {string[]}
 */
function wordWrap(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/**
 * Auto-size dealer name from 22px down to 12px so it fits in ≤2 lines.
 * @param {string} name
 * @param {number} r  circle radius
 * @returns {{ lines: string[], fontSize: number }}
 */
function autoSizeName(name, r) {
  const maxLineChars = (fs) => Math.floor((r * 1.55) / (fs * CHAR_WIDTH_RATIO));
  let fontSize = 22;
  let lines = wordWrap(name, maxLineChars(fontSize));
  while (lines.length > 2 && fontSize > 12) {
    fontSize--;
    lines = wordWrap(name, maxLineChars(fontSize));
  }
  return { lines, fontSize };
}

/**
 * Calculate the height of a competitor card given its name.
 * @param {string} name
 * @param {number} boxW  card width
 * @returns {number}
 */
function cardHeight(name, boxW) {
  const circR = 15;
  const availW = boxW - (14 + circR * 2 + 10 + 10);
  const charsPerLine = Math.floor(availW / (13 * CHAR_WIDTH_RATIO));
  const lines = wordWrap(name, charsPerLine);
  return CARD_BASE_H + Math.max(0, lines.length - 1) * CARD_LINE_H;
}

/**
 * Build a complete SVG string for a single dealer.
 *
 * @param {{ name: string, leadCount: string, competitors: string[] }} dealer
 * @param {number} index  0-based index (used for unique gradient IDs)
 * @param {boolean} rounded  whether to apply rounded corners on the outer rect
 * @returns {string}
 */
export function buildSVG(dealer, index, rounded = true) {
  const r = CIRCLE_R;
  const pad = LEFT_PAD;
  const circR = 15; // badge radius

  // Card dimensions
  const boxX = pad + r * 2 + 28; // circle right edge + gap
  const boxW = 310;

  // Compute card heights based on competitor name lengths
  const cardHeights = dealer.competitors.map((c) => cardHeight(c, boxW));
  const totalBoxH = cardHeights.reduce((s, h) => s + h, 0) + CARD_GAP * (cardHeights.length - 1);

  const contentH = Math.max(r * 2 + pad * 2, totalBoxH + pad * 2);
  const svgW = boxX + boxW + pad;
  const svgH = TITLE_ROW_H + contentH;

  // Circle center
  const cx = pad + r;
  const cy = TITLE_ROW_H + contentH / 2;

  // Auto-size dealer name
  const { lines: nameLines, fontSize: nameSize } = autoSizeName(dealer.name, r);

  // Title y baseline
  const titleY = TITLE_PAD_TOP + TITLE_FONT_SIZE * 0.8;

  // Build card y positions (vertically centered in content area)
  const startY = TITLE_ROW_H + (contentH - totalBoxH) / 2;
  const cardYs = [];
  let yAcc = startY;
  for (let i = 0; i < 5; i++) {
    cardYs.push(yAcc);
    yAcc += cardHeights[i] + CARD_GAP;
  }

  // Gradient id — unique per SVG so multiple on the same page don't conflict
  const gradId = `cg${index}`;

  // ── SVG pieces ─────────────────────────────────────────────────────────────

  const defs = `
  <defs>
    <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${GRAD_START}"/>
      <stop offset="100%" stop-color="${GRAD_END}"/>
    </linearGradient>
  </defs>`;

  const bg = `<rect width="${svgW}" height="${svgH}" fill="${BG}" rx="${rounded ? 14 : 0}"/>`;

  const title = `<text
    x="${pad}"
    y="${titleY}"
    font-family="'Graphik', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    font-size="${TITLE_FONT_SIZE}"
    font-weight="700"
    fill="${TITLE_COLOR}"
  >Where Your Shoppers Will Go Instead</text>`;

  const circle = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${gradId})"/>`;

  // Dealer name lines (centered in circle)
  const nameLineHeight = nameSize * 1.25;
  const totalNameH = nameLines.length * nameLineHeight;
  const leadCountSize = 30;
  const nameLabelGap = 8;
  const blockH = totalNameH + nameLabelGap + leadCountSize;
  const blockTop = cy - blockH / 2;

  const nameTextEls = nameLines
    .map((line, li) => {
      const y = blockTop + nameSize * 0.85 + li * nameLineHeight;
      return `<text
      x="${cx}"
      y="${y}"
      text-anchor="middle"
      font-family="'Graphik', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      font-size="${nameSize}"
      font-weight="700"
      fill="#FFFFFF"
    >${escXML(line)}</text>`;
    })
    .join('\n');

  const leadY = blockTop + totalNameH + nameLabelGap + leadCountSize * 0.85;
  const leadText = `<text
    x="${cx}"
    y="${leadY}"
    text-anchor="middle"
    font-family="'Graphik', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    font-size="${leadCountSize}"
    font-weight="800"
    fill="#FFFFFF"
  >${escXML(dealer.leadCount)} leads</text>`;

  // ── Arrows & Cards ──────────────────────────────────────────────────────────

  const chevLen = 11;
  const chevAngle = Math.PI / 4; // 45°

  const arrowsAndCards = dealer.competitors
    .map((comp, i) => {
      const bY = cardYs[i];
      const bH = cardHeights[i];
      const bMidY = bY + bH / 2;

      // Arrow geometry
      const tipX = boxX - 8;
      const tipY = bMidY;

      // Start point on circle circumference toward the tip
      const dx = tipX - cx;
      const dy = tipY - cy;
      const angle = Math.atan2(dy, dx);
      const sx = cx + r * Math.cos(angle);
      const sy = cy + r * Math.sin(angle);

      // Bezier control points (leaves circle horizontally, arrives horizontally)
      const triBase = tipX - chevLen * Math.cos(chevAngle);
      const cp1x = sx + (tipX - sx) * 0.5;
      const cp1y = sy;
      const cp2x = triBase - (tipX - sx) * 0.2;
      const cp2y = tipY;

      const topY = tipY - chevLen * Math.sin(chevAngle);
      const botY = tipY + chevLen * Math.sin(chevAngle);

      const arrow = `
    <path
      d="M ${f(sx)},${f(sy)} C ${f(cp1x)},${f(cp1y)} ${f(cp2x)},${f(cp2y)} ${f(triBase)},${f(tipY)}"
      fill="none"
      stroke="${ARROW_COLOR}"
      stroke-width="2"
      stroke-linecap="round"
    />
    <path
      d="M ${f(triBase)},${f(topY)} L ${f(tipX)},${f(tipY)} L ${f(triBase)},${f(botY)} Z"
      fill="${ARROW_COLOR}"
    />`;

      // Card
      const card = `
    <rect
      x="${boxX}"
      y="${f(bY)}"
      width="${boxW}"
      height="${bH}"
      rx="${CARD_RX}"
      fill="${CARD_BG}"
      stroke="${CARD_BORDER}"
      stroke-width="1"
    />
    <circle
      cx="${boxX + 14 + circR}"
      cy="${f(bMidY)}"
      r="${circR}"
      fill="${BADGE_COLOR}"
    />
    <text
      x="${boxX + 14 + circR}"
      y="${f(bMidY + 5)}"
      text-anchor="middle"
      font-family="'Graphik', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      font-size="13"
      font-weight="700"
      fill="#FFFFFF"
    >${i + 1}</text>
    ${competitorNameText(comp, boxX, bY, bH, boxW, circR)}`;

      return arrow + card;
    })
    .join('\n');

  return `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="${svgW}"
  height="${svgH}"
  viewBox="0 0 ${svgW} ${svgH}"
>
${defs}
${bg}
${title}
${circle}
${nameTextEls}
${leadText}
${arrowsAndCards}
</svg>`;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Format a float to 2 decimal places */
function f(n) {
  return Math.round(n * 100) / 100;
}

/** Escape XML special chars */
function escXML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Render competitor name text, wrapping to a second line if needed.
 */
function competitorNameText(name, boxX, bY, bH, boxW, circR) {
  const textX = boxX + 14 + circR * 2 + 10;
  const availW = boxW - (14 + circR * 2 + 10 + 10);
  const charsPerLine = Math.floor(availW / (13 * CHAR_WIDTH_RATIO));
  const lines = wordWrap(name, charsPerLine);

  const lineH = 16;
  const totalH = lines.length * lineH;
  const startY = bY + bH / 2 - totalH / 2 + 13 * 0.8;

  return lines
    .map(
      (line, li) => `
    <text
      x="${textX}"
      y="${f(startY + li * lineH)}"
      font-family="'Graphik', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      font-size="13"
      fill="${TEXT_COLOR}"
    >${escXML(line)}</text>`,
    )
    .join('\n');
}

/**
 * Returns the pixel dimensions of the SVG for a given dealer (used by export).
 * @param {{ name: string, leadCount: string, competitors: string[] }} dealer
 * @returns {{ width: number, height: number }}
 */
export function svgDimensions(dealer) {
  const r = CIRCLE_R;
  const pad = LEFT_PAD;
  const circR = 15;
  const boxX = pad + r * 2 + 28;
  const boxW = 310;
  const cardHeights = dealer.competitors.map((c) => cardHeight(c, boxW));
  const totalBoxH =
    cardHeights.reduce((s, h) => s + h, 0) + CARD_GAP * (cardHeights.length - 1);
  const contentH = Math.max(r * 2 + pad * 2, totalBoxH + pad * 2);
  const svgW = boxX + boxW + pad;
  const svgH = TITLE_ROW_H + contentH;
  return { width: svgW, height: svgH };
}
