import { CheckProfilePrice } from "../global.js";

export default function calculateFrameless(input, sash = 1, width = 0, height = 0, matterTransom = false) {
  const w = Number(width) || 0;
  const h = Number(height) || 0;
  const rows = [];
  const th = matterTransom ? h - 110 : h;
  const in_w = sash === 1 ? w - 40 : (w - 60) / 2;
  const in_h = th - 85;
  const gw = in_w - 20;
  const gh = in_h - 15;

  const profile = (label, key, length, qty = 1) => ({
    label,
    value: length,
    qty,
    price: CheckProfilePrice(key, length) * qty,
    category: "profile",
  });

  if (input === "width") {
    rows.push(
      profile("Width", "width", w, 2),
      profile("Inner Width", "width", in_w, sash * 2),
      { label: "Glass Width", value: gw, price: "--" }
    );
    if (sash === 2) {
      rows.push({ label: "Molium Placement", value: (w - 55) / 2 });
    }
  } else if (input === "height") {
    rows.push(
      profile("Height", "height", th, 2),
      profile("Inner Height", "height", in_h, sash * 2),
      { label: "Glass Height", value: gh, price: "--" }
    );
    if (sash === 2) {
      rows.push(profile("Molium height", "molium", th - 110));
    }
  } else {
    rows.push(
      profile("Width", "width", w, 2),
      profile("Inner Width", "width", in_w, sash * 2),
      { label: "Glass Width", value: gw, price: "--" },
      profile("Height", "height", th, 2),
      profile("Inner Height", "height", in_h, sash * 2),
      { label: "Glass Height", value: gh, price: "--" }
    );
    if (sash === 2) {
      rows.push(
        profile("Molium height", "molium", th - 110),
        { label: "Molium Placement", value: (w - 55) / 2 }
      );
    }
  }

  return rows;
}
