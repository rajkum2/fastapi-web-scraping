// Header.js

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Your Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Add links to the Nav as needed */}
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Another Link</Nav.Link>
            {/* More Nav.Links can be added here */}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Brand className="mx-auto">News List</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
