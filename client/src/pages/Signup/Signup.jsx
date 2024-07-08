import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup, fetchUsers, selectAllUsers } from "../../slices/auth";
import { toast } from "react-toastify";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const users = useSelector(selectAllUsers);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "Attendee",
  });
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    phone: false,
    password: false,
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const emptyFields = Object.keys(formData).filter(
      (key) => formData[key] === ""
    );

    // If any field is empty, set error state for each empty field
    if (emptyFields.length > 0) {
      const newErrors = { ...errors };
      emptyFields.forEach((field) => {
        newErrors[field] = true;
      });
      setErrors(newErrors);
    } else {
      // No empty fields, proceed with signup
      dispatch(signup(formData));
      if (auth.status === "succeeded") {
        navigate("/login");
        toast.success("You can login Now!");
      }
    }
  };

  // Check if there is an existing admin
  const isAdminExists = users.some((user) => user.role === "Admin");
  console.log("Admin", isAdminExists);

  return (
    <section
      className="vh-100 vw-90"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleRegister}>
              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className={`form-control form-control-lg ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  placeholder="Enter unique username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="email">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="phone">
                  Phone No.
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div data-mdb-input-init className="form-outline mb-3">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group-prepend d-flex align-items-center gap-2 p-1 mb-2">
                <label className="input-group-text" htmlFor="role">
                  Register as an
                </label>
                <select
                  id="role"
                  className="selectpicker outline-light form-control"
                  value={formData.role}
                  onChange={handleChange}
                >
                  {!isAdminExists && (
                    <option value="Admin">
                      Admin (This option is one time only)
                    </option>
                  )}
                  <option value="Attendee">Attendee</option>
                  <option value="Organizer">Organizer</option>
                </select>
              </div>
              <div className="form-check mb-0">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  id="rememberMe"
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                >
                  Signup
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already have an account?{" "}
                  <Link to="/login" className="link-danger">
                    Login
                  </Link>
                </p>
                {auth.error && <p className="text-danger mt-2">{auth.error}</p>}
              </div>
            </form>
          </div>
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="../../../public/loginImage.svg"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
