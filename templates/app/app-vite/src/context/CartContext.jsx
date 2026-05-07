import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  function addItem(event) {
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
    const updated = cartItems.filter((item) => item.id !== eventId);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  }

  function updateCartItem(eventId, quantity) {
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

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        updateCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
