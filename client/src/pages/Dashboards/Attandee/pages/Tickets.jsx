import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserEvents } from "../../../../slices/eventSlice";
import ReactToPrint from "react-to-print";
import { IoMdPrint } from "react-icons/io";

import { FaMapMarkerAlt } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { MdOutlineNumbers } from "react-icons/md";
import { CiBookmarkCheck } from "react-icons/ci";
import Skeleton from "react-loading-skeleton";

const Tickets = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user._id); // Accessing user's _id from auth slice
  const user = useSelector((state) => state.auth.user._id);
  const events = useSelector((state) => state.events.events);
  const status = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);

  const componentRef = useRef();

  useEffect(() => {
    dispatch(fetchUserEvents(userId));
  }, [dispatch, userId]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dayOfWeek = date
      .toLocaleString("default", { weekday: "long" })
      .toUpperCase();
    const day = String(date.getDate()).padStart(2, "0");
    const month = date
      .toLocaleString("default", { month: "long" })
      .toUpperCase();
    const year = date.getFullYear();
    return { day, month, year, dayOfWeek };
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
      <h1>Event Tickets</h1>
      <ReactToPrint
        trigger={() => (
          <button className="tada btn btn-info mb-2 p-2 text-white rounded">
            <IoMdPrint /> Print Tickets
          </button>
        )}
        content={() => componentRef.current}
      />
      <ul ref={componentRef} className="mt-5">
        {events.map((event) => {
          const { day, month, dayOfWeek, year } = formatDate(event.date);

          return (
            <section className="container mb-4" key={event._id}>
              <hr />
              {status === "loading" ? (
                <div style={{ width: "100%" }} className="">
                  <div className="">
                    <Skeleton height={"200px"} width={"74vw"} count={1} />
                  </div>
                </div>
              ) : status === "failed" ? (
                <p>Failed to fetch events.</p>
              ) : (
                <div className="row">
                  <article className="ticketCard fl-left">
                    <section className="date">
                      <time dateTime={`${day} ${month}`}>
                        <span>{day}</span>
                        <span>{month}</span>
                      </time>
                    </section>
                    <section className="card-cont">
                      <small>Organizer Name: {event.organizer.username}</small>
                      <h3>{event.city}</h3>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "start",
                          alignItems: "center",
                          gap: "10px",
                        }}
                        className="even-date"
                      >
                        <SlCalender />
                        <time>
                          <span>
                            {dayOfWeek} {day} {month} {year}
                          </span>
                          <span>
                            {formatTime(event.startTime)} to{" "}
                            {formatTime(event.endTime)}
                          </span>
                        </time>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "start",
                          gap: "10px",
                          marginTop: "10px",
                        }}
                        className="even-info"
                      >
                        <FaMapMarkerAlt />
                        <p>{event.venue}</p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "start",
                          gap: "10px",
                          // marginTop: "10px",
                        }}
                        className="even-info"
                      >
                        <MdOutlineNumbers />
                        <p>{event._id.slice(0, 7)}</p>
                      </div>
                      <a variant="primary" className="" href="#">
                        <CiBookmarkCheck />
                        Booked
                      </a>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "start",
                          gap: "10px",
                        }}
                        className=""
                      ></div>
                    </section>
                  </article>
                </div>
              )}
            </section>
          );
        })}
      </ul>
    </div>
  );
};

export default Tickets;
