import React from "react";
import "./EventsCard.css";
import { Link } from "react-router-dom";

const EventsCard = ({ id, img, title, description }) => {
  return (
    <div className="card h-100 hover-zoom">
      <div className="bg-image">
        <Link to={`/events/${id}`}>
          <img
            className="card-img-top img-fluid"
            style={{ objectFit: "cover", height: "200px" }}
            src={img}
            alt={title}
          />
        </Link>
      </div>
      <div className="card-body">
        <Link
          to={`/events/${id}`}
          className="card-title text-decoration-none font-weight-bolder"
        >
          <h3>{title}</h3>
        </Link>
        <hr />
        <p className="card-text">{description}</p>
        <Link to={`/events/${id}`} className="btn btn-success">
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default EventsCard;
