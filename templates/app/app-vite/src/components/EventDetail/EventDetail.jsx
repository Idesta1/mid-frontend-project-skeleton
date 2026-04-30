import "./EventDetail.css";
import { useParams } from "react-router-dom";
import { useState } from "react";

const EventDetail = ({ event }) => {
  return (
    <div>
      <h2>{event.name}</h2>
      <p>{event.date}</p>
      <p>{event.description}</p>
    </div>
  );
};

export default EventDetail;
