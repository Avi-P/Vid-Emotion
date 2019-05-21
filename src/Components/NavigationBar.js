import React from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from '../Sites/Home'

function NavigationBar() {
    return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Analytopia</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/app">Watch & Analyze</Nav.Link>
                        <Nav.Link href="/analytics">Analytics</Nav.Link>
                    </Nav>
                    <Button variant="outline-primary">Login</Button>
                </Navbar.Collapse>
            </Navbar>


    );
}

export default NavigationBar;