import React, { useState, useCallback, useRef } from 'react';
import { baseDealers } from './data/baseDealers.js';
import { buildSVG } from './buildSVG.js';
import { parsePDF } from './parsePDF.js';
import { downloadJPG, downloadZip } from './export.js';

// ── Styles (inline objects) ────────────────────────────────────────────────────

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
    marginBottom: 20,
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
  status: {
    fontSize: 13,
    color: '#6b7280',
    marginLeft: 'auto',
  },
  progress: {
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
  },
  dealerName: {
    color: '#111827',
    fontWeight: 700,
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
  errorBanner: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: 8,
    padding: '10px 14px',
    fontSize: 13,
    color: '#b91c1c',
    marginBottom: 16,
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #e5e7eb',
    margin: '0 0 28px',
  },
};

// ── Component ──────────────────────────────────────────────────────────────────

export default function App() {
  const [dealers, setDealers] = useState(baseDealers);
  const [dragOver, setDragOver] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [parseError, setParseError] = useState(null);
  const [zipProgress, setZipProgress] = useState(null); // null | 0–100
  const [downloadingIdx, setDownloadingIdx] = useState(null);
  const fileInputRef = useRef(null);

  // ── PDF handling ────────────────────────────────────────────────────────────

  const handleFile = useCallback(async (file) => {
    if (!file || file.type !== 'application/pdf') {
      setParseError('Please upload a valid PDF file.');
      return;
    }
    setParsing(true);
    setParseError(null);
    try {
      const parsed = await parsePDF(file);
      if (parsed.length === 0) {
        setParseError('No dealers found in the PDF. Check the file format.');
        return;
      }
      setDealers((prev) => [...prev, ...parsed]);
    } catch (err) {
      console.error(err);
      setParseError(`Failed to parse PDF: ${err.message}`);
    } finally {
      setParsing(false);
    }
  }, []);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      handleFile(file);
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

  // ── Export handlers ─────────────────────────────────────────────────────────

  const handleDownloadJPG = useCallback(
    async (dealer, i) => {
      setDownloadingIdx(i);
      try {
        await downloadJPG(dealer, i);
      } catch (err) {
        console.error(err);
        setParseError(`Export failed: ${err.message}`);
      } finally {
        setDownloadingIdx(null);
      }
    },
    [],
  );

  const handleDownloadZip = useCallback(async () => {
    setZipProgress(0);
    try {
      await downloadZip(dealers, setZipProgress);
    } catch (err) {
      console.error(err);
      setParseError(`ZIP export failed: ${err.message}`);
    } finally {
      setZipProgress(null);
    }
  }, [dealers]);

  // ── Render ──────────────────────────────────────────────────────────────────

  const isExporting = zipProgress !== null;

  return (
    <div style={s.page}>
      <div style={s.container}>
        {/* Header */}
        <div style={s.header}>
          <h1 style={s.h1}>CarGurus Competitor Redirect Graphic Generator</h1>
          <p style={s.subtitle}>
            Upload a dealer PDF to append to the list, then download individual JPGs or a bulk ZIP.
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
          aria-label="Upload PDF"
        >
          <span style={s.dropIcon}>{parsing ? '⏳' : '📄'}</span>
          <div style={s.dropLabel}>
            {parsing ? 'Parsing PDF…' : 'Drop a dealer PDF here, or click to select'}
          </div>
          <div style={s.dropSub}>Appends parsed dealers to the list below</div>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            style={{ display: 'none' }}
            onChange={onFileInput}
          />
        </div>

        {parseError && <div style={s.errorBanner}>{parseError}</div>}

        {/* Toolbar */}
        <div style={s.toolbar}>
          <button
            style={{
              ...s.btnPrimary,
              ...(isExporting ? s.btnDisabled : {}),
            }}
            onClick={handleDownloadZip}
            disabled={isExporting || dealers.length === 0}
          >
            ⬇ Download All {dealers.length} as ZIP
          </button>

          <button
            style={s.btnSecondary}
            onClick={() => setDealers(baseDealers)}
            disabled={isExporting}
          >
            Reset
          </button>

          {isExporting ? (
            <span style={s.progress}>Generating… {zipProgress}%</span>
          ) : (
            <span style={s.status}>{dealers.length} dealer{dealers.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        <hr style={s.divider} />

        {/* Dealer graphics list */}
        {dealers.map((dealer, i) => {
          const svg = buildSVG(dealer, i, true);
          const isDownloading = downloadingIdx === i;

          return (
            <div key={`${dealer.name}-${i}`} style={s.dealerBlock}>
              <div style={s.dealerLabel}>
                {i + 1} of {dealers.length} — <span style={s.dealerName}>{dealer.name}</span>
              </div>

              <div style={s.svgWrap}>
                <div
                  dangerouslySetInnerHTML={{ __html: svg }}
                  style={{ display: 'block', lineHeight: 0 }}
                />
              </div>

              <button
                style={{
                  ...s.btnDownload,
                  ...(isDownloading ? s.btnDisabled : {}),
                }}
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
