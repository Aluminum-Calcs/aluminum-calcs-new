export default function calculateFrameless(input, sash = 1, width = 0, height = 0, matterTransom = false) {
  const w = Number(width) || 0;
  const h = Number(height) || 0;
  const rows = [];
  const th = matterTransom ? h - 110 : h;
  const in_w = sash === 1 ? w - 40 : (w - 60) / 2;
  const in_h = th - 85;
  const gw = in_w - 20;
  const gh = in_h - 15;

  if (input === "width") {
    rows.push(
      { label: "Width", value: w, price: "--" , category: 'profile',},
      { label: "Inner Width", value: in_w, price: "--" , category: 'profile',},
      { label: "Glass Width", value: gw, price: "--" }
    );
    if (sash === 2) {
      rows.push({ label: "Molium Placement", value: (w - 55) / 2, price: "--" });
    }
  } else if (input === "height") {
    rows.push(
      { label: "Height", value: th, price: "..." , category: 'profile',},
      { label: "Inner Height", value: in_h, price: "--" , category: 'profile',},
      { label: "Glass Height", value: gh, price: "--" }
    );
    if (sash === 2) {
      rows.push({ label: "Molium height", value: th - 110, price: "--" , category: 'profile',});
    }
  } else {
    rows.push(
      { label: "Width", value: w, price: "--" , category: 'profile',},
      { label: "Inner Width", value: in_w, price: "--" , category: 'profile',},
      { label: "Glass Width", value: gw, price: "--" },
      { label: "Height", value: th, price: "..." , category: 'profile',},
      { label: "Inner Height", value: in_h, price: "--" , category: 'profile',},
      { label: "Glass Height", value: gh, price: "--" }
    );
    if (sash === 2) {
      rows.push(
        { label: "Molium height", value: th - 110, price: "--" , category: 'profile',},
        { label: "Molium Placement", value: (w - 55) / 2, price: "--" }
      );
    }
  }

  return rows;
}
