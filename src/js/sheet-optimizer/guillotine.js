// Guillotine sheet packer: Best Area Fit, split on the shorter leftover axis.
//
// Every placement only creates edge-to-edge cuts, so any layout it returns can
// be made on a shear, a panel saw, or by scoring and snapping glass.
// (MaxRects, which the old version used, can't promise that.)
//
// Kerf trick: each piece takes (w + kerf) x (h + kerf) of space, and the usable
// area is grown by one kerf. That way the last piece in a row or column does
// not pay for a cut that never happens.

export function packGuillotine(pieces, opts) {
  const { sheetW, sheetH, kerf = 0, trim = 0 } = opts;

  const usableW = sheetW - 2 * trim;
  const usableH = sheetH - 2 * trim;

  // Largest pieces first gives much better results for guillotine packing.
  const items = pieces
    .map((p, i) => ({ ...p, id: i }))
    .sort(
      (a, b) =>
        b.width * b.height - a.width * a.height ||
        Math.max(b.width, b.height) - Math.max(a.width, a.height)
    );

  const sheets = [];
  const unplaceable = [];

  for (const item of items) {
    const orients = [{ w: item.width, h: item.height, rotated: false }];
    if (item.canRotate && item.width !== item.height) {
      orients.push({ w: item.height, h: item.width, rotated: true });
    }

    // Drop orientations that can never fit on an empty sheet.
    const possible = orients.filter((o) => o.w <= usableW && o.h <= usableH);
    if (possible.length === 0) {
      unplaceable.push(item);
      continue;
    }

    // Fill existing sheets first, open a new one only when nothing fits.
    let placed = false;
    for (const sheet of sheets) {
      if (tryPlace(sheet, item, possible, kerf, trim)) {
        placed = true;
        break;
      }
    }
    if (!placed) {
      const sheet = {
        placements: [],
        free: [{ x: 0, y: 0, w: usableW + kerf, h: usableH + kerf }],
      };
      sheets.push(sheet);
      tryPlace(sheet, item, possible, kerf, trim);
    }
  }

  // Whatever is left in the free list is the offcut. Every free rectangle
  // carries one kerf on its right/bottom edge (a real cut line, or the virtual
  // kerf added to the usable area), so the real material is kerf smaller.
  for (const sheet of sheets) {
    sheet.offcuts = sheet.free
      .map((f) => ({
        x: trim + f.x,
        y: trim + f.y,
        width: f.w - kerf,
        height: f.h - kerf,
      }))
      .filter((r) => r.width > 0 && r.height > 0);
  }

  return { sheets, unplaceable };
}

function tryPlace(sheet, item, orients, kerf, trim) {
  let best = null;

  sheet.free.forEach((f, index) => {
    for (const o of orients) {
      const pw = o.w + kerf;
      const ph = o.h + kerf;
      if (pw > f.w || ph > f.h) continue;

      const leftover = f.w * f.h - pw * ph; // best area fit
      const shortSide = Math.min(f.w - pw, f.h - ph); // tie-breaker

      if (
        !best ||
        leftover < best.leftover ||
        (leftover === best.leftover && shortSide < best.shortSide)
      ) {
        best = { index, o, leftover, shortSide };
      }
    }
  });

  if (!best) return false;

  const f = sheet.free[best.index];
  const { o } = best;
  const pw = o.w + kerf;
  const ph = o.h + kerf;

  sheet.placements.push({
    x: trim + f.x,
    y: trim + f.y,
    width: o.w,
    height: o.h,
    rotated: o.rotated,
    ref: item.ref,
  });

  // Guillotine split: one full-length cut divides the leftover into two rects.
  const splitHorizontal = f.w - pw <= f.h - ph;
  let right, bottom;

  if (splitHorizontal) {
    // cut runs across the full width of the free rect
    bottom = { x: f.x, y: f.y + ph, w: f.w, h: f.h - ph };
    right = { x: f.x + pw, y: f.y, w: f.w - pw, h: ph };
  } else {
    // cut runs down the full height of the free rect
    bottom = { x: f.x, y: f.y + ph, w: pw, h: f.h - ph };
    right = { x: f.x + pw, y: f.y, w: f.w - pw, h: f.h };
  }

  sheet.free.splice(best.index, 1);
  for (const r of [right, bottom]) {
    if (r.w > 0 && r.h > 0) sheet.free.push(r);
  }

  return true;
}