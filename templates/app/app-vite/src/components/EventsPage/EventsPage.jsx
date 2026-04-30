import { useState, useEffect } from "react";
import EventList from "../EventList/EventList.jsx";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [sortOrder, setSortOrder] = useState("date-asc");

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

      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="date-asc">Date: Soonest first </option>
        <option value="date-desc">Date: Latest first </option>
        <option value="Name-asc">Name: A-Z </option>
        <option value="Price-desc">Price:Low to High</option>
        <option value="Price-asc">Price:High to Low</option>
      </select>

      <EventList events={events} sortOrder={sortOrder} />
    </div>
  );
};

export default EventsPage;
