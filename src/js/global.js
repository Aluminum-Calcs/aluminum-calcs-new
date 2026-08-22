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
  _ifyPipe: 8500,
  
  _width: 14000,
  _height: 14000,
  _decurve: 18000,
  _netFrame_top: 17000,
  _netFrame_bottom: 17000,
  _molium: 20500,
  
  _track: 13000,
  _sideJamb: 9500,
  _interlock: 9500,
  _lockStile: 9500,
  _top: 9500,
  
  _transom: 27500,
  _structural: 14500,
  _moto_netTrack_top: 8000,
  _moto_netTrack_bottom: 8000,
  
  _4040_angle: 13000,
  _25mm_stainless_pipe: 6000,
  _25mm_galvanizer_pipe: 4600,
};

export const ACCESSORIES_PRICES = {
  _metal_roller: null,
  _sliding_key: 1500, // null
  
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

};

export function CheckProfilePrice(profile = '', length=null) {
  profile = profile?.toLowerCase().replace(' ', '_').replace('.', '_').padStart(profile.length + 1, '_');

  if (length) {
    return Math.round(((PROFILE_PRICES[profile] * length) / 5800) / 100) * 100;
  }

  return PROFILE_PRICES[profile];
  // return profile;
}

export function CheckGlassSheetPrice(thickness, color) {
  let query = `_${thickness}_${color}`;
  return GLASS_PRICES[query];
}

export function CheckAccessoriesPrice(accessory) {
  accessory = accessory?.toLowerCase().replace(' ', '_').replace('.', '_').padStart(accessory.length + 1, '_');

  return ACCESSORIES_PRICES[accessory];
}

export function getWindowAccessories(windowType) {
  windowType = normalizeWindowType(windowType);
  let windowAccessories = [];

  windowAccessories.push(
    {
      label: 'O1 rubber',
      qty: 1,
      price: CheckAccessoriesPrice('o1 rubber'),
      category: 'accessory',
    },
  );

  if (windowType == 'sliding') {
    windowAccessories.push(
      {
        label: 'Key',
        qty: 2,
        price: CheckAccessoriesPrice('sliding key'),
        category: 'accessory',
      },
      {
        label: 'Rubber Roller',
        qty: 2,
        price: CheckAccessoriesPrice('rubber roller'),
        category: 'accessory',
      },
      {
        label: 'Key',
        qty: 2,
        price: CheckAccessoriesPrice('sliding key'),
        category: 'accessory',
      },
    );
  } else if (windowType == 'casement') {
    windowAccessories.push(
      {
        label: 'Handle',
        qty: 1,
        price: CheckAccessoriesPrice('casement handle'),
        category: 'accessory',
      },
      {
        label: 'Hinges',
        qty: 2,
        price: CheckAccessoriesPrice('casement_inner_hinges'),
        category: 'accessory',
      },
      {
        label: 'Stopper',
        qty: 1,
        price: CheckAccessoriesPrice('stopper'),
        category: 'accessory',
      },
    );
  }

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


