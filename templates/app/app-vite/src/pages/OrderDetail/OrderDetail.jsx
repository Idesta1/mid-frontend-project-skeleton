import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../api.js";

export default function OrderDetail() {
  const { orderId } = useParams();
  const { token } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await fetch(api(`/orders/${orderId}`), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Could not load order details");

        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (!token) {
      setLoading(false);
      return;
    }

    fetchOrder();
  }, [orderId, token]);

  if (loading) return <p>Loading order details...</p>;

  if (error)
    return (
      <section>
        <p style={{ color: "red" }}>{error}</p>
        <Link to="/account">Back to Account</Link>
      </section>
    );

  if (!order)
    return (
      <section>
        <p>Order not found.</p>
        <Link to="/account">Back to Account</Link>
      </section>
    );

  return (
    <section style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <h1>Order #{order.id}</h1>

      <div
        style={{
          border: "1px solid #eee",
          padding: "1.5rem",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <p>
          <strong>Date:</strong>{" "}
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            style={{
              textTransform: "capitalize",
              padding: "0.25rem 0.5rem",
              backgroundColor:
                order.status === "completed"
                  ? "#d4edda"
                  : order.status === "pending"
                    ? "#fff3cd"
                    : "#f8d7da",
              borderRadius: "4px",
            }}
          >
            {order.status}
          </span>
        </p>
        {order.email && (
          <p>
            <strong>Email:</strong> {order.email}
          </p>
        )}

        <h2 style={{ marginTop: "1.5rem" }}>Tickets</h2>
        {order.items && order.items.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {order.items.map((item, idx) => (
              <li
                key={idx}
                style={{
                  padding: "0.75rem",
                  marginBottom: "0.5rem",
                  backgroundColor: "#f9f9f9",
                  borderLeft: "4px solid #007bff",
                  borderRadius: "4px",
                }}
              >
                <p style={{ margin: "0.25rem 0" }}>
                  <strong>{item.name}</strong>
                </p>
                <p style={{ margin: "0.25rem 0", fontSize: "0.9rem" }}>
                  Quantity: {item.quantity}
                </p>
                {item.date && (
                  <p style={{ margin: "0.25rem 0", fontSize: "0.9rem" }}>
                    Event Date: {item.date}
                  </p>
                )}
                {item.price && (
                  <p style={{ margin: "0.25rem 0", fontSize: "0.9rem" }}>
                    Unit Price: ${item.price}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No items in this order.</p>
        )}

        <div
          style={{
            marginTop: "1.5rem",
            paddingTop: "1rem",
            borderTop: "2px solid #eee",
          }}
        >
          <p style={{ fontSize: "1.2rem" }}>
            <strong>Total: ${order.total?.toFixed(2)}</strong>
          </p>
        </div>
      </div>

      <Link to="/account">Back to Account</Link>
    </section>
  );
}
