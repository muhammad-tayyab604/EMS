import React from "react";
import MainSidebar from "./components/MainSidebar";
import MainNavBar from "./components/MainNavBar";
import { Outlet } from "react-router-dom";

const AttendeeDashboard = () => {
  return (
    <header className="d-flex">
      <MainSidebar />
      <div
        style={{ height: "100vh", width: "100vw", overflowY: "scroll" }}
        className="p-5"
      >
        <MainNavBar />
        <Outlet />
      </div>
    </header>
  );
};

export default AttendeeDashboard;
