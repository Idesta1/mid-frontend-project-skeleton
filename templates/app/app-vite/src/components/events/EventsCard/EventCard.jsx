import "./EventCard.css";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext.jsx";
import art_exi from "../../../assets/art_exi.jpg";
import community_event from "../../../assets/community_event.jpg";
import community_music from "../../../assets/community_music.jpg";
import concert_so from "../../../assets/concert_so.jpg";
import concert_xo from "../../../assets/concert_xo.jpg";
import conference_1 from "../../../assets/conference_1.jpg";
import conference_2 from "../../../assets/conference_2.jpg";
import dance_party from "../../../assets/dance_party.jpg";
import dating_cozy from "../../../assets/dating_cozy.jpg";
import disco from "../../../assets/disco.jpg";
import food_exo from "../../../assets/food_exo.jpg";
import outdoor_gather from "../../../assets/outdoor-gather.jpg";
import sport_bike from "../../../assets/sport_bike.jpg";
import sport_community from "../../../assets/sport-community.jpg";
import sport_golf from "../../../assets/sport_golf.jpg";
import women_volleyball from "../../../assets/women_volleyball.jpg";
import youth_gather from "../../../assets/youth_gather.jpg";

const imageMap = {
  "art_exi.jpg": art_exi,
  "community_event.jpg": community_event,
  "community_music.jpg": community_music,
  "concert_so.jpg": concert_so,
  "concert_xo.jpg": concert_xo,
  "conference_1.jpg": conference_1,
  "conference_2.jpg": conference_2,
  "dance_party.jpg": dance_party,
  "dating_cozy.jpg": dating_cozy,
  "disco.jpg": disco,
  "food_exo.jpg": food_exo,
  "outdoor-gather.jpg": outdoor_gather,
  "sport_bike.jpg": sport_bike,
  "sport-community.jpg": sport_community,
  "sport_golf.jpg": sport_golf,
  "women_volleyball.jpg": women_volleyball,
  "youth_gather.jpg": youth_gather,
};

const defaultEventImages = [
  art_exi,
  conference_2,
  community_music,
  conference_1,
  conference_2,
  dance_party,
  sport_bike,
  sport_golf,
  community_event,
  sport_community,
  women_volleyball,
  outdoor_gather,
  concert_so,
  concert_xo,
  dating_cozy,
  disco,
  food_exo,
  youth_gather,
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
        Learn more <span aria-hidden="true">&#8594;</span>
      </Link>
    </div>
  );
};

export default EventCard;
