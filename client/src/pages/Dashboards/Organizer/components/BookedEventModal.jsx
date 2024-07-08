import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const BookedEventModal = ({ heading, show, onHide, data }) => {
  const [imagePreview, setImagePreview] = useState("");
  useEffect(() => {
    if (data) {
      setImagePreview(`http://localhost:8000/${data.image}`);
    }
  }, [data]);
  if (!data) {
    return null; // Handle case where data is null or undefined
  }

  // Destructure necessary properties from data
  const {
    title,
    date,
    startTime,
    endTime,
    venue,
    price,
    category,
    description,
    attendees,
  } = data;
  const formatTime = (timeString) => {
    if (!timeString) {
      return ""; // Return an empty string or a placeholder if timeString is undefined
    }
    const [hours, minutes] = timeString.split(":");
    const hoursInt = parseInt(hours, 10);
    const ampm = hoursInt >= 12 ? "PM" : "AM";
    const formattedHours = hoursInt % 12 || 12; // Convert 0 to 12 for 12 AM
    return `${formattedHours}:${minutes} ${ampm}`;
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {imagePreview && (
          <LazyLoadImage
            src={imagePreview}
            width={"100%"}
            effect="blur"
            className="mt-3 mb-3"
            alt={data.title}
          />
        )}
        <div className="">
          <div className="mb-5">
            <h1>Event Details</h1>
            <h4>
              Title: <span className="text-secondary">{title}</span>
            </h4>
            <h4>
              Description: <span className="text-secondary">{description}</span>
            </h4>
            <h4>
              Date: <span className="text-secondary">{formatDate(date)}</span>
            </h4>
            <h4>
              Time:{" "}
              <span className="text-secondary">
                {formatTime(startTime)} TO {formatTime(endTime)}
              </span>
            </h4>
            <h4>
              Venue: <span className="text-secondary">{venue}</span>
            </h4>
            <h4>
              Price: <span className="text-secondary">{price}</span>
            </h4>
            <h4>
              Category: <span className="text-secondary">{category}</span>
            </h4>
          </div>
          <div className="">
            <h1>Booked Attendees</h1>
            {attendees.map((attendee) => (
              <>
                <h4>
                  Title:{" "}
                  <span className="text-secondary">{attendee.username}</span>
                </h4>
                <h4>
                  Description:{" "}
                  <span className="text-secondary">{attendee.email}</span>
                </h4>
                <h4>
                  Date: <span className="text-secondary">{attendee.phone}</span>
                </h4>
                <hr />
              </>
            ))}
          </div>
        </div>
        {/* Add more fields as needed */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookedEventModal;
