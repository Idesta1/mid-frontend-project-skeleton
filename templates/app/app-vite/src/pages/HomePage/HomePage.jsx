import styles from "./HomePage.module.css";
import Button from "../../components/common/Button/Button.jsx";
import image from "../../assets/Event home.jpg";
import { useState, useEffect } from "react";

function Homepage() {
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

      <section className={styles.categories}>
        {/* Categories will go here */}
      </section>

      <section className={styles.TrendingEvents}>
        <h2>Trending Events</h2>

        {/* Trending Event cards will go here */}
      </section>

      <section className={styles.upcoming}>
        <h2>Upcoming Events near you</h2>

        {/* Event list will go here */}
      </section>

      <section className={styles.createEvent}>
        <p>Create an event and invite others to join.</p>

        <Button>Create Event</Button>
      </section>
    </main>
  );
}

export default Homepage;
