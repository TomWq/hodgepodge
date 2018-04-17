/**
 * @flow
 * 底部tab配置页
 */
import React from 'react';
import {Image} from 'react-native';
import {style} from "./style";
import {Images} from "../assest/index";
import {TabNavigator,TabBarTop} from 'react-navigation';
import {Colors} from "../assest/colors";
import {Ticket} from "../screen/home/ticket";
import {Hot} from "../screen/home/hot";
import {Immediately} from "../screen/home/immediately";
import {CommentsScreen} from "../screen/book/commentsScreen";

const TabRouteConfigs = {

    Ticket:{
        screen:CommentsScreen,
        navigationOptions:({navigation,screenProps})=>(TabBarItem('讨论',Images.tab.home_selected,Images.tab.home_uncheck)),
    },
    Hot:{
        screen:CommentsScreen,
        navigationOptions:({navigation,screenProps})=>(TabBarItem('书评',Images.tab.mine_selected,Images.tab.mine_uncheck))
    },
    Immediately:{
        screen:CommentsScreen,
        navigationOptions:({navigation,screenProps})=>(TabBarItem('短评',Images.tab.mine_selected,Images.tab.mine_uncheck))
    },

};

const TabNavigatorConfigs = {

    animationEnabled: true,
    initialRouteName: 'Ticket',
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    lazy: true,
    swipeEnabled: false,

    tabBarOptions:{
        activeTintColor:'red',
        inactiveTintColor:Colors.inactiveTintColor,
        showIcon:false,
        indicatorStyle:style.indicatorStyle,
        style:style.tabStyleTop1,
        labelStyle:style.labelStyleTop,
        scrollEnabled:false,
        pressColor:'#717171',
        bounces:true,
        useNativeDriver:true,
    }
}

const TabBarItem =(title:string,selected:string|number,uncheck:string|number)=>{
    return{
        tabBarLabel:title,
        title:title,
        tabBarIcon:({tintColor,focused})=>{
            return(
                focused? TabBarItemImage(selected) :TabBarItemImage(uncheck)
            )
        },

    }
};

const TabBarItemImage=(source:string|number)=>{
    return(
        <Image
            style={style.icon}
            source={source}
        />
    )
};

const BookTabTop = TabNavigator(TabRouteConfigs, TabNavigatorConfigs);

export {
    BookTabTop
}


