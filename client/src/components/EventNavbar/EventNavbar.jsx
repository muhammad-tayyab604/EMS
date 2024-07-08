import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const EventNavbar = () => {
  return (
    <Navbar
      expand="lg"
      style={{
        paddingLeft: "60px",
        paddingRight: "60px",
      }}
      className=""
    >
      <Container fluid className=" bg-light p-2">
        <Navbar.Brand>
          <Link className="text-black text-decoration-none bg-light p-2 rounded">
            Event Categories
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="d-flex justify-content-center align-items-center my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>
              <Link
                className="text-black text-decoration-none table-hover"
                to={"/"}
              >
                All
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="text-black text-decoration-none" to={"/events"}>
                Music Events
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="text-black text-decoration-none" to={"/events"}>
                Horror Events
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="text-black text-decoration-none" to={"/events"}>
                Food Events
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="text-black text-decoration-none" to={"/events"}>
                Torists Events
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-primary">Search</Button>
        </Form>
      </Container>
    </Navbar>
  );
};

export default EventNavbar;
