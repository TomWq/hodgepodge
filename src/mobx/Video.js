/**
 * @flow
 */
import React from 'react';
import {View,StyleSheet,StatusBar} from 'react-native';

import VideoPlayScreen from '../index';
import Barrage from '../barrage';

export default class Video extends React.Component<any,any>{

      state={
          width:0,
          height:0,
          flag:false
      };


    render(){

        return(
            <View style={{flex:1}}>

                <VideoPlayScreen
                    closeRequire={(flag)=>this.setState({flag:flag})}
                    follow={(w,h)=>this.setState({width:w,height:h})}/>
                {this.state.flag? <Barrage
                    width={this.state.width}
                    styles={[styles.danView,{width: this.state.width,height:this.state.height/2}]}/>
                :null
                }
            </View>
        )

    }

}

const styles = StyleSheet.create({
    danView:{
        position: 'absolute',
        top: 40,
        left: 0,

    }
})