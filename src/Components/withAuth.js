import React, {Component} from 'react';

import AuthenticationHelper from "./AuthenticationHelper"

/* Class to protect components with authentication */
export default function withAuth(ProtectedComponent) {
    return class extends Component {

        /* Constructor */
        constructor() {
            super();

            this.state = {
                loading: true,
                redirect: false,
            };
        }

        /* Performs HTTP Request to check token when component mounts */
        componentDidMount() {
            fetch('http://localhost:8080/api/checkToken', {
                credentials: 'same-origin',
                method: 'GET',
                headers: {
                    "content-type" : "application/json",
                    'Authorization': "Bearer " + AuthenticationHelper.getToken(),
                }
            }).then(res => {
                    if (res.status === 200) {
                        this.setState({
                            loading: false
                        });
                    }
                    else {
                        throw new Error(res.error);
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.setState({ loading: false, redirect: true });
                });
        }

        /* Sends different front-end code depending on whether user is authenticated */
        render() {
            const {loading, redirect} = this.state;

            if (loading) {

                /* Shown while token is checked */
                return (
                    <React.Fragment>
                        <h1> Loading </h1>
                    </React.Fragment>
                )
            }
            if (redirect) {

                /* Returned if user is not authenticated in */
                return (
                    <React.Fragment>
                        <h2> Please go back and log In </h2>
                    </React.Fragment>
                )
            }

            /* Return the normal page if user is authenticated */
            return (
                <React.Fragment>
                    <ProtectedComponent {...this.props} />
                </React.Fragment>
            );
        }
    }
}