import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../slices/eventSlice";
import EventsCard from "../../components/EventsCard/EventsCard";
import MainNav from "../../components/Navbar/MainNav";
import EventNavbar from "../../components/EventNavbar/EventNavbar";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import Footer from "../../components/Footer/Footer";
import { IoTicket } from "react-icons/io5";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const Events = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const status = useSelector((state) => state.events.status);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Date formatting
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
    <>
      <MainNav />
      <div className="mt-4">
        <EventNavbar />
        <div
          style={{
            paddingLeft: "70px",
            paddingRight: "70px",
            marginTop: "20px",
          }}
        >
          {status === "loading" ? (
            <div style={{ width: "65vw" }} className="d-flex gap-2">
              <div className="col col-4">
                <Skeleton height={"100px"} count={5} />
              </div>
              <div className="col col-12">
                <Skeleton height={"300px"} count={4} />
              </div>
            </div>
          ) : status === "failed" ? (
            <p>Failed to fetch events.</p>
          ) : (
            <>
              <h1>All Events</h1>
              <div className="mb-4">
                {events.map((event) => (
                  <div
                    key={event._id}
                    className="tab-content py-3 px-3 px-sm-0 wow fadeInDown animated"
                    data-animation="fadeInDown animated"
                    data-delay=".2s"
                    id="nav-tabContent"
                    style={{
                      visibility: "visible",
                      animationName: "fadeInDown",
                    }}
                  >
                    <div
                      className="tab-pane fade active show"
                      id="one"
                      role="tabpanel"
                      aria-labelledby="nav-home-tab"
                    >
                      <div className="row mb-30">
                        <div className="col-lg-2">
                          <div className="user">
                            <div className="title">
                              <img
                                src={`http://localhost:8000/${event.image}`}
                                alt="Event"
                                style={{ width: "100%", height: "auto" }}
                              />
                              <h5 className="mt-2">
                                {event.organizer.username}
                              </h5>
                              <p>{event.organizer.email}</p>
                              <p>{event.organizer.phone}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-10">
                          <div className="event-list-content fix">
                            <ul
                              data-animation="fadeInUp animated"
                              data-delay=".2s"
                              style={{
                                animationDelay: "0.2s",
                              }}
                              className=""
                            >
                              <li>{event.venue}</li>
                              <li>
                                {formatTime(event.startTime)} -{" "}
                                {formatTime(event.endTime)}
                              </li>
                            </ul>
                            <h2>{event.title}</h2>
                            <p>{event.description}</p>
                            <Link
                              to={`/events/${event._id}`}
                              className="btn mt-20 mr-10"
                            >
                              <IoTicket /> Buy Ticket
                            </Link>
                            {/* <a href="#" className="btn mt-20">
                              Read More
                            </a> */}
                            <div className="crical">
                              <i className="fal fa-video"></i>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <NewsLetter />
        <Footer />
      </div>
    </>
  );
};

export default Events;
