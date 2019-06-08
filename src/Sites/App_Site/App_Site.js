import React from 'react';

import NavigationBar from "../../Components/NavigationBar.js";
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import YouTube from "react-youtube"

import "./App_Site.css"
import AuthenticationHelper from "../../Components/AuthenticationHelper";

/* Application Site */
class AppSite extends React.Component {

    /* Constructor/props/state */
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.showFrameFunc = this.showFrameFunc.bind(this);
        this.handleVideoEnd = this.handleVideoEnd.bind(this);

        this.state = {
            YTVideo: "",
            showFrame: false,
            showEmotionPicker: false,
            choice: ""
        };
    }

    /* Updates state with value of the form for YouTube video link */
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

    /* Updates state for when user clicks go to display YouTube video */
    handleClick() {
        this.setState({
            YTVideo: this.state.YTVideo,
            showFrame: true
        })
    }

    /* Called when video ends, used to update state to show more components for rest of application */
    handleVideoEnd() {
        this.setState({
            YTVideo: this.state.YTVideo,
            showFrame: this.state.showFrame,
            showEmotionPicker: true
        })
    }

    /* Called when a choice is made by the user */
    handlePick(event) {
        this.setState({
            choice: event.target.value
        })

        return;
    }

    handleSubmit() {
        const url = "http://localhost:8080/api/emotion";

        const data = {
            "videoID": this.state.YTVideo,
            "emotion": this.state.choice
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
                // that.setState({
                //     showResult: true,
                //     resultText: "Error Registering"
                // });
            }
            else {
                // that.setState({
                //     showResult: true,
                //     resultText: "Registration Successful"
                // });
            }

            console.log(response);
        })
    }

    /* Shows emotion picker */
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

    /* Shows Youtube Video */
    showFrameFunc() {
        let picker = this.showEmotionPicker();

        /* Options for YouTube video */
        const options = {
            height: '480',
            width: '720',
            playerVars: {
                autoplay: 1
            }
        };

        if (this.state.showFrame) {

            let YouTubePlayer = (
                <YouTube
                    videoId = {this.state.YTVideo}
                    opts = {options}
                    onEnd = {this.handleVideoEnd}
                />);

            //console.log(YouTubePlayer.props.internalPlayer);

            return <div className = "YTFrame">
                {YouTubePlayer}

                {picker}

            </div>;
        }
        else {
            //return <h3 className = "linkForm"> Enter a link in and lets get this party started! </h3>;
        }
    }

    /* Contains code for what is shown on screen */
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