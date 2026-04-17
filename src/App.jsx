import React, { useState, useCallback, useRef } from 'react';
import { baseDealers } from './data/baseDealers.js';
import { buildSVG } from './buildSVG.js';
import { parsePDF } from './parsePDF.js';
import { parseHTML } from './parseHTML.js';
import { downloadJPG, downloadZip } from './export.js';

// ── Styles ─────────────────────────────────────────────────────────────────────

const s = {
  page: {
    minHeight: '100vh',
    background: '#f5f7fa',
    padding: '32px 24px',
    fontFamily: "'Graphik', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  container: {
    maxWidth: 680,
    margin: '0 auto',
  },
  header: {
    marginBottom: 28,
  },
  h1: {
    fontSize: 22,
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 4px',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    margin: 0,
  },
  dropZone: (active) => ({
    border: `2px dashed ${active ? '#0763D3' : '#c5cde0'}`,
    borderRadius: 12,
    padding: '28px 24px',
    textAlign: 'center',
    cursor: 'pointer',
    background: active ? '#e8f0fd' : '#fff',
    transition: 'all 0.15s',
    marginBottom: 12,
  }),
  dropIcon: {
    fontSize: 28,
    marginBottom: 8,
    display: 'block',
  },
  dropLabel: {
    fontSize: 15,
    color: '#374151',
    fontWeight: 500,
  },
  dropSub: {
    fontSize: 13,
    color: '#9ca3af',
    marginTop: 4,
  },
  successBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: 8,
    padding: '10px 14px',
    fontSize: 13,
    color: '#15803d',
    marginBottom: 16,
    fontWeight: 500,
  },
  errorBanner: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: 8,
    padding: '10px 14px',
    fontSize: 13,
    color: '#b91c1c',
    marginBottom: 16,
  },
  bannerClose: {
    marginLeft: 'auto',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: 16,
    lineHeight: 1,
    color: 'inherit',
    opacity: 0.6,
    padding: 0,
    flexShrink: 0,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 28,
  },
  btnPrimary: {
    background: '#0763D3',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '9px 18px',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  btnSecondary: {
    background: '#fff',
    color: '#374151',
    border: '1.5px solid #d1d5db',
    borderRadius: 8,
    padding: '9px 18px',
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
  },
  btnDisabled: {
    opacity: 0.45,
    cursor: 'not-allowed',
  },
  statusText: {
    fontSize: 13,
    color: '#6b7280',
    marginLeft: 'auto',
  },
  progressText: {
    fontSize: 13,
    color: '#0763D3',
    marginLeft: 'auto',
    fontWeight: 500,
  },
  dealerBlock: {
    marginBottom: 32,
  },
  dealerLabel: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 10,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  dealerName: {
    color: '#111827',
    fontWeight: 700,
  },
  checkmark: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 18,
    height: 18,
    borderRadius: '50%',
    background: '#16a34a',
    color: '#fff',
    fontSize: 10,
    fontWeight: 700,
    flexShrink: 0,
  },
  svgWrap: {
    borderRadius: 14,
    overflow: 'hidden',
    maxWidth: 600,
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    marginBottom: 10,
    lineHeight: 0,
  },
  btnDownload: {
    background: '#fff',
    color: '#0763D3',
    border: '1.5px solid #0763D3',
    borderRadius: 8,
    padding: '7px 16px',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #e5e7eb',
    margin: '0 0 28px',
  },
};

const ACCEPTED_TYPES = new Set(['application/pdf', 'text/html']);
const ACCEPTED_EXT = /\.(pdf|html|htm)$/i;

