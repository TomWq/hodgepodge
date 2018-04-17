/**
 * @flow
 */
import React, {Component} from 'react';
import {View, Dimensions, Image, StatusBar,Text, Slider, TouchableWithoutFeedback,TouchableOpacity, StyleSheet,BackHandler} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';

const screenWidth = Dimensions.get('window').width;

function formatTime(second) {
    let h = 0, i = 0, s = parseInt(second);
    if (s > 60) {
        i = parseInt(s / 60);
        s = parseInt(s % 60);
    }
    // 补零
    let zero = function (v) {
        return (v >> 0) < 10 ? "0" + v : v;
    };
    return [zero(h), zero(i), zero(s)].join(":");
}


type Props ={
    closeRequire : any,
    follow:any
}


export default class VideoPlayScreen extends React.Component<Props,any> {


    state={
        videoUrl: "https://vfx.mtime.cn/Video/2018/02/13/mp4/180213173855390220.mp4",
        videoCover: "http://img5.mtime.cn/mg/2018/02/13/174047.66929587_235X132X4.jpg",
        videoWidth: screenWidth,
        videoHeight: screenWidth * 9/16, // 默认16：9的宽高比
        showVideoCover: true,    // 是否显示视频封面
        showVideoControl: false, // 是否显示视频控制组件
        isPlaying: false,        // 视频是否正在播放
        currentTime: 0,        // 视频当前播放的时间
        duration: 0,           // 视频的总时长
        isFullScreen: false,     // 当前是否全屏显示
        statusBar:false,
        isPlayComplete:false, //是否播放完成,
        barrage:false, //弹幕
    }

    componentDidMount() {
        StatusBar.setBarStyle('light-content');
        BackHandler.addEventListener('back',this.back)
    }

    componentWillUnmount() {
        BackHandler.addEventListener('back',this.back)
    }

    back=()=>{
        if (this.state.isFullScreen){
            Orientation.lockToPortrait();
            this.setState({
                isFullScreen:false
            });
            return true
        }
        return false
    }

    render() {
        return (
            <View style={styles.container} onLayout={this._onLayout}>
                <View style={{ width: this.state.videoWidth, height: this.state.videoHeight }}>
                    <Video
                        ref='videoPlayer'
                        source={{uri: this.state.videoUrl}}
                        rate={1.0}
                        volume={1.0}
                        muted={false}
                        repeat={false}
                        paused={!this.state.isPlaying}
                        resizeMode={'cover'}
                        playWhenInactive={false}
                        playInBackground={false}
                        ignoreSilentSwitch={'ignore'}
                        progressUpdateInterval={250.0}
                        onLoadStart={() => { this.onLoadStart() }}
                        onLoad={(data) => { this.onLoaded(data) }}
                        onProgress={(data) => { this.onProgressChanged(data) }}
                        onEnd={() => { this.onPlayEnd() }}
                        onError={() => { this.onPlayError() }}
                        onBuffer={() => { this.onBuffering() }}
                        style={{width: this.state.videoWidth, height: this.state.videoHeight}}
                    />
                    {
                        this.state.showVideoCover ?
                            <Image
                                style={{
                                    position:'absolute',
                                    top: 0,
                                    left: 0,
                                    width: this.state.videoWidth,
                                    height: this.state.videoHeight,
                                }}
                                resizeMode={'cover'}
                                source={{uri: this.state.videoCover}}
                            /> : null
                    }
                    <TouchableWithoutFeedback onPress={() => { this.hideControl() }}>
                        <View
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: this.state.videoWidth,
                                height: this.state.videoHeight,
                                backgroundColor: this.state.isPlaying ? 'transparent' : 'rgba(0, 0, 0, 0.5)',
                                alignItems:'center',
                                justifyContent:'center'}}>
                            {
                                this.state.isPlaying ? null :
                                    this.state.isPlayComplete?
                                        <TouchableWithoutFeedback
                                            onPress={()=>this.playVideo()}
                                            >
                                            <Image
                                                style={styles.repeatButton}
                                                source={require('./assets/image/repeat.png')}
                                            />
                                        </TouchableWithoutFeedback>:
                                    <TouchableWithoutFeedback onPress={() => { this.onPressPlayButton() }}>
                                        <Image
                                            style={styles.playButton}
                                            source={require('./assets/image/icon_video_play.png')}
                                        />
                                    </TouchableWithoutFeedback>
                            }
                        </View>
                    </TouchableWithoutFeedback>

