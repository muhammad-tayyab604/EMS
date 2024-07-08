import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { MdCelebration } from "react-icons/md";

const Success = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sessionId = query.get("session_id");

    if (sessionId) {
      updateEventStatus(sessionId);
    }
  }, [location]);

  const updateEventStatus = async (sessionId) => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:8000/api/stripe/update-event-status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update event status");
      }

      const data = await response.json();
      console.log("Event status updated:", data);
      // Optionally handle success or redirect after successful update
    } catch (error) {
      console.error("Error updating event status:", error);
      // Handle error display or logging
    } finally {
      setLoading(false);
    }
  };

  const goDashboard = () => {
    window.location.href = "/attendeeDashboard";
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="text-center">
        <MdCelebration color={"green"} size={50} />
        <h1 className="text-success">Payment Successful!</h1>
        <p>
          You can view your events and give feedback after the event ends.{" "}
          <br />
          Go to Dashboard → My Events
        </p>
        {loading ? (
          <p>Please Wait...</p>
        ) : (
          <Button onClick={goDashboard} variant="primary">
            Dashboard
          </Button>
        )}
      </div>
    </Container>
  );
};

export default Success;
