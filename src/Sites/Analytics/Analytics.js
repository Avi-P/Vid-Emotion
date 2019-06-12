import React from 'react';

import NavigationBar from "../../Components/NavigationBar.js";
import Button from "react-bootstrap/Button"
import AuthenticationHelper from "../../Components/AuthenticationHelper";

/* Analytics page, WIP */
class Analytics extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const url = "http://localhost:8080/api/emotion/history";

        const that = this;

        fetch(url, {
            credentials: 'same-origin',
            method: 'GET',
            headers: {
                "content-type" : "application/json",
                'Authorization': "Bearer " + AuthenticationHelper.getToken(),
            }
        }).then(function(response) {
            console.log(response);
        })
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                < h1 > Analytics </h1>
                    <Button variant="primary" size="md" block onClick = {this.handleSubmit}>
                        Submit
                    </Button>
            </div>
        )
    }
}


export default Analytics;