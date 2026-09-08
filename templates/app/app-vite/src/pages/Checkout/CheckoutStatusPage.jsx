import { Link, useLocation } from "react-router-dom";

export default function CheckoutStatusPage() {
  const { state } = useLocation();

  const status = state?.status || "error";
  const message =
    state?.message || "Something went wrong while processing your order.";
  const orderId = state?.orderId;
  const customer = state?.customer;

  const isSuccess = status === "success";
  const isForbidden = status === "forbidden";

  return (
    <section style={{ maxWidth: "640px", margin: "2rem auto" }}>
      <h1>{isSuccess ? "Order Confirmed" : "Checkout Status"}</h1>

      <p style={{ color: isSuccess ? "green" : "red" }}>{message}</p>

      {orderId && (
        <p>
          <strong>Order reference:</strong> #{orderId}
        </p>
      )}

      {customer && (
        <div
          style={{
            border: "1px solid #eee",
            borderRadius: "8px",
            padding: "1rem",
            marginTop: "1rem",
          }}
        >
          <h2>Customer Information</h2>
          <p>
            <strong>Full name:</strong> {customer.fullName}
          </p>
          <p>
            <strong>Address:</strong> {customer.address}
          </p>
          <p>
            <strong>City:</strong> {customer.city}
          </p>
          <p>
            <strong>Zipcode:</strong> {customer.zipcode}
          </p>
          <p>
            <strong>Card number:</strong> {customer.maskedCardNumber}
          </p>
          <p>
            <strong>Expiration:</strong> {customer.expiry}
          </p>
          <p>
            <strong>CVV:</strong> Not shown for security.
          </p>
        </div>
      )}

      <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
        {isSuccess && <Link to="/account">Go to my account</Link>}
        {isForbidden && <Link to="/login">Login again</Link>}
        <Link to="/events">Browse events</Link>
      </div>
    </section>
  );
}
