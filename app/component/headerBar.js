import React from 'react';
import { View,Text,Image,Animated,TouchableOpacity} from 'react-native';
import {style} from "./style";
import {Images} from "../assest/images";
import MyBackButton from './myBackButton';

const HeaderBar = (props)=>{

    return(

        <View style={[style.headerBarView,props.styles]}>
            <View style={style.statusBarView}/>
            <View style={style.headerTitleView}>
                {props.back?<BackTitle/>:props.close?<Close onClose={props.onClose}/>:null}
                <Animated.Text style={[style.headerTitle,{opacity:props.opacity}]} numberOfLines={1}>
                    {props.title}
                </Animated.Text>
                {props.right?<RightView source={props.source} onPress={props.onRightButtonPress} style={{opacity:props.opacity}}/>:null}
            </View>
        </View>
    )

};


const BackTitle = (props)=>(
    <MyBackButton
        style={style.backView}>
        <Image
            style={style.headerBack}
            source={Images.icon.headerBack}/>
        <Text
            style={style.headerBacKTitle}
            numberOfLines={1}>
            返回
        </Text>
    </MyBackButton>
);

const Close = (props) =>(
    <TouchableOpacity
        onPress={props.onClose}
        activeOpacity={0.9}
        style={style.backView}>
        <Image
            style={style.headerBack}
            source={Images.icon.close}/>
    </TouchableOpacity>
);

const RightView=(props)=>(
    <TouchableOpacity
        onPress={props.onPress}
        activeOpacity={0.9}
        style={style.headerRightView}>
        <Animated.Image

            style={[style.headerRight,props.style]}
            source={props.source}/>
    </TouchableOpacity>
)

export {
    HeaderBar
}
