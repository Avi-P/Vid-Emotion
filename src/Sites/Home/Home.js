import React from 'react';

import NavigationBar from "../../Components/NavigationBar.js";
import Jumbotron from 'react-bootstrap/Jumbotron'

import "./Home.css"

/* Home page of the web app */
function Home() {
    return <>
            <NavigationBar />
            <Jumbotron>
                <h1 className = "helloIntro">Hello, video watchers!</h1>
                <p className = "introText">
                    This web application is aimed at helping users figure what category of content they respond to best.
                    As you watch a YouTube video, we will periodically take pictures using your camera. At the end of the
                    video we will analyze the pictures for facial expressions and come up with a rating on your emotions
                    toward the video and the category of the video.
                </p>

            </Jumbotron>;
    </>;
}


export default Home;