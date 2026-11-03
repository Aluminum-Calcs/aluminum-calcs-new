import { packGuillotine } from "./guillotine.js";

export function optimizeSheetLayout(pieces, options) {
  const flatPieces = pieces.flatMap((piece) =>
    Array.from({ length: piece.qty }, () => ({
      width: piece.width,
      height: piece.height,
      canRotate: options.allowRotation && !piece.lockRotation,
      ref: piece.id,
    }))
  );

  return packGuillotine(flatPieces, {
    sheetW: options.sheetW,
    sheetH: options.sheetH,
    kerf: options.kerf,
    trim: options.trim,
  });
}

export function calculateLayoutStats(sheets, sheetW, sheetH) {
  const totalArea = sheetW * sheetH * sheets.length;
  const usedArea = sheets.reduce(
    (sum, sheet) =>
      sum +
      sheet.placements.reduce(
        (sheetTotal, placement) =>
          sheetTotal + placement.width * placement.height,
        0
      ),
    0
  );
  const efficiency = totalArea ? (usedArea / totalArea) * 100 : 0;

  return {
    sheetCount: sheets.length,
    efficiency,
    waste: totalArea ? 100 - efficiency : 0,
  };
}

export function drawSheetLayout(canvas, sheets, sheetW, sheetH, trim) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Unable to render the sheet layout.");
  }

  const dpr = window.devicePixelRatio || 1;
  const available = canvas.parentElement?.clientWidth || 900;
  const scale = Math.min(0.5, (available - 4) / sheetW);
  const cssW = Math.round(sheetW * scale) + 4;
  const labelHeight = 24;
  const gap = 18;
  const blockHeight = labelHeight + sheetH * scale + gap;
  const cssH = Math.max(1, Math.ceil(sheets.length * blockHeight));

  canvas.style.width = `${cssW}px`;
  canvas.style.height = `${cssH}px`;
  canvas.width = cssW * dpr;
  canvas.height = cssH * dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssW, cssH);

  sheets.forEach((sheet, index) => {
    ctx.save();
    ctx.translate(2, index * blockHeight);
    ctx.fillStyle = "#526057";
    ctx.font = "700 13px sans-serif";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(`Sheet ${index + 1} of ${sheets.length}`, 0, 16);
    ctx.translate(0, labelHeight);
    drawSheet(ctx, sheetW, sheetH, trim, scale);
    sheet.offcuts.forEach((offcut) => drawOffcut(ctx, offcut, scale));
    sheet.placements.forEach((placement) => drawPlacement(ctx, placement, scale));
    ctx.restore();
  });
}

function drawSheet(ctx, width, height, trim, scale) {
  ctx.fillStyle = "#f4f4f4";
  ctx.fillRect(0, 0, width * scale, height * scale);
  ctx.strokeStyle = "#26352b";
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, width * scale, height * scale);

  if (trim > 0) {
    ctx.save();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = "#718078";
    ctx.lineWidth = 1;
    ctx.strokeRect(
      trim * scale,
      trim * scale,
      (width - 2 * trim) * scale,
      (height - 2 * trim) * scale
    );
    ctx.restore();
  }
}

function drawPlacement(ctx, placement, scale) {
  const x = placement.x * scale;
  const y = placement.y * scale;
  const width = placement.width * scale;
  const height = placement.height * scale;

  ctx.fillStyle = pieceColor(placement.width, placement.height);
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = "#26352b";
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, width, height);

  if (width < 46 || height < 16) return;

  ctx.fillStyle = "#17231b";
  ctx.font = "12px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(
    `${placement.width}×${placement.height}${placement.rotated ? " ↻" : ""}`,
    x + width / 2,
    y + height / 2
  );
  ctx.textAlign = "start";
}

function drawOffcut(ctx, offcut, scale) {
  if (offcut.width < 50 || offcut.height < 50) return;

  const x = offcut.x * scale;
  const y = offcut.y * scale;
  const width = offcut.width * scale;
  const height = offcut.height * scale;

  ctx.save();
  ctx.fillStyle = "#f6e5e2";
  ctx.fillRect(x, y, width, height);
  ctx.setLineDash([5, 3]);
  ctx.strokeStyle = "#b42318";
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, width, height);
  ctx.restore();

  if (width < 60 || height < 16) return;

  ctx.fillStyle = "#8c271e";
  ctx.font = "11px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(
    `${Math.round(offcut.width)}×${Math.round(offcut.height)}`,
    x + width / 2,
    y + height / 2
  );
  ctx.textAlign = "start";
}

function pieceColor(width, height) {
  const hue = (width * 13 + height * 7) % 360;
  return `hsl(${hue}, 65%, 78%)`;
}

