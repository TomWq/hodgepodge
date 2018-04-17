/**
 * @flow
 *
 */
import React from 'react';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import {style} from "./style";
import {Tab} from "./tabview";
import {StackNavigator} from 'react-navigation';
import {MovieDetails,ActorView,ActorDetails} from '../screen/home'
import {ClassListView} from "../screen/book";
import {ScrollImage} from "../screen/mine/scrollImage";
import {BookDetails} from "../screen/book/bookDetails";
import {BookCommentPer} from '../screen/book/bookCommentPer';
import {BookComments} from '../screen/book/bookComments';
import {BookReaderScreen} from '../screen/book/bookReaderScreen';
const RouteConfigs = {

    Tab:{
        screen:Tab,
        navigationOptions:({navigation})=>({
            gesturesEnabled: false,
            headerBackTitle:'返回',
            header:null,
        })
    },
    MovieDetails:{
        screen:MovieDetails,
        navigationOptions:({navigation})=>({
            gesturesEnabled:true,
            header:null,
            headerBackTitle:'返回'
        })
    },

    ActorView:{
        screen:ActorView,
        navigationOptions:({navigation})=>({
            gesturesEnabled:true,
            headerTitle:'演员表',
            headerStyle:{
                elevation:0
            }
        })
    },
    ActorDetails:{
        screen:ActorDetails,
        navigationOptions:({navigation})=>({
            gesturesEnabled:true,
            header:null,
            headerBackTitle:'返回'
        })
    },
    ClassListView:{
        screen:ClassListView,
        navigationOptions:({navigation})=>({
            gesturesEnabled:true,
            //headerBackTitle:'返回',
            header:null,
            //headerTransparent:true,
            headerTitle:navigation.state.params.major,
            headerStyle:{
                elevation:0,
            },
            headerBackTitleStyle:{
                color:'#333'
            }
        })
    },
    ScrollImage:{
        screen:ScrollImage,
        navigationOptions:({navigation})=>({
            header:null
        })
    },
    BookDetails:{
        screen:BookDetails,
        navigationOptions:({navigation})=>({
            header:null
        })
    },
    BookCommentPer:{
        screen:BookCommentPer,
        navigationOptions:({navigation})=>({
            header:null
        })
    },
    BookComments:{
        screen:BookComments,
        navigationOptions:({navigation})=>({
            header:null
        })
    },
    BookReaderScreen:{
        screen:BookReaderScreen,
        navigationOptions:({navigation})=>({
            header:null
        })
    }

};

const TransitionConfiguration = ()=>({
    screenInterpolator:(sceneProps:any)=>{
        const {scene} = sceneProps;
        const { route } = scene;
        const params = route.params || {};
        const transition = params.transition || 'forHorizontal';
        return CardStackStyleInterpolator[transition](sceneProps);
    }
});


export const StackNavigatorConfig = {
    initialRouteName: 'Tab',
    mode: 'card',
    headerMode: 'screen',
    cardStyle: style.cardStyle,
    transitionConfig:TransitionConfiguration,
    onTransitionStart: (() => {
        //console.log('页面跳转动画开始');
    }),
    onTransitionEnd: (() => {
        //console.log('页面跳转动画结束');
    }),
};

const Navigator = StackNavigator(RouteConfigs,StackNavigatorConfig);

export {
    Navigator
}