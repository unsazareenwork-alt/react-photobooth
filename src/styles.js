import { INK, PAPER, RED } from "./constants";

export function getSharedStyles() {
  return `
    @keyframes develop {
      0% { filter: grayscale(1) contrast(0.7) brightness(1.3); opacity: 0.3; }
      100% { filter: grayscale(0) contrast(1) brightness(1); opacity: 1; }
    }
    @keyframes fadeUp {
      0% { opacity: 0; transform: translateY(10px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .pb-develop { animation: develop 0.6s ease-out; }
    .pb-fadeup { animation: fadeUp 0.35s ease-out; }
    .pb-btn {
      cursor: pointer;
      border: 2px solid ${INK};
      background: ${PAPER};
      color: ${INK};
      font-weight: 600;
      transition: transform 0.12s ease, background 0.12s ease;
    }
    .pb-btn:hover { transform: translate(-1px,-1px); }
    .pb-btn:active { transform: translate(1px,1px); }
    .pb-btn:focus-visible { outline: 3px solid ${RED}; outline-offset: 2px; }
    .pb-btn-primary { background: ${INK}; color: ${PAPER}; }
    .pb-chip {
      cursor: pointer;
      border: 2px solid ${INK};
      background: ${PAPER};
      font-family: ui-monospace, "SF Mono", Menlo, monospace;
      font-size: 12px;
      letter-spacing: 0.03em;
      transition: transform 0.12s ease;
    }
    .pb-chip:hover { transform: translateY(-1px); }
    .pb-chip[data-active="true"] { background: ${INK}; color: ${PAPER}; }
    .pb-swatch {
      cursor: pointer;
      width: 30px; height: 30px;
      border: 2px solid ${INK};
      transition: transform 0.12s ease;
    }
    .pb-swatch:hover { transform: scale(1.12); }
    .pb-sticker-btn {
      cursor: pointer;
      width: 38px; height: 38px;
      border: 2px solid ${INK};
      background: ${PAPER};
      font-size: 18px;
      transition: transform 0.12s ease;
    }
    .pb-sticker-btn[data-active="true"] { background: ${RED}; color: ${PAPER}; border-color: ${RED}; }
    .pb-filter-btn {
      cursor: pointer;
      border: 2px solid ${INK};
      background: ${PAPER};
      color: ${INK};
      font-size: 12px;
      font-weight: 600;
      padding: 7px 10px;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: transform 0.12s ease, background 0.12s ease;
    }
    .pb-filter-btn:hover { transform: translateX(2px); }
    .pb-filter-btn[data-active="true"] { background: ${INK}; color: ${PAPER}; }
    .pb-filter-btn[data-active="true"] .pb-filter-dot { border-color: ${PAPER}; }
    .pb-filter-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 1.5px solid ${INK};
      flex-shrink: 0;
    }
    .pb-gate-btn:hover { transform: scale(1.04); }
    .pb-gate-btn:active { transform: scale(0.97); }
    .pb-gate-left, .pb-gate-right {
      position: fixed;
      top: 0;
      width: calc(50vw + 4px);
      height: 100vh;
      overflow: hidden;
      z-index: 50;
      transition: transform 0.8s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.8s ease;
    }
    .pb-gate-left { left: 0; }
    .pb-gate-right { left: calc(50vw - 4px); }
    .pb-gate-left-inner, .pb-gate-right-inner {
      width: 100vw;
      height: 100vh;
    }
    .pb-gate-right-inner { transform: translateX(calc(-50vw + 4px)); }
    @media (prefers-reduced-motion: reduce) {
      .pb-develop, .pb-fadeup { animation: none; }
      .pb-gate-left, .pb-gate-right { transition: none; }
    }
  `;
}
