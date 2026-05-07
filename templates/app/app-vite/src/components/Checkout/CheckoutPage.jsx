import { useState } from "react";
import { useCart } from "../../context/CartContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../api";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState("");

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  async function handlePlaceOrder() {
    try {
      setIsPlacingOrder(true);
      setError("");

      const response = await fetch(api("/orders"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartItems,
          total,
          status: "pending",
          createdAt: new Date().toISOString(),
          email: user?.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not place order");
      }

      await response.json();
      clearCart();
      navigate("/events");
    } catch (error) {
      setError(error.message || "An error occurred while placing your order");
    } finally {
      setIsPlacingOrder(false);
    }
  }

  if (cartItems.length === 0) {
    return (
      <section>
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
        <Link to="/events">Browse events</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Checkout</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity} - $
            {(item.price * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>
      <p>Total: ${total.toFixed(2)}</p>

      <button onClick={handlePlaceOrder} disabled={isPlacingOrder}>
        {isPlacingOrder ? "Placing order..." : "Place Order"}
      </button>
    </section>
  );
}
