import styles from "./HomePage.module.css";
import Button from "../../components/common/Button/Button.jsx";
import CategoryList from "../../components/common/CategoryList/CategoryList.jsx";
import image from "../../assets/Event home.jpg";
import { useState, useEffect } from "react";
import EventCard from "../../components/events/EventsCard/EventCard.jsx";

function Homepage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const trendingEvents = events.slice(0, 3);
  const upcomingEvents = events.slice(3, 6);

  return (
    <main className={styles.homepage}>
      <section className={styles.hero}>
        <p>DISCOVER EVENTS</p>
        <h1>Find your next experience</h1>
        <p>Browse trending event,workshop, and meetups happening near you.</p>
        <Button>Explore Events</Button>
      </section>

      <section className={styles.heroImage}>
        <img src={image} alt="Hero Image" />
      </section>

      <CategoryList />

      <section className={styles.trendingGrid}>
        <h2>Trending Events</h2>

        {loading ? (
          <p>Loading events...</p>
        ) : (
          <div className={styles.eventCards}>
            {trendingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {/* Trending Event cards will go here */}
      </section>

      <section className={styles.upcomingGrid}>
        <h2>Upcoming Events near you</h2>

        {loading ? (
          <p>Loading events...</p>
        ) : (
          <div className={styles.eventCards}>
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      <section className={styles.createEvent}>
        <p>Create an event and invite others to join.</p>

        <Button>Create Event</Button>
      </section>
    </main>
  );
}

export default Homepage;
