import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Events from "./pages/Events/Events";
import Signup from "./pages/Signup/Signup";
import EventsInner from "./pages/Events/EventsInnerPage/EventsInner";
import OrganizerDashboard from "./pages/Dashboards/Organizer/OrganizerDashboard";
import NotFound404 from "./pages/NotFound404";
import EventCreation from "./pages/Dashboards/Organizer/pages/EventCreation";
import EventCategories from "./pages/Dashboards/Organizer/pages/EventCategories";
import PromotonMarketing from "./pages/Dashboards/Organizer/pages/PromotonMarketing";
import Discounts from "./pages/Dashboards/Organizer/pages/Discounts";
import AttendeeManagement from "./pages/Dashboards/Organizer/pages/BookedEvents";
import Feedback from "./pages/Dashboards/Organizer/pages/Feedback";
import ProtectedRoute from "./components/Protected Routes/ProtectedRoute";
import AttendeeDashboard from "./pages/Dashboards/Attandee/AttendeeDashboard";
import MyEvents from "./pages/Dashboards/Attandee/pages/MyEvents";
import Tickets from "./pages/Dashboards/Attandee/pages/Tickets";
import ADiscounts from "./pages/Dashboards/Attandee/pages/ADiscounts";
import ADashBoard from "./pages/Dashboards/Attandee/pages/ADashBoard";
import DashBoard from "./pages/Dashboards/Organizer/pages/DashBoard";
import { ToastContainer } from "react-toastify";
import Success from "./pages/Stripe SuccessOrCancelPages/Success";
import BookedEvents from "./pages/Dashboards/Organizer/pages/BookedEvents";
import AdminDashboard from "./pages/Dashboards/Admin/AdminDashboard";
import AdminDashBoard from "./pages/Dashboards/Admin/pages/AdminDashBoard";
import TotalOrganizers from "./pages/Dashboards/Admin/pages/TotalOrganizers";
import TotalAttendees from "./pages/Dashboards/Admin/pages/TotalAttendees";
import TotalEvents from "./pages/Dashboards/Admin/pages/TotalEvents";
import TotalBookedEvents from "./pages/Dashboards/Admin/pages/TotalBookedEvents";
import TotalDiscounts from "./pages/Dashboards/Admin/pages/TotalDiscounts";

function App() {
  return (
    <>
      <ToastContainer autoClose={3000} closeOnClick />

      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventId" element={<EventsInner />} />
        {/* <Route path="/admindashboard" element={<AdminDashborad />} /> */}
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashBoard />} />
          <Route path="total-organizers" element={<TotalOrganizers />} />
          <Route path="total-attendees" element={<TotalAttendees />} />
          <Route path="total-events" element={<TotalEvents />} />
          <Route path="total-booked-events" element={<TotalBookedEvents />} />
          <Route path="total-discounts" element={<TotalDiscounts />} />
        </Route>
        <Route
          path="/attendeedashboard"
          element={
            <ProtectedRoute>
              <AttendeeDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<ADashBoard />} />
          <Route path="my-events" element={<MyEvents />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="my-discount" element={<ADiscounts />} />
        </Route>
        <Route
          path="/organizerdashboard"
          element={
            <ProtectedRoute>
              <OrganizerDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashBoard />} />
          <Route path="event-creation" element={<EventCreation />} />
          <Route path="event-categories" element={<EventCategories />} />
          <Route path="marketing-promotion" element={<PromotonMarketing />} />
          <Route path="discount" element={<Discounts />} />
          <Route path="booked-events" element={<BookedEvents />} />
          <Route path="feedback" element={<Feedback />} />
        </Route>
        <Route path="/*" element={<NotFound404 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/organizerDashboard" element={<OrganizerDashboard />} />
        <Route path="/success-payment" element={<Success />} />
      </Routes>
    </>
  );
}

export default App;
