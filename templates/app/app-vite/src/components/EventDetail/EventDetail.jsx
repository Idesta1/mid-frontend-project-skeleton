import events from "../../data/events.js";
import "./EventDetail.css";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function EventDetail() {
  const { id } = useParams();
  const selectedEvent = events.find((event) => event.id === Number(id));
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  if (!selectedEvent) {
    return (
      <section className="event-detail-page">
        <p>Event not found.</p>
      </section>
    );
  }

  return (
    <article className="event-detail-page">
      <header className="event-detail-header">
        <p className="event-detail-category">{selectedEvent.category}</p>
        <h1>{selectedEvent.name}</h1>
      </header>

      <section className="event-detail-content">
        <aside className="event-detail-meta" aria-label="Event info">
          <p>
            <strong>Date:</strong> {selectedEvent.date}
          </p>
          <p>
            <strong>Time:</strong> {selectedEvent.time}
          </p>
          <p>
            <strong>Venue:</strong> {selectedEvent.venue}
          </p>
          <p>
            <strong>City:</strong> {selectedEvent.city}
          </p>
        </aside>
        <div>
          <label htmlFor="quantity">Tickets</label>
          <input
            id="quantity"
            type="number"
            min={1}
            max={selectedEvent.ticketsAvailable}
            value={quantity}
            onChange={handleQuantityChange}
          />
          <p>
            Total:{" "}
            {selectedEvent.price === 0
              ? "Free"
              : `$${selectedEvent.price * quantity}`}
          </p>
        </div>

        <div className="event-detail-image">
          <img src={selectedEvent.image} alt={selectedEvent.name} />
        </div>

        <section className="event-detail-description" aria-label="Description">
          <h2>About this event</h2>
          <p>{selectedEvent.description}</p>
        </section>
      </section>
    </article>
  );
}
