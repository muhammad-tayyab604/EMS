import React, { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { IoMdAddCircle } from "react-icons/io";
import { GrEdit } from "react-icons/gr";
import { FaEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import EventModal from "../components/EventModal";
import {
  deleteEvent,
  fetchOrganizerEvents,
} from "../../../../slices/eventSlice";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventCreation = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [modalData, setModalData] = useState(null);
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.organizerEvents);
  const eventStatus = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);

  useEffect(() => {
    dispatch(fetchOrganizerEvents());
  }, [dispatch]);

  const handleAddEvent = () => {
    setModalMode("create");
    setModalData(null);
    setModalShow(true);
  };

  const handleEditEvent = (data) => {
    setModalMode("edit");
    setModalData(data);
    setModalShow(true);
  };

  const handleViewEvent = (data) => {
    setModalMode("view");
    setModalData(data);
    setModalShow(true);
  };

  const handleDeleteEvent = (eventId) => {
    dispatch(deleteEvent(eventId)).then(() => {
      dispatch(fetchOrganizerEvents());
      toast.success("Event deleted successfully!");
    });
  };

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
      <ToastContainer />
      <div className="">
        <h1>Event Management</h1>
      </div>
      <div className="d-flex justify-content-end mt-5 mb-4">
        <Button onClick={handleAddEvent}>
          Add Event <IoMdAddCircle />
        </Button>
        <EventModal
          heading={
            modalMode === "edit"
              ? "Edit Event"
              : modalMode === "view"
              ? "View Event"
              : "Create Event"
          }
          show={modalShow}
          onHide={() => setModalShow(false)}
          mode={modalMode}
          data={modalData}
        />
      </div>
      {events && events.length > 0 ? (
        <table className="table">
          <thead className="thead-light bg-body-tertiary">
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Venue</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {eventStatus === "loading" ? (
            <Skeleton
              style={{ position: "absolute" }}
              height={"40px"}
              width={"75vw"}
              count={7}
            />
          ) : (
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>
                    <Image
                      src={`http://localhost:8000/${event.image}`}
                      roundedCircle
                      height={"50px"}
                      width={"50px"}
                    />
                  </td>
                  <td>{event.title}</td>
                  <td>{event.description}</td>
                  <td>{formatDate(event.date)}</td>
                  <td>
                    {formatTime(event.startTime)} TO {formatTime(event.endTime)}
                  </td>
                  <td>{event.venue}</td>
                  <td>{event.price}</td>
                  <td style={{ height: "100%" }} className="">
                    <GrEdit
                      style={{ cursor: "pointer", marginRight: "12px" }}
                      size={25}
                      color="blue"
                      onClick={() => handleEditEvent(event)}
                    />
                    <FaEye
                      style={{ cursor: "pointer", marginRight: "12px" }}
                      size={25}
                      color="green"
                      onClick={() => handleViewEvent(event)}
                    />
                    <MdDeleteForever
                      style={{ cursor: "pointer" }}
                      size={25}
                      color="red"
                      onClick={() => handleDeleteEvent(event._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      ) : (
        <p style={{ fontSize: "3rem", color: "gray", textAlign: "center" }}>
          Please add events
        </p>
      )}
      {eventStatus === "failed" && <p>Error: {error}</p>}
    </>
  );
};

export default EventCreation;
