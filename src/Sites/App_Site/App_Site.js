import React from 'react';

import NavigationBar from "../../Components/NavigationBar.js";
import AuthenticationHelper from "../../Components/AuthenticationHelper";

import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import Carousel from 'react-bootstrap/Carousel'

import YouTube from "react-youtube"
import Webcam from "react-webcam";

import "./App_Site.css"

/* Application Site */
class AppSite extends React.Component {

    /* Constructor/props/state */
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.showFrameFunc = this.showFrameFunc.bind(this);
        this.handleVideoEnd = this.handleVideoEnd.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setCamera = this.setCamera.bind(this);
        this.capture = this.capture.bind(this);
        this.startCapture = this.startCapture.bind(this);
        this.stopCapture = this.stopCapture.bind(this);

        this.state = {
            YTVideo: "",
            showFrame: false,
            showEmotionPicker: true,
            choice: 1,
            imagesIn : false,
            images : [],
            interval : "",
            submitted : false
        };
    }

    /* Updates state with value of the form for YouTube video link */
    handleChange(event) {

        /* Handles case where video tag is removed */
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
            showFrame: true,
            showEmotionPicker: true
        })
    }

    /* Called when video ends, used to update state to show more components for rest of
     * and stop picture capturing */
    handleVideoEnd() {
        this.stopCapture();

        this.setState({
            YTVideo: this.state.YTVideo,
            showFrame: this.state.showFrame,
            showEmotionPicker: true
        })
    }

    /* Called when a choice is made by the user */
    handlePick(event) {

        let rating = 5;

        if (event.target.value === "Engaging!") {
            rating = 5;
        }
        else if (event.target.value === "Interesting.") {
            rating = 4;
        }
        else if (event.target.value === "Alright. Somewhat Interesting.") {
            rating = 3;
        }
        else if (event.target.value === "Eh, not really meant for me.") {
            rating = 2;
        }
        else if (event.target.value === "Boring.") {
            rating = 1;
        }

        this.setState({
            choice: rating
        });

        return;
    }

    /* POSTs to API to save the data in db */
    handleSubmit() {

        const url = "http://localhost:8080/api/emotion";

        const that = this;

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

            that.setState({
                submitted : true
            });
        })
    }

    /* Shows emotion picker */
    showEmotionPicker() {
        if (this.state.showEmotionPicker) {
            if (!this.state.submitted) {
                return <div>
                    <Form.Group>
                        <Form.Label>How did you feel about this video?</Form.Label>
                        <Form.Control as="select" onChange={this.handlePick}>
                            <option>Engaging!</option>
                            <option>Interesting.</option>
                            <option>Alright. Somewhat Interesting.</option>
                            <option>Eh, not really meant for me.</option>
                            <option>Boring.</option>
                        </Form.Control>
                    </Form.Group>

                    <div className="PickButton">
                        <Button variant="primary" size="md" block onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </div>
                </div>;
            }
            else {
                return <div>
                    <center>
                        <h2> Submitted </h2>
                    </center>
                </div>
            }
        }
    }

    /* Generates a carousel component with images */
    generateCarousel() {
        if (this.state.imagesIn === true) {
            let data = [];

            /* Forms carousel content using the images stored in state array */
            for (let i = this.state.images.length - 1; i >= 0; i--) {
                data.push(
                    <Carousel.Item>
                        <img
                            src={this.state.images[i]}
                        />
                    </Carousel.Item>
                )
            }

            /* Returns carousel code */
            return (<div className = "images">
                <h2> <center> Images for help: </center> </h2>
                <Carousel>
                    {data}
                </Carousel>
            </div>)
        }
    }

    /* Shows Youtube Video */
    showFrameFunc() {
        let picker = this.showEmotionPicker();

        let carousel = this.generateCarousel();

        /* Options for YouTube video */
        const options = {
            height: '480',
            width: '720',
            playerVars: {
                autoplay: 1
            }
        };

        const videoConstraints = {
            width: 720,
            height: 480,
            facingMode: "user"
        };

        if (this.state.showFrame) {

            /* Making the YouTube player */
            let YouTubePlayer = (
                <YouTube
                    videoId = {this.state.YTVideo}
                    opts = {options}
                    onReady = {this.startCapture}
                    onEnd = {this.handleVideoEnd}
                />);

            return <div>

                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>

                        <div className="inline">

                            {YouTubePlayer}

                            <Webcam
                                    audio={false}
                                    height={480}
                                    ref={this.setCamera}
                                    screenshotFormat="image/jpeg"
                                    videoConstraints={videoConstraints}
                                    width={720}
                            />
                        </div>

                </div>

                {carousel}

                <div className = "picker">
                    {picker}
                </div>

            </div>;
        }
        else {
            //return <h3 className = "linkForm"> Enter a link in and lets get this party started! </h3>;
        }
    }

    /* Maps this.camera to camera object */
    setCamera(webcam) {
        this.webcam = webcam;
    }

    /* Captures an image from the camera and saves it to state array */
    async capture() {
        const img = this.webcam.getScreenshot();

        let imagesArr = this.state.images;
        imagesArr.push(img);

        this.setState({
            imagesIn: true,
            images: imagesArr
        })
    }

    /* Used to start a service that will capture an image every 30 seconds */
    startCapture() {
        let interval = setInterval(this.capture, 30000);

        this.setState({
            interval: interval
        })
    }

    /* Stops interval capture */
    stopCapture() {
        clearInterval(this.state.interval);

        this.setState({
            interval: ""
        })
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