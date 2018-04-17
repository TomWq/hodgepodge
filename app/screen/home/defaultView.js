import React from 'react';
import {Text,TouchableOpacity,View,Image} from 'react-native';
import FastImage from 'react-native-fast-image'
import {scaleSize} from "../../utils/screenUtil";
import {style} from "./style";
import {Images} from "../../assest";

const ImageView=(props)=>(

    <FastImage

        style={props.styles}
        source={
            {uri:props.uri, priority: FastImage.priority.normal,cache:'force-cache'}
        }
        resizeMode={FastImage.resizeMode.cover}>
        {props.children}
    </FastImage>
);

function onLoad(uri) {
    if (uri.length!==0){
        return true
    }else {
        return false
    }
}

const RenderItemView=(props)=>(

    <TouchableOpacity
        activeOpacity={0.8}
        onPress={props.onPress}
        style={[style.listItem,props.styles]}>
        <ImageView uri={props.uri}>
            {props.ratingFinal && props.ratingFinal>0?
            <View style={style.ratingFinal}>
                <Text style={style.ratingFinalTitle}>{dealNumber(props.ratingFinal)}</Text>
            </View>:<View/>}
            {props.isIMAX3D ?
                <View style={style.isIMAX3D}>
                    <Text style={style.isIMAX3DTitle}>IMAX 3D</Text>
                </View>:
                props.isIMAX? <View style={style.isIMAX3D}>
                        <Text style={style.isIMAX3DTitle}>IMAX</Text>
                    </View>:
                <View/>}
            {props.isNew?
                <Image source={Images.icon.new} style={style.isNew}/>
                    :
                    props.will?<Image source={Images.icon.shou} style={style.isNew}/>:
                <View/>}
        </ImageView>
        <Text numberOfLines={1} style={style.listItemTitle}>{props.title}</Text>

    </TouchableOpacity>
);

function dealNumber(text:number) {
    let number = text.toFixed(1);
    return number
}

export {
    RenderItemView ,ImageView
}
