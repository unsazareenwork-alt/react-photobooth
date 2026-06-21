import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowRight } from "lucide-react";

import { INK, PAPER, RED, LAYOUTS, STICKERS, FILTERS } from "./constants";
import { loadImage, drawComposite, captureFrame } from "./utils";
import { getSharedStyles } from "./styles";

import CaptureScreen from "./components/CaptureScreen";
import ReviewScreen from "./components/ReviewScreen";
import GateOverlay from "./components/GateOverlay";

export default function Photobooth() {
  const [showGate, setShowGate] = useState(true);
  const [gateState, setGateState] = useState("closed"); // closed | opening

  const [screen, setScreen] = useState("capture"); // 'capture' | 'review'
  const [layoutKey, setLayoutKey] = useState("strip4");
  const [frameColor, setFrameColor] = useState(PAPER);
  const [stickers, setStickers] = useState([]);
  const [selectedSticker, setSelectedSticker] = useState(STICKERS[0]);
  const [filterId, setFilterId] = useState("none");
  const [photos, setPhotos] = useState([]);
  const [loadedImages, setLoadedImages] = useState([]);
  const [cameraOn, setCameraOn] = useState(false);
  const [facingMode, setFacingMode] = useState("user");
  const [mirror, setMirror] = useState(true);
  const [flashOn, setFlashOn] = useState(true);
  const [countdown, setCountdown] = useState(null);
  const [flashActive, setFlashActive] = useState(false);
  const [isCapturingSeq, setIsCapturingSeq] = useState(false);
  const [error, setError] = useState(null);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const cancelRef = useRef(false);

  const neededCount = LAYOUTS[layoutKey].count;
  const currentFilter = FILTERS.find((f) => f.id === filterId) || FILTERS[0];

  function handleTryItOut() {
    if (gateState !== "closed") return;
    setGateState("opening");
    setTimeout(() => setShowGate(false), 800);
  }

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  function closeCamera() {
    stopStream();
    setCameraOn(false);
    if (videoRef.current) videoRef.current.srcObject = null;
  }

  const startCamera = useCallback(async () => {
    setError(null);
    try {
      stopStream();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1280 }, height: { ideal: 960 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraOn(true);
    } catch (e) {
      setError(
        "Couldn't access your camera. Check your browser's camera permission and try again."
      );
      setCameraOn(false);
    }
  }, [facingMode, stopStream]);

  useEffect(() => {
    return () => stopStream();
  }, [stopStream]);

  useEffect(() => {
    if (cameraOn) startCamera();
  
  }, [facingMode]);

  useEffect(() => {
    setPhotos([]);
    setStickers([]);
  }, [layoutKey]);

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function runCaptureSequence() {
    if (!videoRef.current) return;
    cancelRef.current = false;
    setIsCapturingSeq(true);
    setPhotos([]);
    setStickers([]);
    const shots = [];
    for (let i = 0; i < neededCount; i++) {
      for (let c = 3; c >= 1; c--) {
        if (cancelRef.current) {
          setIsCapturingSeq(false);
          setCountdown(null);
          return;
        }
        setCountdown(c);
        await delay(700);
      }
      setCountdown(null);
      if (flashOn) {
        setFlashActive(true);
        await delay(120);
        setFlashActive(false);
      }
      const dataUrl = captureFrame(videoRef.current, mirror, currentFilter.css);
      shots.push(dataUrl);
      setPhotos([...shots]);
      await delay(450);
    }
    setIsCapturingSeq(false);
    setScreen("review");
  }

  function cancelSequence() {
    cancelRef.current = true;
  }

  function retake() {
    setPhotos([]);
    setStickers([]);
    setScreen("capture");
  }

  useEffect(() => {
    let active = true;
    Promise.all(photos.map(loadImage)).then((imgs) => {
      if (active) setLoadedImages(imgs);
    });
    return () => {
      active = false;
    };
  }, [photos]);

  useEffect(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    drawComposite(ctx, loadedImages, layoutKey, frameColor, stickers, 2.1);
  }, [loadedImages, layoutKey, frameColor, stickers, screen]);

  function handleStripClick(e) {
    const canvas = previewCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setStickers((prev) => [
      ...prev,
      { id: Date.now(), emoji: selectedSticker, x, y },
    ]);
  }

  function clearStickers() {
    setStickers([]);
  }

  function handleDownload() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    drawComposite(ctx, loadedImages, layoutKey, frameColor, stickers, 4);
    const link = document.createElement("a");
    link.download = `photobooth-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: PAPER,
        backgroundImage:
          "radial-gradient(circle, rgba(74,58,58,0.06) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
        color: INK,
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
        padding: "32px 16px 56px",
        position: "relative",
      }}
    >
      <style>{getSharedStyles()}</style>

  
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div
          style={{
            display: "inline-block",
            transform: "rotate(-2deg)",
            border: `3px solid ${RED}`,
            color: RED,
            padding: "6px 22px",
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 700,
            fontSize: 30,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Photobooth
        </div>
        <p
          style={{
            fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
            fontSize: 12,
            letterSpacing: "0.08em",
            marginTop: 10,
            opacity: 0.65,
            textTransform: "uppercase",
          }}
        >
          {screen === "capture"
            ? "step 1 · smile for the camera"
            : "step 2 · your strip is ready"}
        </p>
      </div>

      {/* Step indicator */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          marginBottom: 28,
          fontFamily: "ui-monospace, monospace",
          fontSize: 11,
        }}
      >
        <div
          style={{
            padding: "4px 12px",
            border: `2px solid ${INK}`,
            background: screen === "capture" ? INK : PAPER,
            color: screen === "capture" ? PAPER : INK,
          }}
        >
          1 · CAPTURE
        </div>
        <div style={{ display: "flex", alignItems: "center", opacity: 0.5 }}>
          <ArrowRight size={14} />
        </div>
        <div
          style={{
            padding: "4px 12px",
            border: `2px solid ${INK}`,
            background: screen === "review" ? INK : PAPER,
            color: screen === "review" ? PAPER : INK,
            opacity: screen === "review" ? 1 : 0.5,
          }}
        >
          2 · DEVELOP
        </div>
      </div>

      {screen === "capture" ? (
        <CaptureScreen
          videoRef={videoRef}
          cameraOn={cameraOn}
          isCapturingSeq={isCapturingSeq}
          mirror={mirror}
          currentFilter={currentFilter}
          closeCamera={closeCamera}
          countdown={countdown}
          flashActive={flashActive}
          photos={photos}
          neededCount={neededCount}
          error={error}
          layoutKey={layoutKey}
          setLayoutKey={setLayoutKey}
          flashOn={flashOn}
          setFlashOn={setFlashOn}
          setMirror={setMirror}
          setFacingMode={setFacingMode}
          startCamera={startCamera}
          cancelSequence={cancelSequence}
          runCaptureSequence={runCaptureSequence}
          filterId={filterId}
          setFilterId={setFilterId}
        />
      ) : (
        <ReviewScreen
          previewCanvasRef={previewCanvasRef}
          handleStripClick={handleStripClick}
          frameColor={frameColor}
          setFrameColor={setFrameColor}
          stickers={stickers}
          selectedSticker={selectedSticker}
          setSelectedSticker={setSelectedSticker}
          clearStickers={clearStickers}
          retake={retake}
          handleDownload={handleDownload}
        />
      )}

      <GateOverlay
        showGate={showGate}
        gateState={gateState}
        onTryItOut={handleTryItOut}
      />
    </div>
  );
}