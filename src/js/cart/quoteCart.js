
const CART_STORAGE_KEY = "SIC-cart-data";

export function addQuoteToCart(
  values,
  total,
  subtotal = total,
  discount = 0
) {
  let storedData = null;

  try {
    storedData = JSON.parse(
      localStorage.getItem(CART_STORAGE_KEY) || "null"
    );
  } catch {
    storedData = null;
  }

  const cartInfo = storedData?.[0] || { current: 0 };

  const carts = Array.isArray(storedData?.[1]) && storedData[1].length
    ? storedData[1]
    : [{ name: "Cart 0", id: 0, items: [] }];

  const currentCartId = Number.isInteger(cartInfo.current)
    ? cartInfo.current
    : 0;

  const cart =
    carts.find((entry) => entry.id === currentCartId) || carts[0];

  const item = {
    name: `${(values.windowType || "window").replaceAll("-", " ")} (${values.width} x ${values.height} mm)`,
    price: total,
    qty: 1,

    details: {
      ...values,
      subtotal,
      discount,
      total,
    },
  };

  cart.items = [...(cart.items || []), item];

  cartInfo.current = cart.id;

  localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify([cartInfo, carts])
  );

  return item;
}
