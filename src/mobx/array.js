'use strict';

var React = require('react');
var createReactClass = require('create-react-class');
var ReactNative = require('react-native');
var {
    PanResponder,
    StyleSheet,
    View,
    Dimensions,
    Animated
} = ReactNative;

var CIRCLE_SIZE = 220;
const {width, height} = Dimensions.get('window');

var PanResponderExample = createReactClass({
    displayName: 'PanResponderExample',

    statics: {
        title: 'PanResponder Sample',
        description: 'Shows the use of PanResponder to provide basic gesture handling.',
    },

    _panResponder: {},
    _previousLeft: 0,
    _previousTop: 0,
    _circleStyles: {},
    _panX:0,
    _panY:0,

    //circle: (null : ?{ setNativeProps(props: Object): void }),

    UNSAFE_componentWillMount: function() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd,
        });
        this._previousLeft = 0;
        this._previousTop = 0;
        this._circleStyles = {
            style: {
                left: this._previousLeft,
                top: this._previousTop,
                backgroundColor: 'green',
            }
        };
    },

    componentDidMount: function() {
        this._updateNativeStyles();
    },

    render: function() {
        return (
            <View
                style={styles.container}>
                <Animated.View
                    ref={(circle) => {
                        this.circle = circle;
                    }}
                    style={styles.circle}
                    {...this._panResponder.panHandlers}
                    onPanResponderMove={Animated.event([
                        null, {
                            dx:this._panX,
                            dy:this._panY
                        }
                    ])}
                />
            </View>
        );
    },

    _highlight: function() {
        this._circleStyles.style.backgroundColor = 'blue';
        this._updateNativeStyles();
    },

    _unHighlight: function() {
        this._circleStyles.style.backgroundColor = 'green';
        this._updateNativeStyles();
    },

    _updateNativeStyles: function() {
        this.circle && this.circle.setNativeProps(this._circleStyles);
    },

    _handleStartShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
        // Should we become active when the user presses down on the circle?
        console.log(e.nativeEvent, gestureState)
        return true;
    },

    _handleMoveShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
        // Should we become active when the user moves a touch over the circle?
        return true;
    },

    _handlePanResponderGrant: function(e: Object, gestureState: Object) {
        this._highlight();
    },
    _handlePanResponderMove: function(e: Object, gestureState: Object) {
        //console.log(gestureState)
        //this._circleStyles.style.left = this._previousLeft + gestureState.dx;
        this._circleStyles.style.top = this._previousTop + gestureState.dy;
       // console.log(gestureState.dy)
        if (e.nativeEvent.pageY+gestureState.dy>e.nativeEvent.pageY){
            //console.log('下滑')
        }else{
            //console.log('上滑')
        }
        this._updateNativeStyles();

        this._panX = gestureState.dx;
        this._panY = gestureState.dy;
        
    },
    _handlePanResponderEnd: function(e: Object, gestureState: Object) {

        //this._previousLeft += gestureState.dx;

        //console.log(gestureState.y0 ,height)

        if (e.nativeEvent.pageY+gestureState.dy>e.nativeEvent.pageY){
            console.log('下滑了' +gestureState.dy)
            if (gestureState.dy<width/2){
                console.log('可以回弹')
                this._previousTop=0;
                this._unHighlight();
            }else{
                console.log('收起')
                this._previousTop += gestureState.dy;
                this._unHighlight();
            }
        }else{
            console.log('上滑了'+gestureState.dy)
        }


    },
});

var styles = StyleSheet.create({
    circle: {
        width: width,
        height: height,
        //borderRadius: CIRCLE_SIZE,
        position: 'absolute',
        left: 0,
        top: 0,
    },
    container: {
        flex: 1,
        paddingTop: 64,
    },
});

module.exports = PanResponderExample;