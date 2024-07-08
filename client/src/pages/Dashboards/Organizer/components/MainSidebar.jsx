import React from "react";
import { Image } from "react-bootstrap";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MdOutlineEventAvailable } from "react-icons/md";
import { MdEventNote } from "react-icons/md";
import { MdMarkEmailRead } from "react-icons/md";
import { MdDiscount } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { MdFeedback } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";

const MainSidebar = () => {
  return (
    <Sidebar style={{ backgroundColor: "darkBlue" }}>
      <Link to={"/"}>
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
              to="/organizerdashboard"
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
          component={<NavLink to="event-creation" activeClassName="active" />}
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
            Event Creation
          </div>
        </MenuItem>
        <MenuItem
          component={<NavLink to="booked-events" activeClassName="active" />}
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
            <FaBookmark />
            Booked Events
          </div>
        </MenuItem>
        {/* <MenuItem
          component={
            <NavLink to="marketing-promotion" activeClassName="active" />
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
            <MdMarkEmailRead />
            Promote Events
          </div>
        </MenuItem> */}
        <MenuItem
          component={<NavLink to="discount" activeClassName="active" />}
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
            Add Discounts
          </div>
        </MenuItem>

        <MenuItem
          component={<NavLink to="feedback" activeClassName="active" />}
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
            <MdFeedback />
            Feedbacks
          </div>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default MainSidebar;
