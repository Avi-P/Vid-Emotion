import React from 'react';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button';
import './App.css';

function App() {
  return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Analytopia</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Watch & Analyze</Nav.Link>
            <Nav.Link href="#link">Analytics</Nav.Link>
          </Nav>
            <Button variant="outline-primary">Login</Button>
        </Navbar.Collapse>
      </Navbar>
  );
}

export default App;
