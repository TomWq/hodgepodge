import {StatusBar} from 'react-native';
import {observable,action,runInAction,toJS} from 'mobx';
const videoHeight = WIDTH * 9/16
import Orientation from 'react-native-orientation';

class videoStore {


     @observable videoWidth= WIDTH-40;
     @observable videoHeight= videoHeight;
     @observable showVideoCover= true;
     @observable showVideoControl= false;
     @observable isPlaying= false;
     @observable currentTime= 0;
     @observable duration= 0;
     @observable isFullScreen= false;
     @observable statusBar= false;
     @observable isPlayComplete= false;
     @observable barrage= false;


      //全屏显示
      @action changeFullScreen=()=>{
           this.isFullScreen = true
      };

      //小屏展示
      @action smallFullScreen=()=>{
          this.isFullScreen = false
      };

      @action onLoadStart=()=>{
          console.log('视频开始加载');
      };

      @action onLoad(data:any){
          console.log(data)
          console.log('视频加载完成');
          this.duration=data.duration;
      };

      @action onProgressChanged(data){
          console.log('视频进度更新');
             if (this.isPlaying){
                 this.currentTime = data.currentTime;
             }
      };

      @action onEnd=()=>{
          console.log('视频播放结束');
          this.currentTime=0;
          this.isPlaying = false;
          this.showVideoCover= true;
          this.isPlayComplete = true;
      };

      @action onError=()=>{
          console.log('视频播放失败');
      };

      @action onBuffer=()=>{
          console.log('视频缓冲中...')
      };

      @action hideControl=()=>{
          if (this.showVideoControl){
              this.showVideoControl = false
          }else {
              this.showVideoControl= true
          }
      };

      @action closeRequire=()=>{
          this.barrage = !this.barrage;
      };

      @action onPressPlayButton=()=>{
          let isPlay = !this.isPlaying;
          this.isPlaying = isPlay;
          this.showVideoCover = false;
          this.isPlayComplete = false;
      };

      @action onControlPlayPress=()=>{
          this.onPressPlayButton()
      };

      @action onControlShrinkPress=()=>{
          if (this.isFullScreen){
              Orientation.lockToPortrait();
          }else {
              Orientation.lockToLandscape();
          }
      };


      @action _onLayout(event){
          //获取根View的宽高
          let {width, height} = event.nativeEvent.layout;
          let isLandscape = (width > height);
          if (isLandscape){
              StatusBar.setHidden(true);
              this.videoWidth = width;
              this.videoHeight = height;
              this.isFullScreen = true;
              this.barrage = false
          } else {
              StatusBar.setHidden(false);
              this.videoWidth = width;
              this.videoHeight = height;
              this.isFullScreen = false;
              this.barrage = false
          }
          Orientation.unlockAllOrientations();
      };

    @action playVideo=()=>{
            this.isPlaying= true;
            this.showVideoCover=false;
            this.isPlayComplete=false;
    }
    @action pauseVideo=()=>{
             this.isPlaying = false;
    }


    @action formatTime=(second)=> {
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

    @action back=()=>{
        if (VideoStore.isFullScreen){
            Orientation.lockToPortrait();
            VideoStore.smallFullScreen()
            return true
        }
        return false
    }
}

const VideoStore = new videoStore();

export {
    VideoStore
}