import React from 'react';

import NavigationBar from "../../Components/NavigationBar.js";
import Jumbotron from 'react-bootstrap/Jumbotron'
import Card from 'react-bootstrap/Card'
import CardDeck from "react-bootstrap/CardDeck"

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

            </Jumbotron>


            <center>
                <h2 className = "works"> How It Works </h2>
                <br></br>

                <div className="cards">
                    <CardDeck>
                        <Card border="primary" bg="light" style={{ width: '10rem' }}>
                            <Card.Header>First Step</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Register an account. This is to keep track of data.
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card border="primary" bg="light" style={{ width: '10rem' }}>
                            <Card.Header>Second Step</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Navigate to the Watch & Analyze Page and enter in a YouTube video ID.
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card border="primary" bg="light" style={{ width: '18rem' }}>

                            <Card.Header>Third Step</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Any point during the video, submit a rating of the video you are watching.
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card border="primary" bg="light" style={{ width: '18rem' }}>
                            <Card.Header>Fourth Step</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Navigate to the Analytics page to see average rating for a category and history of all ratings submitted.
                                </Card.Text>
                            </Card.Body>
                        </Card>

                    </CardDeck>
                </div>
            </center>


    </>;
}


export default Home;