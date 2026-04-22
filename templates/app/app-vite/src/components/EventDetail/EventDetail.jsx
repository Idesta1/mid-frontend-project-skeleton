import events from "../../data/events.js";
import "./EventDetail.css";
import { useParams } from "react-router-dom";

export default function EventDetail() {
  const { id } = useParams();
  const selectedEvent = events.find((event) => event.id === Number(id));

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

        <section className="event-detail-description" aria-label="Description">
          <h2>About this event</h2>
          <p>{selectedEvent.description}</p>
        </section>
      </section>
    </article>
  );
}
