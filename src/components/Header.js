import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export const Header =() => {

  return (
    <Navbar bg="info" expand="md">
      <Container>
        <Navbar.Brand href="#home">Finance Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* {!user?.fName ? ( */}
            <>
              <Link to="/" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Sign Up
              </Link>
            </>
            {/* ) : ( */}
            <Link to="/" className="nav-link">
              Log Out
            </Link>
            {/* )} */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

