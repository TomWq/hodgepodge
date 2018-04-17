import React from 'react';
import {View, ActivityIndicator,Text} from 'react-native';
import {style} from "./style";
import {String} from "../assest";

const LoadingView =()=>(

    <View style={style.loadingView}>
        <View style={style.loadDialog}>
            <ActivityIndicator color='#fff'/>
            <Text style={style.loadingTitle}>{String.loadingTitle}</Text>
        </View>
    </View>
)

export {
    LoadingView
}