import WelcomeDecor from "./WelcomeDecor";

/* ===== Welcome Gate Overlay ===== */
export default function GateOverlay({ showGate, gateState, onTryItOut }) {
  if (!showGate) return null;

  return (
    <>
      <div
        className="pb-gate-left"
        style={{
          transform: gateState === "opening" ? "translateX(-100%)" : "translateX(0)",
        }}
      >
        <div className="pb-gate-left-inner">
          <WelcomeDecor onTryItOut={onTryItOut} />
        </div>
      </div>
      <div
        className="pb-gate-right"
        style={{
          transform: gateState === "opening" ? "translateX(100%)" : "translateX(0)",
        }}
      >
        <div className="pb-gate-right-inner">
          <WelcomeDecor onTryItOut={onTryItOut} />
        </div>
      </div>
    </>
  );
}
