import React from "react";
import Footer from "../../components/Footer/Footer";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import EventCarousel from "../../components/Carousel/EventCarousel";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import MainNav from "../../components/Navbar/MainNav";
import About from "../../components/AboutUs/About";
import CarouselComponent from "../../components/CarouselComponent/CarouselComponent";

const Home = () => {
  return (
    <>
      <MainNav />
      <div className="mt-4">
        <CarouselComponent />
        <div
          style={{
            height: "100%",
            paddingBottom: "30px",
          }}
          className="bg-light container-fluid h-custom"
        >
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="../../../public/Welcome.svg"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <h1>Book the most interesting events today</h1>
              <p>
                Discover today's top events! From thrilling performances to
                captivating exhibitions, find something for every interest. Book
                now for an unforgettable experience!
              </p>
              <Link to={"/events"}>
                <Button variant="info tada">Book Now</Button>
              </Link>
            </div>
          </div>
        </div>
        <div
          style={{
            height: "100%",
            marginBottom: "30px",
          }}
          className="container-fluid h-custom mt-5"
        >
          <h1 className="text-center mb-3">Book event in 3 simple steps</h1>
          <div
            style={{ position: "relative" }}
            className="row d-flex justify-content-center align-items-center gap-3"
          >
            <img
              src="../../../progressDottedLine.png"
              style={{
                position: "absolute",
                top: "-15%",
                left: "18%",
                width: "1000px",
                transform: "rotate(155deg)",
              }}
              className="d-none d-md-block"
              alt=""
            />
            <div class="card" style={{ width: "18rem" }}>
              <div class="card-body">
                <h5 class="card-title d-flex align-items-center justify-content-between gap-2">
                  Search for events
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-binoculars-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5z" />
                    </svg>
                  </span>
                </h5>
                <p class="card-text">
                  Explore a vast array of exciting events with our intuitive
                  search feature. Discover concerts, exhibitions, sports
                  matches, and more, tailored to your interests. Search
                  effortlessly and find the perfect event to elevate your
                  experience.
                </p>
              </div>
            </div>
            <div class="card" style={{ width: "18rem" }}>
              <div class="card-body">
                <h5 class="card-title d-flex align-items-center justify-content-between gap-2">
                  Book an event
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-bookmark-check-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"
                      />
                    </svg>
                  </span>
                </h5>
                <p class="card-text">
                  Book tickets for concerts, shows, exhibitions, and more
                  effortlessly. Our streamlined process ensures you secure your
                  spot in just a few clicks. Don't miss out – reserve your spot
                  today for unforgettable experiences!
                </p>
              </div>
            </div>
            <div class="card" style={{ width: "18rem" }}>
              <div class="card-body">
                <h5 class="card-title d-flex align-items-center justify-content-between gap-2">
                  Enjoy the event
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-magic"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.5 2.672a.5.5 0 1 0 1 0V.843a.5.5 0 0 0-1 0zm4.5.035A.5.5 0 0 0 13.293 2L12 3.293a.5.5 0 1 0 .707.707zM7.293 4A.5.5 0 1 0 8 3.293L6.707 2A.5.5 0 0 0 6 2.707zm-.621 2.5a.5.5 0 1 0 0-1H4.843a.5.5 0 1 0 0 1zm8.485 0a.5.5 0 1 0 0-1h-1.829a.5.5 0 0 0 0 1zM13.293 10A.5.5 0 1 0 14 9.293L12.707 8a.5.5 0 1 0-.707.707zM9.5 11.157a.5.5 0 0 0 1 0V9.328a.5.5 0 0 0-1 0zm1.854-5.097a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L8.646 5.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0l1.293-1.293Zm-3 3a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L.646 13.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0z" />
                    </svg>
                  </span>
                </h5>
                <p class="card-text">
                  Immerse yourself in the excitement of concerts, sports, or
                  exhibitions. Let unforgettable experiences unfold. Embrace the
                  joy and magic of events, creating cherished memories that last
                  a lifetime. Savor the moment.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container h-custom text-center">
          <About />
        </div>
        <div
          className="container h-custom text-center"
          style={{
            height: "100%",
          }}
        >
          <h1>Our Latest Events</h1>
          <EventCarousel />
          {/* <LatestEventsCarousel /> */}
        </div>
        {/* <NewsLetter /> */}
        <Footer />
      </div>
    </>
  );
};

export default Home;
