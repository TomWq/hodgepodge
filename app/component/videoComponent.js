/**
 * @flow
 */
import React from 'react';
import {View, Image, StatusBar,Text, Slider, TouchableWithoutFeedback,
    TouchableOpacity, StyleSheet,BackHandler} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import {observer} from 'mobx-react'
import {VideoStore} from "../store";
import {Images} from "../assest";

@observer
export default class VideoPlayScreen extends React.Component {


    componentDidMount() {
        //StatusBar.setBarStyle('light-content');
        BackHandler.addEventListener('back',VideoStore.back)
    }

    componentWillUnmount() {
        BackHandler.addEventListener('back',VideoStore.back)
    }

    render() {
        return (
            <View style={styles.container} onLayout={VideoStore._onLayout}>
                <View style={{ width:  VideoStore.videoWidth, height:VideoStore.videoHeight }}>
                    <Video
                        ref='videoPlayer'
                        source={{uri: this.props.videoUrl}}
                        rate={1.0}
                        volume={1.0}
                        muted={false}
                        repeat={false}
                        paused={!VideoStore.isPlaying}
                        resizeMode={'cover'}
                        playWhenInactive={false}
                        playInBackground={false}
                        ignoreSilentSwitch={'ignore'}
                        progressUpdateInterval={250.0}
                        onLoadStart={VideoStore.onLoadStart}
                        onLoad={VideoStore.onLoad}
                        onProgress={VideoStore.onProgressChanged}
                        onEnd={VideoStore.onPlayEnd}
                        onError={VideoStore.onPlayError}
                        onBuffer={VideoStore.onBuffering}
                        style={{width: VideoStore.videoWidth, height: VideoStore.videoHeight}}
                    />
                    {
                        VideoStore.showVideoCover ?
                            <Image
                                style={{
                                    position:'absolute',
                                    top: 0,
                                    left: 0,
                                    width: VideoStore.videoWidth,
                                    height: VideoStore.videoHeight,
                                }}
                                resizeMode={'cover'}
                                source={{uri: this.props.videoCover}}
                            /> : null
                    }
                    <TouchableWithoutFeedback onPress={VideoStore.hideControl}>
                        <View
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: VideoStore.videoWidth,
                                height: VideoStore.videoHeight,
                                backgroundColor: VideoStore.isPlaying ? 'transparent' : 'rgba(0, 0, 0, 0.5)',
                                alignItems:'center',
                                justifyContent:'center'}}>
                            {
                                VideoStore.isPlaying ? null :
                                    VideoStore.isPlayComplete?
                                        <TouchableWithoutFeedback
                                            onPress={VideoStore.playVideo}
                                        >
                                            <Image
                                                style={styles.repeatButton}
                                                source={Images.video.repeat}
                                            />
                                        </TouchableWithoutFeedback>:
                                        <TouchableWithoutFeedback onPress={VideoStore.onPressPlayButton}>
                                            <Image
                                                style={styles.playButton}
                                                source={Images.video.icon_video_play}
                                            />
                                        </TouchableWithoutFeedback>
                            }
                        </View>
                    </TouchableWithoutFeedback>

                    {
                        VideoStore.showVideoControl ?
                            <View style={[styles.control, {width: VideoStore.videoWidth}]}>
                                <TouchableOpacity activeOpacity={0.3} onPress={VideoStore.onControlPlayPress}>
                                    <Image
                                        style={styles.playControl}
                                        source={VideoStore.isPlaying ? Images.video.icon_control_pause :Images.video.icon_control_play}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.time}>{VideoStore.formatTime(VideoStore.currentTime)}</Text>
                                <Slider
                                    style={{flex: 1}}
                                    maximumTrackTintColor={'#999999'}
                                    minimumTrackTintColor={'#c0b913'}
                                    thumbImage={Images.video.slider}
                                    value={VideoStore.currentTime}
                                    minimumValue={0}
                                    maximumValue={VideoStore.duration}
                                    onValueChange={this.onSliderValueChanged}
                                />
                                <Text style={styles.time}>{VideoStore.formatTime(VideoStore.duration)}</Text>
                                <TouchableOpacity activeOpacity={0.3} onPress={VideoStore.onControlShrinkPress}>
                                    <Image
                                        style={styles.shrinkControl}
                                        source={!VideoStore.isFullScreen ?Images.video.icon_control_shrink_screen : Images.video.icon_control_full_screen}
                                    />
                                </TouchableOpacity>
                            </View> : null
                    }
                    {

                        VideoStore.isFullScreen?

                            VideoStore.showVideoControl ?
                                <View
                                    style={[styles.headerTop,{width: VideoStore.videoWidth}]}>
                                    <TouchableOpacity style={styles.back1} activeOpacity={1} onPress={VideoStore.onControlShrinkPress}>
                                        <Image
                                            style={{width:30,height:30}}
                                            source={Images.video.back}/>
                                    </TouchableOpacity>
                                    {/*<Text style={styles.title}>这是标题</Text>*/}
                                    {/*<View style={{flexDirection:'row',alignItems:'center'}}>*/}
                                        {/*<TouchableOpacity*/}
                                            {/*activeOpacity={0.8}*/}
                                            {/*onPress={VideoStore.closeRequire()}*/}
                                        {/*>*/}
                                            {/*<Image*/}
                                                {/*style={styles.danmu}*/}
                                                {/*source={VideoStore.barrage?Images.video.dan_open:Images.video.dan_close}/>*/}
                                        {/*</TouchableOpacity>*/}
                                        {/*<TouchableOpacity style={{marginRight:20}}>*/}
                                            {/*<Image*/}
                                                {/*style={{width:20,height:20}}*/}
                                                {/*source={Images.video.share}/>*/}
                                        {/*</TouchableOpacity>*/}
                                    {/*</View>*/}
                                </View>: null:
                            <View style={styles.topBarView}>

                            </View>
                    }
                </View>

            </View>
        )
    }

    /// 进度条值改变
    onSliderValueChanged(currentTime:number) {

        this.refs.videoPlayer.seek(currentTime);

        if (VideoStore.video.isPlaying) {
            VideoStore.video.currentTime = currentTime
        } else {
            VideoStore.video.currentTime= currentTime;
            VideoStore.video.isPlaying = true;
            VideoStore.video.showVideoCover = false
        }
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0'
    },
    playButton: {
        width: 50,
        height: 50,
    },
    repeatButton:{
        width:40,
        height:40
    },
    playControl: {
        width: 20,
        height: 20,
        marginLeft: 15,
    },
    shrinkControl: {
        width: 15,
        height: 15,
        marginRight: 15,
    },
    time: {
        fontSize: 12,
        color: 'white',
        marginLeft: 10,
        marginRight: 10
    },
    control: {
        flexDirection: 'row',
        height: 35,
        alignItems:'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    headerTop:{
        position: 'absolute',
        top: 0,
        left: 0,
        flexDirection: 'row',
        height: 54,
        alignItems:'center',
        justifyContent:'space-between'
    },
    back:{

    },
    back1:{

    },
    title:{
        fontSize:18,
        color:'#fff'
    },
    topBarView:{
        position: 'absolute',
        top: 0,
        left: 0,
        flexDirection: 'row',
        height: 66,
        alignItems:'center',
        justifyContent:'space-between',
        width:WIDTH,
    },
    danmu:{
        width:30,
        height:30,
        marginRight:15
    },
    danView:{
        position: 'absolute',
        top: 40,
        left: 0,
        overflow:'hidden',
        zIndex:99,
        backgroundColor:'red'
    }
});