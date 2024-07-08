import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { submitFeedback } from "../../../../slices/eventSlice";

const FeedbackModal = ({ event }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    dispatch(
      submitFeedback({ eventId: event._id, feedback: { rating, comment } })
    );
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Give Feedback
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Event Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                as="select"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="comment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit Feedback
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FeedbackModal;
