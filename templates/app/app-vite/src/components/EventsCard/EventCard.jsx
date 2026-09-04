import "./EventCard.css";

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h3>{event.name}</h3>
      <p>
        {event.date} at {event.time}
      </p>
      <p className="meta">
        {event.venue}, {event.city}
      </p>
<<<<<<< HEAD
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
=======
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
>>>>>>> origin/main
  );
};

export default EventCard;
