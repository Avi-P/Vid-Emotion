import React from 'react';

import NavigationBar from "../../Components/NavigationBar.js";
import Table from "react-bootstrap/Table"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"

import AuthenticationHelper from "../../Components/AuthenticationHelper";

import "./Analytics.css"

/* Analytics page */
class Analytics extends React.Component {

    /* Constructor and contains state */
    constructor(props) {
        super(props);

        this.state = {
            summary : [],
            history : [],
            key: 'Summary',
        }
    }

    /* Request to API, gets back summary data */
    handleSummaryData() {
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
            that.setState({
                summary : res
            });
        });
    }

    /* Request to API, gets back history data */
    handleHistoryData() {
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
            //console.log(res);
           that.setState({
               history: res,
               showHistory: true
           });
        });
    }

    /* Makes table using history data from api */
    makeHistoryList() {
        if (this.state.history !== "") {
            let data = [];

            /* For loop to make the table contents from the api response */
            for (let i = this.state.history.length - 1; i >= 0; i--) {
                data.push(<tr>
                    <td> {this.state.history[i].videoID} </td>
                    <td> {this.state.history[i].videoName} </td>
                    <td> {this.state.history[i].topic} </td>
                    <td> {this.state.history[i].rating} </td>
                </tr>);
            }

            /* Returns the table HTML code */
            return <div id = "table">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Video ID</th>
                            <th>Video Name</th>
                            <th>Category</th>
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

    /* Makes table using summary data from API */
    makeSummaryList() {
        if (this.state.summary !== "") {
            let data = [];

            /* For loop to make table from api response */
            for (let i = 0; i < this.state.summary.length; i++) {
                data.push(<tr>
                    <td> {this.state.summary[i]._id} </td>
                    <td> {this.state.summary[i].avg.toFixed(2)} </td>
                </tr>);
            }

            /* Returns table HTML code */
            return <div id = "table">
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

    /* When Analytics page is shown, makes API request to get data for displaying */
    componentDidMount() {
        this.handleHistoryData();
        this.handleSummaryData();
    }

    /* Contains HTML code to show */
    render() {
        let summaryTable = this.makeSummaryList();
        let historyTable = this.makeHistoryList();

        return (
            <div>
                <NavigationBar/>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={this.state.key}
                    onSelect={key => this.setState({ key })}
                >
                    <Tab eventKey="Summary" title="Summary">
                        {summaryTable}
                    </Tab>
                    <Tab eventKey="History" title="History">
                        {historyTable}
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default Analytics;