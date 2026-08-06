import { STANDARD_HEIGHT_MM, STANDARD_WIDTH_MM } from "./constants.js";

export function calculateGlassPrice(values) {
  const width = Number(values.width);
  const height = Number(values.height);
  const quantity = Number(values.quantity);
  const fullSheetPrice = Number(values.fullSheetPrice);

  const widthScale = STANDARD_WIDTH_MM / width;
  const heightScale = STANDARD_HEIGHT_MM / height;
  const scale = Math.max(1, Math.floor(widthScale * heightScale));

  const perSheetCost = Math.ceil(fullSheetPrice / scale);
  const totalPrice = perSheetCost * quantity;

  return {
    sizeLabel: `${width} × ${height}`,
    scale,
    perSheetCost,
    totalPrice,
    quantity
  };
}

export function buildGlassEntry({ id, values, calculation }) {
  return {
    id,
    size: `${values.width} × ${values.height}`,
    qty: Number(values.quantity),
    per: calculation.perSheetCost,
    price: calculation.totalPrice,
  };
}
