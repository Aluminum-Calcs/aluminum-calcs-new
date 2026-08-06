import calculateSliding from "../stile-calc/sliding.js";
import calculateCasement from "../stile-calc/casement.js";
import calculateFrameless from "../stile-calc/frameless.js";
import { calculateGlassPrice } from "../glass-price/calculation.js";

import { GLASS_PRICES } from "../global.js";


function calcWindowPrice({
  windowType,
  width,
  height,
  innerWidth,
  innerHeight,
  sashCount = 2,
  matterTransom = true,
  includeNet = false,
  includeAccessories = true,
  includeProtector = false,
  includeProctectorRod = false,

  includeGlass = true,
  glassThickness = '4mm',
  glassColor = 'blue',
}) {
  if (innerWidth || innerHeight) {
    //Depending on type of window
    // width = ;
  }

  let sliding = windowType === 'sliding';
  let casement = windowType === 'casement';
  let frameless = windowType === 'frameless';
  let priceList = [];

  if (sliding) {
    if (width && height) {
      priceList = calculateSliding(windowType, width, height);
    } else return 'Width and Height Fields required';

  } else if (casement || frameless) {
    if (width && height && sashCount) {
      priceList = casement
        ? calculateCasement(windowType, sashCount, width, height)
        : calculateFrameless(windowType, sashCount, width, height, matterTransom);
    } else return 'Width, Height, and No of sashes fields required';
  }
  
  includeAccessories && (priceList = priceList.concat(addAcessories({
    windowType,
    includeNet,
    includeProtector,
    includeProctectorRod,
    sashCount,
  })));

  if (includeGlass) {
    let glassPrice = calculateGlassPrice({
      width,
      height,
      quantity: sashCount,
      fullSheetPrice : GLASS_PRICES[`_${glassThickness}_${glassColor}`]
    });
    priceList.push({
      label: `${glassThickness} ${glassColor} Glass (${glassPrice.sizeLabel})`,
      qty: glassPrice.quantity,
      price: glassPrice.totalPrice,
      details: glassPrice
    })
  }

  return priceList;
}


console.log(calcWindowPrice({
  windowType: 'sliding',
  width: 1200,
  height: 900,
  includeNet: true,
  includeProtector: true,
}));

// calculateGlassPrice({})

function addAcessories({
  windowType,
  includeNet,
  includeProtector,
  includeProctectorRod,
  sashCount,
}) {
  let rows = [];
  
  if (windowType == 'sliding') {
    rows.push(
      { label: '4mm Long Screws', qty: 16, price: 500 },
      { label: 'Key', qty: 2, price: 1500 },
      { label: 'Roller', qty: 2, price: 500 },
      { label: 'Weather Strip', price: 1000 },
    );
    if (includeNet) rows.push(
      { label: '1132/Net Profile', price: 3500 },
      { label: 'Net', qty: '2 meters', price: 2000 },
    );
    if (includeProtector) rows.push(
      { label: 'Pipe', price: 7000 },
    );
    if (includeProctectorRod) rows.push(
      { label: 'Protector Rod', value: null, price: 7000 },
    );
  }

  if (windowType == 'casement') {
    rows.push(
      { label: '40-40 Angles', qty: (sashCount * 8) + 4, price: (sashCount * 200) },
      { label: 'Handle', qty: sashCount, price: sashCount * 1000 },
      { label: 'Hinges' , qty: sashCount * 2, price: sashCount * 700 },
      { label: '4mm short screw', qty: (sashCount * 12) + 8, price: sashCount * 500 },
      { label: 'Stopper', qty: sashCount, price: sashCount * 2 },
      { label: 'Weather Strip', price: 1000 },
    );
  }

  return rows;
}