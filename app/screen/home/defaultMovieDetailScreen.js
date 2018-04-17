import React from 'react';
import {View,Text,Image,ActivityIndicator} from 'react-native';
import {style} from "./style";
import {String,Images,Colors} from "../../assest";


const DefaultMovieDetailScreen = ()=>(

    <View style={style.container}>
        <TopView/>
        <Cell/>
        <StoryView/>
        <View style={style.defaultIndicator}>
            <ActivityIndicator color={Colors.activityIndicator} size='small'/>
        </View>
    </View>
)


const TopView =()=>(

    <View style={style.movieDetailTopView}>
        <View style={style.movieDetailTopView_Bar}>
            <Image source={Images.icon.back} style={style.movieDetailTopView_Back}/>
            <Image source={Images.icon.start} style={style.movieDetailTopView_Start}/>
        </View>
        <View style={style.movieDetailTopView_Image}>
            <Image source={Images.icon.play} style={style.movieDetailTopView_play}/>
        </View>
        <View style={style.movieDetailTopView_Score}>
            <Text style={style.score}>{String.score}</Text>
        </View>
        <View style={style.movieDetailTopView_Title}>
            <View style={style.movieDetailTop_Title_one}/>
            <View style={[style.movieDetailTop_Title_one,{width:80}]}/>
            <View style={[style.movieDetailTop_Title_one]}/>
            <View style={[style.movieDetailTop_Title_one,{width:80}]}/>
        </View>
    </View>
);

const StoryView=()=>(
    <View style={style.storyView}>
        <View style={style.movieStoryView}/>
        <View style={[style.movieStoryView,{width:WIDTH-60}]}/>
        <View style={[style.movieStoryView]}/>
        <View style={[style.movieStoryView,{width:WIDTH-60}]}/>
    </View>
)

const Cell = ()=>(
    <View style={style.Cell}/>
)

export {
    DefaultMovieDetailScreen
}