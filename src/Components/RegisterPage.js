import React from "react";

import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"

import "./RegisterPage.css"

class RegisterPage extends React.Component {

    /* Constructor/props/state */
    constructor(props) {
        super(props);

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.register = this.register.bind(this);

        this.state = {
            Login: "",
            Password: "",
            ConfirmPassword: "",
            PasswordGood: false
        }
    }

    /* Updates state username variable as username changes */
    handleUsernameChange(event) {
        this.setState({
            Login: event.target.value,
            Password: this.state.Password,
            ConfirmPassword: this.state.ConfirmPassword
        })
    }

    /* Updates state password variable as username changes */
    handlePasswordChange(event) {
        this.setState({
            Login: this.state.Login,
            Password: event.target.value,
            ConfirmPassword: this.state.ConfirmPassword
        })
    }

    /* Updates state confirm password variable as username changes */
    handleConfirmPasswordChange(event) {
        this.setState({
            Login: this.state.Login,
            Password: this.state.Password,
            ConfirmPassword: event.target.value
        }, () => {

            //Callback is used to ensure this code happens sequentially */
            if (this.checkPassword() === "✓" && String(this.state.Password) === String(this.state.ConfirmPassword)) {
                this.setState({
                    PasswordGood: true
                });
            }
            else {
                this.setState({
                    PasswordGood: false
                });
            }
        });
    }

    /* Checks if password meets security requirement. Basic reqs, can be made tougher */
    checkPassword() {
        if (String(this.state.Password).length >= 8) {
            return "✓";
        }
        else {
            return "X";
        }
    }

    /* Checks if confirm password matches password and contains logic to show checkmark or X */
    checkConfirmPassword() {
        if (this.state.PasswordGood === true) {
            return (
                <InputGroup.Append>
                    <InputGroup.Text> ✓ </InputGroup.Text>
                </InputGroup.Append>
            )
        }
        else if (this.checkPassword() === "✓"){
            return (
                <InputGroup.Append>
                    <InputGroup.Text> X </InputGroup.Text>
                </InputGroup.Append>
            )
        }
        else {
            return;
        }
    }

    /* Logic for whether register button should show. Depends on password matching and security requirement */
    showButton() {
        if (this.state.PasswordGood === true) {
            return (
                <div className="loginButton">
                    <Button variant="primary" size="md" block onClick={this.register}>
                        Register
                    </Button>
                </div>
            )
        }
        else {
            return (
                <div className="loginButton">
                    <Button variant="primary" size="md" block disabled>
                        Register
                    </Button>
                </div>
            )
        }
    }

    /* Performs HTTP Request to do registration in the mongodb */
    register() {
        let that = this;

        const url = "http://localhost:8080/api/register";

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
        }).then(function(response) {

            if (response.status === 500) {
                that.setState({
                    showResult: true,
                    resultText: "Error Registering"
                });
            }
            else if (response.status == 401) {
                that.setState({
                    showResult: true,
                    resultText: "Error Registering"
                });
            }
            else {
                that.setState({
                    showResult: true,
                    resultText: "Registration Successful"
                });
            }
        })
    }

    /* Contains code/logic for what is shown on the browser */
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
                    <InputGroup.Append>
                        <InputGroup.Text> {this.checkPassword()}</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>

                <InputGroup className="formInput">
                    <InputGroup.Prepend>
                        <InputGroup.Text> Confirm Password </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl placeholder = "Confirm Password" onChange = {this.handleConfirmPasswordChange}/>
                    {this.checkConfirmPassword()}
                </InputGroup>

                {this.showButton()}

                {this.state.showResult && <h3 className="resultText"> {this.state.resultText} </h3>}
            </>
        )
    }
}

export default RegisterPage