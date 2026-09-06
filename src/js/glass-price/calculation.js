import { STANDARD_HEIGHT_MM, STANDARD_WIDTH_MM } from "./constants.js";
import { roundUp } from '../global.js';
import { validateForm } from './validation.js';

export function calculateGlassPrice(values) {
  const width = Number(values.width);
  const height = Number(values.height);
  const quantity = Number(values.quantity) ?? 1;
  const fullSheetPrice = Number(values.fullSheetPrice);

  const widthScale = STANDARD_WIDTH_MM / width;
  const heightScale = STANDARD_HEIGHT_MM / height;
  const scale = Math.max(1, Math.floor(widthScale * heightScale));

  const perSheetCost = Math.ceil(fullSheetPrice / scale);
  const totalPrice = perSheetCost * quantity;

  //Check if form is valid
  let formIsValid = validateForm(values) || null;

  return {
    sizeLabel: `${width} × ${height}`,
    scale,
    perSheetCost,
    totalPrice,
    quantity,

    //new properties
    price: roundUp(totalPrice),
    area: scale,
    unitPrice: roundUp(perSheetCost),
    color: values.glassColor? values.glassColor: null,
    thickness: values.glassThickness? values.glassThickness: null,
    allowance: values.allowance ? values.allowance : null,
    
    formIsValid,
  };
}

// console.log(calculateGlassPrice({
//   width: 375,
//   height: 1070,
//   quantity: 2,
//   fullSheetPrice: 90000,
// }))


/* feedback: {
  price,
  area,
  unitPrice,
  
  type,
  thickness,
  quantity,
  allowance,
  
  formIsValid,
}*/

export function buildGlassEntry({ id, values, calculation }) {
  return {
    id,
    size: `${values.width} × ${values.height}`,
    qty: Number(values.quantity),
    per: calculation.perSheetCost,
    price: calculation.totalPrice,
  };
}
