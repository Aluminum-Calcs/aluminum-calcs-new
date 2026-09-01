import { normalizeWindowType } from "./stile-calc/main.js";

export const GLASS_PRICES = {
  _4mm_blue: 90000,
  _5mm_blue: 120000,
  
  _4mm_black: 100000,
  _5mm_black: 120000,
};

export const PROFILE_PRICES = {
  _divider: null,
  _1132: 3600,
  _ify_pipe: 8500,
  
  _width: 14000,
  _height: 14000,
  _decurve: 18000,
  _netFrame_top: 17000,
  _netFrame_bottom: 17000,
  _molium: 20500,
  
  _track: 13000,
  _side_jamb: 9500,
  _interlock: 9500,
  _lock_stile: 9500,
  _top: 9500,
  
  _transom: 27500,
  _structural: 14500,
  _moto_netTrack_top: 8000,
  _moto_netTrack_bottom: 8000,
  
  _4040_angle: 13000,
  _25mm_stainless_pipe: 6000,
  _25mm_galvanized_pipe: 4600,
  _16mm_rod: 10000,
};

export const ACCESSORIES_PRICES = {
  _metal_roller: null,
  _sliding_key: 1500, // null
  _frameless_handle: null,
  
  _30m_net: 9500,
  _net_angle: 3000,
  _netHandle: 1000,
  
  _coupling_screw: 3000,
  _4mm_screw: 1300,
  
  _o1_rubber: 700,
  _net_rubber: 700,
  _structural_rubber: 2000,

  _rubber_roller: 1000,
  _weather_strip: 7000,
  _stopper: 700,
  _projector: 3000,
  _casement_handle: 1800,
  _casement_inner_hinges: 900,


  _3_5mm_bit: 200,
  _30mm_bit: 3000,

  _4040_angle: PROFILE_PRICES['_4040_angle'],
  _25mm_stainless_pipe: PROFILE_PRICES['_25mm_stainless_pipe'],
  _25mm_galvanized_pipe: PROFILE_PRICES['_25mm_galvanized_pipe'],
  _16mm_rod: PROFILE_PRICES['_16mm_rod'],
  _ify_pipe: PROFILE_PRICES['_ify_pipe'],
};

export function CheckProfilePrice(profile = '', length=null) {
  profile = profile?.toLowerCase().replaceAll(' ', '_').replaceAll('.', '_').padStart(profile.length + 1, '_');
  const profileKey = Object.keys(PROFILE_PRICES).find(
    (key) => key.toLowerCase() === profile,
  );

  if (length) {
    return Math.round(((PROFILE_PRICES[profileKey] * length) / 5800) / 100) * 100;
  }

  return PROFILE_PRICES[profileKey];
  // return profile;
}

export function CheckGlassSheetPrice(thickness, color) {
  let query = `_${thickness.toLowerCase()}_${color.toLowerCase()}`;
  return GLASS_PRICES[query];
}

export function CheckAccessoriesPrice(accessory) {
  accessory = accessory?.toLowerCase().replaceAll(' ', '_').replace('.', '_').padStart(accessory.length + 1, '_');

  return ACCESSORIES_PRICES[accessory];
}

export function getWindowAccessories(values) {
  let { windowType, accessories } = values;

  windowType = normalizeWindowType(windowType);
  let windowAccessories = [];


  if (windowType == 'sliding') {
    windowAccessories.push(
      {
        label: 'Coupling Screws',
        qty: 8 + (values.sashCount * 4),
        price: Math.round((CheckAccessoriesPrice('coupling screw') / 100) /15) * 15,
        category: "accessory",
      },
      {
        label: 'O1 rubber',
        qty: 1,
        price: CheckAccessoriesPrice('o1 rubber'),
        category: 'accessory',
      },
      {
        label: 'Key',
        qty: values.sashCount >= 2?2:1,
        price: (CheckAccessoriesPrice('sliding key') / 2),
        category: 'accessory',
      },
      {
        label: 'Rubber Roller',
        qty: 2 * values.sashCount,
        price: (CheckAccessoriesPrice('rubber roller') / 4),
        category: 'accessory',
      },
    );
  } else if (windowType == 'casement') {
    windowAccessories.push(
      {
        label: 'Screws',
        qty: 8 + ((12 + 4) * values.sashCount),
        price: roundUp((CheckAccessoriesPrice('4mm screw') / 100), 15),
        category: "accessory",
      },
      {
        label: 'O1 rubber',
        qty: 1,
        price: CheckAccessoriesPrice('o1 rubber'),
        category: 'accessory',
      },
      {
        label: 'Handle',
        qty: 1 * values.sashCount,
        price: CheckAccessoriesPrice('casement handle'),
        category: 'accessory',
      },
      {
        label: 'Hinges',
        qty: 2 * values.sashCount,
        price: CheckAccessoriesPrice('casement_inner_hinges'),
        category: 'accessory',
      },
      {
        label: 'Stopper',
        qty: 1 * values.sashCount,
        price: CheckAccessoriesPrice('stopper'),
        category: 'accessory',
      },
    );
  } else if (windowType == 'frameless') {
    windowAccessories.push(
      {
        label: 'Screws',
        qty: 32,
        price: Math.round((CheckAccessoriesPrice('4mm screw') / 100) /15) * 15,
        category: "accessory",
      },
      {
        label: '40-40 angle',
        qty: 10,
        price: Math.round(((35 * CheckAccessoriesPrice('4040 angle')) / 6000) / 100) * 100,
        category: 'accessory',
      },
      {
        label: 'Structural glazing rubber',
        qty: 1,
        price: CheckAccessoriesPrice('structural rubber'),
        category: 'accessory',
      },
      {
        label: 'Handle',
        qty: 1,
        price: CheckAccessoriesPrice('casement handle'),
        category: 'accessory',
      },
      {
        label: 'Projector',
        qty: 2,
        price: CheckAccessoriesPrice('projector'),
        category: 'accessory',
      },
    );
  }
  accessories && accessories.forEach(acc => {
    if (acc == '30m net') {
      windowAccessories.push(
        {
          label: 'Net',
          qty: 1,
          price: roundUp((CheckAccessoriesPrice('30m net') * ((values.width >= values.height ? values.width: values.height) / 100)) / 300),
          category: "accesory",
        }
      );
    } else if (acc == "25mm stainless pipe") {
      windowAccessories.push(
        {
          label: '25mm Stainless Pipe',
          qty: Math.ceil(values.height / 140),
          price: CheckProfilePrice('25mm stainless pipe', values.width),
          category: 'accessory',
        }
      );
    } else if (acc == "16mm rod") {
      windowAccessories.push(
        {
          label: '16mm rod',
          qty: Math.ceil(values.height / 140),
          price: CheckProfilePrice('16mm rod', values.width),
          category: 'accessory',
        }
      );
    } else {
      windowAccessories.push(
        {
          label: acc,
          qty: 1,
          price: CheckAccessoriesPrice(acc) ?? 0,
          category: "accessory",
        }
      )
    }
  })

  return windowAccessories;
}



/* Object structure 
  {
    label,
    qty,
    unitPrice,
    price,
    category, // "glass", "profile", "accessory", "labour"
    details
  }
*/

export function roundUp(value, to=100) {
  return Math.round((value) / to) * to;
}


