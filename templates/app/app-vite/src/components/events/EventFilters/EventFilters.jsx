import "../EventsCard/EventSortControl.css";

export default function EventSortControl({ sortBy, onSortChange }) {
  const handleSortChange = (event) => {
    onSortChange(event.target.value);
  };

  return (
    <div className="event-sort-control">
      <label htmlFor="sort-by">Sort by:</label>
      <select id="sort-by" value={sortBy} onChange={handleSortChange}>
        <option value="date-asc">Date: soonest first</option>
        <option value="date-desc">Date: latest first</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
        <option value="name-asc">Name: A-Z</option>
      </select>
    </div>
  );
}
