import React from 'react';

import NavigationBar from "../../Components/NavigationBar.js";
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"

import "./App_Site.css"

function AppSite() {
    return <>
        <NavigationBar />
            <InputGroup className = "linkForm">
                        <InputGroup.Prepend>
                            <InputGroup.Text> youtu.be/</InputGroup.Text>
                        </InputGroup.Prepend>

                        <FormControl placeholder = "YouTube Video Tag" />

                        <InputGroup.Append>
                            <Button variant = "primary" size = "md" active>
                                Go!
                            </Button>
                        </InputGroup.Append>
            </InputGroup>
    </>
}


export default AppSite;