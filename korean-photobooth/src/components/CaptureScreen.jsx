import { Camera, X, Sparkles, Zap, RefreshCw } from "lucide-react";
import { INK, PAPER, FILM, RED, LAYOUTS, FILTERS } from "../constants";

/* ============ SCREEN 1 : CAPTURE ============ */
export default function CaptureScreen({
  videoRef,
  cameraOn,
  isCapturingSeq,
  mirror,
  currentFilter,
  closeCamera,
  countdown,
  flashActive,
  photos,
  neededCount,
  error,
  layoutKey,
  setLayoutKey,
  flashOn,
  setFlashOn,
  setMirror,
  setFacingMode,
  startCamera,
  cancelSequence,
  runCaptureSequence,
  filterId,
  setFilterId,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 20,
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        className="pb-fadeup"
        style={{
          background: "#fff",
          border: `2px solid ${INK}`,
          boxShadow: `6px 6px 0 ${INK}`,
          padding: 22,
          width: 380,
          maxWidth: "100%",
        }}
      >
        <div
          style={{
            position: "relative",
            background: FILM,
            border: `8px solid ${FILM}`,
            aspectRatio: "3/4",
            overflow: "hidden",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: cameraOn ? "block" : "none",
              transform: mirror ? "scaleX(-1)" : "none",
              filter: currentFilter.css,
            }}
          />
          {cameraOn && !isCapturingSeq && (
            <button
              onClick={closeCamera}
              title="Close camera"
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: "none",
                background: "rgba(0,0,0,0.5)",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={15} />
            </button>
          )}
          {!cameraOn && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: PAPER,
                gap: 10,
                padding: 16,
                textAlign: "center",
              }}
            >
              <Camera size={36} strokeWidth={1.5} />
              <span style={{ fontSize: 13, opacity: 0.8 }}>
                Camera is off
              </span>
            </div>
          )}
          {countdown && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 90,
                fontWeight: 800,
                color: "#fff",
                textShadow: "0 0 24px rgba(0,0,0,0.6)",
                fontFamily: "Georgia, serif",
              }}
            >
              {countdown}
            </div>
          )}
          {flashActive && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#fff",
              }}
            />
          )}
          {isCapturingSeq && (
            <div
              style={{
                position: "absolute",
                top: 8,
                left: 8,
                fontFamily: "ui-monospace, monospace",
                fontSize: 11,
                color: "#fff",
                background: "rgba(0,0,0,0.45)",
                padding: "3px 8px",
              }}
            >
              {photos.length + 1} / {neededCount}
            </div>
          )}
        </div>

        {error && (
          <p style={{ color: RED, fontSize: 12, marginTop: 10 }}>{error}</p>
        )}

        {/* Layout chips */}
        <div style={{ marginTop: 18 }}>
          <div
            style={{
              fontSize: 11,
              opacity: 0.6,
              marginBottom: 6,
              fontFamily: "ui-monospace, monospace",
            }}
          >
            LAYOUT
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {Object.entries(LAYOUTS).map(([key, l]) => (
              <button
                key={key}
                className="pb-chip"
                data-active={layoutKey === key}
                disabled={isCapturingSeq}
                onClick={() => setLayoutKey(key)}
                style={{ padding: "6px 10px" }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          <button
            className="pb-chip"
            data-active={mirror}
            onClick={() => setMirror((m) => !m)}
            style={{ padding: "6px 10px", flex: 1 }}
            title="Mirror preview"
          >
            Mirror
          </button>
          <button
            className="pb-chip"
            data-active={flashOn}
            onClick={() => setFlashOn((f) => !f)}
            style={{
              padding: "6px 10px",
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
            title="Flash"
          >
            <Zap size={13} /> Flash
          </button>
          <button
            className="pb-chip"
            onClick={() =>
              setFacingMode((m) => (m === "user" ? "environment" : "user"))
            }
            style={{ padding: "6px 10px" }}
            title="Switch camera"
          >
            <RefreshCw size={13} />
          </button>
        </div>

        {/* Action button */}
        <div style={{ marginTop: 18 }}>
          {!cameraOn ? (
            <button
              className="pb-btn pb-btn-primary"
              onClick={startCamera}
              style={{
                width: "100%",
                padding: "13px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                fontSize: 14,
              }}
            >
              <Camera size={16} /> Turn on camera
            </button>
          ) : isCapturingSeq ? (
            <button
              className="pb-btn"
              onClick={cancelSequence}
              style={{
                width: "100%",
                padding: "13px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                fontSize: 14,
              }}
            >
              <X size={16} /> Cancel
            </button>
          ) : (
            <button
              className="pb-btn pb-btn-primary"
              onClick={runCaptureSequence}
              style={{
                width: "100%",
                padding: "13px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                fontSize: 14,
              }}
            >
              <Sparkles size={16} /> Start capture
            </button>
          )}
        </div>
      </div>

      {/* Filters panel */}
      <div
        className="pb-fadeup"
        style={{
          background: "#fff",
          border: `2px solid ${INK}`,
          boxShadow: `6px 6px 0 ${INK}`,
          padding: 18,
          width: 170,
          maxWidth: "100%",
        }}
      >
        <div
          style={{
            fontSize: 11,
            opacity: 0.6,
            marginBottom: 10,
            fontFamily: "ui-monospace, monospace",
          }}
        >
          FILTERS
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {FILTERS.map((f) => (
            <button
              key={f.id}
              className="pb-filter-btn"
              data-active={filterId === f.id}
              disabled={isCapturingSeq}
              onClick={() => setFilterId(f.id)}
            >
              <span
                className="pb-filter-dot"
                style={{ background: f.swatch }}
              />
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
