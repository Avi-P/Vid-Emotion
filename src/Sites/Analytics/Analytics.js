import React from 'react';

import NavigationBar from "../../Components/NavigationBar.js";
import Button from "react-bootstrap/Button"
import Table from "react-bootstrap/Table"

import AuthenticationHelper from "../../Components/AuthenticationHelper";

/* Analytics page, WIP */
class Analytics extends React.Component {
    constructor(props) {
        super(props);

        this.handleSummarySubmit = this.handleSummarySubmit.bind(this);
        this.handleHistorySubmit = this.handleHistorySubmit.bind(this);

        this.state = {
            summary : [],
            history : [],
            showHistory: false
        }
    }

    handleSummarySubmit() {
        const url = "http://localhost:8080/api/emotion/summary";

        let that = this;

        fetch(url, {
            credentials: 'same-origin',
            method: 'GET',
            headers: {
                "content-type" : "application/json",
                'Authorization': "Bearer " + AuthenticationHelper.getToken(),
            }
        }).then(function(response) {
            return response.json();
        }).then(function(res){
            console.log(res);
            that.setState({
                summary : res
            });
        });
    }

    handleHistorySubmit() {
        const url = "http://localhost:8080/api/emotion/history";

        let that = this;

        fetch(url, {
            credentials: 'same-origin',
            method: 'GET',
            headers: {
                "content-type" : "application/json",
                'Authorization': "Bearer " + AuthenticationHelper.getToken(),
            }
        }).then(function(response) {
            return response.json();
        }).then(function(res){
            console.log(res);
           that.setState({
               history: res,
               showHistory: true
           });
        });
    }

    makeHistoryList() {
        if (this.state.history !== "") {
            let data = [];

            //console.log(this.state.history);

            for (let i = 0; i < this.state.history.length; i++) {
                data.push(<tr>
                    <td> {this.state.history[i].topic} </td>
                    <td> {this.state.history[i].rating} </td>
                </tr>);

                console.log(this.state.history[i]);
            }

            return <div>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Rating</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data}
                    </tbody>
                </Table>
            </div>;
        }
    }

    render() {
        let picker = this.makeHistoryList();

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

                {picker}
            </div>
        )
    }
}


export default Analytics;