import { useState } from "react";
import { useCart } from "../../context/CartContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../api";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const { cartItems, cartLocked, lastOrderId, markOrderCreated } = useCart();
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  function maskCard(number) {
    const digits = number.replace(/\D/g, "");
    const last4 = digits.slice(-4);
    return `**** **** **** ${last4}`;
  }

  async function handlePlaceOrder() {
    if (!token || !user) {
      navigate("/checkout/status", {
        state: {
          status: "forbidden",
          message: "You must be logged in to place an order.",
        },
      });
      return;
    }

    if (
      !fullName.trim() ||
      !address.trim() ||
      !city.trim() ||
      !zipcode.trim() ||
      !cardNumber.trim() ||
      !expiry.trim() ||
      !cvv.trim()
    ) {
      setError("Please complete all payment fields.");
      return;
    }

    const normalizedCard = cardNumber.replace(/\D/g, "");
    if (normalizedCard.length < 12) {
      setError("Please enter a valid card number.");
      return;
    }

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
          customerName: fullName,
          payment: {
            cardLast4: normalizedCard.slice(-4),
            expiry,
          },
        }),
      });

      if (response.status === 403) {
        navigate("/checkout/status", {
          state: {
            status: "forbidden",
            message:
              "Your session is not authorized for placing this order. Please login again.",
          },
        });
        return;
      }

      if (!response.ok) {
        throw new Error("Could not place order");
      }

      const createdOrder = await response.json();
      markOrderCreated(createdOrder);
      navigate("/checkout/status", {
        state: {
          status: "success",
          message: "Order placed successfully.",
          orderId: createdOrder?.id || lastOrderId,
          customer: {
            fullName: fullName.trim(),
            address: address.trim(),
            city: city.trim(),
            zipcode: zipcode.trim(),
            maskedCardNumber: maskCard(cardNumber),
            expiry,
          },
        },
      });
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
        <p>Your order has been created and your cart is locked.</p>
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
    <section className="checkout-page">
      <div className="checkout-card">
        <h1>Checkout</h1>
        {error && <p className="checkout-error">{error}</p>}

        <ul className="checkout-items">
          {cartItems.map((item) => (
            <li key={item.id}>
              <span>{item.name}</span>
              <span>
                x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <p className="checkout-total">Total: ${total.toFixed(2)}</p>

        <div className="checkout-form-grid">
          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            autoComplete="cc-name"
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            autoComplete="street-address"
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            autoComplete="address-level2"
          />
          <input
            type="text"
            placeholder="Card number"
            value={cardNumber}
            onChange={(event) => setCardNumber(event.target.value)}
            autoComplete="cc-number"
            inputMode="numeric"
          />

          <div className="checkout-compact-row">
            <input
              type="text"
              className="checkout-small"
              placeholder="Zip"
              value={zipcode}
              onChange={(event) => setZipcode(event.target.value)}
              autoComplete="postal-code"
            />
            <input
              type="text"
              className="checkout-small"
              placeholder="MM/YY"
              value={expiry}
              onChange={(event) => setExpiry(event.target.value)}
              autoComplete="cc-exp"
            />
            <input
              type="password"
              className="checkout-small"
              placeholder="CVV"
              value={cvv}
              onChange={(event) => setCvv(event.target.value)}
              autoComplete="cc-csc"
              inputMode="numeric"
            />
          </div>
        </div>

        <button
          className="checkout-submit"
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder}
        >
          {isPlacingOrder ? "Placing order..." : "Place Order"}
        </button>
      </div>
    </section>
  );
}
