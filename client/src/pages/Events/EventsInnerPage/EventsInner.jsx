import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MainNav from "../../../components/Navbar/MainNav";
import Map from "../../../components/Map/Map";
import { useDispatch, useSelector } from "react-redux";
import { getSingleEvent } from "../../../slices/eventSlice";
import { loadStripe } from "@stripe/stripe-js/pure";
import { MdOutlineNoteAlt } from "react-icons/md";
import { ImLocation2 } from "react-icons/im";
import { LuSubtitles } from "react-icons/lu";
import { CgDetailsMore } from "react-icons/cg";
import Skeleton from "react-loading-skeleton";
import Footer from "../../../components/Footer/Footer";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventsInner = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const event = useSelector((state) => state.events.event);
  const status = useSelector((state) => state.events.status);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  // State for discount code
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (eventId) {
      dispatch(getSingleEvent(eventId));
    }
  }, [dispatch, eventId]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sessionId = query.get("session_id");

    if (sessionId) {
      updateEventStatus(sessionId);
    }
  }, [location]);

  const handleDiscountChange = (e) => {
    setDiscountCode(e.target.value);
  };

  const applyDiscount = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8000/api/stripe/discounts-validate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: discountCode }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid discount code");
        setLoading(false);
      }

      const discountData = await response.json();
      setDiscount(discountData);
      console.log(discountData);
      setLoading(false);
      toast.success("Discount Applied");
    } catch (error) {
      console.error("Error validating discount code:", error);
      setLoading(false);
    }
  };

  const makePayment = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51NshviFgfFOA71LafClKELACIuuNF8WGQo5UGp7Fx5moZqujYuTCRzyM2Z1T0VViZry6OQ4HuVBzWPHBoXK7tZY200OVWaEvJ8"
      );
      const body = {
        events: event,
        eventId: event._id,
        userId: user._id,
        discountId: discount ? discount.id : null,
      };
      const header = { "Content-Type": "application/json" };

      const response = await fetch(
        `http://localhost:8000/api/stripe/create-checkout-session`,
        {
          method: "POST",
          headers: header,
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const session = await response.json();
      await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error("Error in makePayment:", error);
    }
  };

  const updateEventStatus = async (sessionId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/stripe/update-event-status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
          body: JSON.stringify({ sessionId }),
        }
      );

      const result = await response.json();
      console.log("Event status update response:", result);
    } catch (error) {
      console.error("Error updating event status:", error);
    }
  };

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
      <div className="container h-custom pt-4">
        {user && token ? (
          <div className="d-flex">
            <Link>
              <button onClick={makePayment} className="btn btn-info mb-2 tada">
                Reserve Your Ticket Now!
              </button>
            </Link>
          </div>
        ) : (
          <Link to={"/login"}>
            <button className="btn btn-info m-2 tada">
              Login to reserve your ticket
            </button>
          </Link>
        )}
        {!event ? (
          <div className="">
            <div style={{ width: "65vw" }} className="d-flex gap-2">
              <div className="col col-9">
                <Skeleton height={"500px"} count={1} />
              </div>
              <div className="col col-6">
                <Skeleton height={"500px"} count={1} />
              </div>
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column flex-lg-row mb-4">
            <div
              className="bg-light rounded event-list-content"
              style={{ flex: 5, height: "100%" }}
            >
              <img
                src={`http://localhost:8000/${event.image}`}
                className="rounded"
                width={"100%"}
                height={"60%"}
                alt=""
              />
              <div className="p-3">
                <h3 className="mt-3 d-flex align-items-center gap-2">
                  <LuSubtitles color="#ff007a" />
                  {event.title}
                </h3>
                <hr />
                <p>{event.description}</p>
                <hr />
                <h2 className="d-flex align-items-center gap-2">
                  <CgDetailsMore color="#ff007a" />
                  Organizer Details
                </h2>
                <p>Name: {event.organizer.username}</p>
                <p>Eamil: {event.organizer.email}</p>
                <p>Phone# {event.organizer.phone}</p>
              </div>
            </div>

            <div
              className="p-3 mx-2 mt-4 mt-md-0 bg-light rounded event-list-content"
              style={{ flex: 3, height: "100%" }}
            >
              <Form onSubmit={applyDiscount}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    value={discountCode}
                    onChange={handleDiscountChange}
                    placeholder="Enter discount code (If Applicable)"
                  />
                  {loading ? (
                    <button
                      // onClick={applyDiscount}
                      type="submit"
                      disabled
                      className="btn btn-danger mt-2 mb-2"
                    >
                      Applying Discount...
                    </button>
                  ) : (
                    <button
                      // onClick={applyDiscount}
                      type="submit"
                      className="btn btn-danger mt-2 mb-2"
                    >
                      Apply Discount
                    </button>
                  )}
                </Form.Group>
              </Form>
              <h4>
                {" "}
                <MdOutlineNoteAlt color="#ff007a" /> Note This Date and Time
              </h4>
              <p style={{ marginLeft: "35px" }}>
                On <b>{formatDate(event.date)}</b> From{" "}
                <b>
                  {formatTime(event.startTime)} To {formatTime(event.endTime)}
                </b>
              </p>
              <h4>
                {" "}
                <ImLocation2 color="#ff007a" /> Venue
              </h4>
              <p style={{ marginLeft: "35px" }}>
                {event.venue}, {event.city}
              </p>
              <hr />
              <div
                style={{ height: "70vh", width: "100%", overflow: "hidden" }}
                className=""
              >
                <h4>Map</h4>
                {event.latitude && event.longitude ? (
                  <Map
                    lat={event.latitude}
                    long={event.longitude}
                    venue={event.venue}
                  />
                ) : (
                  <p>Location data is not available</p>
                )}
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};

export default EventsInner;
