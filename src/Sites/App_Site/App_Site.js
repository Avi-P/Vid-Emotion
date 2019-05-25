import React from 'react';

import NavigationBar from "../../Components/NavigationBar.js";
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import YouTube from "react-youtube"

import "./App_Site.css"

class AppSite extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.showFrameFunc = this.showFrameFunc.bind(this);
        this.handleVideoEnd = this.handleVideoEnd.bind(this);

        this.state = {
            YTVideo: "",
            showFrame: false,
            showEmotionPicker: false
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

    handleVideoEnd() {
        this.setState({
            YTVideo: this.state.YTVideo,
            showFrame: this.state.showFrame,
            showEmotionPicker: true
        })
    }

    showEmotionPicker() {
        if (this.state.showEmotionPicker) {
            return <div>
                        <Form.Group>
                            <Form.Label>How did you feel about this video?</Form.Label>
                            <Form.Control as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                </div>;

        }
    }

    showFrameFunc() {
        let picker = this.showEmotionPicker();

        const options = {
            height: '480',
            width: '720',
            playerVars: {
                autoplay: 1
            }
        };

        if (this.state.showFrame) {
            return <div className = "YTFrame">
                <YouTube
                    videoId = {this.state.YTVideo}
                    opts = {options}
                    onEnd = {this.handleVideoEnd}
                />

                {picker}

            </div>;
        }
        else {
            //return <h3 className = "linkForm"> Enter a link in and lets get this party started! </h3>;
        }
    }

    render() {
        let frame = this.showFrameFunc();
        let picker = this.showEmotionPicker();

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