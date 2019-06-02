import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

export default function withAuth(ProtectedComponent) {
    return class extends Component {
        constructor() {
            super();

            this.state = {
                loading: true,
                redirect: false,
            };
        }

        getToken = () => {
            // Retrieves the user token from localStorage
            return localStorage.getItem("app_token");
        };

        componentDidMount() {
            fetch('http://localhost:8080/api/checkToken', {
                credentials: 'same-origin',
                method: 'GET',
                headers: {
                    "content-type" : "application/json",
                    'Authorization': "Bearer " + this.getToken(),
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

        render() {
            const {loading, redirect} = this.state;

            if (loading) {
                return (
                    <React.Fragment>
                        <h1> Loading </h1>
                    </React.Fragment>
                )
            }
            if (redirect) {
                return (
                    <React.Fragment>
                        <h1> Please Log In</h1>
                    </React.Fragment>
                )
            }

            return (
                <React.Fragment>
                    <ProtectedComponent {...this.props} />
                </React.Fragment>
            );
        }
    }
}