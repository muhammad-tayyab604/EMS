import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  createEvent,
  updateEvent,
  fetchEvents,
  fetchOrganizerEvents,
} from "../../../../slices/eventSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const EventModal = (props) => {
  const { heading, mode, data, show, onHide } = props;
  const isViewMode = mode === "view";
  const isEditMode = mode === "edit";

  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.organizerEvents);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    coordinates: "",
    price: "",
    category: "",
    description: "",
  });
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (data) {
      const formattedDate = new Date(data.date).toISOString().split("T")[0];
      const formattedData = {
        ...data,
        date: formattedDate,
      };
      setFormData(formattedData);
      setImagePreview(`http://localhost:8000/${data.image}`);
      dispatch(fetchOrganizerEvents());
    } else {
      resetFormData();
    }
  }, [data]);

  useEffect(() => {
    if (show) {
      setValidated(false);
    }
  }, [show]);

  const resetFormData = () => {
    setFormData({
      image: "",
      title: "",
      date: "",
      time: "",
      venue: "",
      latitude: "",
      longitude: "",
      price: "",
      category: "",
      description: "",
    });
    setImagePreview("");
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const file = e.target.files[0];
      setFormData({ ...formData, [name]: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      if (file) {
        reader.readAsDataURL(file);
      } else {
        setImagePreview("");
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      const formDataToSubmit = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSubmit.append(key, formData[key]);
      });

      try {
        if (isEditMode && data && data._id) {
          await dispatch(
            updateEvent({ eventId: data._id, formData: formDataToSubmit })
          );
          toast.success("Event updated successfully!");
        } else {
          await dispatch(createEvent(formDataToSubmit));
          toast.success("Event created successfully!");
        }
        resetFormData();
        setValidated(false);
        onHide();
        dispatch(fetchOrganizerEvents());
      } catch (error) {
        console.log(error);
        toast.error("Failed to update/create event");
      }
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {heading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Event Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                required={!isEditMode}
                disabled={isViewMode}
                onChange={handleChange}
              />
              {imagePreview && (
                <LazyLoadImage
                  src={imagePreview}
                  width={"100%"}
                  effect="blur"
                  className="mt-3 mb-3"
                  alt={formData.title}
                />
              )}
              <Form.Control.Feedback type="invalid">
                Please provide an event image.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter event title"
                required
                value={formData.title}
                disabled={isViewMode}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid title.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Pick the Event Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                placeholder="Date"
                required
                value={formData.date}
                disabled={isViewMode}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid date.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 d-flex justify-content-center align-items-center gap-5 w-full">
              <div style={{ border: "none" }} className="form-control">
                <Form.Label>Event's Start Time</Form.Label>
                <Form.Control
                  type="time"
                  name="startTime"
                  placeholder="startTime"
                  required
                  value={formData.startTime}
                  disabled={isViewMode}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid time.
                </Form.Control.Feedback>
              </div>
              <div style={{ border: "none" }} className="form-control">
                <Form.Label>Event's End Time</Form.Label>
                <Form.Control
                  type="time"
                  name="endTime"
                  placeholder="endTime"
                  required
                  value={formData.endTime}
                  disabled={isViewMode}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid time.
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Venue</Form.Label>
              <Form.Control
                type="text"
                name="venue"
                placeholder="Full Address of the venue"
                required
                value={formData.venue}
                disabled={isViewMode}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid venue.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Event City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                placeholder="City, e.g Islamabad"
                required
                value={formData.city}
                disabled={isViewMode}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="mb-3 d-flex justify-content-center align-items-center gap-5 w-full"
              controlId="formVenue"
            >
              <div style={{ border: "none" }} className="form-control">
                {" "}
                <Form.Label>Lattitude</Form.Label>
                <Form.Control
                  type="number"
                  name="latitude"
                  placeholder="Enter latitude of the venue"
                  required
                  value={formData.latitude}
                  disabled={isViewMode}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid latitude.
                </Form.Control.Feedback>
              </div>
              <div style={{ border: "none" }} className="form-control">
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                  type="number"
                  name="longitude"
                  placeholder="Enter longitude of the venue"
                  required
                  value={formData.longitude}
                  disabled={isViewMode}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide valid longitude.
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group
              style={{ gap: "5rem" }}
              className="mb-3"
              controlId="formPrice"
            >
              <Form.Label>Ticket Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Enter Price of the Ticket (RS)"
                required
                value={formData.price}
                disabled={isViewMode}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid price.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Event Category</Form.Label>
              <Form.Select
                name="category"
                required
                disabled={isViewMode}
                aria-label="Default select example"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Event Category</option>
                <option value="Corporate Event">Corporate Event</option>
                <option value="Social Event">Social Event</option>
                <option value="Cultural Event">Cultural Event</option>
                <option value="Educational Event">Educational Event</option>
                <option value="Sports Event">Sports Event</option>
                <option value="Charity Event">Charity Event</option>
                <option value="Community Event">Community Event</option>
                <option value="Private Event">Private Event</option>
                <option value="Virtual Event">Virtual Event</option>
                <option value="Promotional Event">Promotional Event</option>
                <option value="Religious Event">Religious Event</option>
                <option value="Health & Wellness Event">
                  Health & Wellness Event
                </option>
                <option value="Food & Drink Event">Food & Drink Event</option>
                <option value="Political Event">Political Event</option>
                <option value="Technology Event">Technology Event</option>
                <option value="Environmental Event">Environmental Event</option>
                <option value="Family Event">Family Event</option>
                <option value="Fashion Event">Fashion Event</option>
                <option value="Travel & Adventure Event">
                  Travel & Adventure Event
                </option>
                <option value="Music & Arts Event">Music & Arts Event</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a valid category.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Event Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Enter event description"
                required
                value={formData.description}
                disabled={isViewMode}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid description.
              </Form.Control.Feedback>
            </Form.Group>
            {!isViewMode && (
              <Button variant="primary" type="submit">
                {isEditMode ? "Update Event" : "Create Event"}
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EventModal;
