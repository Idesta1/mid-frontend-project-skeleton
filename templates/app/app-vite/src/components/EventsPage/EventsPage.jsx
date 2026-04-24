import { useState } from "react";
import EventSortControl from "../EventSortControl.jsx";
import EventList from "../EventList/EventList.jsx";

export default function EventsPage() {
  const [sortBy, setSortBy] = useState("date-asc");

  return (
    <section>
      <EventSortControl sortBy={sortBy} onSortChange={setSortBy} />
      <EventList sortBy={sortBy} />
    </section>
  );
}
