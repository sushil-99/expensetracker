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
            <Link href="/" className=''>Sign in</Link>
            <Link href="register">Sign up</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

