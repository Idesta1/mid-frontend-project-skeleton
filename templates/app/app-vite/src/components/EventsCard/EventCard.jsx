import "./EventCard.css";
import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <li className="event-card">
      <h2>{event.name}</h2>
      <p>
        {event.date} at {event.time}
      </p>
      <p>
        {event.venue}, {event.city}
      </p>
      <p className="event-category">{event.category}</p>
      <p className="event-price">
        {event.price === 0 ? "Free" : `$${event.price}`}
      </p>
      <p className="event-availability">
        {event.ticketsAvailable === 0
          ? "Sold out"
          : `${event.ticketsAvailable} tickets left`}
      </p>
      <button type="button" disabled={event.ticketsAvailable === 0}>
        {event.ticketsAvailable === 0 ? "Sold out" : "Get ticket"}
      </button>
      <Link to={`/events/${event.id}`} className="learn-more-link">
        <button type="button">Learn more</button>
      </Link>
    </li>
  );
}

export default EventCard;
