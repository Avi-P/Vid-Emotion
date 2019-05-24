import React from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import LoginPage from "./LoginPage"
import RegisterPage from "./RegisterPage";

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false
        }
    }

    handleClose() {
        this.setState({
            show: false
        })
    }

    handleClick() {
        this.setState({
            show: true
        })
    }

    render() {
        return (
            <>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">WIP</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/app">Watch & Analyze</Nav.Link>
                            <Nav.Link href="/analytics">Analytics</Nav.Link>
                        </Nav>
                        <Button variant="outline-primary" onClick = {this.handleClick}>Login</Button>
                    </Navbar.Collapse>
                </Navbar>

                <Modal size = "lg" show = {this.state.show} onHide = {this.handleClose}>
                    <Tabs defaultActiveKey = "login">
                        <Tab eventKey = "login" title = "Login">
                            <LoginPage />
                        </Tab>
                        <Tab eventKey = "register" title = "Register">
                            <RegisterPage />
                        </Tab>
                    </Tabs>
                </Modal>
            </>
        );
    }
}

export default NavigationBar;