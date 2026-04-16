import JSZip from 'jszip';
import { buildSVG, svgDimensions } from './buildSVG.js';

const SCALE = 2; // retina
const BG_COLOR = '#ECF0F6';
const JPEG_QUALITY = 0.92;

/**
 * Converts an SVG string to a JPEG Blob using an off-screen Canvas.
 * SVG is encoded as a data URI (not Blob URL) to avoid canvas taint in Chrome.
 *
 * @param {string} svgString
 * @param {number} width   natural (1×) SVG width in px
 * @param {number} height  natural (1×) SVG height in px
 * @returns {Promise<Blob>}
 */
export function svgToJpgBlob(svgString, width, height) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = width * SCALE;
    canvas.height = height * SCALE;

    const ctx = canvas.getContext('2d');
    ctx.scale(SCALE, SCALE);

    // Pre-fill background so JPEG has no transparent areas
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, width, height);

    const dataUri =
      'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('canvas.toBlob returned null'));
        },
        'image/jpeg',
        JPEG_QUALITY,
      );
    };
    img.onerror = () => reject(new Error('Failed to load SVG into Image element'));
    img.src = dataUri;
  });
}

/**
 * Triggers a browser download of a JPEG for a single dealer.
 *
 * @param {{ name: string, leadCount: string, competitors: string[] }} dealer
 * @param {number} index  0-based index (for unique gradient IDs)
 */
export async function downloadJPG(dealer, index) {
  const svg = buildSVG(dealer, index, false); // square corners for export
  const { width, height } = svgDimensions(dealer);
  const blob = await svgToJpgBlob(svg, width, height);

  const filename = dealer.name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '') + '_cargurus.jpg';
  triggerDownload(blob, filename);
}

/**
 * Generates JPEGs for all dealers in parallel and downloads a ZIP.
 *
 * @param {Array<{ name: string, leadCount: string, competitors: string[] }>} dealers
 * @param {(progress: number) => void} [onProgress]  called with 0–100
 */
export async function downloadZip(dealers, onProgress) {
  const zip = new JSZip();
  let done = 0;

  const jobs = dealers.map(async (dealer, i) => {
    const svg = buildSVG(dealer, i, false);
    const { width, height } = svgDimensions(dealer);
    const blob = await svgToJpgBlob(svg, width, height);
    const filename =
      dealer.name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '') +
      '_cargurus.jpg';
    zip.file(filename, blob);
    done++;
    if (onProgress) onProgress(Math.round((done / dealers.length) * 100));
  });

  await Promise.all(jobs);

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  triggerDownload(zipBlob, 'cargurus_dealer_graphics.zip');
}

/**
 * Creates an invisible <a> and clicks it to download a Blob.
 */
function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  // Clean up after the browser has had a chance to start the download
  setTimeout(() => {
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }, 1000);
}
