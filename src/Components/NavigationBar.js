import React from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Dropdown from 'react-bootstrap/Dropdown'

import LoginPage from "./LoginPage"
import RegisterPage from "./RegisterPage";

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.removeToken = this.removeToken.bind(this);

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

    showLoginOrLogOut() {
        {if (this.getToken() != null) {
            return (<Dropdown>
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                    Logged In
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick = {this.removeToken}>Log Out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>);
        }
        else {
            return (<Button variant="outline-primary" onClick = {this.handleClick}>Login</Button>);
        }}
    }

    getToken = () => {
        // Retrieves the user token from localStorage
        return localStorage.getItem("app_token");
    };

    removeToken = () => {
        localStorage.removeItem("app_token");
        window.location.reload();
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

                        {this.showLoginOrLogOut()}

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