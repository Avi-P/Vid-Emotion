import React from 'react';
import YouTube from "react-youtube"

class YTiFrame extends React.Component {

    render() {
        const options = {
            height: '480',
            width: '720',
            playerVars: {
                autoplay: 1
            }
        };

        return (
            <YouTube
                videoId = {this.props.videoId}
                opts = {options}
            />
        )
    }
}

export default YTiFrame