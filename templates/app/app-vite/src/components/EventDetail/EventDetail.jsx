import "./EventDetail.css";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext.jsx";
import api from "../../api";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const { addItem } = useCart();

  useEffect(() => {
    // Fetch event details based on the id
    const fetchEvent = async () => {
      try {
        setError("");
        const response = await fetch(api(`/events/${id}`));

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setError("We could not load this event right now.");
      }
    };

    fetchEvent();
  }, [id]);

  if (error) {
    return (
      <section className="event-detail-page">
        <p>{error}</p>
        <Link to="/events">Back to events</Link>
      </section>
    );
  }

  if (!event) {
    return <p>Loading...</p>;
  }

  const hasImage = Boolean(event.image);

  return (
    <section className="event-detail-page">
      <header className="event-detail-header">
        <p className="event-detail-category">{event.category}</p>
        <h1>{event.name}</h1>
      </header>

      <div className="event-detail-image">
        {hasImage ? (
          <img src={event.image} alt={event.name} />
        ) : (
          <div className="event-detail-image-fallback">
            <h2>{event.name}</h2>
            <p>{event.city}</p>
          </div>
        )}
      </div>

      <div className="event-detail-content">
        <aside className="event-detail-meta">
          <p>
            <strong>Date:</strong> {event.date}
          </p>
          <p>
            <strong>Time:</strong> {event.time}
          </p>
          <p>
            <strong>Location:</strong> {event.venue}, {event.city}
          </p>
          <p>
            <strong>Price:</strong>{" "}
            {event.price === 0 ? "Free" : `$${event.price}`}
          </p>
          <p>
            <strong>Availability:</strong> {event.ticketsAvailable} of{" "}
            {event.totalTickets} tickets left
          </p>
        </aside>

        <article className="event-detail-description">
          <h2>About this event</h2>
          <p>{event.description}</p>
          <button onClick={() => addItem(event)}>Add to Cart</button>
        </article>
      </div>
    </section>
  );
};

export default EventDetail;
