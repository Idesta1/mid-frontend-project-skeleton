import styles from "./HomePage.module.css";
import Button from "../../components/common/Button/Button.jsx";
import image from "../../assets/disco.jpg";
import { useState, useEffect } from "react";
import EventCard from "../../components/events/EventsCard/EventCard.jsx";
import CategoryList from "../../components/common/CategoryList/CategoryList.jsx";

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
      <section className={styles.hero} aria-labelledby="home-hero-title">
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Discover events</p>
          <h1 id="home-hero-title" className={styles.heroTitle}>
            Find your next experience
          </h1>
          <p className={styles.heroDescription}>
            Browse trending events, workshops, and meetups happening near you.
          </p>
          <div className={styles.heroActions}>
            <Button>Explore Events</Button>
            <Button>Create Event</Button>
          </div>
        </div>
      </section>

      <section className={styles.heroImage} aria-label="Featured event imagery">
        <img src={image} alt="Featured event and community gathering" />
      </section>

      <section className={styles.categories}>
        <CategoryList />
      </section>

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
    </main>
  );
}

export default Homepage;
