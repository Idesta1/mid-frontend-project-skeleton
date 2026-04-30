import "./EventCard.css";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="event-grid">
      <div className="event-card">
        <h3>{event.name}</h3>
        <p>
          {event.date} at {event.time}
        </p>
        <p className="meta">
          {event.venue}, {event.city}
        </p>
        <h4 className="event-category">{event.category}</h4>
        <h4 className="event-price ">
          {event.price === 0 ? "Free" : `$${event.price}`}
        </h4>
        <h5 className="event-availability">
          {event.ticketsAvailable} Tickets left
        </h5>
        <button type="button" disabled={event.ticketsAvailable === 0}>
          {event.ticketsAvailable === 0 ? "Sold out" : "Get Ticket"}
        </button>
        <Link to={`/events/${event.id}`} className="learn-more-link">
          <button type="button">Learn more</button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
