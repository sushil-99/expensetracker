import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "../redux/user/userSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  return (
    <Navbar bg="info" expand="md">
      <Container>
        <Navbar.Brand href="#home">Finance Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <div>Welcome back {userInfo?.fName}</div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!userInfo?.fName ? (
              <>
                <Link to="/" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Sign Up
                </Link>
              </>
            ) : (
              <Link
                to="/"
                className="nav-link"
                onClick={() => dispatch(setUser({}))}
              >
                Log Out
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
