import "./EventCard.css";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext.jsx";
import art_exi from "../../../assets/art_exi.jpg";
import conference_2 from "../../../assets/conference_2.jpg";
import community_music from "../../../assets/community_music.jpg";
import conference_1 from "../../../assets/conference_1.jpg";
import dance_party from "../../../assets/dance_party.jpg";
import sport_golf from "../../../assets/sport_golf.jpg";
import community_event from "../../../assets/community_event.jpg";
import sport_community from "../../../assets/sport-community.jpg";
import women_volleyball from "../../../assets/women_volleyball.jpg";
import outdoor_gather from "../../../assets/outdoor-gather.jpg";

const imageMap = {
  "art_exi.jpg": art_exi,
  "conference_2.jpg": conference_2,
  "community_music.jpg": community_music,
  "conference_1.jpg": conference_1,
  "dance_party.jpg": dance_party,
  "sport_golf.jpg": sport_golf,
  "community_event.jpg": community_event,
  "sport-community.jpg": sport_community,
  "women_volleyball.jpg": women_volleyball,
  "outdoor-gather.jpg": outdoor_gather,
};

const defaultEventImages = [
  art_exi,
  conference_2,
  community_music,
  conference_1,
  dance_party,
  sport_golf,
  community_event,
  sport_community,
  women_volleyball,
  outdoor_gather,
];

const EventCard = ({ event }) => {
  const { addItem, cartLocked } = useCart();
  const fallbackImage =
    defaultEventImages[(Number(event.id) - 1) % defaultEventImages.length];
  const eventImage = imageMap[event.image] || fallbackImage;

  return (
    <div className="event-card">
      <img src={eventImage} alt={event.name} className="event-image" />
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
      <button
        type="button"
        disabled={event.ticketsAvailable === 0 || cartLocked}
        onClick={() => addItem(event)}
      >
        {event.ticketsAvailable === 0
          ? "Sold out"
          : cartLocked
            ? "Order placed"
            : "Get Ticket"}
      </button>
      <Link to={`/events/${event.id}`} className="learn-more-link">
        <button type="button">Learn more</button>
      </Link>
    </div>
  );
};

export default EventCard;
