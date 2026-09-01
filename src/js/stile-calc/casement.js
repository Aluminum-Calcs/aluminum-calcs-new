import { CheckProfilePrice} from "../global.js";

export default function calculateCasement({
  input,
  sashCount = 1,
  width = 0,
  height = 0
}) {
  const w = Number(width) || 0;
  const h = Number(height) || 0;
  const rows = [];
  const widthPrice = CheckProfilePrice('width')
  const heightPrice = CheckProfilePrice('height')
  const moliumPrice = CheckProfilePrice('molium')
  const netFramePrice = CheckProfilePrice('netFrame_top')

  if (input === "width") {
    const in_w = sashCount === 1 ? w - 70 : (w - (70+((sashCount-1)*40))) / sashCount;
    const gw = in_w - 130;
    rows.push(
      {
        label: "Width",
        qty: 2,
        value: w,
        price: CheckProfilePrice('width', w),
        category: 'profile',
      },
      {
        label: "Inner Width",
        qty: sashCount * 2,
        value: in_w,
        price: CheckProfilePrice('decurve', in_w),
        category: 'profile',
      },
      {
        label: "Glass Width",
        value: gw, price: 0
      },
    );
    if (sashCount === 2) {
      rows.push({
        label: "Molium Placement",
        value: (w - 42) / 2,
        category: 'position'
      });
    }
  } else if (input === "height") {
    const in_h = h - 70;
    const gh = in_h - 130;
    rows.push(
      { 
        label: "Height",
        qty: 2,
        value: h,
        price: CheckProfilePrice('height', h),
        category: 'profile',
      },
      { 
        label: "Inner Height",
        qty: sashCount * 2,
        value: in_h,
        price: CheckProfilePrice('height', in_h),
        category: 'profile',
      },
      { 
        label: "Glass Height",
        value: gh,
      }
    );
    if (sashCount === 2) {
      rows.push({
        label: "Molium height",
        value: h - 60,
        price: CheckProfilePrice('molium', (h-60)),
        category: 'profile',
      });
    }
  } else {
    const in_h = h - 70;
    const in_w = sashCount === 1 ? w - 70 : (w - (70+((sashCount-1)*40))) / sashCount;
    const gh = in_h - 130;
    const gw = in_w - 130;
    rows.push(
      {
        label: "Width",
        qty: 2,
        value: w,
        price: CheckProfilePrice('width', w),
        category: 'profile',
      },
      {
        label: "Inner Width",
        value: in_w,
        qty: sashCount * 2,
        price: CheckProfilePrice('decurve', in_w) ,
        category: 'profile',
      },
      {
        label: "Glass Width",
        value: gw,
      },
      {
        label: "Height",
        qty: 2,
        value: h,
        price: CheckProfilePrice('height', h),
        category: 'profile',
      },
      {
        label: "Inner Height",
        qty: sashCount * 2,
        value: in_h,
        price: CheckProfilePrice('decurve', in_h),
        category: 'profile',
      },
      {
        label: "Glass Height",
        value: gh,
      },
    );
    if (sashCount === 2) {
      rows.push(
        {
          label: "Molium height",
          value: h - 60,
          price: CheckProfilePrice('molium', (h-60)),
          category: 'profile',
        },
        {
          label: "Molium Placement",
          value: (w - 42) / 2,
        }
      );
    }
  }

  return rows;
}
