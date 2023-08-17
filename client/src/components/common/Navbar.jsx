
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import logoImage from "../../assets/img/logo.png";

function AppNevBar({ isLoggedIn }) {
  const navItemStyle = {
    fontSize: "19px",
    fontWeight: "bold",
  };

  return (
    <Navbar expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>
          <img src={logoImage} alt="Logo" width="270" height="50" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto bg-light">
            <Nav.Link
              as={NavLink}
              to="/create"
              className="nav-link text-primary px-3"
              style={navItemStyle}
            >
              Create
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/"
              className="nav-link text-primary px-3"
              style={navItemStyle}
            >
              BlogList
            </Nav.Link>
            {isLoggedIn ? (
              <Nav.Link
                as={NavLink}
                to="/logout"
                className="nav-link text-primary px-3"
                style={navItemStyle}
              >
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link
                as={NavLink}
                to="/login"
                className="nav-link text-primary px-3"
                style={navItemStyle}
              >
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNevBar;
