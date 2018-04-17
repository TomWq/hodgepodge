import React from 'react'
import {View,ActivityIndicator} from 'react-native';
import {style} from "./style";
import {Colors} from "../assest/colors";

const Loading =()=>{

    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator color={Colors.activeTintColor} size='small'/>
        </View>
    )

};
export {
    Loading
}