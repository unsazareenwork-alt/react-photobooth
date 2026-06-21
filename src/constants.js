export const INK = "#4a3a3a";
export const PAPER = "#fdf3ee";
export const FILM = "#2a2222";
export const RED = "#e0727f";
export const PINK = "#f6c9d0";

export const LAYOUTS = {
  strip3: { label: "Strip · 3", count: 3, cols: 1, rows: 3 },
  strip4: { label: "Strip · 4", count: 4, cols: 1, rows: 4 },
  grid4: { label: "Grid · 4", count: 4, cols: 2, rows: 2 },
  single: { label: "Single", count: 1, cols: 1, rows: 1 },
};

export const FRAME_COLORS = [
  "#fdf3ee",
  "#ffffff",
  "#4a3a3a",
  "#e0727f",
  "#f0c869",
  "#b9ddd1",
  "#f6c9d0",
  "#a9c3e0",
];

export const STICKERS = ["♡", "★", "✦", "☺", "✿", "♪", "✓", "☼"];

export const FILTERS = [
  { id: "none", label: "Normal", swatch: "#cfc4bd", css: "none" },
  { id: "mono", label: "Mono", swatch: "#9a9a9a", css: "grayscale(1) contrast(1.05)" },
  { id: "sepia", label: "Sepia", swatch: "#b88a55", css: "sepia(0.7)" },
  { id: "vintage", label: "Vintage", swatch: "#c79a6b", css: "sepia(0.35) contrast(1.1) saturate(1.3) brightness(1.05)" },
  { id: "pink", label: "Soft Pink", swatch: "#f0b8c4", css: "saturate(1.2) brightness(1.08) hue-rotate(-8deg)" },
  { id: "cool", label: "Cool Blue", swatch: "#a9c3e0", css: "saturate(1.1) brightness(1.05) hue-rotate(15deg) contrast(1.05)" },
  { id: "dreamy", label: "Dreamy", swatch: "#e6d6e8", css: "brightness(1.15) contrast(0.9) saturate(1.1) blur(0.5px)" },
  { id: "contrast", label: "High Contrast", swatch: "#3a3a3a", css: "contrast(1.4) saturate(1.2)" },
];

export const CELL_ASPECT = 3 / 4;