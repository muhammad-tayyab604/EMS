import React, { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import EventModal from "../components/EventModal";
import { fetchOrganizerEvents } from "../../../../slices/eventSlice";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookedEventModal from "../components/BookedEventModal";

const BookedEvents = () => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); // State to hold selected event
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.organizerEvents);
  const eventStatus = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);

  useEffect(() => {
    dispatch(fetchOrganizerEvents());
    console.log("Total events", events.length);
  }, [dispatch]);

  // Date formatting function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
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

  // Function to handle opening modal and passing data
  const handleViewEvent = (event) => {
    setSelectedEvent(event); // Set selected event data
    setModalShow(true); // Open modal
  };

  // Check loading and error states
  if (eventStatus === "loading") {
    return <Skeleton height={"40px"} count={7} />;
  }

  if (eventStatus === "failed") {
    return <p>Error: {error}</p>;
  }

  // Render content when events are available
  return (
    <>
      <ToastContainer />
      <div className="">
        <h1>Booked Events</h1>
      </div>
      <div className="d-flex justify-content-end mt-5 mb-4">
        <BookedEventModal
          heading={"Detailed View"}
          show={modalShow}
          onHide={() => setModalShow(false)}
          data={selectedEvent} // Pass selected event data to modal
        />
      </div>
      {events && events.length > 0 ? (
        <table className="table">
          <thead className="thead-light bg-body-tertiary">
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Venue</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                {event.status === "paid" && (
                  <>
                    <td>
                      <Image
                        src={`http://localhost:8000/${event.image}`}
                        roundedCircle
                        width={"50px"}
                        height={"50px"}
                      />
                    </td>
                    <td>{event.title}</td>
                    <td>{event.description}</td>
                    <td>{formatDate(event.date)}</td>
                    <td>
                      {formatTime(event.startTime)} TO{" "}
                      {formatTime(event.endTime)}
                    </td>
                    <td>{event.venue}</td>
                    <td>{event.price}</td>
                    <td className="text-success">{event.status}</td>
                    <td style={{ height: "100%" }} className="">
                      <FaEye
                        style={{ cursor: "pointer", marginRight: "12px" }}
                        size={25}
                        color="green"
                        onClick={() => handleViewEvent(event)} // Pass event to handleViewEvent
                      />
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ fontSize: "3rem", color: "gray", textAlign: "center" }}>
          No events found or they are not paid
        </p>
      )}
    </>
  );
};

export default BookedEvents;
