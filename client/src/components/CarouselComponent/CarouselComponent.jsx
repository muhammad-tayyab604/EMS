import React, { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";
import $ from "jquery";
import "./CarouselComponent.css"; // Make sure to create this CSS file and paste the styles there
import { Link } from "react-router-dom";

const CarouselComponent = () => {
  useEffect(() => {
    // jQuery code to handle animations and touch events
    $(document).ready(function () {
      $.fn.extend({
        animateCss: function (animationName) {
          const animationEnd =
            "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
          this.addClass("animated " + animationName).one(
            animationEnd,
            function () {
              $(this).removeClass(animationName);
            }
          );
        },
      });

      $("#myCarousel").on("slide.bs.carousel", function () {
        $(".item1 img").animateCss("slideInDown");
        $(".item1 h2").animateCss("zoomIn");
        $(".item1 p").animateCss("fadeIn");

        $(".item2 img").animateCss("zoomIn");
        $(".item2 h2").animateCss("swing");
        $(".item2 p").animateCss("fadeIn");

        $(".item3 img").animateCss("fadeInLeft");
        $(".item3 h2").animateCss("fadeInDown");
        $(".item3 p").animateCss("fadeIn");
      });

      // Handle mouse scroll
      $("#myCarousel").bind("mousewheel DOMMouseScroll", function (e) {
        if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
          $(this).carousel("prev");
        } else {
          $(this).carousel("next");
        }
      });

      // Handle touch events
      $("#myCarousel").on("touchstart", function (event) {
        const yClick = event.originalEvent.touches[0].pageY;
        $(this).one("touchmove", function (event) {
          const yMove = event.originalEvent.touches[0].pageY;
          if (Math.floor(yClick - yMove) > 1) {
            $(".carousel").carousel("next");
          } else if (Math.floor(yClick - yMove) < -1) {
            $(".carousel").carousel("prev");
          }
        });
        $(".carousel").on("touchend", function () {
          $(this).off("touchmove");
        });
      });
    });
  }, []);

  return (
    <section className="slide-wrapper">
      <div className="container">
        <Carousel id="myCarousel" interval={6000}>
          <Carousel.Item className="item item1 active">
            <div className="fill" style={{ backgroundColor: "#48c3af" }}>
              <div className="inner-content">
                <div className="carousel-img">
                  <img
                    src="./Hero1.svg"
                    alt="sofa"
                    className="img img-responsive animated slideInDown"
                  />
                </div>
                <div className="carousel-desc">
                  <h2 className="animated zoomIn">
                    Welcome to Our Event Portal
                  </h2>
                  <p className="animated fadeIn">
                    Discover and join exciting events near you. From music
                    festivals to tech conferences, we've got you covered!
                  </p>
                </div>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item className="item item2">
            <div className="fill" style={{ backgroundColor: "#b33f4a" }}>
              <div className="inner-content">
                <div className="carousel-img">
                  <img
                    src="./Hero2.svg"
                    alt="white-sofa"
                    className="img img-responsive animated zoomIn"
                  />
                </div>
                <div className="carousel-desc">
                  <h2 className="animated swing">
                    Join Us at the Annual Music Festival
                  </h2>
                  <p className="animated fadeIn">
                    Experience a weekend filled with live music, delicious food,
                    and unforgettable moments. Get your tickets now!
                  </p>
                </div>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item className="item item2">
            <div className="fill" style={{ backgroundColor: "#7fc2f4" }}>
              <div className="inner-content">
                <div className="carousel-img">
                  <img
                    src="./Hero3.svg"
                    alt="white-sofa"
                    className="img img-responsive animated zoomIn"
                  />
                </div>
                <div className="carousel-desc">
                  <h2 style={{ textWrap: "wrap" }} className="animated swing">
                    Join Now and book <br /> interesting events you want
                  </h2>
                  <Link to={"/events"}>
                    <button className="animated fadeIn tada btn btn-danger">
                      Join Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </Carousel.Item>
          {/* <Carousel.Item className="item item3">
            <div className="fill" style={{ backgroundColor: "#7fc2f4" }}>
              <div className="inner-content">
                <div className="col-md-6">
                  <div className="carousel-img">
                    <img
                      src="http://cdn.homedit.com/wp-content/uploads/2011/08/137CLUB2ST.png"
                      alt="sofa"
                      className="img img-responsive animated fadeInLeft"
                    />
                  </div>
                </div>
                <div className="col-md-6 text-left">
                  <div className="carousel-desc">
                    <h2 className="animated fadeInDown">Stylish Sofa</h2>
                    <p className="animated fadeIn">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Duis elit ipsum, scelerisque non semper eu, aliquet vel
                      odio. Sed auctor id purus nec tristique. Donec euismod,
                      urna vel dapibus tristique, dolor arcu ultrices lectus,
                      nec pulvinar est turpis sit amet felis. Duis interdum
                      purus quam, vitae cursus erat ornare at. Donec congue mi a
                      ipsum tincidunt, imperdiet vehicula odio rutrum. Nam porta
                      vulputate magna, id pretium lectus iaculis eu. Ut ut
                      viverra libero.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item> */}
        </Carousel>
      </div>
    </section>
  );
};

export default CarouselComponent;
