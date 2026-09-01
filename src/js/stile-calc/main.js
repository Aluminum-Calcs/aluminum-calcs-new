import calculateCasement from "./casement.js";
import calculateFrameless from "./frameless.js";
import calculateSliding from "./sliding.js";

export function normalizeWindowType(windowType) {
  return windowType?.toString().replace(/-window$/i, "").toLowerCase() || "";
}

function normalizeSashes(sashes) {
  if (typeof sashes === "number") return sashes;
  if (typeof sashes === "string") {
    const numeric = Number(sashes);
    if (!Number.isNaN(numeric)) return numeric;

    const map = {
      one: 1,
      two: 2,
    };

    return map[sashes.toLowerCase()] ?? null;
  }
  return null;
}

export function computeResult(input = "all", windowType, sashes, width = 0, height = 0) {
  const normalizedType = normalizeWindowType(windowType);
  const sashCount = normalizeSashes(sashes);
  const parsedWidth = Number(width) || 0;
  const parsedHeight = Number(height) || 0;

  if (normalizedType === "sliding") return calculateSliding({
    inputType: input,
    sashCount: sashCount,
    width: parsedWidth,
    height: parsedHeight,
  });
  if (normalizedType === "casement") return calculateCasement({
    inputType: input,
    sashCount: sashCount,
    width: parsedWidth,
    height: parsedHeight,
  });
  if (normalizedType === "frameless") return calculateFrameless({
    inputType: input,
    sashCount: sashCount,
    width: parsedWidth,
    height: parsedHeight,
  });
  return [];
}
