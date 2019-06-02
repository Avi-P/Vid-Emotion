import React from "react";
import { withRouter } from "react-router-dom";

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
        this.test = this.test.bind(this);

        this.state = {
            Login: "",
            Password: "",
            showResult: false,
            resultText: ""
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

    setToken = idToken => {
        // Saves user token to localStorage
        localStorage.setItem("app_token", idToken);
    };

    getToken = () => {
        // Retrieves the user token from localStorage
        return localStorage.getItem("app_token");
    };

    login() {
            const url = "http://localhost:8080/api/login";

            let that = this;

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
            }).then(function(res) {
                return res.json();
            }).then(function(response) {

                if (response.status === 401) {
                    that.setState({
                        showResult: true,
                        resultText: "Incorrect Email/Password"
                    });
                }
                else if (response.status === 500) {
                    that.setState({
                        showResult: true,
                        resultText: "Internal Error"
                    });
                }
                else {
                    //console.log(response.headers);

                    that.setToken(response.token);

                    that.setState({
                        showResult: true,
                        resultText: "Login Successful"
                    });

                    console.log(response);

                    //return Promise.resolve(response);
                }
            });

    }

    test() {
        const url = "http://localhost:8080/api/secret";

        let that = this;

        console.log("Bearer " + that.getToken());

        fetch(url, {
            credentials: 'same-origin',
            method: 'GET',
            headers: {
                "content-type" : "application/json",
                'Authorization': "Bearer " + that.getToken(),
            }
        }).then(function(response) {
            console.log(response.text());
        });

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
                    <FormControl type="password" placeholder = "Password" onChange = {this.handlePasswordChange}/>
                </InputGroup>

                <div className="loginButton">
                    <Button variant="primary" size="md" block onClick = {this.login}>
                        Login
                    </Button>
                </div>

                <div className="loginButton">
                    <Button variant="primary" size="md" block onClick = {this.test}>
                        Test
                    </Button>
                </div>


                {this.state.showResult && <h3 className="resultText"> {this.state.resultText} </h3>}
            </>

        )
    }
}

export default withRouter(LoginPage)