function initializeStandaloneOptimizer() {
  const sheetWidthEl = document.getElementById("sheet-width");
  const sheetHeightEl = document.getElementById("sheet-height");
  const pieceWidthEl = document.getElementById("piece-width");
  const pieceHeightEl = document.getElementById("piece-height");
  const pieceQtyEl = document.getElementById("piece-qty");
  const pieceLockEl = document.getElementById("piece-lock");
  const pieceListEl = document.getElementById("piece-list");
  const addPieceBtn = document.getElementById("add-piece");
  const packBtn = document.getElementById("pack-btn");
  const rotationEl = document.getElementById("rotation");
  const spacingEl = document.getElementById("spacing");
  const trimEl = document.getElementById("trim");
  const canvas = document.getElementById("packer-canvas");
  const sheetCountEl = document.getElementById("sheet-count");
  const efficiencyEl = document.getElementById("efficiency");
  const wasteEl = document.getElementById("waste");

  if (
    !sheetWidthEl ||
    !sheetHeightEl ||
    !pieceWidthEl ||
    !pieceHeightEl ||
    !pieceQtyEl ||
    !pieceListEl ||
    !addPieceBtn ||
    !packBtn ||
    !rotationEl ||
    !spacingEl ||
    !trimEl ||
    !canvas ||
    !sheetCountEl ||
    !efficiencyEl ||
    !wasteEl
  ) {
    return;
  }

  let pieces = [];
  let nextId = 1;
  let lastLayout = null;

  const renderPieces = () => {
    pieceListEl.replaceChildren(
      ...pieces.map((piece) => {
        const item = document.createElement("li");
        const label = document.createElement("span");
        const remove = document.createElement("button");
        label.textContent = `${piece.width} × ${piece.height} mm × ${piece.qty}${
          piece.lockRotation ? " (no rotation)" : ""
        }`;
        remove.type = "button";
        remove.dataset.remove = String(piece.id);
        remove.setAttribute("aria-label", "Remove piece");
        remove.textContent = "×";
        item.append(label, remove);
        return item;
      })
    );
  };

  addPieceBtn.addEventListener("click", () => {
    const width = Number(pieceWidthEl.value);
    const height = Number(pieceHeightEl.value);
    const qty = Math.max(1, Math.floor(Number(pieceQtyEl.value) || 1));
    if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) return;

    pieces.push({
      id: nextId++,
      width,
      height,
      qty,
      lockRotation: pieceLockEl?.checked || false,
    });
    pieceWidthEl.value = "";
    pieceHeightEl.value = "";
    pieceQtyEl.value = "1";
    if (pieceLockEl) pieceLockEl.checked = false;
    renderPieces();
  });

  pieceListEl.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const button = target.closest("[data-remove]");
    if (!button) return;
    pieces = pieces.filter((piece) => piece.id !== Number(button.dataset.remove));
    renderPieces();
  });

  packBtn.addEventListener("click", () => {
    const sheetW = Number(sheetWidthEl.value);
    const sheetH = Number(sheetHeightEl.value);
    const kerf = Math.max(0, Number(spacingEl.value) || 0);
    const trim = Math.max(0, Number(trimEl.value) || 0);
    if (!sheetW || !sheetH || sheetW <= 2 * trim || sheetH <= 2 * trim) {
      window.alert("Enter sheet dimensions larger than the edge trim.");
      return;
    }
    if (!pieces.length) {
      window.alert("Add at least one piece first.");
      return;
    }

    lastLayout = {
      ...optimizeSheetLayout(pieces, {
        sheetW,
        sheetH,
        kerf,
        trim,
        allowRotation: rotationEl.checked,
      }),
      sheetW,
      sheetH,
      trim,
    };
    if (lastLayout.unplaceable.length) {
      const sizes = [...new Set(lastLayout.unplaceable.map((piece) => `${piece.width}×${piece.height}`))];
      window.alert(`These pieces do not fit on the usable sheet area:\n${sizes.join("\n")}`);
    }
    drawSheetLayout(canvas, lastLayout.sheets, sheetW, sheetH, trim);
    const stats = calculateLayoutStats(lastLayout.sheets, sheetW, sheetH);
    sheetCountEl.textContent = String(stats.sheetCount);
    efficiencyEl.textContent = `${stats.efficiency.toFixed(1)}%`;
    wasteEl.textContent = `${stats.waste.toFixed(1)}%`;
  });

  window.addEventListener("resize", () => {
    if (lastLayout) {
      drawSheetLayout(
        canvas,
        lastLayout.sheets,
        lastLayout.sheetW,
        lastLayout.sheetH,
        lastLayout.trim
      );
    }
  });
}

if (typeof document !== "undefined" && document.getElementById("packer-canvas")) {
  initializeStandaloneOptimizer();
}
