import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganizerEvents } from "../../../../slices/eventSlice"; // Adjust the import path as needed
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Feedback = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.organizerEvents);
  const status = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);

  useEffect(() => {
    dispatch(fetchOrganizerEvents());
  }, [dispatch]);

  if (status === "loading") {
    return <Skeleton height={"20rem"} count={2} />;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      <h1>Feedbacks for Client's Event</h1>
      {events && events.length > 0 ? (
        events.map((event) => (
          <div key={event._id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Title: {event.title}</h5>
              <p className="card-text">Description: {event.description}</p>
              <h6>Feedbacks:</h6>
              {event.feedbacks.length > 0 ? (
                event.feedbacks.map((feedback) => (
                  <div key={feedback._id} className="card mb-2">
                    <div className="card-body">
                      <h6 className="card-subtitle mb-2 text-muted">
                        Rating: {feedback.rating}
                      </h6>
                      <p className="card-text">{feedback.comment}</p>
                      <p className="card-text">
                        <small className="text-muted">
                          By User: {feedback.user.username}
                        </small>
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No feedbacks available.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
};

export default Feedback;