                    {
                        this.state.showVideoControl ?
                            <View style={[styles.control, {width: this.state.videoWidth}]}>
                                <TouchableOpacity activeOpacity={0.3} onPress={() => { this.onControlPlayPress() }}>
                                    <Image
                                        style={styles.playControl}
                                        source={this.state.isPlaying ? require('./assets/image/icon_control_pause.png') : require('./assets/image/icon_control_play.png')}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.time}>{formatTime(this.state.currentTime)}</Text>
                                <Slider
                                    style={{flex: 1}}
                                    maximumTrackTintColor={'#999999'}
                                    minimumTrackTintColor={'#c0b913'}
                                    thumbImage={require('./assets/image/slider.png')}
                                    value={this.state.currentTime}
                                    minimumValue={0}
                                    maximumValue={this.state.duration}
                                    onValueChange={(currentTime) => { this.onSliderValueChanged(currentTime) }}
                                />
                                <Text style={styles.time}>{formatTime(this.state.duration)}</Text>
                                <TouchableOpacity activeOpacity={0.3} onPress={() => { this.onControlShrinkPress() }}>
                                    <Image
                                        style={styles.shrinkControl}
                                        source={this.state.isFullScreen ? require('./assets/image/icon_control_shrink_screen.png') : require('./assets/image/icon_control_full_screen.png')}
                                    />
                                </TouchableOpacity>
                            </View> : null
                    }
                    {

                        this.state.isFullScreen?

                        this.state.showVideoControl ?
                            <View
                                style={[styles.headerTop,{width: this.state.videoWidth}]}>
                                <TouchableOpacity style={styles.back1} activeOpacity={1} onPress={()=>this.onControlShrinkPress()}>
                                    <Image
                                        style={{width:30,height:30}}
                                        source={require('./assets/image/back.png')}/>
                                </TouchableOpacity>
                                <Text style={styles.title}>这是标题</Text>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={()=>this.closeRequire()}
                                    >
                                      <Image
                                          style={styles.danmu}
                                          source={this.state.barrage?require('./assets/image/dan_open.png'):require('./assets/image/dan_close.png')}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{marginRight:20}}>
                                        <Image
                                            style={{width:20,height:20}}
                                            source={require('./assets/image/share.png')}/>
                                    </TouchableOpacity>
                                </View>
                            </View>: null:
                            <View style={styles.topBarView}>
                                <TouchableOpacity style={styles.back} activeOpacity={1}>
                                    <Image
                                        style={{width:30,height:30}}
                                        source={require('./assets/image/back.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginRight:20}}>
                                    <Image
                                        style={{width:30,height:30}}
                                        source={require('./assets/image/more.png')}/>
                                </TouchableOpacity>
                            </View>
                    }
                </View>

            </View>
        )
    }

    onLoadStart() {
        console.log('视频开始加载');
    }

    onBuffering() {
        console.log('视频缓冲中...')
    }

    onLoaded(data:any) {
        console.log('视频加载完成');
        this.setState({
            duration: data.duration,
        });
    }

    onProgressChanged(data:any) {
        console.log('视频进度更新');
        if (this.state.isPlaying) {
            this.setState({
                currentTime: data.currentTime,
            })
        }
    }

    onPlayEnd() {
        console.log('视频播放结束');
        this.setState({
            currentTime: 0,
            isPlaying: false,
            showVideoCover: true,
            isPlayComplete:true
        });
        //this.pauseVideo();
        this.refs.videoPlayer.seek(0);

        if (this.state.isFullScreen){
            Orientation.lockToPortrait();
        }

    }

    onPlayError() {
        console.log('视频播放失败');
    }

    /// 控制播放器工具栏的显示和隐藏
    hideControl() {
        if (this.state.showVideoControl) {
            this.setState({
                showVideoControl: false,
            })
        } else {
            this.setState(
                {
                    showVideoControl: true,
                },
                // 5秒后自动隐藏工具栏
                // () => {
                //     setTimeout(
                //         () => {
                //             this.setState({
                //                 showVideoControl: false
                //             })
                //         }, 10000
                //     )
                // }
            )
        }
    }

    closeRequire(){
        this.setState({
            barrage:!this.state.barrage
        })
        this.props.closeRequire(!this.state.barrage);
       // console.log(6666)
    }

    /// 点击了播放器正中间的播放按钮
    onPressPlayButton() {
        let isPlay = !this.state.isPlaying;
        this.setState({
            isPlaying: isPlay,
            showVideoCover: false,
            isPlayComplete:false
        })
    }

    /// 点击了工具栏上的播放按钮
    onControlPlayPress() {
        this.onPressPlayButton();
    }

    /// 点击了工具栏上的全屏按钮
    onControlShrinkPress() {
        if (this.state.isFullScreen) {
            Orientation.lockToPortrait();
        } else {
            Orientation.lockToLandscape();

        }
    }

    /// 进度条值改变
    onSliderValueChanged(currentTime:number) {
        this.refs.videoPlayer.seek(currentTime);
        if (this.state.isPlaying) {
            this.setState({
                currentTime: currentTime
            })
        } else {
            this.setState({
                currentTime: currentTime,
                isPlaying: true,
                showVideoCover: false
            })
        }
    }

    /// 屏幕旋转时宽高会发生变化，可以在onLayout的方法中做处理，比监听屏幕旋转更加及时获取宽高变化
    _onLayout = (event) => {
        //获取根View的宽高
        let {width, height} = event.nativeEvent.layout;
        //console.log('通过onLayout得到的宽度：' + width);
        //console.log('通过onLayout得到的高度：' + height);

        // 一般设备横屏下都是宽大于高，这里可以用这个来判断横竖屏
        let isLandscape = (width > height);
        if (isLandscape){
            StatusBar.setHidden(true)
            this.setState({
                videoWidth: width,
                videoHeight: height,
                isFullScreen: true,
                barrage:false
            })
            //this.props.closeRequire(true)
        } else {
            StatusBar.setHidden(false)
            this.setState({
                videoWidth: width,
                videoHeight: width * 9/16,
                isFullScreen: false,
                barrage:false
            })

        }
        Orientation.unlockAllOrientations();
        this.props.follow(width,height);
        this.props.closeRequire(false)

    };

    ///播放视频，提供给外部调用
    playVideo() {
        this.setState({
            isPlaying: true,
            showVideoCover: false,
            isPlayComplete:false
        })
    }

    /// 暂停播放，提供给外部调用
    pauseVideo() {
        this.setState({
            isPlaying: false,
        })
    }

    /// 切换视频并可以指定视频开始播放的时间，提供给外部调用
    switchVideo(videoURL:string, seekTime:number) {
        this.setState({
            videoUrl: videoURL,
            currentTime: seekTime,
            isPlaying: true,
            showVideoCover: false
        });
        this.refs.videoPlayer.seek(seekTime);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        // position: 'absolute',
        // top:20,
        // left: 0,
        // width:60,
        // height:60
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
        width:screenWidth,
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