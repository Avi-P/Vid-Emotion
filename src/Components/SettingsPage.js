import React from "react";

import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import AuthenticationHelper from "./AuthenticationHelper";

import "./SettingsPage.css"

/* Settings page which holds the options to change passwords */
class SettingsPage extends React.Component {

    /* Contains state variables and bindings */
    constructor(props) {
        super(props);

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this);
        this.change = this.change.bind(this);

        this.state = {
            OldPassword: "",
            Password: "",
            ConfirmPassword: "",
            PasswordGood: false
        }
    }

    /* Updates state oldPassword variable as password changes */
    handleOldPasswordChange(event) {
        this.setState({
            OldPassword: event.target.value,
        })
    }

    /* Updates state password variable as password changes */
    handlePasswordChange(event) {
        this.setState({
            Password: event.target.value,
        })
    }

    /* Updates state confirm password variable as password changes */
    handleConfirmPasswordChange(event) {
        this.setState({
            ConfirmPassword: event.target.value
        }, () => {
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

    /* Checks if password meets security requirement */
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

    /* Performs HTTP Request to do change password in the mongodb */
    change() {
        let that = this;

        const url = "http://localhost:8080/api/changePassword";

        const data = {
            "oldPassword": that.state.OldPassword,
            "newPassword": that.state.Password
        };

        fetch(url, {
            credentials: 'same-origin',
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "content-type" : "application/json",
                'Authorization': "Bearer " + AuthenticationHelper.getToken(),
            }
        }).then(function(response) {

            if (response.status === 500) {
                that.setState({
                    showResult: true,
                    resultText: "Error Registering"
                });
            }
            else if (response.status === 401) {
                that.setState({
                    showResult: true,
                    resultText: "Wrong Password"
                });
            }
            else {
                that.setState({
                    showResult: true,
                    resultText: "Password Change Successful"
                });
            }
        })
    }

    /* Logic for whether register button should show. Depends on password matching and security requirement */
    showButton() {
        if (this.state.PasswordGood === true) {
            return (
                <div className="submitButton">
                    <Button variant="primary" size="md" block onClick={this.change}>
                        Change Password
                    </Button>
                </div>
            )
        }
        else {
            return (
                <div className="submitButton">
                    <Button variant="primary" size="md" block disabled>
                        Change Password
                    </Button>
                </div>
            )
        }
    }

    /* Method that contains HTML for user */
    render() {
        return (
            <>
                <InputGroup className="formInput">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="change"> Old Password </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl placeholder = "Password" onChange = {this.handleOldPasswordChange}/>
                </InputGroup>

                <InputGroup className="formInput">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="change"> New Password </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl placeholder = "Password" onChange = {this.handlePasswordChange}/>
                    <InputGroup.Append>
                        <InputGroup.Text> {this.checkPassword()}</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>

                <InputGroup className="formInput">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="change"> Confirm New Password </InputGroup.Text>
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

export default SettingsPage