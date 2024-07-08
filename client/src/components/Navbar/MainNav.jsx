import React, { useState } from "react";
import { Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { logout } from "../../slices/auth";
import { useDispatch, useSelector } from "react-redux";

const MainNav = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const handleLogout = () => {
    setLoading(true);
    dispatch(logout());
  };

  const adminDashboard = () => {
    window.location.href = "/admindashboard";
  };
  const attendeeDashboard = () => {
    window.location.href = "/attendeedashboard";
  };
  // const organizerDashboard = () => {
  //   window.location.href = "/organizerdashboard";
  // };

  return (
    <Navbar
      expand="lg"
      style={{
        paddingLeft: "60px",
        paddingRight: "60px",
      }}
      className="bg-body-tertiary"
    >
      <Container fluid>
        <Navbar.Brand>
          <NavLink className="text-black text-decoration-none" to={"/"}>
            <Image src="/EMSLOGO.png" width={"100px"} />
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mx-auto"
            style={{
              maxHeight: "100px",
            }}
            navbarScroll
          >
            <Nav.Link>
              <NavLink
                style={({ isActive }) => {
                  return {
                    fontSize: "21px",
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "red" : "",
                    borderBottom: isActive ? "4px solid #e7015e" : "none", // Add bottom border conditionally
                  };
                }}
                className="text-black text-decoration-none"
                to={"/"}
                activeStyle={{
                  borderBottom: "2px solid #e7015e",
                }}
              >
                Home
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink
                style={({ isActive }) => {
                  return {
                    fontSize: "21px",
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "red" : "",
                    borderBottom: isActive ? "4px solid #e7015e" : "none", // Add bottom border conditionally
                  };
                }}
                className="text-black text-decoration-none"
                to={"/events"}
              >
                Events
              </NavLink>
            </Nav.Link>
            {/* <Nav.Link>
              <NavLink
                style={{ fontSize: "21px" }}
                className="text-black text-decoration-none"
                to={"/about"}
                activeStyle={{
                  borderBottom: "2px solid #e7015e",
                }}
              >
                About
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink
                style={{ fontSize: "21px" }}
                className="text-black text-decoration-none"
                to={"/locations"}
                activeStyle={{
                  borderBottom: "2px solid #e7015e",
                }}
              >
                Locations
              </NavLink>
            </Nav.Link> */}
          </Nav>
          <Nav className="ml-auto d-flex gap-2">
            {token ? (
              <>
                {user?.role === "Admin" && (
                  <NavLink
                    className="text-white font-weight-bold text-decoration-none"
                    to={"/adminDashboard"}
                    onClick={adminDashboard}
                  >
                    <Button style={{ fontSize: "21px" }} variant="info">
                      Dashboard
                    </Button>
                  </NavLink>
                )}
                {user?.role === "Attendee" && (
                  <NavLink
                    className="text-white font-weight-bold text-decoration-none"
                    to={"/attendeedashboard"}
                    onClick={attendeeDashboard}
                  >
                    <Button style={{ fontSize: "21px" }} variant="info">
                      Dashboard
                    </Button>
                  </NavLink>
                )}
                {user?.role === "Organizer" && (
                  <NavLink
                    className="text-white font-weight-bold text-decoration-none"
                    to={"/organizerdashboard"}
                    // onClick={organizerDashboard}
                  >
                    <Button style={{ fontSize: "21px" }} variant="info">
                      Dashboard
                    </Button>
                  </NavLink>
                )}
                <NavLink className="text-white font-weight-bold text-decoration-none">
                  {loading ? (
                    <Button
                      style={{ fontSize: "21px" }}
                      onClick={handleLogout}
                      disabled={true}
                      variant="success"
                      className="mr-5"
                    >
                      Logging Out
                    </Button>
                  ) : (
                    <Button
                      style={{ fontSize: "21px" }}
                      onClick={handleLogout}
                      variant="danger"
                      className="mr-5"
                    >
                      Logout
                    </Button>
                  )}
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  className="text-white font-weight-bold text-decoration-none"
                  to={"/login"}
                >
                  <Button style={{ fontSize: "21px" }} variant="info">
                    Login
                  </Button>
                </NavLink>
                <NavLink to={"/signup"}>
                  <Button
                    style={{ fontSize: "21px" }}
                    className=""
                    variant="warning"
                  >
                    Signup
                  </Button>
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNav;
