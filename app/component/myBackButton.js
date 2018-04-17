import React from 'react';
import {TouchableOpacity} from 'react-native';
import { withNavigation } from 'react-navigation';

const MyBackButton =(props)=>(
    <TouchableOpacity
        style={props.style}
        onPress={()=>{props.navigation.goBack()}}
        activeOpacity={0.9}>
        {props.children}
    </TouchableOpacity>
);

export default withNavigation(MyBackButton);