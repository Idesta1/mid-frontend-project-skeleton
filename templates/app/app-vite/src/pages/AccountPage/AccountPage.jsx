import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../api.js";

export default function AccountPage() {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(api("/orders"), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Could not load orders");

        const data = await response.json();
        setOrders(data);
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

    fetchOrders();
  }, [token]);

  // Aggregate all tickets from all orders
  const allTickets = orders.flatMap((order) =>
    (order.items || []).map((item) => ({
      ...item,
      orderId: order.id,
      orderStatus: order.status,
      orderDate: order.createdAt,
    })),
  );

  return (
    <section style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1>My Account</h1>
      <p>
        Logged in as: <strong>{user?.email}</strong>
      </p>

      {/* View My Tickets Section */}
      <div style={{ marginBottom: "3rem" }}>
        <h2>My Tickets</h2>
        {loading && <p>Loading tickets...</p>}
        {!loading && allTickets.length === 0 && (
          <p>
            You have no tickets yet. <Link to="/events">Browse events</Link>
          </p>
        )}
        {allTickets.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "1rem",
            }}
          >
            {allTickets.map((ticket, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid #ddd",
                  padding: "1rem",
                  borderRadius: "8px",
                  backgroundColor: "#f0f8ff",
                }}
              >
                <p style={{ margin: "0.5rem 0", fontWeight: "bold" }}>
                  {ticket.name}
                </p>
                <p style={{ margin: "0.25rem 0", fontSize: "0.9rem" }}>
                  Qty: <strong>{ticket.quantity}</strong>
                </p>
                {ticket.date && (
                  <p style={{ margin: "0.25rem 0", fontSize: "0.9rem" }}>
                    {ticket.date}
                  </p>
                )}
                <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.85rem" }}>
                  <small>
                    Order <strong>#{ticket.orderId}</strong> • Status:{" "}
                    <strong>{ticket.orderStatus}</strong>
                  </small>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Orders Section */}
      <div>
        <h2>My Orders</h2>

        {loading && <p>Loading orders...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && orders.length === 0 && (
          <p>
            You have no orders yet. <Link to="/events">Browse events</Link>
          </p>
        )}

        {orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid #eee",
              padding: "1rem",
              marginBottom: "1rem",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <div>
              <p style={{ margin: "0.5rem 0" }}>
                <strong>Order #{order.id}</strong> —{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p style={{ margin: "0.5rem 0" }}>Status: {order.status}</p>
              <ul style={{ margin: "0.5rem 0" }}>
                {order.items?.map((item) => (
                  <li key={item.id}>
                    {item.name} x {item.quantity}
                  </li>
                ))}
              </ul>
              <p style={{ margin: "0.5rem 0" }}>
                Total: <strong>${order.total?.toFixed(2)}</strong>
              </p>
            </div>
            <Link
              to={`/account/orders/${order.id}`}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#007bff",
                color: "white",
                borderRadius: "4px",
                textDecoration: "none",
                height: "fit-content",
              }}
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
