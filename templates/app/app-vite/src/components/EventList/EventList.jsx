import events from "../../data/events.js";
import EventCard from "../EventsCard/EventCard.jsx";
import "./EventList.css";



function EventList() {
  return (
    <ul className="event-list-grid">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </ul>
  );
}

export default EventList;
