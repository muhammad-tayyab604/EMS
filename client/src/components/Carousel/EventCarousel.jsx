import React, { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEvents } from "../../slices/eventSlice";
import "./Carousel.css";

const EventCarousel = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const status = useSelector((state) => state.events.status);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);
  const latestEvents = events.slice(0, 3);
  return (
    <Carousel>
      {latestEvents.map((event) => (
        <Carousel.Item key={event._id}>
          <Link to={`events/${event._id}`}>
            <img
              className="d-block img-fluid w-100 rounded"
              src={`http://localhost:8000/${event.image}`}
              alt={event.title}
            />
          </Link>
          <Carousel.Caption className="carousel-caption">
            <h3 className="text-light">{event.title}</h3>
            <p>{event.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
      {/* </Carousel> */}
      {/* <Carousel.Item>
        <img
          className="d-block img-fluid w-100 object-cover rounded"
          src="/event2.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3 className="text-light">Music Festival Extravaganza</h3>
          <p>
            Experience the ultimate music festival extravaganza! Join us for a
            weekend of non-stop entertainment featuring top artists from around
            the globe. Dance under the stars, soak in the vibrant atmosphere,
            and create unforgettable memories with friends and fellow music
            lovers.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block img-fluid w-100 rounded"
          src="/event3.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3 className="text-light">Artisan Food Fair</h3>
          <p>
            Indulge your senses at our artisan food fair! Discover a world of
            culinary delights as you sample gourmet treats, handcrafted
            delicacies, and locally sourced goodies. From savory to sweet,
            there's something for every palate to savor at this delectable event
          </p>
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
  );
};

export default EventCarousel;
