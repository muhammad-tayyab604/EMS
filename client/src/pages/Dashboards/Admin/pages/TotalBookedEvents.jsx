import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, fetchUserEvents } from "../../../../slices/eventSlice";
import { Link } from "react-router-dom";
import FeedbackModal from "../components/FeedbackModal";
import Skeleton from "react-loading-skeleton";
import { FaEye } from "react-icons/fa";
import { Image } from "react-bootstrap";

const TotalEvents = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const status = useSelector((state) => state.events.status);

  useEffect(() => {
    dispatch(fetchEvents());
    console.log(events);
  }, [dispatch]);

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

  return (
    <div>
      <h1>Total Booked Events</h1>

      {status === "loading" ? (
        <div
          style={{ width: "50vw" }}
          className="d-flex gap-5 ml-4 align-items-center"
        >
          <div className="">
            <Skeleton height={"300px"} count={10} />
          </div>
        </div>
      ) : status === "failed" ? (
        <p>Failed to fetch events.</p>
      ) : (
        <table className="table">
          <thead className="thead-light bg-body-tertiary">
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Date</th>
              <th scope="col">Start/End Time</th>
              <th scope="col">Address</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          {events.map((event) => (
            <tbody>
              <tr
                style={{
                  overflowX: "scroll",
                }}
              >
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
                    <td>{event.category}</td>
                    <td className="text-success">{event.status}</td>
                  </>
                )}
              </tr>
            </tbody>
          ))}
        </table>
      )}
    </div>
  );
};

export default TotalEvents;
