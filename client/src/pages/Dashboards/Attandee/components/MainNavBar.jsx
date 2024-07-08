import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../slices/auth";

const MainNavBar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* <a class="navbar-brand mt-2 mt-lg-0" href="#">
              <img
                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                height="15"
                alt="MDB Logo"
                loading="lazy"
              />
            </a> */}
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  You are logged in as {user.role}
                </a>
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
                }}
                id="dropdown-basic"
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                  class="rounded-circle"
                  height="45"
                  alt="Black and White Portrait of a Man"
                  loading="lazy"
                />
                {user && (
                  <span style={{ marginLeft: "10px" }}>{user.username}</span>
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
