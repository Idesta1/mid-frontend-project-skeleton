import events from "../../data/events.js";
import EventCard from "../EventsCard/EventCard.jsx";
import { useState, useEffect } from "react";
import "./EventList.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API}/events`);
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Events</h1>

      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        events.map((event) => (
          <div key={event.id}>
            <h3>{event.name}</h3>
            <p>{event.date}</p>
            <p>{event.time}</p>
          </div>
        ))
      )}
    </div>
  );

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
  }
};

export default Events;
