import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import EventList from "../EventList/EventList.jsx";
import api from "../../api.js";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const search = searchParams.get("q") || "";
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 6);
  const sortBy = searchParams.get("sort") || "date-asc";

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalCount / limit));
  }, [totalCount, limit]);

  const updateParams = (updates) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      const isEmpty = value === "" || value === null || value === undefined;

      if (isEmpty) {
        next.delete(key);
      } else {
        next.set(key, String(value));
      }
    });

    setSearchParams(next);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const query = new URLSearchParams();
        if (search.trim()) query.set("q", search.trim());
        query.set("_page", String(page));
        query.set("_limit", String(limit));

        const res = await fetch(api(`/events?${query.toString()}`));
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();
        const counterHeader = res.headers.get("X-Total-Count");

        setEvents(data);
        setTotalCount(counterHeader ? Number(counterHeader) : data.length);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to fetch events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [search, page, limit, sortBy]);

  const handleSearchChange = (e) => {
    updateParams({ q: e.target.value, page: 1 });
  };

  const handlePageChange = (newPage) => {
    updateParams({ page: newPage });
  };

  const handleSortChange = (e) => {
    updateParams({ sort: e.target.value });
  };

  const goPrev = () => {
    if (page > 1) {
      handlePageChange(page - 1);
    }
  };

  const goNext = () => {
    if (page < totalPages) {
      handlePageChange(page + 1);
    }
  };

  return (
    <div>
      <h1>Events</h1>

      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={handleSearchChange}
      />

      <select value={sortBy} onChange={handleSortChange}>
        <option value="date-asc">Date: Soonest first </option>
        <option value="date-desc">Date: Latest first </option>
        <option value="name-asc">Name: A-Z </option>
        <option value="price-asc">Price:Low to High</option>
        <option value="price-desc">Price:High to Low</option>
      </select>

      {loading && <p>Loading events...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && <EventList events={events} sortBy={sortBy} />}

      <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
        <button type="button" onClick={goPrev} disabled={page <= 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button type="button" onClick={goNext} disabled={page >= totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default EventsPage;
