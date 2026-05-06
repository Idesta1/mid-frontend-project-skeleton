import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  const { cartItems, removeItem, updateCartItem } = useCart();
  const { user } = useAuth();
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="cart-page">
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <span className="cart-item-name">{item.name}</span>
                <div className="cart-item-controls">
                  <button
                    onClick={() => updateCartItem(item.id, item.quantity - 1)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity">{item.quantity}</span>
                  <button
                    onClick={() => updateCartItem(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="cart-total">Total: ${total.toFixed(2)}</p>
          {user ? (
            <Link to="/checkout" className="btn-checkout">
              Proceed to Checkout
            </Link>
          ) : (
            <div className="cart-guest-prompt">
              <p>You must be logged in to checkout, or continue as guest.</p>
              <div className="cart-guest-buttons">
                <Link to="/login" className="btn-guest">
                  Login &amp; Checkout
                </Link>
                <Link to="/checkout" className="btn-guest">
                  Continue as Guest
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
