import events from "../../data/events.js";
import "./EventDetail.css";


// TODO: display at least date, time, venue, city, and description for one event
// TODO: use useParams() to get the event id from the URL
// TODO: fetch the event from GET /events/:id instead of using mock data

export default function EventDetail({ event }) {
  const selectedEvent = event ?? events[0];

  if (!selectedEvent) {
    return (
      <section className="event-detail-page">
        <p>No event selected.</p>
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
