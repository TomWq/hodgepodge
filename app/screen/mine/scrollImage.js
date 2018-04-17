import React from 'react';
import {View,ScrollView,Image,StatusBar,TouchableOpacity,PanResponder,Animated,StyleSheet,Text} from 'react-native';
import {ImageView} from "../home/defaultView";

class ScrollImage extends React.Component{

    // 构造
      constructor(props) {
        super(props);
          this. _circleStyles = {};
          //this._previousLeft = 0;
          this. _previousTop = 0;
          this.bgColor = new Animated.Value(0)
      }

    componentWillMount() {

        this._PanResponder = PanResponder.create({
            onStartShouldSetPanResponder:()=>true,
            onMoveShouldSetPanResponder:()=>true,
            onPanResponderGrant: this._handlePanResponderMove,
            onPanResponderMove:this._handlePanResponderMove,
            onPanResponderRelease:this._handlePanResponderEnd,

        });

        this._circleStyles={
            style:{
                //left:this._previousLeft,
                top:this._previousTop,
            }
        }
    }


    _handlePanResponderMove=(e,gestureState)=>{
            // this._circleStyles.style.top = this._previousTop + gestureState.dy;
            // this._updateNativeStyles();
    };

    _handlePanResponderEnd=(e,gestureState)=>{

                if (gestureState.dx<10 && gestureState.dy<10){
                    //alert('123')
                   // this.props.onClose()
                }

                // this._circleStyles.style.top = this._previousTop;
                // this._updateNativeStyles()

    };

    _updateNativeStyles=()=>{

        //this.refs.imageView && this.refs.imageView.setNativeProps(this._circleStyles)
    };

    render(){


        return(
            <View style={{flex:1}}>
                <StatusBar barStyle='light-content'/>
                <Animated.ScrollView
                    showsHorizontalScrollIndicator={false}
                    style={{flex: 1,width:WIDTH,height:HEIGHT,backgroundColor:'#000'}}
                    pagingEnabled={true}
                    horizontal={true}>
                    <ScrollView
                        contentContainerStyle={{width:WIDTH,height:HEIGHT,backgroundColor:'#000'}}
                                maximumZoomScale={1.5}
                                minimumZoomScale={1.0}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                horizontal={true}
                                centerContent={true}>
                        <Image
                            ref='imageView'
                            {...this._PanResponder.panHandlers}
                            resizeMode='contain'
                            style={styles.image}
                            source={require('./timg.jpg')}/>
                    </ScrollView>
                </Animated.ScrollView>
            </View>
        )

    }

}

const styles = StyleSheet.create({
    image:{
        width:WIDTH,
        height:HEIGHT,
        position:'absolute',
        left:0,
        top:0
        //top:-330,


    }
})

export {
    ScrollImage
}