import events from "../../data/events.js";
import EventCard from "../EventsCard/EventCard.jsx";
import "./EventList.css";

function EventList({ sortBy }) {
  const sorted = [...events].sort((a, b) => {
    if (sortBy === "date-asc") {
      return new Date(a.date) - new Date(b.date);
    }
    if (sortBy === "date-desc") {
      return new Date(b.date) - new Date(a.date);
    }
    if (sortBy === "price-asc") {
      return a.price - b.price;
    }
    if (sortBy === "price-desc") {
      return b.price - a.price;
    }
    if (sortBy === "name-asc") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  return (
    <ul className="event-list-grid">
      {sorted.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </ul>
  );
}

export default EventList;
