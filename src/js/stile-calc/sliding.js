export default function calculateSliding(input, width = 0, height = 0) {
  const w = Number(width) || 0;
  const h = Number(height) || 0;
  const rows = [];

  if (input === "width") {
    const track = w;
    const top = (track - 166) / 2;
    const gw = top + 18;
    rows.push(
      {
        label: "Track",
        value: track,
        price: "--",
        category: "profile"
      },
      { 
        label: "Top",
        value: top,
        price: "--",
        category: "profile"
      },
      { 
        label: "Glass Width",
        value: gw,
        price: "--"
      }
    );
  } else if (input === "height") {
    const jamb = h - 23;
    const lobster = jamb - 27;
    const gh = lobster - 80;
    rows.push(
      { 
        label: "Side Jamb",
        value: jamb,
        price: "...",
        category: "profile"
      },
      { 
        label: "Lock Stile",
        value: lobster,
        price: "--",
        category: "profile"
      },
      { 
        label: "Interlock",
        value: lobster,
        price: "--",
        category: "profile"
      },
      { 
        label: "Glass Height",
        value: gh,
        price: "--"
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
        label: "Track",
        value: track,
        price: "--",
        category: "profile" 
      },
      {
        label: "Side Jamb",
        value: jamb,
        price: "...",
        category: "profile" 
      },
      {
        label: "Lock Stile",
        value: lobster,
        price: "--",
        category: "profile" 
      },
      {
        label: "Interlock",
        value: lobster,
        price: "--",
        category: "profile" 
      },
      {
        label: "Top",
        value: top,
        price: "--",
        category: "profile" 
      },
      {
        label: "Glass Height",
        value: gh,
        price: "--" 
      },
      {
        label: "Glass Width",
        value: gw,
        price: "--"
      },
    );
  }

  return rows;
}
