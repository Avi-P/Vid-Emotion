import React from 'react';

import NavigationBar from "../../Components/NavigationBar.js";
import Button from "react-bootstrap/Button"
import AuthenticationHelper from "../../Components/AuthenticationHelper";

/* Analytics page, WIP */
class Analytics extends React.Component {
    constructor(props) {
        super(props);

        this.handleSummarySubmit.bind(this);
        this.handleHistorySubmit.bind(this);
    }

    handleSummarySubmit() {
        const url = "http://localhost:8080/api/emotion/summary";

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

    handleHistorySubmit() {
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
                    <Button variant="primary" size="md" block onClick = {this.handleSummarySubmit}>
                        Summary
                    </Button>
                <Button variant="primary" size="md" block onClick = {this.handleHistorySubmit}>
                    History
                </Button>
            </div>
        )
    }
}


export default Analytics;