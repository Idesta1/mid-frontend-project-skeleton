import "./EventCard.css";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div>
      <h3>{event.name}</h3>
      <p>{event.date}</p>
      <p>{event.time}</p>
    </div>
  );
};

export default EventCard;
