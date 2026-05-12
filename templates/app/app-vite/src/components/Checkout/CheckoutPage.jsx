import { useState } from "react";
import { useCart } from "../../context/CartContext.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../api";

export default function CheckoutPage() {
  const { cartItems, cartLocked, lastOrderId, markOrderCreated } = useCart();
  const { token, user } = useAuth();

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  async function handlePlaceOrder() {
    if (!token || !user) {
      setError("You must be logged in to place an order.");
      return;
    }

    try {
      setIsPlacingOrder(true);
      setError("");
      setSuccess("");

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

      const createdOrder = await response.json();
      markOrderCreated(createdOrder);
      setSuccess("Order placed successfully.");
    } catch (error) {
      setError(error.message || "An error occurred while placing your order");
    } finally {
      setIsPlacingOrder(false);
    }
  }

  if (!token || !user) {
    return (
      <section>
        <h1>Checkout</h1>
        <p>You must be logged in to place an order.</p>
        <Link to="/login">Login</Link>
      </section>
    );
  }

  if (cartLocked) {
    return (
      <section>
        <h1>Checkout</h1>
        <p>
          {success || "Your order has been created and your cart is locked."}
        </p>
        {lastOrderId && <p>Order reference: #{lastOrderId}</p>}
        <Link to="/account">Go to my account</Link>
      </section>
    );
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
      {success && <p style={{ color: "green" }}>{success}</p>}

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
