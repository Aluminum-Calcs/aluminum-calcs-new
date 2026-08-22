import { CheckProfilePrice } from "../global.js";

export default function calculateSliding(input, width = 0, height = 0) {
  const w = Number(width) || 0;
  const h = Number(height) || 0;
  const rows = [];
  const profile = (label, key, length, qty = 1) => ({
    label,
    value: length,
    qty,
    price: CheckProfilePrice(key, length) * qty,
    category: "profile",
  });

  if (input === "width") {
    const track = w;
    const top = (track - 166) / 2;
    const gw = top + 18;
    rows.push(
      {
        ...profile("Track", "track", track, 2),
      },
      profile("Top", "top", top, 2),
      { 
        label: "Glass Width",
        value: gw,
      }
    );
  } else if (input === "height") {
    const jamb = h - 23;
    const lobster = jamb - 27;
    const gh = lobster - 80;
    rows.push(
      { 
        ...profile("Side Jamb", "sideJamb", jamb, 2),
      },
      profile("Lock Stile", "lockStile", lobster, 2),
      profile("Interlock", "interlock", lobster, 1),
      { 
        label: "Glass Height",
        value: gh,
      }
    );
  } else {
    const track = w;
    const jamb = h - 23;
    const lobster = jamb - 27;
    const top = (track - 166) / 2;
    const gw = top + 18;
    const gh = lobster - 80;
    rows.push(
      {
        ...profile("Track", "track", track, 2),
      },
      profile("Side Jamb", "sideJamb", jamb, 2),
      profile("Lock Stile", "lockStile", lobster, 2),
      profile("Interlock", "interlock", lobster, 1),
      profile("Top", "top", top, 2),
      {
        label: "Glass Height",
        value: gh,
      },
      {
        label: "Glass Width",
        value: gw,
      },
    );
  }

  return rows;
}
