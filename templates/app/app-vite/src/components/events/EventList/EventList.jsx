import EventCard from "../EventsCard/EventCard.jsx";
import "./EventList.css";

const EventList = ({ events = [], sortBy = "date-asc" }) => {
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
    if (sortBy === "name-desc") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  return (
    <div className="event-list-grid">
      {sorted.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
