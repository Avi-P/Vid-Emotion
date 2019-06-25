import React from "react";
import { withRouter } from "react-router-dom";

import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"

import "./LoginPage.css"

import AuthenticationHelper from "./AuthenticationHelper"

/* Page to login/authenticate */
class LoginPage extends React.Component {

    /* Constructor for page and props/states */
    constructor(props) {
        super(props);

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.login = this.login.bind(this);
        this.test = this.test.bind(this);

        this.state = {
            Login: "",
            Password: "",
            showResult: false,
            resultText: ""
        }
    }

    /* Used to update state variable as the username value changes */
    handleUsernameChange(event) {
        this.setState({
            Login: event.target.value,
            Password: this.state.Password
        })
    }

    /* Used to update password state variable as the password value changes */
    handlePasswordChange(event) {
        this.setState({
            Login: this.state.Login,
            Password: event.target.value
        })
    }

    /* Called when login button is pressed. HTTP Request to login and calls a method to save JWT token */
    login() {
            const url = "http://localhost:8080/api/login";

            let that = this;

            const data = {
                "username": this.state.Login,
                "password": this.state.Password
            };

            //Fetching with API
            fetch(url, {
                credentials: 'same-origin',
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "content-type" : "application/json"
                }
            }).then(function(res) {
                if (res.status === 401) {
                    that.setState({
                        showResult: true,
                        resultText: "Incorrect Username/Password"
                    });
                }
                else if (res.status === 500) {
                    that.setState({
                        showResult: true,
                        resultText: "Internal Error."
                    });
                }

                return res.json();
            }).then(function(response) {

                if (response.error) {
                    return;
                }

                //Calling method to store returned token into local storage
                AuthenticationHelper.setToken(response.token);

                that.setState({
                    showResult: true,
                    resultText: "Login Successful"
                });

                return Promise.resolve(response);
            });

    }

    /* Test HTTP Request to check if token authentication works */
    test() {
        const url = "http://localhost:8080/api/secret";

        fetch(url, {
            credentials: 'same-origin',
            method: 'GET',
            headers: {
                "content-type" : "application/json",
                'Authorization': "Bearer " + AuthenticationHelper.getToken(),
            }
        }).then(function(response) {

        });
    }

    /* Contains what is shown on the page */
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
                    <FormControl type="password" placeholder = "Password" onChange = {this.handlePasswordChange}/>
                </InputGroup>

                <div className="loginButton">
                    <Button variant="primary" size="md" block onClick = {this.login}>
                        Login
                    </Button>
                </div>

                {this.state.showResult && <h3 className="resultText"> {this.state.resultText} </h3>}
            </>

        )
    }
}

export default withRouter(LoginPage)