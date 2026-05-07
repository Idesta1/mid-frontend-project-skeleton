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

    fetchOrders();
  }, [token]);

  return (
    <section>
      <h1>My Account</h1>
      <p>
        Logged in as: <strong>{user?.email}</strong>
      </p>

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
          }}
        >
          <p>
            <strong>Order #{order.id}</strong> —{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <p>Status: {order.status}</p>
          <ul>
            {order.items?.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity}
              </li>
            ))}
          </ul>
          <p>Total: ${order.total?.toFixed(2)}</p>
        </div>
      ))}
    </section>
  );
}
