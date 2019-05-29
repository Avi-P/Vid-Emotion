import React from "react";

import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import "./LoginPage.css"

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.login = this.login.bind(this);

        this.state = {
            Login: "",
            Password: ""
        }
    }

    handleUsernameChange(event) {
        this.setState({
            Login: event.target.value,
            Password: this.state.Password
        })
    }

    handlePasswordChange(event) {
        this.setState({
            Login: this.state.Login,
            Password: event.target.value
        })
    }

    login() {
        const url = "http://localhost:8080/api/login";

        const data = {
            "username": this.state.Login,
            "password": this.state.Password
        };

        fetch(url, {
            credentials: 'same-origin',
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "content-type" : "application/json"
            }
        }).then(res => console.log(res));
    }

    render() {
        return (
            <>
                <InputGroup className="formInput">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="login"> Username </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl placeholder = "Username" onChange = {this.handleUsernameChange}/>
                </InputGroup>

                <InputGroup className="formInput">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="login"> Password </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl placeholder = "Password" onChange = {this.handlePasswordChange}/>
                </InputGroup>

                <div className="loginButton">
                    <Button variant="primary" size="md" block onClick = {this.login}>
                        Login
                    </Button>
                </div>
            </>

        )
    }
}

export default LoginPage
