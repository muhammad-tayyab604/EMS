import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, logout } from "../../slices/auth";
import { error } from "../../slices/auth";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const auth = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await dispatch(login(formData));
      setLoading(false);
      setError(true);
    } catch (error) {
      console.log(error);
      setError(error.message);
      dispatch(logout());
      setLoading(false);
    }
  };

  if (auth.status === "succeeded" && auth.user) {
    setLoading(false);
    navigate("/");
    toast.success("Sign in Successfully!");
  }
  if (auth.status === "failed") {
    console.log("Error");
  }

  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className="container-fluid h-custom mt-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleLogin}>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                <button
                  type="button"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-primary btn-floating mx-1"
                >
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button
                  type="button"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-primary btn-floating mx-1"
                >
                  <i className="fab fa-twitter"></i>
                </button>
                <button
                  type="button"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-primary btn-floating mx-1"
                >
                  <i className="fab fa-linkedin-in"></i>
                </button>
              </div>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
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
              <div className="d-flex justify-content-between align-items-center">
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
                <a href="#!" className="text-body">
                  Forgot password?
                </a>
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                {loading ? (
                  <button
                    type="submit"
                    disabled={true}
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Please Wait...
                  </button>
                ) : (
                  <button
                    type="submit"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Login
                  </button>
                )}
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <Link to="/signup" className="link-danger">
                    Register
                  </Link>
                </p>
                {error && (
                  <p className="text-danger mt-2">
                    Sorry Wrong Credentials, if you don't have an account please
                    create one!
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
