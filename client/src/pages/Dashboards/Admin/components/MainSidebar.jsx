import React from "react";
import { Image } from "react-bootstrap";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MdOutlineEventAvailable } from "react-icons/md";
import { IoTicketSharp } from "react-icons/io5";
import { MdDiscount } from "react-icons/md";

const MainSidebar = () => {
  return (
    <Sidebar style={{ backgroundColor: "darkBlue", position: "" }}>
      <Link to="/">
        <Image
          src="/EMSLOGO.png"
          width={"100px"}
          style={{ marginBottom: "20px", marginTop: "20px" }}
        />
      </Link>
      <Menu
        menuItemStyles={{
          button: {
            // the active class will be added automatically by react router
            // so we can use it to style the active menu item
            [`&.active`]: {
              backgroundColor: "white",
              color: "black",
            },
          },
        }}
      >
        {/* <SubMenu label="Charts">
          <MenuItem> Pie charts </MenuItem>
          <MenuItem> Line charts </MenuItem>
        </SubMenu> */}
        <MenuItem
          component={
            <NavLink
              style={{ backgroundColor: "#afafd8" }}
              to="/admindashboard"
              activeClassName="active"
            />
          }
        >
          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <MdDashboard />
            Dashboard
          </div>
        </MenuItem>
        <MenuItem
          component={<NavLink to="total-organizers" activeClassName="active" />}
        >
          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <MdOutlineEventAvailable />
            Total Organizers
          </div>
        </MenuItem>
        <MenuItem
          component={<NavLink to="total-attendees" activeClassName="active" />}
        >
          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <IoTicketSharp />
            Total Attendees
          </div>
        </MenuItem>
        <MenuItem
          component={<NavLink to="total-events" activeClassName="active" />}
        >
          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <MdDiscount />
            Total Events
          </div>
        </MenuItem>
        <MenuItem
          component={
            <NavLink to="total-booked-events" activeClassName="active" />
          }
        >
          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <MdDiscount />
            Total Booked Events
          </div>
        </MenuItem>
        <MenuItem
          component={<NavLink to="total-discounts" activeClassName="active" />}
        >
          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <MdDiscount />
            Total Discounts
          </div>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default MainSidebar;
