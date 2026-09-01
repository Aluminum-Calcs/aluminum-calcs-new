import { computeResult } from '../stile-calc/main.js';
import { calculateGlassPrice } from '../glass-price/calculation.js';
import { CheckGlassSheetPrice, getWindowAccessories } from '../global.js';

export function getQuotationTotals(values) {
  const breakdown = computeResult('all', values.windowType, values.sashCount, values.width, values.height);

  const profiles = breakdown.filter((entry) => entry.category === 'profile');
  const profilesTotal = profiles.reduce((total, profile) => total + (profile.price * profile.qty), 0);


  const glassCalculation = calculateGlassPrice({
    width: values.width,
    height: values.height,
    quantity: 1,
    fullSheetPrice: CheckGlassSheetPrice(values.glassThickness, values.glassColor),
  });
  const glassPrice = glassCalculation.totalPrice;
  const glassTotal = values.sashCount * glassPrice;


  const accessories = getWindowAccessories(values);
  const accessoriesTotal = accessories.reduce(
    (total, accessory) => total + (accessory.qty * accessory.price), 0);
  const subTotal = profilesTotal + glassTotal + accessoriesTotal;

  return {
    profiles,
    profilesTotal,
    glassPrice,
    glassTotal,
    accessories,
    accessoriesTotal,
    subTotal,
    total: subTotal,
  };
}