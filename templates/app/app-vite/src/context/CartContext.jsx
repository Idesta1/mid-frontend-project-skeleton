import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });
  const [cartLocked, setCartLocked] = useState(() => {
    return localStorage.getItem("cartLocked") === "true";
  });
  const [lastOrderId, setLastOrderId] = useState(() => {
    return localStorage.getItem("lastOrderId") || "";
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cartLocked", JSON.stringify(cartLocked));
  }, [cartLocked]);

  useEffect(() => {
    if (lastOrderId) {
      localStorage.setItem("lastOrderId", lastOrderId);
      return;
    }

    localStorage.removeItem("lastOrderId");
  }, [lastOrderId]);

  function addItem(event) {
    if (cartLocked) return;

    const existing = cartItems.find((item) => item.id === event.id);
    let updated;
    if (existing) {
      updated = cartItems.map((item) =>
        item.id === event.id ? { ...item, quantity: item.quantity + 1 } : item,
      );
    } else {
      updated = [...cartItems, { ...event, quantity: 1 }];
    }
    setCartItems(updated);
  }

  function removeItem(eventId) {
    if (cartLocked) return;

    const updated = cartItems.filter((item) => item.id !== eventId);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  }

  function updateCartItem(eventId, quantity) {
    if (cartLocked) return;

    if (quantity < 1) {
      removeItem(eventId);
      return;
    }

    const updated = cartItems.map((item) =>
      item.id === eventId ? { ...item, quantity } : item,
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  }

  function clearCart() {
    setCartItems([]);
    localStorage.removeItem("cart");
  }

  function markOrderCreated(order) {
    clearCart();
    setCartLocked(true);
    setLastOrderId(order?.id ? String(order.id) : "");
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartLocked,
        lastOrderId,
        addItem,
        removeItem,
        updateCartItem,
        clearCart,
        markOrderCreated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
