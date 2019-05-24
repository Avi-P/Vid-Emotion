import React from "react";

import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);

        this.state = {
            Login: "",
            Password: "",
            ConfirmPassword: ""
        }
    }

    handleUsernameChange(event) {
        this.setState({
            Login: event.target.value,
            Password: this.state.Password,
            ConfirmPassword: this.state.ConfirmPassword
        })
    }

    handlePasswordChange(event) {
        this.setState({
            Login: this.state.Login,
            Password: event.target.value,
            ConfirmPassword: this.state.ConfirmPassword
        })
    }

    handleConfirmPasswordChange(event) {
        this.setState({
            Login: this.state.Login,
            Password: this.state.Password,
            ConfirmPassword: event.target.value
        })
    }

    checkPassword() {
        if (String(this.state.Password).length >= 8) {
            return "✓";
        }
        else {
            return "X";
        }
    }

    checkConfirmPassword() {
        if (this.state.Password === this.state.ConfirmPassword && this.checkPassword() === "✓") {
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

                <div className="loginButton">
                    <Button variant="primary" size="md" block>
                        Register
                    </Button>
                </div>
            </>

        )
    }
}

export default RegisterPage