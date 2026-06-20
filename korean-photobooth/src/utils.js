import { INK, LAYOUTS, CELL_ASPECT } from "./constants";

export function getLayoutGeometry(layoutKey, scale) {
  const layout = LAYOUTS[layoutKey];
  const PAD = 16 * scale;
  const GAP = 10 * scale;
  const CAPTION_H = 34 * scale;
  let cellW;
  if (layout.cols === 2) cellW = 150 * scale;
  else if (layoutKey === "single") cellW = 240 * scale;
  else cellW = 190 * scale;
  const cellH = cellW / CELL_ASPECT;

  const cells = [];
  for (let i = 0; i < layout.count; i++) {
    const col = i % layout.cols;
    const row = Math.floor(i / layout.cols);
    cells.push({
      x: PAD + col * (cellW + GAP),
      y: PAD + row * (cellH + GAP),
      w: cellW,
      h: cellH,
    });
  }

  const canvasW = PAD * 2 + layout.cols * cellW + (layout.cols - 1) * GAP;
  const canvasH =
    PAD * 2 + layout.rows * cellH + (layout.rows - 1) * GAP + CAPTION_H;
  const captionY = canvasH - CAPTION_H / 2 - PAD * 0.2;

  return { canvasW, canvasH, cells, captionY, PAD };
}

export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function drawComposite(ctx, images, layoutKey, frameColor, stickers, scale) {
  const geo = getLayoutGeometry(layoutKey, scale);
  ctx.canvas.width = geo.canvasW;
  ctx.canvas.height = geo.canvasH;

  ctx.fillStyle = frameColor;
  ctx.fillRect(0, 0, geo.canvasW, geo.canvasH);

  const isDarkFrame = ["#4a3a3a", "#a9c3e0"].includes(frameColor);
  const textColor = isDarkFrame ? "#fdf3ee" : INK;

  geo.cells.forEach((cell, i) => {
    const img = images[i];
    if (img) {
      ctx.drawImage(img, cell.x, cell.y, cell.w, cell.h);
    } else {
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(cell.x, cell.y, cell.w, cell.h);
    }
    ctx.strokeStyle = textColor;
    ctx.lineWidth = Math.max(1, 1.5 * scale);
    ctx.strokeRect(cell.x, cell.y, cell.w, cell.h);
  });

  ctx.fillStyle = textColor;
  ctx.font = `${11 * scale}px ui-monospace, "SF Mono", Menlo, monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const dateStr = new Date()
    .toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "2-digit" })
    .replace(/\//g, ".");
  ctx.fillText(`PHOTOBOOTH · ${dateStr}`, geo.canvasW / 2, geo.captionY);

  stickers.forEach((s) => {
    ctx.font = `${40 * scale}px serif`;
    ctx.fillStyle = INK;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(s.emoji, s.x * geo.canvasW, s.y * geo.canvasH);
  });
}

export function captureFrame(video, mirror, filterCss) {
  const targetAspect = CELL_ASPECT;
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  const vidAspect = vw / vh;
  let sx, sy, sw, sh;
  if (vidAspect > targetAspect) {
    sh = vh;
    sw = vh * targetAspect;
    sx = (vw - sw) / 2;
    sy = 0;
  } else {
    sw = vw;
    sh = vw / targetAspect;
    sx = 0;
    sy = (vh - sh) / 2;
  }
  const outW = 480;
  const outH = outW / targetAspect;
  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d");
  if (filterCss && filterCss !== "none") ctx.filter = filterCss;
  if (mirror) {
    ctx.translate(outW, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(video, sx, sy, sw, sh, 0, 0, outW, outH);
  return canvas.toDataURL("image/jpeg", 0.92);
}
