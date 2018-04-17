import React from 'react';

import {View,PanResponder,StyleSheet,Dimensions,ScrollView, Text,Animated,Easing,StatusBar} from 'react-native';

const {width, height} = Dimensions.get('window');

const array1 = [];

const array =['text','text','text','text','text','text','text','text',
    'text','text','text','text','text','text','text','text','text',
    'text','text','text','text','text','text','text','text','text',
    'text','text','text','text','text','text','text','text','text',
    'text','text','text','text','text','text','text','text','text',
    'text','text','text','text','text','text','text','text','text',
    'text','text','text','text','text','text','text','text','text',
    'text','text','text','text','text','text','text','text','text',
    'text','text','text','text','text','text','text','text','text',
    'text','text','text','text','text','text','text','text','text',
    'text','text','text','text','text','text','text','text','text',
    'text','text','text','text','text','text','text','text','text',
    'text','text','text','text','text','text','text','text','text',
    'text','text','text','text','text','text','text','text','text',
    'text','text','text','text','text','text','text','text','text',
    'text','text','text','text','text','text','text','text','text',
    'text','text','text','text','text','text','text','text','text',]

export default class PanResponderView extends React.Component{


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          this._panResponder={};
          this. _previousTop =0;
          this._circleStyles ={};
          this.topHeight =new Animated.Value(0)
          this.state = {

          };

         // this.topHeight.addListener((value) => this.topHeight = value);
      }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd,
        });

        this._circleStyles={
            style:{
                top:this._previousTop,
                backgroundColor:'red'
            }
        }
    }

    componentDidMount() {
        this._updateNativeStyles()
        StatusBar.setBarStyle('dark-content')
    }

    _highlight(){
        this._circleStyles.style.backgroundColor = 'red';
        this._updateNativeStyles();
    }
    _updateNativeStyles=()=>{
        this.circle && this.circle.setNativeProps(this._circleStyles);
    };

    _unHighlight=()=>{
        this._circleStyles.style.backgroundColor = 'red';
        this._updateNativeStyles();
    }

    _handleStartShouldSetPanResponder=(e,gestureState)=>true;
    _handleMoveShouldSetPanResponder=(e,gestureState)=>true;
    _handlePanResponderGrant=(e,gestureState)=>this._highlight();
    _handlePanResponderMove=(e,gestureState)=>{

        //this._circleStyles.style.top = this._previousTop+gestureState.dx;

        let toValue;

        if (e.nativeEvent.pageY+gestureState.dy>e.nativeEvent.pageY){
            console.log('下滑')
            toValue = 0;
        }else{
            console.log('上滑')
            toValue = 1;
        }

        Animated.spring(this.topHeight,{
            toValue:toValue,
            bounciness:10,
        }).start();

        this._updateNativeStyles();
    };

    _handlePanResponderEnd=(e,gestureState)=>{

        this._unHighlight();
        let toValue;

        if (e.nativeEvent.pageY+gestureState.dy>e.nativeEvent.pageY){
            console.log('下滑')
            StatusBar.setBarStyle('dark-content')
            toValue = 0;
        }else{
            console.log('上滑')
            StatusBar.setBarStyle('light-content')
            toValue = 1;
        }

        Animated.spring(this.topHeight,{
            toValue:toValue,
        }).start();
        //this._previousTop = gestureState.dy

       // console.log( this._previousTop)
    }

    render(){

        let toHeight = this.topHeight.interpolate({
            inputRange:[0,1],
            outputRange:[0,-66]
        });

        let toOpacity = this.topHeight.interpolate({
            inputRange:[0,0.5,1],
            outputRange:[1,0.5,0]
        })

        return(
            <View style={styles.contain}>
                <Animated.View
                    style={{
                        justifyContent:'center',alignItems:'center',
                        height:66,width:width,backgroundColor:'blue',
                        opacity:toOpacity}}>
                    <Text>标题</Text>
                </Animated.View>
                <Animated.ScrollView
                    ref={(circle) => {
                        this.circle = circle;
                    }}
                    stickyHeaderIndices={[0]}
                    style={styles.circle}
                    {...this._panResponder.panHandlers}>
                    <View>
                        <Text>{array1[0]}</Text>
                    </View>
                    {array.map((item,i)=>{
                        return(
                            <Text key={i} style={{color:'#fff',fontSize:18}}>{item}</Text>
                        )
                    })}
                </Animated.ScrollView>
            </View>
        )

    }



}

const styles  = StyleSheet.create({
    contain:{
        flex:1
    },
    circle:{
        flex:1,
        width:width,
        height:height,

    }
})

