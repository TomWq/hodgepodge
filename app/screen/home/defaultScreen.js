import React from 'react';
import {style} from "./style";
import {View,ActivityIndicator} from 'react-native';
const defaultArray = ['','','','','','','','',''];
import {Colors} from "../../assest";

const DefaultScreen = ()=>(

    <View style={style.defaultView}>
        {defaultArray.map((item,i)=>(
            <RenderItem
                key={i}
            />
        ))}
        <View style={style.defaultIndicator}>
            <ActivityIndicator color={Colors.activityIndicator} size='small'/>
        </View>
    </View>

);

const RenderItem=(item)=>(
    <View style={style.defaultItem}>
        <View style={style.defaultImage}/>
        <View style={style.defaultBottom}>
            {/*<View style={style.defaultImageTitle}/>*/}
            <View style={style.defaultTitle}/>
        </View>
    </View>
)

export {
    DefaultScreen
}

