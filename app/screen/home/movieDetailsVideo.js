import React from 'react';
import {View} from 'react-native';
import {style} from "./style";
import VideoPlayScreen from '../../component/videoComponent';

const  MovieDetailsVideo = (props)=>(

    <View style={style.movieDetailsVideoView}>
        <VideoPlayScreen videoUrl={props.videoUrl} videoCover={props.videoCover}/>
    </View>
)

export {
    MovieDetailsVideo
}