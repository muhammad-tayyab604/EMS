import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserEvents } from "../../../../slices/eventSlice";
import { Link } from "react-router-dom";
import FeedbackModal from "../components/FeedbackModal";
import Skeleton from "react-loading-skeleton";

const MyEvents = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user._id); // Accessing user's _id from auth slice
  const events = useSelector((state) => state.events.events);
  const status = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);

  useEffect(() => {
    dispatch(fetchUserEvents(userId));
  }, [dispatch, userId]);

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

  const canGiveFeedback = (event) => {
    const eventEndTime = new Date(`${event.date}`);
    return new Date() > eventEndTime;
  };

  return (
    <div>
      <h1>My Events</h1>
      <p>
        Click{" "}
        <span className="text-primary">
          <Link to={"/attendeedashboard/tickets"}>Here</Link>
        </span>{" "}
        to get your event Tickets
      </p>
      {status === "loading" ? (
        <div
          style={{ width: "50vw" }}
          className="d-flex gap-5 ml-4 align-items-center"
        >
          <div className="">
            <Skeleton height={"300px"} width={"300px"} count={2} />
          </div>
          <div className="">
            <Skeleton height={"300px"} width={"300px"} count={2} />
          </div>
          <div className="">
            <Skeleton height={"300px"} width={"300px"} count={2} />
          </div>
        </div>
      ) : status === "failed" ? (
        <p>Failed to fetch events.</p>
      ) : (
        <ul className="d-flex gap-3 flex-wrap mt-5">
          {events.map((event) => (
            <div className="card h-100 hover-zoom" key={event._id}>
              <div className="bg-image">
                <img
                  className="card-img-top img-fluid"
                  style={{ objectFit: "cover", height: "200px" }}
                  src={`http://localhost:8000/${event.image}`}
                  alt={event.title}
                />
              </div>
              <div className="card-body">
                <h3>{event.title}</h3>
                <hr />
                <p className="card-text">{event.description}</p>
                <hr />
                <p className="card-text">
                  You can join this event on{" "}
                  <b>
                    {formatDate(event.date)} <br />
                  </b>{" "}
                  from <b>{formatTime(event.startTime)}</b> TO{" "}
                  <b>{formatTime(event.endTime)}</b>
                </p>
              </div>
              <div className="card-footer">
                {canGiveFeedback(event) ? (
                  <FeedbackModal event={event} />
                ) : (
                  <p className="text-info">
                    Feedback can be given after the event ends
                  </p>
                )}
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyEvents;
