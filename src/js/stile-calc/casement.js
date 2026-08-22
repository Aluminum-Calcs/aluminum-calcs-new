import { CheckProfilePrice} from "../global.js";

export default function calculateCasement(input, sash = 1, width = 0, height = 0) {
  const w = Number(width) || 0;
  const h = Number(height) || 0;
  const rows = [];
  const widthPrice = CheckProfilePrice('width')
  const heightPrice = CheckProfilePrice('height')
  const moliumPrice = CheckProfilePrice('molium')
  const netFramePrice = CheckProfilePrice('netFrame_top')

  if (input === "width") {
    const in_w = sash === 1 ? w - 70 : (w - 110) / 2;
    const gw = in_w - 130;
    rows.push(
      {
        label: "Width",
        qty: 2,
        value: w,
        price: CheckProfilePrice('width'),
        category: 'profile',
      },
      {
        label: "Inner Width",
        qty: sash * 2,
        value: in_w,
        price: "--",
        category: 'profile',
      },
      {
        label: "Glass Width",
        value: gw, price: "--"
      },
    );
    if (sash === 2) {
      rows.push({
        label: "Molium Placement",
        value: (w - 42) / 2,
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
        qty: sash * 2,
        value: in_h,
        price: CheckProfilePrice('height', in_h),
        category: 'profile',
      },
      { 
        label: "Glass Height",
        value: gh,
      }
    );
    if (sash === 2) {
      rows.push({
        label: "Molium height",
        value: h - 60,
        price: CheckProfilePrice('molium', (h-60)),
        category: 'profile',
      });
    }
  } else {
    const in_h = h - 70;
    const in_w = sash === 1 ? w - 70 : (w - 110) / 2;
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
        qty: sash * 2,
        price: CheckProfilePrice('width', in_w) ,
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
        qty: sash * 2,
        value: in_h,
        price: CheckProfilePrice('height', in_h),
        category: 'profile',
      },
      {
        label: "Glass Height",
        value: gh,
      },
    );
    if (sash === 2) {
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
