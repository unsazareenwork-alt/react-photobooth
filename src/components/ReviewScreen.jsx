import { Download, RotateCcw } from "lucide-react";
import { INK, RED, FRAME_COLORS, STICKERS } from "../constants";

/* ============ SCREEN 2 : DEVELOP / REVIEW ============ */
export default function ReviewScreen({
  previewCanvasRef,
  handleStripClick,
  frameColor,
  setFrameColor,
  stickers,
  selectedSticker,
  setSelectedSticker,
  clearStickers,
  retake,
  handleDownload,
}) {
  return (
    <div
      className="pb-fadeup"
      style={{
        background: "#fff",
        border: `2px solid ${INK}`,
        boxShadow: `6px 6px 0 ${INK}`,
        padding: 22,
        width: 380,
        maxWidth: "100%",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 18,
        }}
      >
        <canvas
          ref={previewCanvasRef}
          className="pb-develop"
          onClick={handleStripClick}
          style={{
            maxWidth: "100%",
            height: "auto",
            cursor: "crosshair",
            boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
          }}
        />
      </div>

      {/* Frame colors */}
      <div style={{ marginBottom: 14 }}>
        <div
          style={{
            fontSize: 11,
            opacity: 0.6,
            marginBottom: 6,
            fontFamily: "ui-monospace, monospace",
          }}
        >
          FRAME COLOR
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {FRAME_COLORS.map((c) => (
            <button
              key={c}
              className="pb-swatch"
              style={{
                background: c,
                outline: frameColor === c ? `2px solid ${RED}` : "none",
                outlineOffset: 2,
              }}
              onClick={() => setFrameColor(c)}
              aria-label={`Frame color ${c}`}
            />
          ))}
        </div>
      </div>

      {/* Stickers */}
      <div style={{ marginBottom: 18 }}>
        <div
          style={{
            fontSize: 11,
            opacity: 0.6,
            marginBottom: 6,
            fontFamily: "ui-monospace, monospace",
          }}
        >
          STICKERS — pick one, then tap the strip
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {STICKERS.map((s) => (
            <button
              key={s}
              className="pb-sticker-btn"
              data-active={selectedSticker === s}
              onClick={() => setSelectedSticker(s)}
            >
              {s}
            </button>
          ))}
          {stickers.length > 0 && (
            <button
              className="pb-chip"
              onClick={clearStickers}
              style={{ padding: "0 10px", fontSize: 11 }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Bottom actions */}
      <div style={{ display: "flex", gap: 8 }}>
        <button
          className="pb-btn"
          onClick={retake}
          style={{
            flex: 1,
            padding: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            fontSize: 13,
          }}
        >
          <RotateCcw size={14} /> Retake
        </button>
        <button
          className="pb-btn pb-btn-primary"
          onClick={handleDownload}
          style={{
            flex: 1,
            padding: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            fontSize: 13,
          }}
        >
          <Download size={14} /> Download
        </button>
      </div>
    </div>
  );
}