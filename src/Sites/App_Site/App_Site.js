import React from 'react';

import NavigationBar from "../../Components/NavigationBar.js";
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"

import "./App_Site.css"

import YTiFrame from "../../Components/YTiFrame"

class AppSite extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.showFrameFunc = this.showFrameFunc.bind(this);

        this.state = {
            YTVideo: "",
            showFrame: false,
        };
    }

    handleChange(event) {

        if (event.target.value === "") {
            this.setState({
                YTVideo: event.target.value,
                showFrame: false
            })

            return;
        }


        this.setState({
            YTVideo: event.target.value,
            showFrame: this.state.showFrame
        })
    }

    handleClick() {
        this.setState({
            YTVideo: this.state.YTVideo,
            showFrame: true
        })
    }

    showFrameFunc() {
        if (this.state.showFrame) {
            return <div className = "YTFrame">
                <YTiFrame videoId = {this.state.YTVideo} />
            </div>;
        }
        else {
            return <h3 className = "linkForm"> Enter a link in and lets get this party started! </h3>;
        }
    }

    render() {
        let frame = this.showFrameFunc();

        return (
            <div>
                <NavigationBar/>
                <InputGroup className="linkForm">
                    <InputGroup.Prepend>
                        <InputGroup.Text> youtu.be/</InputGroup.Text>
                    </InputGroup.Prepend>

                    <FormControl placeholder="YouTube Video Tag" onChange = {this.handleChange}/>

                    <InputGroup.Append>
                        <Button variant="primary" size="md" active onClick={this.handleClick}>
                            Go!
                        </Button>
                     </InputGroup.Append>
                 </InputGroup>

                {frame}

            </div>
        )
    }
}

export default AppSite;