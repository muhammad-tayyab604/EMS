import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../slices/auth";

const MainNavBar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    // setLoading(true);
    dispatch(logout());
  };

  // Get the first letter of the username
  const firstLetter = user?.username.charAt(0).toUpperCase();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <p>You are logged in as {user.role}</p>
              </li>
              <li class="nav-item">
                {/* <a class="nav-link" href="#">
                  Team
                </a> */}
              </li>
              <li class="nav-item">
                {/* <a class="nav-link" href="#">
                  Projects
                </a> */}
              </li>
            </ul>
          </div>
          <div class="d-flex align-items-center">
            <Dropdown>
              <Dropdown.Toggle
                style={{
                  backgroundColor: "white",
                  border: "none",
                  color: "black",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                id="dropdown-basic"
              >
                <div
                  className="rounded-circle d-flex justify-content-center align-items-center"
                  style={{
                    width: "45px",
                    height: "45px",
                    backgroundColor: "#007bff",
                    color: "white",
                    fontSize: "24px",
                  }}
                >
                  {firstLetter}
                </div>
                {user && (
                  <span style={{ marginLeft: "10px" }}>
                    {user.username} ({user.role})
                  </span>
                )}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MainNavBar;