function fileTypeValid(file) {
  return ACCEPTED_TYPES.has(file.type) || ACCEPTED_EXT.test(file.name);
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function App() {
  const [dealers, setDealers] = useState(baseDealers);
  // Set of dealer indices that came from the most recent upload
  const [newIndices, setNewIndices] = useState(new Set());
  const [dragOver, setDragOver] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [error, setError] = useState(null);
  const [zipProgress, setZipProgress] = useState(null);
  const [downloadingIdx, setDownloadingIdx] = useState(null);
  const fileInputRef = useRef(null);

  // ── File handling ────────────────────────────────────────────────────────────

  const handleFile = useCallback(async (file) => {
    if (!file) return;

    if (!fileTypeValid(file)) {
      setError('Unsupported file type. Please upload a PDF or HTML file.');
      return;
    }

    setParsing(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const isPDF = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
      const parsed = isPDF ? await parsePDF(file) : await parseHTML(file);

      if (parsed.length === 0) {
        setError(
          `No dealers found in "${file.name}". Make sure the file matches the expected format (Dealer Name  ID: XXXXXX, followed by ranked competitors).`
        );
        return;
      }

      setDealers((prev) => {
        const startIdx = prev.length;
        const next = [...prev, ...parsed];
        setNewIndices(new Set(parsed.map((_, i) => startIdx + i)));
        return next;
      });

      setSuccessMsg(
        `${parsed.length} dealer graphic${parsed.length !== 1 ? 's' : ''} loaded from "${file.name}"`
      );
    } catch (err) {
      console.error(err);
      setError(`Failed to parse "${file.name}": ${err.message}`);
    } finally {
      setParsing(false);
    }
  }, []);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      handleFile(e.dataTransfer.files[0]);
    },
    [handleFile],
  );

  const onFileInput = useCallback(
    (e) => {
      handleFile(e.target.files[0]);
      e.target.value = '';
    },
    [handleFile],
  );

  // ── Export handlers ──────────────────────────────────────────────────────────

  const handleDownloadJPG = useCallback(async (dealer, i) => {
    setDownloadingIdx(i);
    setError(null);
    try {
      await downloadJPG(dealer, i);
    } catch (err) {
      console.error(err);
      setError(`Export failed for "${dealer.name}": ${err.message}`);
    } finally {
      setDownloadingIdx(null);
    }
  }, []);

  const handleDownloadZip = useCallback(async () => {
    setZipProgress(0);
    setError(null);
    try {
      await downloadZip(dealers, setZipProgress);
    } catch (err) {
      console.error(err);
      setError(`ZIP export failed: ${err.message}`);
    } finally {
      setZipProgress(null);
    }
  }, [dealers]);

  const handleReset = useCallback(() => {
    setDealers(baseDealers);
    setNewIndices(new Set());
    setSuccessMsg(null);
    setError(null);
  }, []);

  // ── Render ───────────────────────────────────────────────────────────────────

  const isExporting = zipProgress !== null;

  return (
    <div style={s.page}>
      <div style={s.container}>

        {/* Header */}
        <div style={s.header}>
          <h1 style={s.h1}>CarGurus Competitor Redirect Graphic Generator</h1>
          <p style={s.subtitle}>
            Upload a dealer PDF or HTML file to append graphics to the list below.
          </p>
        </div>

        {/* Drop zone */}
        <div
          style={s.dropZone(dragOver || parsing)}
          onClick={() => !parsing && fileInputRef.current.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current.click()}
          aria-label="Upload PDF or HTML file"
        >
          <span style={s.dropIcon}>{parsing ? '⏳' : '📄'}</span>
          <div style={s.dropLabel}>
            {parsing ? 'Parsing file…' : 'Drop a PDF or HTML file here, or click to select'}
          </div>
          <div style={s.dropSub}>Accepts .pdf, .html, .htm — appends parsed dealers below</div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.html,.htm,application/pdf,text/html"
            style={{ display: 'none' }}
            onChange={onFileInput}
          />
        </div>

        {/* Success banner */}
        {successMsg && (
          <div style={s.successBanner}>
            <span>✓</span>
            <span>{successMsg}</span>
            <button style={s.bannerClose} onClick={() => setSuccessMsg(null)} aria-label="Dismiss">✕</button>
          </div>
        )}

        {/* Error banner */}
        {error && (
          <div style={s.errorBanner}>
            <span style={{ flexShrink: 0 }}>⚠</span>
            <span>{error}</span>
            <button style={s.bannerClose} onClick={() => setError(null)} aria-label="Dismiss">✕</button>
          </div>
        )}

        {/* Toolbar */}
        <div style={s.toolbar}>
          <button
            style={{ ...s.btnPrimary, ...(isExporting ? s.btnDisabled : {}) }}
            onClick={handleDownloadZip}
            disabled={isExporting || dealers.length === 0}
          >
            ⬇ Download All {dealers.length} as ZIP
          </button>

          <button
            style={s.btnSecondary}
            onClick={handleReset}
            disabled={isExporting}
          >
            Reset
          </button>

          {isExporting ? (
            <span style={s.progressText}>Generating… {zipProgress}%</span>
          ) : (
            <span style={s.statusText}>{dealers.length} dealer{dealers.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        <hr style={s.divider} />

        {/* Dealer graphics list */}
        {dealers.map((dealer, i) => {
          const svg = buildSVG(dealer, i, true);
          const isNew = newIndices.has(i);
          const isDownloading = downloadingIdx === i;

          return (
            <div key={`${dealer.name}-${i}`} style={s.dealerBlock}>
              <div style={s.dealerLabel}>
                {i + 1} of {dealers.length} — <span style={s.dealerName}>{dealer.name}</span>
                {isNew && <span style={s.checkmark} title="Loaded from file">✓</span>}
              </div>

              <div style={s.svgWrap}>
                <div
                  dangerouslySetInnerHTML={{ __html: svg }}
                  style={{ display: 'block', lineHeight: 0 }}
                />
              </div>

              <button
                style={{ ...s.btnDownload, ...(isDownloading ? s.btnDisabled : {}) }}
                onClick={() => handleDownloadJPG(dealer, i)}
                disabled={isDownloading}
              >
                {isDownloading ? 'Exporting…' : '⬇ Download JPG'}
              </button>
            </div>
          );
        })}

      </div>
    </div>
  );
}
