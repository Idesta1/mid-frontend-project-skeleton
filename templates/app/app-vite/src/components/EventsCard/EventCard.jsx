import "./EventCard.css";

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
        {event.price === 0 ? "Free" : `€${event.price}`}
      </p>
      <p className="event-availability">
        {event.ticketsAvailable === 0
          ? "Sold out"
          : `${event.ticketsAvailable} tickets left`}
      </p>
      <button type="button" disabled={event.ticketsAvailable === 0}>
        {event.ticketsAvailable === 0 ? "Sold out" : "Buy ticket"}
      </button>
    </li>
  );
}

export default EventCard;
