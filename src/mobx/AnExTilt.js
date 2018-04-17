import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    PanResponder,
    Animated,
    Dimensions,
    ScrollView
} from 'react-native';

var {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');

const array =['text','text','text','text','text','text','text','text',
    'text','text','text','text','text','text','text','text','text',
    'text','text','text','text','text','text','text','text','text',
    'text','text','text','text','text','text','text','text','text',
    'text','text','text','text','text','text','text','text','text',]

export default class touch extends Component{

    componentWillMount() {
        this._animatedValue = new Animated.ValueXY()
        this._value = {x: 0, y: 0}
        this.flag1 = false;
        this.flag2 = false;
        this.scrollY = new Animated.Value(0);

        this._animatedValue.addListener((value) => this._value = value);

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder:()=>true,
            onMoveShouldSetPanResponder: ()=>true,
            onPanResponderGrant: this._handlePanResponderGrant.bind(this),
            onPanResponderMove: Animated.event([
                null, {dx: this._animatedValue.x, dy:this._animatedValue.y}
            ]),
            onPanResponderRelease: this._handlePanResponderEnd.bind(this),
            onPanResponderTerminate: this._handlePanResponderEnd.bind(this),

            onStartShouldSetResponderCapture:(e)=>false,
            onMoveShouldSetResponderCapture:(e)=>false
        });



        this._panResponderScroolView =  PanResponder.create({
            onStartShouldSetPanResponder: (e)=>true,
            onMoveShouldSetPanResponder: (e)=>true,
            onPanResponderGrant:(e,gestureState)=>{

            },
            onPanResponderMove:(e,gestureState)=>{
                if (e.nativeEvent.pageY+gestureState.dy>e.nativeEvent.pageY){
                    console.log('上滑动');

                }else{
                    console.log('下滑动')
                }
            },

            onStartShouldSetResponderCapture:(e)=>false,
            onMoveShouldSetResponderCapture:(e)=>false

        })
    }

    _handlePanResponderGrant(e, gestureState){

        this._animatedValue.setOffset({x: this._value.x, y: this._value.y});
        this._animatedValue.setValue({x: 0, y: 0});
    }

    _handlePanResponderEnd(e, gestureState){


        let toValue = gestureState.dy;

        console.log(toValue)

        if(toValue>deviceHeight/2-50){
            toValue = deviceHeight
        }else {
            toValue = 0
        }

        Animated.spring(this._animatedValue, {
            toValue:toValue,
            bounciness:10,
        }).start();
    }


    render() {

        var interpolatedColorAnimation = this._animatedValue.y.interpolate({
            inputRange: [- deviceHeight, deviceHeight],
            outputRange: ['rgba(225,0,0,1)', 'rgba(225,0,225,1)'],
            extrapolate: 'clamp'
        });

        var interpolatedRotateAnimation = this._animatedValue.x.interpolate({
            inputRange: [0, deviceWidth/2, deviceWidth],
            outputRange: ['0deg', '0deg', '0deg']
        });

        return (
            <Animated.View
                style={[
                    styles.box, {
                        transform: [
                            {translateY: this._animatedValue.y},
                            {rotate: interpolatedRotateAnimation}
                        ],
                        backgroundColor: interpolatedColorAnimation
                    }]}
                {...this._panResponder.panHandlers}>
                <Animated.View
                    style={{flex:1}}
                    pointerEvents='auto'
                    {...this._panResponderScroolView.panHandlers}>
                    <ScrollView
                        bounces={false}
                        style={{position:'absolute',top:0,left:0}}
                      >
                        {array.map((item,i)=>{
                            return(
                                <Text key={i} style={{color:'#fff',fontSize:18}}>{item}</Text>
                            )
                        })}
                    </ScrollView>
                </Animated.View>

            </Animated.View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    box: {
        width: deviceWidth,
        height: deviceHeight
    }
});